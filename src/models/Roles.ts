import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IRoles {
  id: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

interface RolesCreationAttributes extends Optional<IRoles, "id"> {}

export class Roles
  extends Model<IRoles, RolesCreationAttributes>
  implements IRoles
{
  public id!: string;
  public name!: string;
  public description!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function RolesModel(sequelize: Sequelize) {
  Roles.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Roles;
}
