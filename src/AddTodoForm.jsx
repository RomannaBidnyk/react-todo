import { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./AddTodo.module.css";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: Date.now(),
    };
    onAddTodo(newTodo);
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id={"todoTitle"}
        todoTitle={todoTitle}
        onInputChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button className={style.addButton} type="submit">
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;
