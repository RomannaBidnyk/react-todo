import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

function TodoListItem({ item: todo, onRemoveTodo }) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <li className={`${style.ListItem} ${isCompleted ? style.completed : ""}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />
      <span>{todo.title}</span>
      <button
        className={style.removeButton}
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
      >
        Remove
      </button>
    </li>
  );
}

TodoListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
