import { ResponseUserDTO } from 'src/app/user/dtos/response-user.dto';

export interface IJwt extends ResponseUserDTO {
  token: string;
}
