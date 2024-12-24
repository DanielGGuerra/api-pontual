import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class FindUserDTO extends PartialType(
  OmitType(CreateUserDTO, ['password']),
  { skipNullProperties: true },
) {
  @ApiProperty({ required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  perPage?: number;
}
