import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDTO } from './dtos/sing-in.dto';
import { Public } from 'src/decorators/public.decorator';
import { ResponseJwtDTO } from './dtos/response-jwt.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sing-in')
  @ApiCreatedResponse({ type: ResponseJwtDTO })
  async singIn(
    @Body() { email, password }: SingInDTO,
  ): Promise<ResponseJwtDTO> {
    return await this.authService.singIn(email, password);
  }
}
