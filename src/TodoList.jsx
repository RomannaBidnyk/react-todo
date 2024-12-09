import TodoListItem from "./TodoListItem";

const todoList = [
  { id: 1, title: "Complete assignment 1" },
  { id: 2, title: "Complete assignment 2" },
  { id: 3, title: "Complete assignment 3" },
];

function TodoList() {
  return (
    <>
      <ul>
        {todoList.map((item) => {
          return <TodoListItem key={item.id} item={item} />;
        })}
      </ul>
    </>
  );
}

export default TodoList;
