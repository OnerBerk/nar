import {Body, Controller, Get, Request, Put, UseGuards, BadRequestException} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {NarUser} from './locals-models/nar-users.dto';
import {nar_user, RolesEnum} from '@prisma/client';
import {UserService} from './nar-users.service';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from '../common/decorators/roles.decorator';
import {RolesGuard} from '../common/guards/roles.guard';
import {UpdateNarUserDto} from './locals-models/update-nar-user.dto';

@Controller('users')
export class userController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Find all users',
    type: NarUser,
    isArray: true,
  })
  @Roles(RolesEnum.Ops)
  @Get()
  async findAll(): Promise<nar_user[]> {
    return this.userService.find();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Find a user by id',
    type: NarUser,
  })
  @Roles(RolesEnum.Authenticated)
  @Put('me')
  async update(@Request() req: {user?: {userId: number}}, @Body() dto: UpdateNarUserDto): Promise<nar_user> {
    const userId = req.user?.userId;
    if (!dto.activity_level && !dto.firstname && !dto.lastname) {
      throw new BadRequestException('[UPDATE_USER]:::=> NO_DATA_TO_UPDATE');
    }
    if (!userId) {
      throw new BadRequestException('[UPDATE_USER]:::=> USER_NOT_AUTHENTICATED');
    }
    return this.userService.update(userId, dto);
  }
}
