import { IsNotEmpty } from 'class-validator';
import { Profile, User } from '../entities/user.entity';

export class ResponseUserDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  activated: boolean;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  profile: Profile;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  createdAt: string;

  constructor(user: User) {
    this.id = user.publicId;
    this.name = user.name;
    this.profile = user.profile;
    this.email = user.email;
    this.createdAt = user.createdAt.toISOString();
  }
}
