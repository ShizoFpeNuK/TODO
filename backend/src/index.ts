import ToDo from './db/models/ToDo.models';
import cors from '@fastify/cors';
import initDB from './db';
import fastify from 'fastify';
import { FastifyReply, FastifyRequest } from "fastify";

const ServerPort: number = 4000;
const app = fastify();
app.register(cors);
initDB();


interface BodyType {
  title: string,
  description: string,
  isCompleted: string,
}


app.post("/todos", async (req: FastifyRequest<{ Body: BodyType }>, res: FastifyReply) => {
  try {
    const result = await ToDo.create({
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
    });

    res.send(result);
    // return result;
  } catch (error) {
    console.log(error);
    // res.type('application/json').code(500);
    res.code(500);
    return { message: "Not OK" };
  }
})

app.get("/todos", async (req: any, res: any) => {
  try {
    const result = await ToDo.findAll({
      order: [ 
        ['isCompleted', 'ASC'],
        ['updatedAt', 'DESC'], 
      ]
    });
    return { result };
  } catch (error) {
    console.log(error);
    res.type('application/json').code(500);
  }
})

app.get("/todos/:id", async (req: any, res: any) => {
  try {
    const result = await ToDo.findByPk(req.params.id);
    if (!result) {
      res.type('application/json').code(404);
      return {
        message: `Not found ${req.params.id}`,
      }
    }

    return { result };
  } catch (error) {
    console.log(error);
    res.type('application/json').code(500);
  }
})

app.patch("/todos/:id", async (req: any, res: any) => {
  try {
    const ToDoFind = await ToDo.findByPk(req.params.id);
    if (!ToDoFind) {
      res.type('application/json').code(404);
      return {
        massage: `Not found ${req.params.id}`,
      }
    }

    await ToDoFind.update(
      {
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
      });

    const result = await ToDo.findByPk(req.params.id);
    return { result };
  } catch (error) {
    console.log(error);
    res.type('application/json').code(500);
  }
})

app.delete("/todos", async (req: any, res: any) => {
  try {
    await ToDo.destroy({
      truncate: true
    });
    
    return { massage: "Ok" };
  } catch (error) {
    console.log(error);
    res.type('application/json').code(500);
  }
})

app.delete("/todos/:id", async (req: any, res: any) => {
  try {
    const result = await ToDo.findByPk(req.params.id);
    if (!result) {
      res.type('application/json').code(404);
      return {
        massage: `Not found ${req.params.id}`,
      }
    }

    await result.destroy();
    return { massage: "Ok" };
  } catch (error) {
    console.log(error);
    res.type('application/json').code(500);
  }
})

app.listen({ port: ServerPort }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});