import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  async hash(text: string): Promise<string> {
    const salt = this.configService.get<string>('BCRYPT_SALT');
    return await bcrypt.hash(text, parseInt(salt));
  }

  async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
