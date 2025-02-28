import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Address } from './entity/Address';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Address],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
