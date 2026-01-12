import sequelize from "../config/config.ts";
import UsersModel from "./Users.ts";
import LeadsModel from "./Leads.ts";
import AddressesModel from "./Addresses.ts";
import ClassesModel from "./Classes.ts";
import PlayersModel from "./Players.ts";

const Users = UsersModel(sequelize);
const Leads = LeadsModel(sequelize);
const Addresses = AddressesModel(sequelize);
const Classes = ClassesModel(sequelize);
const Players = PlayersModel(sequelize);

async function syncDatabase() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log("Error: " + (error as Error).message);
  }
}

syncDatabase();

export { Addresses, Classes, Leads, Players, Users };
