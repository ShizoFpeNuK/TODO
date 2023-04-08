
export interface IToDo {
  createdAt: string;
  description: string;
  id: string;
  isCompleted: boolean;
  title: string;
  updatedAt: string;
}

export interface IToDoNew {
  description: string;
  title: string;
  createToDo: () => Promise<void>;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  // getAll: () => Promise<void>;
}


export interface IToDoChange {
  description: string;
  id: string;
  title: string;
  updateToDo: (id: string) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  // getAll: () => Promise<void>;
}
