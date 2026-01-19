import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IPhones {
  id: number;
  number: string;
  user_id: string;
}

interface PhoneCreationAttributes extends Optional<IPhones, "id"> {}

export class Phones extends Model<IPhones, PhoneCreationAttributes>
  implements IPhones {
  public id!: number;
  public number!: string;
  public user_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function PhoneModel(sequelize: Sequelize) {
  Phones.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "USERS",
          key: "user_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "phones",
      timestamps: false,
      underscored: true,
    },
  );

  return Phones;
}
