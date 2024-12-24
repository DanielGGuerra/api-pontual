import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TimeClock, TypeTimeClock } from './entities/time-clock.entity';
import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { CreateTimeClockDTO } from './dtos/create-time-clock.dto';
import { addMinutes, endOfDay, isBefore, startOfDay } from 'date-fns';
import { UserService } from '../user/user.service';
import { ClsService } from 'nestjs-cls';
import { User } from '../user/entities/user.entity';
import { FindAllParamsDto } from './dtos/find-all-params.dto';

@Injectable()
export class TimeClockService {
  constructor(
    @InjectRepository(TimeClock)
    private readonly timeClockRepository: EntityRepository<TimeClock>,
    private readonly userService: UserService,
    private readonly clsService: ClsService,
  ) {}

  async create(createTimeClock: CreateTimeClockDTO): Promise<TimeClock> {
    const today = addMinutes(new Date(), -5);
    const moment = new Date(createTimeClock.moment);

    if (isBefore(moment, today)) {
      throw new BadRequestException(`moment register is before current time`);
    }

    const user = this.clsService.get<User>('user');

    const timeClocks = await this.timeClockRepository.find(
      {
        user: {
          id: user.id,
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

    const timeClock = this.timeClockRepository.create(createTimeClock);

    timeClock.type = type;
    timeClock.user = user;

    await this.timeClockRepository.insert(timeClock);
    return timeClock;
  }

  async findAll(filter?: FindAllParamsDto): Promise<[TimeClock[], number]> {
    const user = this.clsService.get<User>('user');

    const where: FilterQuery<TimeClock> = {
      user: { id: user.id },
      moment: {
        $gte: filter.momentStart && new Date(filter.momentStart),
        $lte: filter.momentEnd && new Date(filter.momentEnd),
      },
    };

    return await this.timeClockRepository.findAndCount(where, {
      limit: this.clsService.get<number>('limit'),
      offset: this.clsService.get<number>('offset'),
      orderBy: {
        id: 'desc',
      },
    });
  }
}
