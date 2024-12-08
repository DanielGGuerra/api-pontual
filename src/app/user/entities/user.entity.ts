import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import * as nanoid from 'nanoid';
import { TimeClock } from '../../time-clock/entities/time-clock.entity';

export enum Profile {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  EMPLOYEE = 'EMPLOYEE',
}

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true, columnType: 'int' })
  id!: number;

  @Property({
    unique: true,
    columnType: 'varchar',
    length: 100,
  })
  publicId: string = nanoid.nanoid();

  @Property({ columnType: 'bool', default: true })
  activated!: boolean;

  @Property({ columnType: 'varchar', length: 100 })
  name!: string;

  @Enum(() => Profile)
  profile!: Profile;

  @Property({
    unique: true,
    columnType: 'varchar',
    length: 100,
  })
  email!: string;

  @OneToMany(() => TimeClock, (timeClock) => timeClock.user)
  timeClocks = new Collection<TimeClock>(this);

  @Property({ columnType: 'varchar', length: 300 })
  password!: string;

  @Property({ columnType: 'datetime', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ columnType: 'datetime', onCreate: () => new Date() })
  createdAt: Date = new Date();
}
