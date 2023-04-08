

export const ToDoSchema: Object = {
  required: ["id", "title", "description", "createdAt", "updatedAt", "isCompleted"],
  properties: {
    id: { type: "string", examples: ["6b2de3f0-c0cf-4c0f-b1cf-947ae9d11767"] },
    title: { type: "string", examples: ["Title"] },
    description: { type: "string", examples: ["Description"] },
    isCompleted: { type: "boolean", examples: [false, true] },
    createdAt: { type: "string", format: "2023-04-07T19:08:24.270Z", examples: ["2023-04-07T19:08:24.270Z"] },
    updatedAt: { type: "string", format: "2023-04-07T19:08:24.270Z", examples: ["2023-04-07T19:08:24.270Z"] }
  },
  example: {
    id: "6b2de3f0-c0cf-4c0f-b1cf-947ae9d11767",
    title: "Title",
    description: "Description",
    isCompleted: false,
    createdAt: "2023-04-07T19:08:24.270Z",
    updatedAt: "2023-04-07T19:08:24.270Z"
  }
}

export const ToDosSchema: Object = {
  type: "array",
  items: ToDoSchema
}

export const ToDoParamsIdSchema: Object = {
  type: "object",
  required: ["id"],
  properties: {
    id: { type: "string", examples: ["6b2de3f0-c0cf-4c0f-b1cf-947ae9d11767"] }
  }
}

export const ToDoCreateSchema: Object = {
  type: "object",
  required: ["title", "description"],
  properties: {
    title: { type: "string", examples: ["Title"] },
    description: { type: "string", examples: ["Description"] },
    isCompleted: { type: "boolean", examples: [false, true] }
  },
  examples: [{
    title: "Title",
    description: "Description",
    isCompleted: false
  }]
}

export const ToDoUpdateSchema: Object = {
  type: "object",
  properties: {
    title: { type: "string", examples: ["Title"] },
    description: { type: "string", examples: ["Description"] },
    isCompleted: { type: "boolean", examples: [false, true] }
  },
  examples: [{
    title: "Title",
    description: "Description",
    isCompleted: false
  }]
} 