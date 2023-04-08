import { throwError } from "../utils/utils-error";
import { UpdateToDoDto } from "../dto/todo-update.dto";
import { CreateToDoDto } from "../dto/todo-create.dto";
import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestBody, FastifyRequestBodyAndParams, FastifyRequestParams } from "./typesRequest";
import { DeleteAllToDosSchema, DeleteToDoByIdSchema, GetAllToDosSchema, GetToDoByIdSchema, PatchToDoByIdSchema, PostToDoSchema } from "../swagger/schemas/todo/todo-actions.schemas";
import ToDo from "../db/models/todo.model";
import ToDoService from "../services/todo.service";


function lengthCheck(id: string) {
  if (id.length !== 36) {
    throwError({});
  }
}


export default async function ToDoController(app: FastifyInstance): Promise<void> {
  app.setErrorHandler(function (error: FastifyError, req: FastifyRequest, res: FastifyReply) {
    if (error.statusCode === 503) {
      res.code(503).send({
        statusCode: error.statusCode,
        message: error.message
      });
    }
    else if (error.statusCode === 400) {
      res.code(400).send({
        statusCode: error.statusCode,
        message: error.message
      });
    }
    else if (error.statusCode === 404) {
      res.code(404).send({
        statusCode: error.statusCode,
        message: error.message
      });
    }

    res.code(500).send({
      statusCode: 500,
      message: `Failed`
    });
  })


  app.post("/todos", PostToDoSchema, async (req: FastifyRequestBody, res: FastifyReply) => {
    const dto: CreateToDoDto = req.body;
    const ToDo: ToDo = await ToDoService.createToDo(dto);
    res.code(201).send(ToDo);
  })

  app.get("/todos", GetAllToDosSchema, async (req: FastifyRequest, res: FastifyReply) => {
    const ToDos: ToDo[] = await ToDoService.getToDos();
    res.send(ToDos);
  })

  app.get("/todos/:id", GetToDoByIdSchema, async (req: FastifyRequestParams, res: FastifyReply) => {
    const id: string = req.params.id
    lengthCheck(id);

    const todo: ToDo = await ToDoService.getToDoById(id);
    res.send(todo);
  })

  app.patch("/todos/:id", PatchToDoByIdSchema, async (req: FastifyRequestBodyAndParams, res: FastifyReply) => {
    const id: string = req.params.id;
    lengthCheck(id);
    const dto: UpdateToDoDto = req.body;

    const todo: ToDo = await ToDoService.updateToDo(id, dto);
    res.code(201).send(todo);
  })

  app.delete("/todos/:id", DeleteToDoByIdSchema, async (req: FastifyRequestParams, res: FastifyReply) => {
    const id: string = req.params.id;
    lengthCheck(id);

    await ToDoService.deleteToDoById(id);
    res.send({ message: `Destroy ${req.params.id}` });
  })

  app.delete("/todos", DeleteAllToDosSchema, async (req: FastifyRequest, res: FastifyReply) => {
    await ToDoService.deleteToDos();
    res.send({ message: "All ToDo are destroyed" });
  })
}