import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {authConstants} from './auth-constants';
import {RolesEnum} from '@prisma/client';
import {PrismaService} from '../config/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConstants.secret,
    });
  }

  async validate(payload: {sub: number; roles: RolesEnum[]}) {
    const user = await this.prisma.nar_user.findUnique({
      where: {id: payload.sub},
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      userId: user.id,
      roles: user.roles,
      sex: user.sex,
      date_of_birth: user.date_of_birth,
      activity_level: user.activity_level,
    };
  }
}
