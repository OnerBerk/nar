import * as bcrypt from 'bcrypt';
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../config/prisma/prisma.service';
import { RegisterDto } from './local-models/register-dto';
import { LoginDto } from './local-models/login-dto';
import { authConstants } from './auth-constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: authConstants.secret,
    });
  }
  async register({ lastname, firstname, email, password, role }: RegisterDto) {
    const existUser = await this.prisma.nar_user.findFirst({ where: { email: email } });
    if (existUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const newUser = await this.prisma.nar_user.create({
        data: {
          lastname,
          firstname,
          email,
          password: hashedPassword,
          roles: role ?? ['Authenticated'],
        },
      });
      return { message: 'User successfully registered', user: newUser };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login({ email, password }: LoginDto) {
    const existUser = await this.prisma.nar_user.findFirst({ where: { email: email } });
    if (!existUser) {
      throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
    }
    try {
      const isPasswordValid = await bcrypt.compare(password, existUser.password);
      if (!isPasswordValid) {
        throw new HttpException('Invalid Password', 401);
      }
      const payload = { sub: existUser.id, roles: existUser.roles };
      const token = this.jwtService.sign(payload);
      return { token: token, user: existUser };
    } catch (e) {
      console.log('[auth.service.login]', e);
      throw new BadRequestException('[auth.service.login]');
    }
  }
}
