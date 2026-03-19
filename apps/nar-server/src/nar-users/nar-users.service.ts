import {Injectable} from '@nestjs/common';
import {nar_user} from '@prisma/client';
import {prisma} from '../config/prisma/prisma';
import {UpdateNarUserDto} from './locals-models/update-nar-user.dto';

@Injectable()
export class UserService {
  async find(): Promise<nar_user[]> {
    return await prisma.nar_user.findMany();
  }

  async update(userId: number, dto: UpdateNarUserDto): Promise<nar_user> {
    return await prisma.nar_user.update({where: {id: userId}, data: dto});
  }
}
