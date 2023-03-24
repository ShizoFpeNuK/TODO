import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import http from 'http';
import ToDo from './db/models/ToDo.model';
import cors from '@fastify/cors';
import initDB from './db';
import fastify from 'fastify';


const app: FastifyInstance = fastify<http.Server>();
app.register(cors);

// type CustomRequest = FastifyRequest<{
//   Body: { test: boolean };
// }>

interface BodyType {
  title: string,
  description: string,
  isCompleted: string,
}

interface ParamsType {
  id: number,
}


app.post("/todos", async (req: FastifyRequest<{ Body: BodyType }>, res: FastifyReply) => {
  try {
    const result = await ToDo.create({
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    res.code(500).send({ message: "Failed to create ToDo" });
  }
})

app.get("/todos", async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const result: ToDo[] = await ToDo.findAll({
      order: [
        ['isCompleted', 'ASC'],
        ['updatedAt', 'DESC'],
      ]
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.code(500).send({ message: "Failed to get all ToDo" });
  }
})

app.get("/todos/:id", async (req: FastifyRequest<{ Params: ParamsType }>, res: FastifyReply) => {
  try {
    const result: ToDo | null = await ToDo.findByPk(req.params.id);
    if (!result) {
      res.code(404).send({ message: `Not found ${req.params.id}` });
    }

    res.send(result);
  } catch (error) {
    console.log(error);
    res.code(500).send({ message: `Failed to get ${req.params.id}` });
  }
})

app.patch("/todos/:id", async (req: FastifyRequest<{ Body: BodyType, Params: ParamsType }>, res: FastifyReply) => {
  try {
    const ToDoFind: ToDo | null = await ToDo.findByPk(req.params.id);
    if (!ToDoFind) {
      res.code(404).send({ massage: `Not found ${req.params.id}` });
    } else {
      await ToDoFind.update(
        {
          title: req.body.title,
          description: req.body.description,
          isCompleted: req.body.isCompleted,
        });
    }

    const result: ToDo | null = await ToDo.findByPk(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.code(500).send({ message: `Failed to patch ${req.params.id}` });
  }
})

app.delete("/todos", async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await ToDo.destroy({
      truncate: true
    });

    res.send({ massage: "All ToDo are destroyed" })
  } catch (error) {
    console.log(error);
    res.code(500).send({ massage: "Failed to destroy all ToDo" });
  }
})

app.delete("/todos/:id", async (req: FastifyRequest<{ Params: ParamsType }>, res: FastifyReply) => {
  try {
    const result: ToDo | null = await ToDo.findByPk(req.params.id);
    if (!result) {
      res.code(404).send({ massage: `Not found ${req.params.id}` });
    } else {
      await result.destroy();
      res.send({ massage: `Destroy ${req.params.id}` })
    }
  } catch (error) {
    console.log(error);
    res.code(500).send({ message: `Failed to destroy ${req.params.id}` });
  }
})



app.listen({ port: Number(process.env.SERVER_PORT!) }, (err: Error | null, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  initDB();
  console.log(`Server listening at ${address}!`);
});