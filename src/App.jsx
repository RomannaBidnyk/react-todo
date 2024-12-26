import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
