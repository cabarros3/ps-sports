import sequelize from "../config/config.ts";
import UsersModel from "./Users.ts";
import LeadsModel from "./Leads.ts";

const Users = UsersModel(sequelize);
const Leads = LeadsModel(sequelize);

async function syncDatabase() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log("Error: " + (error as Error).message);
  }
}

syncDatabase();

export { Leads, Users, sequelize };