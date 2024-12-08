import { TimeClock, TypeTimeClock } from '../entities/time-clock.entity';

export class ResponseTimeClockDTO {
  id: string;

  moment: string;

  type: TypeTimeClock;

  latitude: string;

  longitude: string;

  constructor(timeClock: TimeClock) {
    this.id = timeClock.publicId;
    this.moment = timeClock.moment.toISOString();
    this.type = timeClock.type;
    this.latitude = timeClock.latitude;
    this.longitude = timeClock.longitude;
  }
}
