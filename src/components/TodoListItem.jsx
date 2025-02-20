import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem({ item: todo, onRemoveTodo }) {
  return (
    <li className={style.ListItem}>
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
