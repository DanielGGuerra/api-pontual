import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TimeClockService } from './time-clock.service';
import { CreateTimeClockDTO } from './dtos/create-time-clock.dto';
import { ResponseTimeClockDTO } from './dtos/response-time-clock.dto';
import { PaginatedResponse } from 'src/classes/paginated-response';

@Controller('time-clock')
export class TimeClockController {
  constructor(private readonly timeClockService: TimeClockService) {}

  @Post()
  async create(
    @Body() createTimeClock: CreateTimeClockDTO,
  ): Promise<ResponseTimeClockDTO> {
    const timeClock = await this.timeClockService.create(createTimeClock);
    return new ResponseTimeClockDTO(timeClock);
  }

  @Get('/:userId')
  async findAll(
    @Param('userId') userId: string,
  ): Promise<PaginatedResponse<ResponseTimeClockDTO>> {
    const [timeClocks, total] = await this.timeClockService.findAll(userId);
    return new PaginatedResponse(
      timeClocks.map((timeClock) => new ResponseTimeClockDTO(timeClock)),
      total,
    );
  }
}
