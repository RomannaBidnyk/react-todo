import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedState = localStorage.getItem("savedTodoList");
        const initialList = savedState ? JSON.parse(savedState) : [];
        resolve({ data: { todoList: initialList } });
      }, 2000);
    });

    newPromise
      .then((result) => {
        setTodoList(result.data.todoList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading todo list:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <>
      <h1>ToDo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </>
  );
}

export default App;
