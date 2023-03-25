import { FastifyInstance } from 'fastify';
import http from 'http';
import cors from '@fastify/cors';
import initDB from './db';
import fastify from 'fastify';
import ToDoController from './controllers/ToDo.controller';


const app: FastifyInstance = fastify<http.Server>();
app.register(cors);
app.register(ToDoController)


app.listen({ port: Number(process.env.SERVER_PORT!) }, (err: Error | null, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    initDB();
    console.log(`Server listening at ${address}!`);
  }
});