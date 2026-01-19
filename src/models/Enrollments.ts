import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IEnrollments {
  id: number;
  entry_date: Date;
  status: "Ativo" | "Inativo" | "Pendente" | "Cancelado";
  player_id: number;
  class_id: number;
}

interface EnrollmentsCreationAttributes extends Optional<IEnrollments, "id"> {}

export class Enrollments
  extends Model<IEnrollments, EnrollmentsCreationAttributes>
  implements IEnrollments {
  public id!: number;
  public entry_date!: Date;
  public status!: "Ativo" | "Inativo" | "Pendente" | "Cancelado";
  public player_id!: number;
  public class_id!: number;
}

export default function EnrollmentsModel(sequelize: Sequelize) {
  Enrollments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      entry_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM("Ativo", "Inativo", "Pendente", "Cancelado"),
        allowNull: false,
        defaultValue: "Pendente",
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "players",
          key: "id",
        },
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "classes",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "enrollments",
      timestamps: false,
    },
  );
  return Enrollments;
}
