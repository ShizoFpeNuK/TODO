

export const DefaultError: Object = {
  description: "Любая ошибка",
  content: {
    "application/json": {
      schema: {
        statusCode: { type: "integer" },
        message: { type: "string" }
      }
    }
  }
}