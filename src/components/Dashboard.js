// Dashboard Component
// src/components/Dashboard.js

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { todoService } from "../services/todoService";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./Dashboard.css";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        if (currentUser) {
          const userTodos = await todoService.getUserTodos(currentUser.uid);
          setTodos(userTodos);
        }
      } catch (error) {
        setError("Failed to load todos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [currentUser]);

  const handleAddTodo = async (title) => {
    try {
      const newTodoRef = await todoService.addTodo(currentUser.uid, { title });
      const newTodo = {
        id: newTodoRef.id,
        title,
        completed: false,
        userId: currentUser.uid,
        createdAt: new Date()
      };
      setTodos([...todos, newTodo]);
    } catch (error) {
      setError("Failed to add todo");
      console.error(error);
    }
  };

  const handleToggleComplete = async (todoId, currentStatus) => {
    try {
      await todoService.toggleTodoComplete(todoId, currentStatus);
      setTodos(todos.map(todo => 
        todo.id === todoId ? { ...todo, completed: !currentStatus } : todo
      ));
    } catch (error) {
      setError("Failed to update todo");
      console.error(error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await todoService.deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      setError("Failed to delete todo");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError("Failed to log out");
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>My Todo List</h1>
        <div className="user-profile">
          <span>{currentUser.email}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <TodoForm onAddTodo={handleAddTodo} />

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : (
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDeleteTodo={handleDeleteTodo}
        />
      )}
    </div>
  );
}

export default Dashboard;