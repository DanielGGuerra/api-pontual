import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateTimeClockDTO {
  @IsNotEmpty()
  @IsDateString()
  moment: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  latitude: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(20)
  longitude: string;
}
