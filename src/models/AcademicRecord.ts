import { DataTypes, Model, Sequelize } from "sequelize";
import type { Optional } from "sequelize";

interface IAcademicRecords {
  id: string;
  year: Date;
  semester: number;
  status: string;
  enrollment_id: string;
}

interface AcCreationAttributes extends Optional<IAcademicRecords, "id"> {}

export class AcademicRecords
  extends Model<IAcademicRecords, AcCreationAttributes>
  implements IAcademicRecords
{
  public id!: string;
  public year!: Date;
  public semester!: number;
  public status!: string;
  public enrollment_id!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

export default function AcademicRecordsModel(sequelize: Sequelize) {
  AcademicRecords.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      year: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      enrollment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "enrollment",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      tableName: "academic_records",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return AcademicRecords;
}
