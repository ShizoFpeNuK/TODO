import { FastifyInstance } from 'fastify';
import { swaggerConfig, swaggerUIConfig } from './swagger/swagger.config';
import http from 'http';
import cors from '@fastify/cors';
import initDB from './db';
import fastify from 'fastify';
import swaggerUI from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';
import ToDoController from './controllers/todo.controller';


export const app: FastifyInstance = fastify<http.Server>();
app.register(cors);
app.register(fastifySwagger, swaggerConfig);
app.register(swaggerUI, swaggerUIConfig);
app.register(ToDoController);


app.listen({ port: Number(process.env.SERVER_PORT!) }, (err: Error | null, address: string) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    initDB();
    app.swagger();
    console.log(`Server listening at ${address}!`);
  }
});