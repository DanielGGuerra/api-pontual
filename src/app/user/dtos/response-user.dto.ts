import { IsNotEmpty } from 'class-validator';
import { Profile, User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  activated: boolean;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Profile })
  @IsNotEmpty()
  profile: Profile;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: Date })
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
