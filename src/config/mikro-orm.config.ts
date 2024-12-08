import { Options } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

export default {
  entities: ['./dist/**/*.entity.{js,ts}'],
  entitiesTs: ['./src/**/*.entity.{js,ts}'],
  dbName: 'pontual.sqllite3',
  driver: SqliteDriver,
} as Options;
