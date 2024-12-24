import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Profile } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({ enum: Profile })
  @IsNotEmpty()
  @IsEnum(Profile)
  profile: Profile;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
