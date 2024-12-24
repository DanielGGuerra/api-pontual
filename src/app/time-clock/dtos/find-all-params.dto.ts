import { IsDateString, IsOptional } from 'class-validator';

export class FindAllParamsDto {
  @IsOptional()
  @IsDateString()
  momentStart?: string;

  @IsOptional()
  @IsDateString()
  momentEnd?: string;
}
