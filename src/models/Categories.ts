
import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface ICategories {
  id: string; // UUID
  name: string;
  min_age: number;
  max_age: number;
  created_at?: Date;
  updated_at?: Date;
}

interface CategoriesCreationAttributes
  extends Optional<ICategories, "id"> {}

export class Categories
  extends Model<ICategories, CategoriesCreationAttributes>
  implements ICategories
{
  public id!: string;
  public name!: string;
  public min_age!: number;
  public max_age!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function CategoriesModel(sequelize: Sequelize) {
  Categories.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      min_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      max_age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "categories",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

  return Categories;
}