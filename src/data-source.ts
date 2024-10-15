import { DataSource } from 'typeorm';
import { Users } from './user/user.entity'; 

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'letmein1',
  database: 'nuacem',
  entities: [Users],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});
