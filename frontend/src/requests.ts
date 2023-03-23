import axios from "axios";
import { sortByField } from './options/functions';
import { IToDo } from "./options/models";


const pathDefault: string = 'http://localhost:4000/todos';

export async function getToDoList(setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>) {
  return await axios.get(pathDefault)
    .then((res) => {
      setToDoList((e: any) => res.data.result.sort(sortByField("updatedAt")));
      setToDoList((e: any) => res.data.result.sort(sortByField("isCompleted")));
    }).catch((error) => {
      console.log(error);
    })
}

export async function createToDo(title: string, description: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>) {
  if (title && description) {
    return await axios.post(pathDefault, {
      title: title,
      description: description,
    }).then((res) => {
      getToDoList(setToDoList);
      setTitle("");
      setDescription("");
    }).catch((error) => {
      console.log(error);
    })
  }
}

  export async function updateToDo(title: string, description: string, ToDoList: IToDo[], ToDoID: string, 
    setToDoID: React.Dispatch<React.SetStateAction<string>>, 
    setIsOpenWindowCreate: React.Dispatch<React.SetStateAction<boolean>>, 
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setDescription: React.Dispatch<React.SetStateAction<string>>,
    setToDoList: React.Dispatch<React.SetStateAction<IToDo[]>>) {
    if (title || description) {
      let oldTitle = title;
      let oldDescription = description;
      if (!title) {
        oldTitle = ToDoList.filter(ToDo => ToDo.id === ToDoID)[0].title;
      }
      if (!description) {
        oldDescription = ToDoList.filter(ToDo => ToDo.id === ToDoID)[0].description;
      }
      await axios.patch(pathDefault + '/' + ToDoID, {
        title: oldTitle,
        description: oldDescription,
      }).then((res) => {
        getToDoList(setToDoList);
        setTitle("");
        setDescription("");
        setToDoID("");
        setIsOpenWindowCreate(true);
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  // async function deleteToDoList() {
  //   await axios.delete(pathDefault)
  //     .then((res) => {
  //       getToDoList();
  //       setTitle("");
  //       setDescription("");
  //       setToDoID("");
  //       setIsOpenWindowCreate(true);
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  // }

  // async function deleteToDo(ID: string) {
  //   axios.delete(pathDefault + '/' + ID)
  //     .then((res) => {
  //       getToDoList();
  //       setTitle("");
  //       setDescription("");
  //       setToDoID("");
  //       setIsOpenWindowCreate(true);
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  // }

  // async function completedToDo(ID: string, completed: boolean) {
  //   await axios.patch(pathDefault + '/' + ID, {
  //     isCompleted: !completed,
  //   })
  //     .then((res) => {
  //       getToDoList();
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  // }