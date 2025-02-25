import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

function TodoListItem({ item: todo, onRemoveTodo, onUpdateCompletion }) {
  const [isCompleted, setIsCompleted] = useState(
    !!todo.completedAt && todo.completedAt !== "Not Completed"
  );

  const handleCheckboxChange = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);

    onUpdateCompletion(todo.id, newCompletedState);
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
    completedAt: PropTypes.string,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateCompletion: PropTypes.func,
};

export default TodoListItem;
