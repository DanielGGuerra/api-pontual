import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDTO } from './dtos/sing-in.dto';
import { IJwt } from './interfaces/jwt.interface';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sing-in')
  async singIn(@Body() { email, password }: SingInDTO): Promise<IJwt> {
    return await this.authService.singIn(email, password);
  }
}
