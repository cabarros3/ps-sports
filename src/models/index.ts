import sequelize from "../config/config.ts";
import UsersModel from "./Users.ts";
import LeadsModel from "./Leads.ts";
<<<<<<< HEAD

=======
import CategoriesModel from "./Categories.ts";
import ModalitiesModel from "./Modalities.ts";
import AttendancesModel from "./Attendances.ts";

const Attendances = AttendancesModel(sequelize);
const Categories = CategoriesModel(sequelize);
const Modalities = ModalitiesModel (sequelize);
>>>>>>> attendances_modalities_categories
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

<<<<<<< HEAD
export { Leads, Users };
=======
export { Leads, Users , Attendances, Categories, Modalities };
>>>>>>> attendances_modalities_categories
