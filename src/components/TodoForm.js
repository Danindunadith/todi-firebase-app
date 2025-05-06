// Todo Form Component
// src/components/TodoForm.js

import React, { useState } from "react";
import "./TodoForm.css";

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="todo-input"
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  );
}

export default TodoForm;