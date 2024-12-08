import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import config from './config/config';
import mikroOrmConfig from './config/mikro-orm.config';

import { UserModule } from './app/user/user.module';
import { TimeClockModule } from './app/time-clock/time-clock.module';
import { AuthModule } from './app/auth/auth.module';
import { ClsModule } from 'nestjs-cls';
import { Request } from 'express';
import { BcryptModule } from './app/bcrypt/bcrypt.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    MikroOrmModule.forRoot(mikroOrmConfig),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup: (cls, req: Request) => {
          let perPage = parseInt(req.query.perPage as string);
          let page = parseInt(req.query.page as string);

          try {
            if (perPage <= 0 || isNaN(perPage)) perPage = 10;
            if (perPage > 50) perPage = 50;
            cls.set<number>('limit', perPage);
          } catch {
            perPage = 10;
            cls.set<number>('limit', perPage);
          }

          try {
            if (page <= 0 || isNaN(page)) page = 1;
            const offset = perPage * (page - 1);
            cls.set<number>('offset', offset);
          } catch {
            cls.set<number>('offset', 0);
          }
        },
      },
    }),
    UserModule,
    TimeClockModule,
    AuthModule,
    BcryptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
