import { NotEmpty } from "sequelize-typescript/dist/validation/not-empty";
import { AllowNull } from "sequelize-typescript/dist/model/column/column-options/allow-null";
import { PrimaryKey } from "sequelize-typescript/dist/model/column/primary-key/primary-key";
import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'


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