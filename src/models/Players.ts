import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IPlayers {
  id: number;
  weight: number;
  height: number;
  primary_position: string;
  second_position: string;
  dominant_foot: string;
  entry_date: Date;
  sport_status: string;
  notes: string;
  user_id: string;
  school_id: string;
}

interface PlayersCreationAttributes extends Optional<IPlayers, "id"> {}

export class Players extends Model<IPlayers, PlayersCreationAttributes>
  implements IPlayers {
  public id!: number;
  public weight!: number;
  public height!: number;
  public primary_position!: string;
  public second_position!: string;
  public dominant_foot!: string;
  public entry_date!: Date;
  public sport_status!: string;
  public notes!: string;
  public user_id!: string;
  public school_id!: string;
}

export default function PlayersModel(sequelize: Sequelize) {
  Players.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      height: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      primary_position: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      second_position: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      dominant_foot: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      entry_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      sport_status: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      school_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "players",
      underscored: false,
      timestamps: false,
    },
  );

  return Players;
}
