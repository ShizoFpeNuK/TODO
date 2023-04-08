import { SwaggerOptions } from "@fastify/swagger";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { ToDoCreateSchema, ToDoParamsIdSchema, ToDoSchema, ToDoUpdateSchema, ToDosSchema } from "./schemas/todo/todo-items.schemas";


export const swaggerConfig: SwaggerOptions = {
  openapi: {
    info: {
      title: "Веб-приложение для ToDo",
      version: "0.0.1"
    },
    servers: [{
      url: "http://localhost:4000"
    }],
    components: {
      schemas: {
        ToDoSchema,
        ToDoParamsIdSchema,
        ToDosSchema,
        ToDoCreateSchema,
        ToDoUpdateSchema
      }
    }
  }
}


export const swaggerUIConfig: FastifySwaggerUiOptions = {
  routePrefix: "/api-docs"
}