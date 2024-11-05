import AddTodoForm from "./AddTodoForm";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  return (
    <>
      <div>
        <h1>ToDo List</h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </>
  );
}

export default App;
