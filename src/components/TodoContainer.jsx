import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function TodoContainer({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");

  const fetchData = useCallback(async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${tableName}?sort[0][field]=${sortField}&sort[0][direction]=${sortOrder}`;

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
        completedAt: record.fields.completedAt || "Not Completed",
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [tableName, sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading, sortOrder, sortField]);

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      let aValue = a[sortField] || "";
      let bValue = b[sortField] || "";

      if (sortField === "completedAt") {
        aValue = aValue ? new Date(aValue) : 0;
        bValue = bValue ? new Date(bValue) : 0;
      }

      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      } else if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      return 0;
    });
  };

  const addTodo = (newTodo) => {
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(sortTodos(updatedTodoList));
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split("-");
    setSortField(field);
    setSortOrder(order);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ToDo List: {tableName}</h1>
      <label>Sort by: </label>
      <select
        value={`${sortField}-${sortOrder}`}
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="title-asc">Title A-Z</option>
        <option value="title-desc">Title Z-A</option>
        <option value="completedAt-asc">Completed At (Oldest First)</option>
        <option value="completedAt-desc">Completed At (Newest First)</option>
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AddTodoForm onAddTodo={addTodo} />
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        </>
      )}
    </div>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
