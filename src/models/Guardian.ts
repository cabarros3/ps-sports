import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../models/index.ts'; // Verifique se o caminho da conexão está correto conforme seu projeto

export class Guardian extends Model {
  public gua_id!: number;
  public gua_usr_id!: number;
  public gua_name!: string;
  public gua_cpf!: string;
  public gua_phone!: string;
  public gua_email!: string;
}

Guardian.init({
  gua_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  gua_usr_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gua_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gua_cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  gua_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gua_email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'guardians',
  timestamps: true,
});