import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from './auth-constants';
import { RolesEnum } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConstants.secret,
    });
  }

  async validate(payload: { sub: number; roles: RolesEnum[] }) {
    return { userId: payload.sub, roles: payload.roles };
  }
}
