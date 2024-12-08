import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IJwt } from './interfaces/jwt.interface';
import { ResponseUserDTO } from '../user/dtos/response-user.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async singIn(email: string, password: string): Promise<IJwt> {
    let user: User = null;

    try {
      user = await this.userService.findByEmail(email);
    } catch {
      throw new UnauthorizedException();
    }

    if (!(await this.bcryptService.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.publicId,
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      ...new ResponseUserDTO(user),
    };
  }
}
