import { DefaultError } from "../error.schemas"
import { ToDoCreateSchema, ToDoParamsIdSchema, ToDoSchema, ToDoUpdateSchema, ToDosSchema } from "./todo-items.schemas"


export const GetAllToDosSchema: Object = {
  schema: {
    description: "Метод получения todos",
    tags: ["ToDo"],
    operationId: "getAllToDos",
    response: {
      200: {
        description: "Успешный ответ со списком todos",
        content: {
          "application/json": {
            schema: ToDosSchema
          }
        }
      },
      default: DefaultError
    }
  }
}

export const GetToDoByIdSchema: Object = {
  schema: {
    description: "Метод получения todo по идентификатору",
    tags: ["ToDo"],
    operationId: "getToDoById",
    params: ToDoParamsIdSchema,
    response: {
      200: {
        description: "Успешный ответ с объектом todo",
        content: {
          "application/json": {
            schema: ToDoSchema
          }
        }
      },
      default: DefaultError
    }
  }
}

export const PostToDoSchema: Object = {
  schema: {
    description: "Метод создания todo",
    tags: ["ToDo"],
    operationId: "createToDoById",
    body: ToDoCreateSchema,
    response: {
      201: {
        description: "Успешное создание объекта todo",
        content: {
          "application/json": {
            schema: ToDoSchema
          }
        }
      },
      default: DefaultError
    }
  }
}

export const PatchToDoByIdSchema: Object = {
  schema: {
    description: "Метод обновлнения данных todo по индентификатору",
    tags: ["ToDo"],
    operationId: "updateToDoById",
    params: ToDoParamsIdSchema,
    body: ToDoUpdateSchema,
    response: {
      201: {
        description: "Успешное удаление списка todos",
        content: {
          "application/json": {
            schema: ToDoSchema
          }
        }
      },
      default: DefaultError
    }
  }
}

export const DeleteToDoByIdSchema: Object = {
  schema: {
    description: "Метод удаления todo по индентификатору",
    tags: ["ToDo"],
    operationId: "deleteToDoById",
    params: ToDoParamsIdSchema,
    response: {
      200: {
        description: "Успешное удаление todo",
        content: {
          "application/json": {
            schema: {
              message: { type: "string" }
            }
          }
        }
      },
      default: DefaultError
    }
  }
}

export const DeleteAllToDosSchema: Object = {
  schema: {
    description: "Метод удаления списка todos",
    tags: ["ToDo"],
    operationId: "deleteAllToDos",
    response: {
      200: {
        description: "Успешное удаление списка todos",
        content: {
          "application/json": {
            schema: {
              message: { type: "string" }
            }
          }
        }
      },
      default: DefaultError
    }
  }
}

