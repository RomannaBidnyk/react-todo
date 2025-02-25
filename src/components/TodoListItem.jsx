import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

function TodoListItem({
  item: todo,
  onRemoveTodo,
  onUpdateCompletion,
  onEditTodo,
}) {
  const [isCompleted, setIsCompleted] = useState(
    !!todo.completedAt && todo.completedAt !== "Not Completed"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleCheckboxChange = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    onUpdateCompletion(todo.id, newCompletedState);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEditTodo(todo.id, newTitle);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewTitle(todo.title);
  };

  return (
    <li className={`${style.ListItem} ${isCompleted ? style.completed : ""}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />

      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={style.editableTitle}
        />
      ) : (
        <span>{todo.title}</span>
      )}

      <div className={style.buttonGroup}>
        <button
          className={style.editButton}
          type="button"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        {isEditing && (
          <button
            className={style.cancelButton}
            type="button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        )}

        <button
          className={style.removeButton}
          type="button"
          onClick={() => onRemoveTodo(todo.id)}
        >
          Remove
        </button>
      </div>
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
  onEditTodo: PropTypes.func,
};

export default TodoListItem;
