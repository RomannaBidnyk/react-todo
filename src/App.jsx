import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";

function App() {
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
            <TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />
          }
        ></Route>
        {/* <Route path="/new" element={<h1>Todo List</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
