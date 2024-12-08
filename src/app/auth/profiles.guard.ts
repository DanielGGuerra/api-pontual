import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Profile, User } from '../user/entities/user.entity';
import { PROFILES_KEY } from 'src/decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ProfilesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly clsService: ClsService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<Profile[]>(PROFILES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required) {
      return true;
    }

    const user = this.clsService.get<User>('user');
    return required.some((profile) => profile === user.profile);
  }
}
