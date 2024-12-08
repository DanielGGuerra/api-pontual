import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector,
    private readonly cls: ClsService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const [bearer, token] = request.headers?.authorization?.split(' ') ?? [];

    if (bearer !== 'Bearer') {
      throw new UnauthorizedException();
    }

    try {
      const { sub } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('SECRET'),
      });

      const user = await this.userService.find(sub);
      this.cls.set<User>('user', user);

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
