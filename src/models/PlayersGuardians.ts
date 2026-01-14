import { DataTypes, Model, Sequelize } from "sequelize";

interface IPlayersGuardians {
  id: number;
  player_id: number;
  guardian_id: number;
}

interface PlayersGuardiansCreationAttributes
  extends Partial<IPlayersGuardians> {}

export class PlayersGuardians
  extends Model<IPlayersGuardians, PlayersGuardiansCreationAttributes>
  implements IPlayersGuardians
{
  public id!: number;
  public player_id!: number;
  public guardian_id!: number;
}

export default function PlayersGuardiansModel(sequelize: Sequelize) {
  PlayersGuardians.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "players",
          key: "id",
        },
      },
      guardian_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "guardians",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "players_guardians",
      timestamps: false,
      underscored: true,
    }
  );

  return PlayersGuardians;
}
