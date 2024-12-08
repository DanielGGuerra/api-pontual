import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [MikroOrmModule.forFeature([User]), BcryptModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
