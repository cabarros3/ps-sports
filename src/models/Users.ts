import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface IUsers {
  USR_ID: string; // Alterado para string (UUID)
  USR_NAME: string;
  USR_BIRTH_DATE: Date;
  USR_RG?: string;
  USR_CPF: string;
  USR_EMAIL: string;
  USR_PASSWORD?: string;
  USR_STATUS: "Ativo" | "Inativo";
  USR_CREATED_AT?: Date;
  USR_UPDATED_AT?: Date;
}

interface UsersCreationAttributes extends Optional<IUsers, "USR_ID"> {}

export class Users
  extends Model<IUsers, UsersCreationAttributes>
  implements IUsers
{
  public USR_ID!: string;
  public USR_NAME!: string;
  public USR_BIRTH_DATE!: Date;
  public USR_RG!: string;
  public USR_CPF!: string;
  public USR_EMAIL!: string;
  public USR_PASSWORD!: string;
  public USR_STATUS!: "Ativo" | "Inativo";

  public readonly USR_CREATED_AT!: Date;
  public readonly USR_UPDATED_AT!: Date;
}

export default function UsersModel(sequelize: Sequelize) {
  Users.init(
    {
      USR_ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      USR_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      USR_BIRTH_DATE: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      USR_RG: {
        type: DataTypes.STRING(9),
        allowNull: true,
      },
      USR_CPF: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      USR_EMAIL: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      USR_PASSWORD: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      USR_STATUS: {
        type: DataTypes.STRING(45),
        defaultValue: "Ativo",
      },
    },
    {
      sequelize,
      tableName: "USERS",
      timestamps: true,
      createdAt: "USR_CREATED_AT",
      updatedAt: "USR_UPDATED_AT",
      underscored: false,
    }
  );

  return Users;
}
