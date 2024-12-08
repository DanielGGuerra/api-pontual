import { Module } from '@nestjs/common';
import { TimeClockService } from './time-clock.service';
import { TimeClockController } from './time-clock.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TimeClock } from './entities/time-clock.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MikroOrmModule.forFeature([TimeClock]), UserModule],
  providers: [TimeClockService],
  controllers: [TimeClockController],
})
export class TimeClockModule {}
