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
import AcademicRecordsModel from "./AcademicRecord.ts";
import EvaluationsModel from "./Evaluations.ts";
import GuardianModel from "./Guardian.ts";
import PerformanceModel from "./Performance.ts";
import EnrollmentsModel from "./Enrollments.ts";
import PlayersGuardiansModel from "./PlayersGuardians.ts";
import RolesModel from "./Roles.ts";

const Attendances = AttendancesModel(sequelize);
const AcademicRecords = AcademicRecordsModel(sequelize);
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
const Evaluations = EvaluationsModel(sequelize);
const Guardians = GuardianModel(sequelize);
const Performances = PerformanceModel(sequelize);
const Enrollments = EnrollmentsModel(sequelize);
const PlayersGuardians = PlayersGuardiansModel(sequelize);
const Roles = RolesModel(sequelize);

// ---- Relações ----

// Users --> Phones (1:N)
Users.hasMany(Phones, {
  foreignKey: "user_id",
  as: "phones",
});

// Users --> Addresses (1:N)
Users.hasMany(Addresses, {
  foreignKey: "user_id",
  as: "addresses",
});

// Users --> Roles [UsersRoles] (N:M)
Users.belongsToMany(Roles, {
  through: UsersRoles,
  foreignKey: "user_id",
  as: "roles",
});

// Users --> Players (1:1)
Users.hasOne(Players, {
  foreignKey: "user_id",
  as: "player",
});

Players.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// Users <--> Trainers (1:1)
Users.hasOne(Trainers, {
  foreignKey: "user_id",
  as: "trainer",
});

Trainers.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// Users --> Staff (1:1)
Users.hasOne(Staffs, {
  foreignKey: "user_id",
  as: "staff",
});

Staffs.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user",
});

// Players --> Guardians [PlayersGuardians] (N:M)
Players.belongsToMany(Guardians, {
  through: PlayersGuardians,
  foreignKey: "player_id",
  as: "guardians",
});

// Schools --> Players (1:N)
Schools.hasMany(Players, {
  foreignKey: "school_id",
  as: "players",
});

// Modalities --> Classes (1:N)
Modalities.hasMany(Classes, {
  foreignKey: "modality_id",
  as: "classes",
});

// Categories --> Classes (1:N)
Categories.hasMany(Classes, {
  foreignKey: "category_id",
  as: "classes",
});

// Trainers --> Classes (1:N)
Trainers.hasMany(Classes, {
  foreignKey: "trainer_id",
  as: "classes",
});

// Players --> Classes [Enrollments] (N:M)
Players.belongsToMany(Classes, {
  through: Enrollments,
  foreignKey: "player_id",
  as: "classes",
});

// Classes --> Players [Enrollments] (N:M)
Classes.belongsToMany(Players, {
  through: Enrollments,
  foreignKey: "class_id",
  as: "players",
});

// Enrollments --> Attendances (1:N)
Enrollments.hasMany(Attendances, {
  foreignKey: "enrollment_id",
  as: "attendances",
});

// Enrollments --> AcademicRecords (1:N)
Enrollments.hasMany(AcademicRecords, {
  foreignKey: "enrollment_id",
  as: "academicRecords",
});

// AcademicRecords --> Evaluations (1:N)
AcademicRecords.hasMany(Evaluations, {
  foreignKey: "academic_id",
  as: "evaluations",
});

// AcademicRecords --> Performances (1:N)
AcademicRecords.hasMany(Performances, {
  foreignKey: "academic_id",
  as: "performances",
});

// Trainers --> Evaluations (1:N)
Trainers.hasMany(Evaluations, {
  foreignKey: "trainer_id",
  as: "evaluations",
});

// Trainers --> Performances (1:N)
Trainers.hasMany(Performances, {
  foreignKey: "trainer_id",
  as: "performances",
});

async function syncDatabase() {
  try {
    await sequelize.sync(); // incluir o alter??
  } catch (error) {
    console.log("Error: " + (error as Error).message);
  }
}

syncDatabase();

export {
  AcademicRecords,
  Addresses,
  Attendances,
  Categories,
  Classes,
  Enrollments,
  Evaluations,
  Guardians,
  Leads,
  Modalities,
  Performances,
  Phones,
  Players,
  PlayersGuardians,
  Roles,
  Schools,
  Staffs,
  Trainers,
  Users,
  UsersRoles,
};
