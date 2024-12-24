import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { ResponseUserDTO } from 'src/app/user/dtos/response-user.dto';
import { IntersectionType } from '@nestjs/swagger';

export class ResponseJwtDTO extends IntersectionType(ResponseUserDTO) {
  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  token: string;
}
