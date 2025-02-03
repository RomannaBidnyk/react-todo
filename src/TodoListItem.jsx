import style from "./TodoListItem.module.css";

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

export default TodoListItem;
