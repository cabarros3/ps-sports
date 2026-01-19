import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IRoles {
  id: number;
  name: string;
  description: string;
}

interface RolesCreationAttributes extends Optional<IRoles, "id"> {}

export class Roles extends Model<IRoles, RolesCreationAttributes>
  implements IRoles {
  public id!: number;
  public name!: string;
  public description!: string;
}

export default function RolesModel(sequelize: Sequelize) {
  Roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "roles",
      timestamps: false,
    },
  );
  return Roles;
}
