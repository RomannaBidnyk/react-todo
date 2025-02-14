import { useState, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";
import TodoList from "./components/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?sort[0][field]=${sortField}&sort[0][direction]=${sortOrder}`;
    //view order:
    // }/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;

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
        completeAt: record.fields.completeAt || "Not Completed",
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder, sortField]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const changeSortField = (field) => {
    setSortField(field);
  };

  const addTodo = (newTodo) => {
    setTodoList((prevTodoList) =>
      [...prevTodoList, newTodo].sort((a, b) =>
        sortOrder === "asc"
          ? a[sortField]?.localeCompare?.(b[sortField]) || 0
          : b[sortField]?.localeCompare?.(a[sortField]) || 0
      )
    );
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
              <button onClick={() => changeSortField("title")}>
                Sort by Title
              </button>
              <button onClick={() => changeSortField("completedAt")}>
                Sort by CompletedAt
              </button>

              <button onClick={toggleSortOrder}>
                Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
              </button>

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
