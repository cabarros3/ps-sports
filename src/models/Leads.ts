import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface ILeads {
  id: string;
  name: string;
  email: string;
  phone: string;
  entry_date: Date;
  source: string;
  status:
    | "Novo"
    | "Em contato"
    | "Agendado"
    | "Convertido"
    | "Desqualificado";
  magic_token: string;
  magic_expires_at: Date;
  //createdAt: Date;
  //updatedAt?: Date;
  //deletedAt?: Date;
}

interface LeadsCreationAttributes extends Optional<ILeads, "id"> {}

export class Leads extends Model<ILeads, LeadsCreationAttributes>
  implements ILeads {
  public id!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public entry_date!: Date;
  public source!: string;
  public status!:
    | "Novo"
    | "Em contato"
    | "Agendado"
    | "Convertido"
    | "Desqualificado";
  public magic_token!: string;
  public magic_expires_at!: Date;

  //public readonly createdAt!: Date;
  //public readonly updatedAt!: Date;
  //public readonly deletedAt!: Date;
}

export default function LeadsModel(sequelize: Sequelize) {
  Leads.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entry_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "Novo",
          "Em contato",
          "Agendado",
          "Convertido",
          "Desqualificado",
        ),
        defaultValue: "Novo",
      },
      magic_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      magic_expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "leads",
      //paranoid: true,
      underscored: false,
      //createdAt: "created_at",
      //updatedAt: "updated_at",
      //deletedAt: "deleted_at",
    },
  );

  return Leads;
}
