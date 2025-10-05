import { useEffect, useState } from "react";
import axios from "axios";

import "./TodoList.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low",
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get("https://to-do-app-qfin.onrender.com/api/todos", {
          withCredentials: true,
        });
        setTodos(data.todos);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };
    fetchTodos();
  }, []);

  const handleChange = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const addNewTask = async () => {
    if (!newTodo.title.trim()) return alert("Title required!");
    try {
      const { data } = await axios.post(
        "https://to-do-app-qfin.onrender.com/api/todos/add",
        newTodo,
        { withCredentials: true }
      );
      setTodos([data.todo, ...todos]);
      setNewTodo({ title: "", description: "", deadline: "", priority: "Low" });
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://to-do-app-qfin.onrender.com/api/todos/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const toggleDone = async (id, currentStatus) => {
    try {
      const { data } = await axios.put(
        `https://to-do-app-qfin.onrender.com/api/todos/${id}`,
        { isDone: !currentStatus },
        { withCredentials: true }
      );
      setTodos(
        todos.map((t) => (t._id === id ? { ...t, isDone: data.isDone } : t))
      );
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  return (
    <div className="todo-container">
      <h2>📝 Todo List</h2>
      <div className="todo-input">
        <input
          name="title"
          placeholder="Task title"
          value={newTodo.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleChange}
        />
        <input
          name="deadline"
          type="date"
          value={newTodo.deadline}
          onChange={handleChange}
        />
        <select
          name="priority"
          value={newTodo.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addNewTask}>Add Task</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo._id }
            className={`todo-item ${todo.isDone ? "done" : ""}`}
          >
            <div className="todo-text">
              <strong>{todo.title}</strong>
              <p>{todo.description}</p>
              <small>
                Deadline: {new Date(todo.deadline).toLocaleDateString()} |{" "}
                Priority: {todo.priority}
              </small>
            </div>
            <div className="todo-actions">
              <button onClick={() => toggleDone(todo._id, todo.isDone)}>
                {todo.isDone ? "Undo" : "Done"}
              </button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
