import { Options } from '@mikro-orm/core';
import { SeedManager } from '@mikro-orm/seeder';
import { SqliteDriver } from '@mikro-orm/sqlite';

export default {
  entities: ['./dist/**/*.entity.{js,ts}'],
  entitiesTs: ['./src/**/*.entity.{js,ts}'],
  dbName: 'pontual.sqllite3',
  driver: SqliteDriver,
  extensions: [SeedManager],
  ignoreUndefinedInQuery: true,
  seeder: {
    path: './seeders',
    pathTs: undefined,
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
} as Options;
