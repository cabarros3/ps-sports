import sequelize from "../config/config.ts";
import UsersModel from "./Users.ts";
import LeadsModel from "./Leads.ts";
import AddressesModel from "./Addresses.ts";
import ClassesModel from "./Classes.ts";
import PlayersModel from "./Players.ts";
import TrainersModel from "./Trainers.ts";
import UsersRolesModel from "./Users_Roles.ts";
import CategoriesModel from "./Categories.ts";
import ModalitiesModel from "./Modalities.ts";
import AttendancesModel from "./Attendances.ts";
import PhonesModel from "./Phones.ts";
import StaffsModel from "./Staffs.ts";
import SchoolsModel from "./Schools.ts";

const Attendances = AttendancesModel(sequelize);
const Categories = CategoriesModel(sequelize);
const Modalities = ModalitiesModel(sequelize);
const Users = UsersModel(sequelize);
const Leads = LeadsModel(sequelize);
const Addresses = AddressesModel(sequelize);
const Classes = ClassesModel(sequelize);
const Players = PlayersModel(sequelize);
const Trainers = TrainersModel(sequelize);
const UsersRoles = UsersRolesModel(sequelize);
const Phones = PhonesModel(sequelize);
const Staffs = StaffsModel(sequelize);
const Schools = SchoolsModel(sequelize);

// ---- Relações ----

// 1:1 -> Um Usuário pode ter um Perfil de Treinador
Users.hasOne(Trainers, {
  foreignKey: "user_id",
  as: "trainer_profile",
});

// 1:1 -> Um Treinador pertence a um Usuário
Trainers.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // incluir o alter??
  } catch (error) {
    console.log("Error: " + (error as Error).message);
  }
}

syncDatabase();

export {
  Addresses,
  Attendances,
  Categories,
  Classes,
  Leads,
  Modalities,
  Phones,
  Players,
  Schools,
  sequelize,
  Staffs,
  Trainers,
  Users,
  UsersRoles,
};
