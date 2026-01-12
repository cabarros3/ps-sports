import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IAddresses {
  id: number;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  user_id: string;
}

interface AddressesCreationAttributes extends Optional<IAddresses, "id"> {}

export class Addresses extends Model<IAddresses, AddressesCreationAttributes>
  implements IAddresses {
  public id!: number;
  public street!: string;
  public number!: string;
  public complement!: string;
  public neighborhood!: string;
  public city!: string;
  public state!: string;
  public zipcode!: string;
  public user_id!: string;
}

export default function AddressesModel(sequelize: Sequelize) {
  Addresses.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "addresses",
      underscored: false,
    },
  );

  return Addresses;
}
