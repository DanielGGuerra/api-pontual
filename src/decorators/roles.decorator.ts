import { SetMetadata } from '@nestjs/common';
import { Profile } from 'src/app/user/entities/user.entity';

export const PROFILES_KEY = 'profiles';
export const Profiles = (...profiles: Profile[]) =>
  SetMetadata(PROFILES_KEY, profiles);
