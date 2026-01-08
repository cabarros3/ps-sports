import { Model, Optional, Sequelize, DataTypes } from "sequelize";

interface IPhones {
    id: number;
    number: string;
    USR_ID: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface PhoneCreationAttributes extends Optional<IPhones, "id"> {}

export class Phones 
    extends Model<IPhones, PhoneCreationAttributes> 
    implements IPhones 
{
    public id!: number;
    public number!: string;
    public USR_ID!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Phones.belongsTo(models.Users, {
            foreignKey: "USR_ID",
            targetKey: "USR_ID",
            as: "user"
        });
    }
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
            tableName: "phones",
            timestamps: true,
            underscored: true,
        }
    );

    return Phones;
}