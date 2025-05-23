import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { nar_user, RolesEnum } from '@prisma/client';
import { CreateNarUserDto } from './locals-models/create-nar-user.dto';
import { prisma } from '../config/prisma/prisma';

@Injectable()
export class UserService {
  async find(): Promise<nar_user[]> {
    return await prisma.nar_user.findMany();
  }

  async create(dto: CreateNarUserDto): Promise<nar_user> {
    try {
      return await prisma.nar_user.create({
        data: { ...dto, roles: dto.roles ?? [RolesEnum.Authenticated] },
      });
    } catch (e) {
      console.error('[userService.create]', e);
      throw new InternalServerErrorException();
    }
  }
}
