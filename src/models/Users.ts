import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IUsers {
  id: string; // Alterado para string (UUID)
  name: string;
  birth_date: Date;
  rg?: string;
  cpf: string;
  email: string;
  password?: string;
  status: "Ativo" | "Inativo";
  created_at?: Date;
  updated_at?: Date;
}

interface UsersCreationAttributes extends Optional<IUsers, "id"> {}

export class Users extends Model<IUsers, UsersCreationAttributes>
  implements IUsers {
  public id!: string;
  public name!: string;
  public birth_date!: Date;
  public rg?: string;
  public cpf!: string;
  public email!: string;
  public password?: string;
  public status!: "Ativo" | "Inativo";

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function UsersModel(sequelize: Sequelize) {
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      rg: {
        type: DataTypes.STRING(9),
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(45),
        defaultValue: "Ativo",
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return Users;
}
