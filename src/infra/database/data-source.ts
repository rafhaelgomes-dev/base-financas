import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  migrations: [`${__dirname}/migrations/**/*.ts`],
  synchronize: false,
  migrationsTableName: "migrations",
})

export default dataSource;