import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  const [newTodo, setNewTodo] = useState("");
  return (
    <>
      <div>
        <h1>ToDo List</h1>
        <AddTodoForm onAddTodo={setNewTodo} />
        <p>{newTodo}</p>
        <TodoList />
      </div>
    </>
  );
}

export default App;
