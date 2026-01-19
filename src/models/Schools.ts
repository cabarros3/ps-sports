import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface ISchools {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface SchoolCreationAttributes extends Optional<ISchools, "id"> {}

export class Schools extends Model<ISchools, SchoolCreationAttributes>
  implements ISchools {
  public id!: string;
  public name!: string;
  public address!: string;
  public phone!: string;
}

export default function SchoolsModel(sequelize: Sequelize) {
  Schools.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
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
      timestamps: false,
      underscored: true,
    },
  );

  return Schools;
}
