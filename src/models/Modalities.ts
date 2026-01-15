import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IModalities {
  id: number;
  name: string;
}

interface ModalitiesCreationAttributes
  extends Optional<IModalities, "id"> {}

export class Modalities
  extends Model<IModalities, ModalitiesCreationAttributes>
  implements IModalities
{
  public id!: number;
  public name!: string;
}

export default function ModalitiesModel(sequelize: Sequelize) {
  Modalities.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "modalities",
      timestamps: false, 
    },
  );

  return Modalities;
}