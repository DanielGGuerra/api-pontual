import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Profile, User } from '../src/app/user/entities/user.entity';

import * as bcrypt from 'bcrypt';

export class UsersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const userAdmin = em.create(User, {
      activated: true,
      email: 'danielgguerra2@gmail.com.br',
      profile: Profile.ADMIN,
      name: 'Daniel Guerra',
      password: bcrypt.hashSync('123', process.env.BCRYPT_SALT ?? 12),
    });
    await em.insert(User, userAdmin);
  }
}
