import { UpdateToDoDto } from "../dto/update-ToDo.dto";
import { CreateToDoDto } from "../dto/create-ToDo.dto";
import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestBody, FastifyRequestBodyAndParams, FastifyRequestParams } from "./typesRequest";
import ToDo from "../db/models/ToDo.model";
import ToDoService from "../services/ToDo.service";


export default async function ToDoController(app: FastifyInstance): Promise<void> {
  app.setErrorHandler(function (error: FastifyError, req: FastifyRequest, res: FastifyReply) {
    console.log(error);
    res.code(500).send({ message: `Failed` });
  })


  app.post("/todos", async (req: FastifyRequestBody, res: FastifyReply) => {
    const dto: CreateToDoDto = req.body;
    const ToDo: ToDo = await ToDoService.createToDo(dto);
    res.send(ToDo);
  })

  app.get("/todos", async (req: FastifyRequest, res: FastifyReply) => {
    const ToDos: ToDo[] = await ToDoService.getToDos();
    res.send(ToDos);
  })

  app.get("/todos/:id", async (req: FastifyRequestParams, res: FastifyReply) => {
    const id: string = req.params.id
    const todo: ToDo = await ToDoService.getToDoById(id);
    res.send(todo);
  })

  app.patch("/todos/:id", async (req: FastifyRequestBodyAndParams, res: FastifyReply) => {
    const id: string = req.params.id;
    const dto: UpdateToDoDto = req.body;
    const todo: ToDo = await ToDoService.updateToDo(id, dto);
    res.send(todo);
  })

  app.delete("/todos/:id", async (req: FastifyRequestParams, res: FastifyReply) => {
    const id: string = req.params.id;
    const result = await ToDoService.deleteToDoById(id);
    res.send({ massage: `Destroy ${req.params.id}` });
  })

  app.delete("/todos", async (req: FastifyRequest, res: FastifyReply) => {
    const result = await ToDoService.deleteToDos();
    res.send({ massage: "All ToDo are destroyed" });
  })
}