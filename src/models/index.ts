import sequelize from "../config/config.ts";
import UsersModel from "./Users.ts";
import LeadsModel from "./Leads.ts";
import UsersRolesModel from "./Users_Roles.ts";

const Users = UsersModel(sequelize);
const Leads = LeadsModel(sequelize);
const UsersRoles = UsersRolesModel(sequelize);

async function syncDatabase() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log("Error: " + (error as Error).message);
  }
}

syncDatabase();

export { Leads, Users, UsersRoles };
