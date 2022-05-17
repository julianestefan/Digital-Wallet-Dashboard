import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [User],
  ssl: process.env.NODE_ENV === 'production'
};

console.log(options);

@Module({ imports: [TypeOrmModule.forRoot(options)] })
export class DatabaseModule {}
