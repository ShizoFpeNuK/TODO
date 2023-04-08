import { EditOutlined, FileAddOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd"
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { IToDoChange, IToDoNew } from "../options/models";
import ToDoServices from "../services/ToDo.service";
import { CardBody, CardTitle } from "../style/card";


interface FormAddProps {
  todoNew: IToDoNew,
}

interface FormChangeProps {
  todoChange: IToDoChange,
}

// interface SendForm {
//   title: string,
//   description: string,
// }

export const FormAddToDo = ({ todoNew }: FormAddProps) => {
  const [form] = useForm();
  // const [title, setTitle] = useState<string>("");
  // const [description, setDescription] = useState<string>("");

  // const onFinish = async (values: SendForm) => {
  //   await ToDoServices.create(values.title, values.description);
  //   await todoNew.getAll();
  //   form.resetFields();
  // };



  return (
    <Card title={"Создать"} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "40px" }} actions={[
      <div onClick={todoNew.createToDo} className='icon'><FileAddOutlined key="add" /></div>
    ]}>
      <Form form={form} layout="vertical">
        <Form.Item noStyle>
          <Input value={todoNew.title} onChange={e => todoNew.setTitle(e.target.value)} style={{ marginBottom: "30px" }} placeholder="Введите заголовок" />
        </Form.Item>
        <Form.Item noStyle>
          <Input value={todoNew.description} onChange={e => todoNew.setDescription(e.target.value)} placeholder="Введите описание" />
        </Form.Item>
      </Form>
    </Card>

    // <Card title={"Создать"} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "40px" }}>
    //   <Form form={form} layout="vertical" onFinish={onFinish}>
    //     <Form.Item noStyle label="Title" name="title">
    //       <Input value={title} onChange={e => setTitle(e.target.value)} style={{ marginBottom: "30px" }} placeholder="Введите заголовок" />
    //     </Form.Item>
    //     <Form.Item noStyle label="Description" name="description">
    //       <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Введите описание" />
    //     </Form.Item>
    //     <Form.Item noStyle>
    //       <Button style={{ backgroundColor: "#926CD6", marginTop: "20px" }} className='icon' htmlType="submit">
    //         <FileAddOutlined key="add" />
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </Card>
  );
};


export const FormUpdateToDo = ({ todoChange }: FormChangeProps) => {
  const [form] = useForm();
  // const [title, setTitle] = useState<string>("todoChange.title");
  // const [description, setDescription] = useState<string>(todoChange.description);

  // const onFinish = async (values: SendForm) => {
  //   await ToDoServices.update(todoChange.id, values.title, values.description);
  //   await todoChange.getAll();
  //   form.resetFields();
  // };


  return (
    <Card title={"Изменить"} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "40px" }} actions={[
      <div onClick={() => todoChange.updateToDo(todoChange.id)} className='icon'><EditOutlined key="edit" /></div>
    ]}>
      <Form form={form} layout="vertical">
        <Form.Item noStyle>
          <Input value={todoChange.title} onChange={e => todoChange.setTitle(e.target.value)} style={{ marginBottom: "30px" }} placeholder="Введите заголовок" />
        </Form.Item>
        <Form.Item noStyle>
          <Input value={todoChange.description} onChange={e => todoChange.setDescription(e.target.value)} placeholder="Введите описание" />
        </Form.Item>
      </Form>
    </Card>

    // <Card title={"Изменить"} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "40px" }}>
    //   <Form form={form} layout="vertical" onFinish={onFinish}>
    //     <Form.Item noStyle label="Title" name="title">
    //       <Input value={title} onChange={e => setTitle(e.target.value)} style={{ marginBottom: "30px" }} placeholder="Введите заголовок" />
    //     </Form.Item>
    //     <Form.Item noStyle label="Description" name="description">
    //       <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Введите описание" />
    //     </Form.Item>
    //     <Form.Item noStyle>
    //       <Button style={{ backgroundColor: "#926CD6", marginTop: "20px" }} className='icon' htmlType="submit">
    //         <EditOutlined key="edit" />
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </Card>
  );
};