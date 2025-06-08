import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { NarUser } from './locals-models/nar-users.dto';
import { nar_user, RolesEnum } from '@prisma/client';
import { UserService } from './nar-users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

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
}
