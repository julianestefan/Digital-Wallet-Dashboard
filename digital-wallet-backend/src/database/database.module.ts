import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from 'src/user/user.entity';
console.log( 'hola', join(__dirname, '..', '**', '*.entity.js'))
const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ["dist/**/*.entity.{ts,js}"],
  ssl: process.env.NODE_ENV === 'production',
  extra:
    process.env.NODE_ENV === 'production'
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
};


@Module({ imports: [TypeOrmModule.forRoot(options)] })
export class DatabaseModule {}
