// Todo List Component
// src/components/TodoList.js

import React from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

function TodoList({ todos, onToggleComplete, onDeleteTodo }) {
  if (todos.length === 0) {
    return <div className="empty-list">No todos yet. Add some tasks!</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;