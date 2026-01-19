import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IStaff {
  id: number;
  hire_date: Date;
  user_id: string;
}

interface StaffCreationAttributes extends Optional<IStaff, "id"> {}

export class Staff extends Model<IStaff, StaffCreationAttributes>
  implements IStaff {
  public id!: number;
  public hire_date!: Date;
  public user_id!: string;
}

export default function StaffModel(sequelize: Sequelize) {
  Staff.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "staff",
      timestamps: false,
      underscored: true,
    },
  );
  return Staff;
}
