import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IEnrollments {
  id: string;
  entry_date: Date;
  status: "Ativo" | "Inativo" | "Pendente" | "Cancelado";
  player_id: string;
  class_id: string;
  created_at?: Date;
  updated_at?: Date;
}

interface EnrollmentsCreationAttributes extends Optional<IEnrollments, "id"> {}

export class Enrollments
  extends Model<IEnrollments, EnrollmentsCreationAttributes>
  implements IEnrollments
{
  public id!: string;
  public entry_date!: Date;
  public status!: "Ativo" | "Inativo" | "Pendente" | "Cancelado";
  public player_id!: string;
  public class_id!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function EnrollmentsModel(sequelize: Sequelize) {
  Enrollments.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "players",
          key: "id",
        },
      },
      class_id: {
        type: DataTypes.UUID,
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
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Enrollments;
}
