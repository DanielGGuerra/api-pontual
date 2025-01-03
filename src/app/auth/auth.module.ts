import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthJwtGuard } from './auth.guard';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { ProfilesGuard } from './profiles.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_JWT', 'develop'),
        signOptions: {
          expiresIn: configService.get<string>('EXPIRES_IN_JWT', '1d'),
        },
      }),
    }),
    BcryptModule,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthJwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ProfilesGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
