import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface ISchools {
  id: number;
  name: string;
  address: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SchoolCreationAttributes extends Optional<ISchools, "id"> {}

export class Schools extends Model<ISchools, SchoolCreationAttributes>
  implements ISchools {
  public id!: number;
  public name!: string;
  public address!: string;
  public phone!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function SchoolsModel(sequelize: Sequelize) {
  Schools.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "schools",
      timestamps: true,
      underscored: true,
    },
  );

  return Schools;
}
