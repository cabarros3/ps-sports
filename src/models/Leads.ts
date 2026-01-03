import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface ILeads {
  LDS_ID: string;
  LD_NAME: string;
  LDS_EMAIL: string;
  LDS_PHONE: string;
  LDS_ENTRY_DATE: Date;
  LDS_SOURCE: string;
  LDS_STATUS:
    | "Novo"
    | "Em contato"
    | "Agendado"
    | "Convertido"
    | "Desqualificado";
  LDS_MAGIC_TOKEN: string;
  LDS_MAGIC_EXPIRES_AT: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface LeadsCreationAttributes extends Optional<ILeads, "LDS_ID"> {}

export class Leads
  extends Model<ILeads, LeadsCreationAttributes>
  implements ILeads
{
  public LDS_ID!: string;
  public LD_NAME!: string;
  public LDS_EMAIL!: string;
  public LDS_PHONE!: string;
  public LDS_ENTRY_DATE!: Date;
  public LDS_SOURCE!: string;
  public LDS_STATUS!:
    | "Novo"
    | "Em contato"
    | "Agendado"
    | "Convertido"
    | "Desqualificado";
  public LDS_MAGIC_TOKEN!: string;
  public LDS_MAGIC_EXPIRES_AT!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

export default function LeadsModel(sequelize: Sequelize) {
  Leads.init(
    {
      LDS_ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      LD_NAME: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LDS_EMAIL: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      LDS_PHONE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LDS_ENTRY_DATE: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      LDS_SOURCE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LDS_STATUS: {
        type: DataTypes.ENUM(
          "Novo",
          "Em contato",
          "Agendado",
          "Convertido",
          "Desqualificado"
        ),
        defaultValue: "Novo",
      },
      LDS_MAGIC_TOKEN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LDS_MAGIC_EXPIRES_AT: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "LEADS",
      paranoid: true,
      underscored: false,
      createdAt: "LDS_CREATED_AT",
      updatedAt: "LDS_UPDATED_AT",
      deletedAt: "LDS_DELETED_AT",
    }
  );

  return Leads;
}
