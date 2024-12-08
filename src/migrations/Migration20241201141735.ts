import { Migration } from '@mikro-orm/migrations';

export class Migration20241201141735 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`public_id\` varchar not null, \`activated\` bool not null default true, \`name\` varchar not null, \`profile\` text check (\`profile\` in ('ADMIN', 'COMPANY', 'EMPLOYEE')) not null, \`email\` varchar not null, \`password\` varchar not null, \`updated_at\` datetime not null, \`created_at\` datetime not null);`);
    this.addSql(`create unique index \`user_public_id_unique\` on \`user\` (\`public_id\`);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);

    this.addSql(`create table \`time_clock\` (\`id\` integer not null primary key autoincrement, \`public_id\` varchar not null, \`moment\` timestamp not null, \`type\` text check (\`type\` in ('clockIn', 'clockOut')) not null, \`latitude\` varchar null, \`longitude\` varchar null, \`user_id\` integer not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, constraint \`time_clock_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade);`);
    this.addSql(`create unique index \`time_clock_public_id_unique\` on \`time_clock\` (\`public_id\`);`);
    this.addSql(`create index \`time_clock_user_id_index\` on \`time_clock\` (\`user_id\`);`);
  }

}
