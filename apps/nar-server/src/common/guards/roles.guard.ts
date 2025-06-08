import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesEnum } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();

    console.log('user', user);
    const userRoles: RolesEnum[] = user?.roles || [];

    if (userRoles.includes(RolesEnum.Admin)) return true;

    const hasAccess = userRoles.some((role) => requiredRoles.includes(role));
    if (!hasAccess) {
      throw new ForbiddenException('UNAUTHORIZED');
    }

    return true;
  }
}
