import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

const generalOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
};

const productionOptions: TypeOrmModuleOptions = {
  ssl: { rejectUnauthorized: false },
};

const options =
  process.env.NODE_ENV === 'production'
    ? { ...generalOptions, ...productionOptions }
    : generalOptions;

@Module({ imports: [TypeOrmModule.forRoot(options)] })
export class DatabaseModule {}
