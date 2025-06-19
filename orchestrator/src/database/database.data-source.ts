import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.env.development' });

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: process.env.DATABASE_SCHEMA,
  entities: [],
  migrations: [],
  synchronize: false,
  migrationsRun: false,
  logging: true,
});
