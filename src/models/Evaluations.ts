import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IEvaluations {
  id: string;
  date: Date;
  score: number;
  notes: string;
  trainer_id: string; // se trainers for number alterar
  academic_id: string; // se for number alterar
}

interface EvaluationsCreationAttributes extends Optional<IEvaluations, "id"> {}

export class Evaluations
  extends Model<IEvaluations, EvaluationsCreationAttributes>
  implements IEvaluations
{
  public id!: string;
  public date!: Date;
  public score!: number;
  public notes!: string;
  public trainer_id!: string;
  public academic_id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function EvaluationsModel(sequelize: Sequelize) {
  Evaluations.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trainer_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "trainers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      academic_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "academic_records",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "evaluations",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Evaluations;
}
