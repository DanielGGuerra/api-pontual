import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class FindAllParamsDto {
  @ApiProperty({ type: Date, required: false })
  @IsOptional()
  @IsDateString()
  momentStart?: string;

  @ApiProperty({ type: Date, required: false })
  @IsOptional()
  @IsDateString()
  momentEnd?: string;
}
