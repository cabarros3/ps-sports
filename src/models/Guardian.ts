import { DataTypes, Model, Sequelize } from "sequelize";

export class Guardian extends Model {
  public id!: number;
  public kinship!: string;
  public user_id!: string;
}

export default function GuardianModel(sequelize: Sequelize) {
  Guardian.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kinship: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: "guardians",
    timestamps: false,
  });

  return Guardian;
}
