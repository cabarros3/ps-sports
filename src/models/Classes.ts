import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IClasses {
  id: number;
  name: string;
  weekdays: string;
  schedule: Date;
  status:
    | "Novo"
    | "Em contato"
    | "Agendado"
    | "Convertido"
    | "Desqualificado";
  modality_id: number;
  category_id: string;
  trainer_id: number;
}

interface ClassesCreationAttributes extends Optional<IClasses, "id"> {}

export class Classes extends Model<IClasses, ClassesCreationAttributes>
  implements IClasses {
  public id!: number;
  public name!: string;
  public weekdays!: string;
  public schedule!: Date;
  public status!:
    | "Novo"
    | "Em contato"
    | "Agendado"
    | "Convertido"
    | "Desqualificado";
  public modality_id!: number;
  public category_id!: string;
  public trainer_id!: number;
}

export default function ClassesModel(sequelize: Sequelize) {
  Classes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      weekdays: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      schedule: {
        type: DataTypes.DATE,
        allowNull: false,
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
      modality_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.UUIDV4,
        allowNull: true,
      },
      trainer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "classes",
      underscored: false,
      timestamps: false,
    },
  );

  return Classes;
}
