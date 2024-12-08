import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTimeClockDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

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
