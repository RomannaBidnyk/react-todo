import { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoTitle = title;
    onAddTodo(todoTitle);
    setTitle("");
  };

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title </label>
        <input
          id="todoTitle"
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddTodoForm;
