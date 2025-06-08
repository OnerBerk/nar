import { Injectable } from '@nestjs/common';
import { nar_user } from '@prisma/client';
import { prisma } from '../config/prisma/prisma';

@Injectable()
export class UserService {
  async find(): Promise<nar_user[]> {
    return await prisma.nar_user.findMany();
  }
}
