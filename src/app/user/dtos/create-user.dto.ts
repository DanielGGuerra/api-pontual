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

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEnum(Profile)
  profile: Profile;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
