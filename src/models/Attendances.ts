import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IAttendances {
  id: number;
  class_date: Date;
  status: number;
  enrollment_id: number;
}

interface AttendancesCreationAttributes extends Optional<IAttendances, "id"> {}

export class Attendances
  extends Model<IAttendances, AttendancesCreationAttributes>
  implements IAttendances {
  public id!: number;
  public class_date!: Date;
  public status!: number;
  public enrollment_id!: number;
}

const AttendancesModel = (sequelize: Sequelize) => {
  Attendances.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      class_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enrollment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "attendances",
      timestamps: false,
    },
  );

  return Attendances;
};

export default AttendancesModel;
