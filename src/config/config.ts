import { ConnectionRefusedError, Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

const [host, username, password, database, port] = [
  process.env.MYSQL_HOST,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  process.env.MYSQL_DATABASE,
  Number(process.env.MYSQL_PORT),
];

const sequelize = new Sequelize({
  host: host || "localhost",
  dialect: "mysql",
  username: username || "ps_sport",
  password: password || "ps_sport",
  database: database || "ps_sport",
  port: port || 3306,
  retry: {
    match: [ConnectionRefusedError],
    max: 5,
  },
});

export default sequelize;
