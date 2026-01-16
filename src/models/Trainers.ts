import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

export interface ITrainers {
  id: string;
  license_level: string;
  specialty: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}

interface TrainersCreationAttributes extends Optional<ITrainers, "id"> {}

export class Trainers extends Model<ITrainers, TrainersCreationAttributes>
  implements ITrainers {
  public id!: string;
  public license_level!: string;
  public specialty!: string;
  public user_id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function TrainersModel(sequelize: Sequelize) {
  Trainers.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      license_level: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      specialty: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "trainers",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return Trainers;
}
