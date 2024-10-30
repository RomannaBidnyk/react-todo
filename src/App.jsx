import "./App.css";

const todoList = [];
todoList.push({ id: 1, title: "Complete assignment 1" });
todoList.push({ id: 2, title: "Complete assignment 2" });
todoList.push({ id: 3, title: "Complete assignment 3" });

function App() {
  return (
    <div>
      <h1>ToDo List</h1>
      <ul>
        {todoList.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
