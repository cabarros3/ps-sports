import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface IPerformances {
  id: string;
  criteria: string;
  observation: string;
  level: number;
  trainer_id: string;
  academic_id: string;
}


type PerformanceCreationAttributes = Optional<IPerformances, "id">;

export class Performances
  extends Model<IPerformances, PerformanceCreationAttributes>
  implements IPerformances
{
  public id!: string;
  public criteria!: string;
  public observation!: string;
  public level!: number;
  public trainer_id!: string;
  public academic_id!: string;
}

export default function PerformanceModel(sequelize: Sequelize) {
  Performances.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      criteria: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      observation: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trainer_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      academic_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "performances",
      underscored: true,
      timestamps: false,
    }
  );

  return Performances;
}




// import { DataTypes, Model, Sequelize } from "sequelize";

// interface IPerformance {
//   id: number;
//   criteria: string;
//   observation: string;
//   level: number;
//   trainer_id: string;
//   academic_id: string;
// }

// export class Performance extends Model<IPerformance> implements IPerformance {
//   public id!: number;
//   public criteria!: string;
//   public observation!: string;
//   public level!: number;
//   public trainer_id!: string;
//   public academic_id!: string;
// }

// export default function PerformanceModel(sequelize: Sequelize) {
//   Performance.init(
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         autoIncrement: true, 
//         allowNull: false,
//       },
//       criteria: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//       },
//       observation: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       level: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       trainer_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: 'trainers',
//           key: 'id',
//         },
//       },
//       academic_id: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: 'academic_records',
//           key: 'id',
//         },
//       },
//     },
//     {
//       sequelize,
//       underscored: true,
//       timestamps: false, 
//       tableName: "performances",
//       createdAt: "created_at",
//       updatedAt: "updated_at",
//     }
//   );

//   return Performance;
// }