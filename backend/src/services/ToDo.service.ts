import { CreateToDoDto } from "../dto/create-ToDo.dto";
import { UpdateToDoDto } from "../dto/update-ToDo.dto";
import ToDo from "../db/models/ToDo.model";


export default class ToDoService {
  static async createToDo(dto: CreateToDoDto): Promise<ToDo> {
    const newToDo: ToDo = await ToDo.create({ ...dto }); //почему три точки?

    return newToDo;
  }

  static async getToDos(): Promise<ToDo[]> {
    const ToDos: ToDo[] = await ToDo.findAll({
      order: [
        ['isCompleted', 'ASC'],
        ['updatedAt', 'DESC'],
      ]
    });

    return ToDos;
  }

  static async getToDoById(id: string): Promise<ToDo> {
    const todo: ToDo | null = await ToDo.findByPk(id);
    if (!todo) {
      throw new Error(`Not found ${id}`); //Исправить
    }

    return todo;
  }

  static async updateToDo(id: string, dto: UpdateToDoDto): Promise<ToDo> {
    const todo: ToDo = await this.getToDoById(id);
    await todo.update(dto); //почему не как в createToDo?

    return todo;
  }

  static async deleteToDoById(id: string): Promise<void> {
    const todo: ToDo = await this.getToDoById(id);
    await todo.destroy();
  }

  static async deleteToDos(): Promise<void> {
    await ToDo.destroy({ truncate: true })
  }
}