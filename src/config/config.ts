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
<<<<<<< HEAD
  host: host || "localhost",
  dialect: "mysql",
  username: username || "ps_sport",
  password: password || "ps_sport",
  database: database || "ps_sport",
  port: port || 3306,
=======
  host: process.env.DB_HOST ?? "127.0.0.1",
  dialect: "mysql",
  username: process.env.DB_USER ?? "ps_sport",
  password: process.env.DB_PASSWORD ?? "ps_sport",
  database: process.env.DB_SCHEMA ?? "ps_sport",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307,
>>>>>>> attendances_modalities_categories
  retry: {
    match: [ConnectionRefusedError],
    max: 5,
  },
});

<<<<<<< HEAD
=======

>>>>>>> attendances_modalities_categories
export default sequelize;
