import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class FindUserDTO extends PartialType(
  OmitType(CreateUserDTO, ['password']),
  { skipNullProperties: true },
) {
  @IsOptional()
  page?: number;

  @IsOptional()
  perPage?: number;
}
