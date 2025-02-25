import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import NavMenu from "./components/NavMenu";

function App() {
  return (
    <BrowserRouter>
      <NavMenu />

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
