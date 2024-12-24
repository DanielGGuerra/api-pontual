import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TimeClockService } from './time-clock.service';
import { CreateTimeClockDTO } from './dtos/create-time-clock.dto';
import { ResponseTimeClockDTO } from './dtos/response-time-clock.dto';
import { PaginatedResponse } from 'src/classes/paginated-response';
import { Profiles } from 'src/decorators/roles.decorator';
import { Profile } from '../user/entities/user.entity';
import { FindAllParamsDto } from './dtos/find-all-params.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ApiOkResponsePaginated } from 'src/decorators/api-ok-response-paginated.decorator';

@Controller('time-clock')
export class TimeClockController {
  constructor(private readonly timeClockService: TimeClockService) {}

  @Post()
  @Profiles(Profile.EMPLOYEE)
  @ApiCreatedResponse({ type: ResponseTimeClockDTO })
  async create(
    @Body() createTimeClock: CreateTimeClockDTO,
  ): Promise<ResponseTimeClockDTO> {
    const timeClock = await this.timeClockService.create(createTimeClock);
    return new ResponseTimeClockDTO(timeClock);
  }

  @Get()
  @Profiles(Profile.EMPLOYEE)
  @ApiOkResponsePaginated(ResponseTimeClockDTO)
  async findAll(
    @Query() filter?: FindAllParamsDto,
  ): Promise<PaginatedResponse<ResponseTimeClockDTO>> {
    const [timeClocks, total] = await this.timeClockService.findAll(filter);
    return new PaginatedResponse(
      timeClocks.map((timeClock) => new ResponseTimeClockDTO(timeClock)),
      total,
    );
  }
}
