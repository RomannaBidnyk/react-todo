import { useState, useEffect, useCallback } from "react";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";
import TodoList from "./components/TodoList";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");

  const fetchData = useCallback(async () => {
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
        completedAt: record.fields.completedAt || "Not Completed",
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [sortOrder, sortField]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading, sortOrder, sortField]);

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      let aValue = a[sortField] || "";
      let bValue = b[sortField] || "";

      if (sortField === "completedAt") {
        aValue = aValue ? new Date(aValue) : 0;
        bValue = bValue ? new Date(bValue) : 0;
      }

      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      } else if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      return 0;
    });
  };

  const addTodo = (newTodo) => {
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(sortTodos(updatedTodoList));
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split("-");
    setSortField(field);
    setSortOrder(order);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <BrowserRouter>
      {/* Navigation Menu */}
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todo">Todo List</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <div style={{ padding: "20px" }}>
              <h1>Welcome to ToDo List App!</h1>
              <p>
                This is the home page. Use the navigation above to go to Todo
                List.
              </p>
            </div>
          }
        />

        {/* Todo List Functionality Route */}
        <Route
          path="/todo"
          element={
            <>
              <h1>ToDo List</h1>
              <label>Sort by: </label>
              <select
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="completedAt-asc">
                  Completed At (Oldest First)
                </option>
                <option value="completedAt-desc">
                  Completed At (Newest First)
                </option>
              </select>

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
        {/* <Route path="/new" element={<h1>Todo List</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
