import axios from "axios";
import { IToDo } from "../options/models";

export default class ToDoServices {
  static pathDefault: string = 'http://localhost:4000/todos';

  static async getAll(): Promise<IToDo[]> {
    const ToDos = await axios.get(this.pathDefault);

    return ToDos.data;
  }

  static async create(title: string, description: string) {
    await axios.post(this.pathDefault, {
      title: title,
      description: description,
    });
  }

  static async update(id: string, title: string, description: string) {
    await axios.patch(this.pathDefault + '/' + id, {
      title: title,
      description: description,
    });
  }

  static async deleteAll() {
    await axios.delete(this.pathDefault);
  }

  static async deleteOne(id: string) {
    await axios.delete(this.pathDefault + '/' + id);
  }

  static async isCompleted(id: string, completed: boolean) {
    await axios.patch(this.pathDefault + '/' + id, {
      isCompleted: !completed,
    });
  }
}