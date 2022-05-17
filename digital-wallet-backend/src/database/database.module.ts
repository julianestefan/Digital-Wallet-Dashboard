import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

const connectionOptions: TypeOrmModuleOptions = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL + '?sslmode=require',
    }
  : {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

const options: TypeOrmModuleOptions = {
  ...connectionOptions,
  synchronize: true,
  entities: [User],
};

@Module({ imports: [TypeOrmModule.forRoot(options)] })
export class DatabaseModule {}
