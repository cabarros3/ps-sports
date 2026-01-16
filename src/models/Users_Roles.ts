import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IUsersRoles {
  id: string;
  user_id: string;
  role_id: string;
}

interface UsersRolesCreationAttributes extends Optional<IUsersRoles, "id"> {}

export class UsersRoles extends Model<IUsersRoles, UsersRolesCreationAttributes>
  implements IUsersRoles {
  public id!: string;
  public user_id!: string;
  public role_id!: string;
}

export default function UsersRolesModel(sequelize: Sequelize) {
  UsersRoles.init(
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
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "roles", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "users_roles",
      timestamps: false,
    },
  );

  return UsersRoles;
}
