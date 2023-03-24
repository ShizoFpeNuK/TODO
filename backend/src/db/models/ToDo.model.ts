import { Table, Column, Model, IsUUID, DataType, Default } from 'sequelize-typescript'
import { PrimaryKey } from "sequelize-typescript/dist/model/column/primary-key/primary-key";
import { AllowNull } from "sequelize-typescript/dist/model/column/column-options/allow-null";
import { NotEmpty } from "sequelize-typescript/dist/validation/not-empty";


interface IToDo {
  id: string,
  title: string,
  description: string,
  isCompleted: boolean
}


@Table({
  tableName: "todos",
  underscored: true,
})
export default class ToDo extends Model implements IToDo {


  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({ type: DataType.UUID })
  id!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  title!: string;

  @Column
  description!: string;

  @AllowNull(false)
  @Default(false)
  @NotEmpty
  @Column
  isCompleted!: boolean;
}


// ToDo.init(
//   {
//     id: {
//       type: Sequelize.DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: Sequelize.DataTypes.UUIDV4,
//     },
//     title: {
//       type: Sequelize.STRING,
//       defaultValue: "Title",
//     },
//     description: {
//       type: Sequelize.STRING,
//       defaultValue: "",
//     },
//     isCompleted: {
//       type: Sequelize.BOOLEAN,
//       defaultValue: false,
//     },
//   },

//   { sequelize: sequelizeInstance, underscored: true, modelName: "todo" }
// );