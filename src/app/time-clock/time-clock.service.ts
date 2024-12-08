import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TimeClock, TypeTimeClock } from './entities/time-clock.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CreateTimeClockDTO } from './dtos/create-time-clock.dto';
import { addMinutes, endOfDay, isBefore, startOfDay } from 'date-fns';
import { UserService } from '../user/user.service';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class TimeClockService {
  constructor(
    @InjectRepository(TimeClock)
    private readonly timeClockRespository: EntityRepository<TimeClock>,
    private readonly userService: UserService,
    private readonly clsService: ClsService,
  ) {}

  async create(createTimeClock: CreateTimeClockDTO): Promise<TimeClock> {
    const today = addMinutes(new Date(), -5);
    const moment = new Date(createTimeClock.moment);

    if (isBefore(moment, today)) {
      throw new BadRequestException(`moment register is before current time`);
    }

    const timeClocks = await this.timeClockRespository.find(
      {
        user: {
          publicId: createTimeClock.userId,
        },
        moment: {
          $gte: startOfDay(moment),
          $lte: endOfDay(moment),
        },
      },
      {
        orderBy: {
          id: 'ASC',
        },
      },
    );

    let type = TypeTimeClock.in;

    if (
      timeClocks.length &&
      timeClocks[timeClocks.length - 1].type === TypeTimeClock.in
    ) {
      type = TypeTimeClock.out;
    }

    timeClocks.forEach((timeClock) => {
      if (
        addMinutes(timeClock.moment, -5) < moment &&
        addMinutes(timeClock.moment, 5) > moment
      ) {
        throw new BadRequestException(`duplicated record`);
      }
    });

    const timeClock = this.timeClockRespository.create(createTimeClock);

    timeClock.type = type;

    const user = await this.userService.find(createTimeClock.userId);
    timeClock.user = user;

    await this.timeClockRespository.insert(timeClock);

    return timeClock;
  }

  async findAll(userId: string): Promise<[TimeClock[], number]> {
    return await this.timeClockRespository.findAndCount(
      {
        user: {
          publicId: userId,
        },
      },
      {
        limit: this.clsService.get<number>('limit'),
        offset: this.clsService.get<number>('offset'),
        orderBy: {
          id: 'desc',
        },
      },
    );
  }
}
