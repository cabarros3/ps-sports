import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface IStaff {
    id: number;
    hire_date: Date;
    USR_ID: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface StaffCreationAttributes extends Optional<IStaff, "id"> {}

export class Staff 
    extends Model<IStaff, StaffCreationAttributes> 
    implements IStaff
{
    public id!: number;
    public hire_date!: Date;
    public USR_ID!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Staff.belongsTo(models.Users, {
            foreignKey: "USR_ID",
            targetKey: "USR_ID",
            as: "user"
        });
    }
}

export default function StaffModel(sequelize: Sequelize) {
    Staff.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            hire_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            USR_ID: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "USERS",
                    key: "USR_ID",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        },
        {
            sequelize,
            tableName: "staff",
            timestamps: true,
            underscored: true,
        }
    );
    return Staff;
}
