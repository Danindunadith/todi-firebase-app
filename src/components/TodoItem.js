// Todo Item Component
// src/components/TodoItem.js

import React from "react";
import "./TodoItem.css";

function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id, todo.completed)}
          className="todo-checkbox"
        />
        <span className="todo-title">{todo.title}</span>
      </div>
      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;