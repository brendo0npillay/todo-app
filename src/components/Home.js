import listImg from "../assets/pngtree-office-checklist-icon-business-checklist-survey-test-icon-png-image_2047566.jpg";
import holder from "../assets/Wait Waiting GIF.gif";
import trash from "../assets/trash.png";
import edit from "../assets/edit-icon.png";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function Home() {
  const [task, setTask] = useState("");
  const [show, setShow] = useState(false);
  const [editTask, setEditTask] = useState("");
  const [currentTodo, setCurrentTodo] = useState("");

  const handleShow = (task) => {
    setShow(true);
    setEditTask(task);
  };
  const handleClose = () => setShow(false);

  const [todos, setTodos] = useState([]);

  const changeTodo = (todo) => {
    let arrCopy = todos;
    const index = arrCopy.indexOf(todo);
    arrCopy[index] = editTask;

    setTodos(arrCopy);
    setShow(false);
  };

  const addTodos = (todo) => {
    if (todo !== "") {
      setTodos([...todos, todo]);
      setTask("");
    }
  };

  const deleteTodo = (todo) => {
    const index = todos.indexOf(todo);
    const newTodos = todos.slice(0, index).concat(todos.slice(index + 1));
    setTodos(newTodos);
    console.log(todos);
  };

  const handleEdit = (todo) => {
    handleShow(todo);
    setCurrentTodo(todo);
  };

  return (
    <div className="homeContainer">
      <div className="header">
        <h1>ToDo List</h1>
        <img src={listImg} alt="listImage" />
      </div>
      <div className="input">
        <input
          onChange={(e) => setTask(e.target.value)}
          value={task}
          placeholder="Add Your Task"
        />
        <button onClick={() => addTodos(task)}>+</button>
      </div>
      <div className="body">
        {todos.length === 0 ? (
          <div className="nothingYet">
            <img src={holder} alt="waiting" />
          </div>
        ) : (
          todos.map((todo) => (
            <div>
              <div className="todoContainer">
                <div className="todo">{todo}</div>
                <img
                  onClick={() => deleteTodo(todo)}
                  src={trash}
                  alt="trashIcon"
                />
                <img
                  onClick={() => handleEdit(todo)}
                  src={edit}
                  alt="editIcon"
                />
              </div>
              <br />
            </div>
          ))
        )}
        <Modal
          show={show}
          backdrop="static"
          keyboard={false}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>EDIT TODO</Modal.Title>
            <Modal.Body>
              <input
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose} variant="secondary">
                Close
              </Button>
              <Button onClick={() => changeTodo(currentTodo)} variant="success">
                Save
              </Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
      </div>
    </div>
  );
}
