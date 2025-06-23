import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { AddressEntity } from 'src/entities/address.entity';
import { CompanyEntity } from 'src/entities/company.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Migrations1750456269593 } from './1750456269593-migrations';

config({ path: '.env.development' });

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  schema: process.env.DATABASE_SCHEMA,
  entities: [AddressEntity, CompanyEntity, UserEntity],
  migrations: [Migrations1750456269593],
  synchronize: false,
  migrationsRun: false,
  logging: true,
});
