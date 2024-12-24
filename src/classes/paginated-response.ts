import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponse<T> {
  @ApiProperty()
  public total: number;

  @ApiProperty()
  public data: T[];

  constructor(data: T[], total: number) {
    this.total = total;
    this.data = data;
  }
}
