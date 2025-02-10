import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function TodoListItem({ item, onRemoveTodo }) {
  return (
    <div className={style.todoContainer}>
      <li className={style.ListItem}>{item.title}</li>
      <button
        className={style.removeButton}
        type="button"
        onClick={() => onRemoveTodo(item.id)}
      >
        Remove
      </button>
    </div>
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
