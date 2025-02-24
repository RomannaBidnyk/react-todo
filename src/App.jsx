import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
import NavMenu from "./components/NavMenu";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <NavMenu />

      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<HomePage />} />

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
