import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateTimeClockDTO {
  @ApiProperty({ type: Date })
  @IsNotEmpty()
  @IsDateString()
  moment: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  latitude: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  longitude: string;
}
