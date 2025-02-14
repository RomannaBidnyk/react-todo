import { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";
import TodoList from "./components/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
      
      //view order:
      // }/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;

      //field direction:
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?sort[0][field]=title&sort[0][direction]=asc`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      //javascript sorting asc:
      // data.records.sort((objectA, objectB) => {
      //   const titleA = objectA.fields.title.toLowerCase();
      //   const titleB = objectB.fields.title.toLowerCase();

      //   if (titleA < titleB) return -1;
      //   if (titleA > titleB) return 1;
      //   return 0;
      // });

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
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
          }
        ></Route>
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
