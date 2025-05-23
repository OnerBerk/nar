import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { NarUserDto } from './locals-models/nar-users.dto';
import { nar_user } from '@prisma/client';
import { UserService } from './nar-users.service';
import { CreateNarUserDto } from './locals-models/create-nar-user.dto';

@Controller('users')
export class userController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'Find all users',
    type: NarUserDto,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<nar_user[]> {
    return this.userService.find();
  }

  @ApiOkResponse({
    description: 'Create user',
    type: NarUserDto,
  })
  @Post()
  @ApiOkResponse({ description: 'Create user', type: NarUserDto })
  async create(@Body() dto: CreateNarUserDto): Promise<nar_user> {
    return this.userService.create(dto);
  }
}
