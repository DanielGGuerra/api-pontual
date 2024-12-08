import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { nanoid } from 'nanoid';
import { User } from '../../user/entities/user.entity';

export enum TypeTimeClock {
  in = 'clockIn',
  out = 'clockOut',
}

@Entity()
export class TimeClock {
  @PrimaryKey({ autoincrement: true, columnType: 'int' })
  id!: number;

  @Property({ unique: true, columnType: 'varchar', length: 100 })
  publicId: string = nanoid();

  @Property({ columnType: 'timestamp' })
  moment!: Date;

  @Enum(() => TypeTimeClock)
  type!: TypeTimeClock;

  @Property({ columnType: 'varchar', length: 20, nullable: true })
  latitude: string;

  @Property({ columnType: 'varchar', length: 20, nullable: true })
  longitude: string;

  @ManyToOne(() => User)
  user: User;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
