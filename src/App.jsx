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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/todo"
          element={
            <TodoContainer tableName={import.meta.env.VITE_TABLE_NAME} />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
