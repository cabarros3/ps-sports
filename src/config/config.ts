import { ConnectionRefusedError, Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

const [host, username, password, database, port] = [
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_SCHEMA,
  Number(process.env.DB_PORT),
];

const sequelize = new Sequelize({
  host: process.env.DB_HOST ?? "127.0.0.1",
  dialect: "mysql",
  username: process.env.DB_USER ?? "ps_sport",
  password: process.env.DB_PASSWORD ?? "ps_sport",
  database: process.env.DB_SCHEMA ?? "ps_sport",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
  retry: {
    match: [ConnectionRefusedError],
    max: 5,
  },
});


export default sequelize;
