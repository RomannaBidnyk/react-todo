import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

function TodoList({ todoList, onRemoveTodo, onUpdateCompletion }) {
  return (
    <ul>
      {todoList.map((item) => {
        return (
          <TodoListItem
            key={item.id}
            item={item}
            onRemoveTodo={onRemoveTodo}
            onUpdateCompletion={onUpdateCompletion}
          />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateCompletion: PropTypes.func,
};

export default TodoList;
