import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";
interface IAuth {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_at: Date;
  created_at?: Date;
  updated_at?: Date;
}
interface AuthCreationAttributes extends Optional<IAuth, "id"> {}
export class Auth
  extends Model<IAuth, AuthCreationAttributes>
  implements IAuth
{
  public id!: string;
  public user_id!: string;
  public refresh_token!: string;
  public expires_at!: Date;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}
export default function AuthModel(sequelize: Sequelize) {
  Auth.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      refresh_token: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "auth_tokens",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Auth;
}
