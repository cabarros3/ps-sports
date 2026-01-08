import sequelize from "../config/config.ts";
import UsersModel from "./Users.ts";
import LeadsModel from "./Leads.ts";
import PhonesModel from "./Phones.ts";
import StaffsModel from "./Staffs.ts";
import SchoolsModel from "./Schools.ts";

const Users = UsersModel(sequelize);
const Leads = LeadsModel(sequelize);
const Phones = PhonesModel(sequelize);
const Staffs = StaffsModel(sequelize);
const Schools = SchoolsModel(sequelize);

Phones.associate({ Users });
Staffs.associate({ Users });

async function syncDatabase() {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log("Error: " + (error as Error).message);
  }
}

syncDatabase();

export { Leads, Users, Phones, Staffs, Schools };
