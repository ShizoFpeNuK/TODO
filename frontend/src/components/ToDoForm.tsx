import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { Card, Form, Input } from "antd"
import { CardBody, CardTitle } from "../style/ts/card";
import { observer, useLocalObservable } from 'mobx-react';
import { EditOutlined, FileAddOutlined } from "@ant-design/icons";
import todo from "../store/ToDoStoreClass";


interface SendForm {
  title: string;
  description: string;
}

interface FormToDoUpdate {
  id: string;
  closeWindowUpdate?: (value: boolean) => void;
}


export const FormAddToDo = observer(() => {
  const [form] = useForm();

  const store = useLocalObservable(() => {
    return {
      title: "",
      description: "",
      setTitle(e: string) {
        this.title = e;
      },
      setDescription(e: string) {
        this.description = e;
      },
    }
  })

  const onFinish = async (values: SendForm) => {
    if (values.title && values.description) {
      await todo.createToDo(values.title, values.description);
      form.resetFields();
    }
  };


  return (
    <Card title={"Создать"} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "40px" }} actions={[
      <Form.Item noStyle>
        <div onClick={() => form.submit()} className='icon'><FileAddOutlined key="add" /></div>
      </Form.Item>
    ]}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item noStyle label="Title" name="title">
          <Input value={store.title} onChange={e => store.setTitle(e.target.value)} style={{ marginBottom: "30px" }} placeholder="Введите заголовок" />
        </Form.Item>
        <Form.Item noStyle label="Description" name="description">
          <Input value={store.description} onChange={e => store.setDescription(e.target.value)} placeholder="Введите описание" />
        </Form.Item>
      </Form>
    </Card>
  );
});


export const FormUpdateToDo = observer(({ id, closeWindowUpdate }: FormToDoUpdate) => {
  const [form] = useForm();

  const store = useLocalObservable(() => {
    return {
      title: "",
      description: "",
      setTitle(e: string) {
        this.title = e;
      },
      setDescription(e: string) {
        this.description = e;
      },
    }
  })

  const onFinish = async (values: SendForm) => {
    await todo.updateToDo(id, values.title, values.description);
    form.resetFields();
    if (closeWindowUpdate) {
      closeWindowUpdate(true);
    }
  };

  useEffect(() => {
    store.setTitle(todo.ToDoList.filter(ToDo => ToDo.id === id)[0].title);
    store.setDescription(todo.ToDoList.filter(ToDo => ToDo.id === id)[0].description);
  }, [id])


  return (
    <Card title={"Изменить"} headStyle={CardTitle} bodyStyle={CardBody} style={{ marginBottom: "40px" }} actions={[
      <Form.Item noStyle>
        <div onClick={() => form.submit()} className='icon'><EditOutlined key="edit" /></div>
      </Form.Item>
    ]}>
      <Form form={form} layout="vertical" onFinish={onFinish} fields={[
        {
          name: ["title"],
          value: store.title,
        },
        {
          name: ["description"],
          value: store.description,
        },
      ]}>
        <Form.Item noStyle label="Title" name="title">
          <Input value={store.title} onChange={e => store.setTitle(e.target.value)} style={{ marginBottom: "30px" }} placeholder="Введите заголовок" />
        </Form.Item>
        <Form.Item noStyle label="Description" name="description">
          <Input value={store.description} onChange={e => store.setDescription(e.target.value)} placeholder="Введите описание" />
        </Form.Item>
      </Form>
    </Card>
  );
});