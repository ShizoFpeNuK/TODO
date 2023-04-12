import { IToDo } from "../options/models/todo.model";
import { makeAutoObservable, runInAction } from "mobx";
import ToDoServices from "../services/ToDo.service";


class ToDoClass {
  id: string = "";
  ToDoList: IToDo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getToDoList(): Promise<void> {
    const ToDos: IToDo[] = await ToDoServices.getAll();
    runInAction(() =>
      this.setToDoList(ToDos)
    );
  }

  async createToDo(title: string, description: string): Promise<void> {
    await ToDoServices.create(title, description);
    this.getToDoList();
  }

  async updateToDo(id: string, title: string, description: string): Promise<void> {
    await ToDoServices.update(id, title, description);
    this.getToDoList();
    this.setId("");
  }

  async deleteToDoList() {
    await ToDoServices.deleteAll();
    this.getToDoList();
    this.setId("");
  }

  async deleteToDo(id: string) {
    await ToDoServices.deleteOne(id);
    this.getToDoList();
    this.setId("");
  }

  async completedToDo(id: string, completed: boolean) {
    await ToDoServices.isCompleted(id, completed);
    this.getToDoList();
  }


  setToDoList(ToDos: IToDo[]) {
    this.ToDoList = ToDos;
  }

  setId(id: string) {
    this.id = id;
  }
}

const todo = new ToDoClass();

export default todo;