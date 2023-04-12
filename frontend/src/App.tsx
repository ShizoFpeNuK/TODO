import './style/css/App.css';
import { IToDo } from './options/models/todo.model';
import { observer } from 'mobx-react';
import { ToDoCard } from './components/ToDoCard';
import { ButtonView } from './style/ts/button';
import { CardTitle, CardBody } from './style/ts/card';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FormAddToDo, FormUpdateToDo } from './components/ToDoForm';
import { Row, Col, Card, Button, Space, Pagination } from 'antd';
import todo from "./store/ToDoStoreClass";


const App = observer(() => {
  const [isOpenWindowCreate, setIsOpenWindowCreate] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const pageSize: number = 5;

  function openWindowCreate() {
    setIsOpenWindowCreate(true);
  }

  function openWindowUpdate(id: string) {
    setIsOpenWindowCreate(false);
    todo.setId(id);
  }

  useEffect(() => {
    todo.getToDoList();
  }, [])


  return (
    <div className="App">
      <Row gutter={40}>
        <Col span={16}>
          <AnimatePresence mode="popLayout">
            {todo.ToDoList.filter((ToDo: IToDo, index: number) => {
              return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
            }).map((ToDo: IToDo) =>
              <motion.div key={ToDo.id}
                layout
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <ToDoCard ToDo={ToDo} key={ToDo.id} openWindowUpdate={openWindowUpdate} openWindowCreate={openWindowCreate} />
              </motion.div>
            )}
          </AnimatePresence>
          {todo.ToDoList.length
            ? <Pagination
              current={page}
              pageSize={pageSize}
              onChange={setPage}
              total={todo.ToDoList.length || 0}
            />
            : <div style={{ fontSize: "24px", fontWeight: "400" }}>У вас нет дел. Можете расслабиться!</div>
          }
        </Col>
        <Col span={8}>
          {isOpenWindowCreate ? <FormAddToDo /> : <FormUpdateToDo id={todo.id} closeWindowUpdate={setIsOpenWindowCreate} />}
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <Card title="Панель управления" headStyle={CardTitle} bodyStyle={CardBody}>
                <Space>
                  <Space.Compact direction="vertical">
                    <Button onClick={todo.getToDoList} style={ButtonView}>Получить все</Button>
                    <Button onClick={() => { todo.deleteToDoList(); openWindowCreate() }} style={ButtonView}>Удалить все</Button>
                    <Button onClick={openWindowCreate} style={ButtonView}>Создать</Button>
                  </Space.Compact>
                </Space>
              </Card>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
})


export default App;