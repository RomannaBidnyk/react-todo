import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import "./App.css";
import TodoList from "./TodoList";

function useSemiPersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : initialValue;
  });

  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, key]);

  return [state, setState];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState("savedTodoList", []);

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  return (
    <>
      <h1>ToDo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
