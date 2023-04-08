import { CreateToDoDto } from "../dto/todo-create.dto";
import { UpdateToDoDto } from "../dto/todo-update.dto";
import ToDo from "../db/models/todo.model";
import { throwErrorNotFound, throwErrorServiceUnavailable } from "../utils/utils-error";


export default class ToDoService {
  static async createToDo(dto: CreateToDoDto): Promise<ToDo> {
    const newToDo: ToDo = await ToDo.create({ ...dto }) //почему три точки?
      .catch(() => {
        throwErrorServiceUnavailable();
      });

    return newToDo;
  }

  static async getToDos(): Promise<ToDo[]> {
    const ToDos: ToDo[] = await ToDo.findAll({
      order: [
        ['isCompleted', 'ASC'],
        ['updatedAt', 'DESC'],
      ]
    }).catch(() => {
      throwErrorServiceUnavailable();
    });

    return ToDos;
  }

  static async getToDoById(id: string): Promise<ToDo> {
    const todo: ToDo | null = await ToDo.findByPk(id)
      .catch(() => {
        throwErrorServiceUnavailable();
      });

    if (!todo) {
      throwErrorNotFound(`Not found todo by id: ${id}`);
    }

    return todo;
  }

  static async updateToDo(id: string, dto: UpdateToDoDto): Promise<ToDo> {
    const todo: ToDo = await this.getToDoById(id)

    await todo.update(dto); //почему не как в createToDo?

    return todo;
  }

  static async deleteToDoById(id: string): Promise<void> {
    const todo: ToDo = await this.getToDoById(id);
    await todo.destroy();
  }

  static async deleteToDos(): Promise<void> {
    await ToDo.destroy({ truncate: true })
      .catch(() => {
        throwErrorServiceUnavailable();
      });
  }
}