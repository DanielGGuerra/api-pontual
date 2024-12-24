import { ApiProperty } from '@nestjs/swagger';
import { TimeClock, TypeTimeClock } from '../entities/time-clock.entity';

export class ResponseTimeClockDTO {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: Date })
  moment: string;

  @ApiProperty({ enum: TypeTimeClock })
  type: TypeTimeClock;

  @ApiProperty()
  latitude: string;

  @ApiProperty()
  longitude: string;

  constructor(timeClock: TimeClock) {
    this.id = timeClock.publicId;
    this.moment = timeClock.moment.toISOString();
    this.type = timeClock.type;
    this.latitude = timeClock.latitude;
    this.longitude = timeClock.longitude;
  }
}
