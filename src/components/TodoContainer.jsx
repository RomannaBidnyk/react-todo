import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import Filtering from "./Filtering";

function TodoContainer({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("title");
  const [filter, setFilter] = useState("all");  // "all", "todo", "done"

  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 10;

  const airtableBaseURLandID = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }`;

  const fetchData = useCallback(async () => {
    const url = `${airtableBaseURLandID}/${tableName}?sort[0][field]=${sortField}&sort[0][direction]=${sortOrder}`;

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
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [airtableBaseURLandID, tableName, sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading, sortOrder, sortField]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const sortTodos = (todos) => {
    return todos.sort((a, b) => {
      let aValue = a[sortField] || "";
      let bValue = b[sortField] || "";

      if (sortField === "completedAt") {
        aValue =
          aValue && aValue !== "Not Completed"
            ? new Date(aValue).getTime()
            : sortOrder === "asc"
            ? Infinity
            : 0;
        bValue =
          bValue && bValue !== "Not Completed"
            ? new Date(bValue).getTime()
            : sortOrder === "asc"
            ? Infinity
            : 0;
      }

      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      return 0;
    });
  };

  const addTodo = async (input) => {
    const url = `${airtableBaseURLandID}/${tableName}`;
    const newRecord = {
      fields: {
        title: input.title,
      },
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      const addedTodo = {
        id: data.id,
        title: data.fields.title,
        completedAt: data.fields.completedAt || "Not Completed",
      };

      const updatedTodoList = sortTodos([...todoList, addedTodo]);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split("-");
    setSortField(field);
    setSortOrder(order);
  };

  const removeTodo = async (id) => {
    const url = `${airtableBaseURLandID}/${tableName}/${id}`;

    const options = {
      method: "DELETE",
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
      console.log(`Deleted record ID: ${data.id}`);

      const updatedTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodoCompletion = async (id, isCompleted) => {
    const url = `${airtableBaseURLandID}/${tableName}/${id}`;
    const completedAt = isCompleted
      ? new Date().toISOString().slice(0, 16).replace("T", " ")
      : null;

    const updatedFields = {
      fields: {
        completedAt: completedAt,
      },
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error updating todo: ${response.status}`);
      }

      const data = await response.json();

      const updatedTodoList = todoList.map((todo) =>
        todo.id === id
          ? { ...todo, completedAt: data.fields.completedAt || null }
          : todo
      );

      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error updating todo completion:", error);
    }
  };

  const filteredTodos = todoList.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "todo") return todo.completedAt === "Not Completed";
    if (filter === "done") return todo.completedAt !== "Not Completed";
    return true;
  });

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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

      <AddTodoForm onAddTodo={addTodo} />

      <Filtering filter={filter} setFilter={setFilter} />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TodoList
            todoList={currentTodos}
            onRemoveTodo={removeTodo}
            onUpdateCompletion={updateTodoCompletion}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;
