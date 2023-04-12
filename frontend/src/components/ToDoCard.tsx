import { IToDo } from "../options/models/todo.model";
import { Card } from "antd";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { CardBody, CardTitle } from "../style/ts/card";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import todo from "../store/ToDoStoreClass";


interface IToDoCard {
  ToDo: IToDo;
  index?: string;
  openWindowUpdate: (id: string) => void;
  openWindowCreate: () => void;
}


export const ToDoCard = observer(({ ToDo, index, openWindowUpdate, openWindowCreate }: IToDoCard) => {
  const [indexTodo, setIndex] = useState<string>("")

  useEffect(() => {
    if (index) {
      setIndex(index)
    }
  }, [index])


  return (
    <Card title={indexTodo + ToDo.title} key={ToDo.id} headStyle={CardTitle} bodyStyle={CardBody} className="todo_card" style={{ marginBottom: "20px" }}
      extra={[
        <div onClick={() => todo.completedToDo(ToDo.id, ToDo.isCompleted)} className='icon icon--green' key={ToDo.id}>
          {ToDo.isCompleted && <CheckOutlined key="completed" />}
        </div>,
        <div onClick={() => todo.completedToDo(ToDo.id, ToDo.isCompleted)} className='icon icon--red' key={ToDo.updatedAt}>
          {!ToDo.isCompleted && <CloseOutlined key="noCompleted" />}
        </div>
      ]}
      actions={[
        <div onClick={() => { todo.deleteToDo(ToDo.id); openWindowCreate() }} className='icon'><DeleteOutlined key="delete" /></div>,
        <div onClick={() => openWindowUpdate(ToDo.id)} className='icon'><EditOutlined key="edit" /></div>,
      ]}>
      {ToDo.description}
    </Card>
  )
})
