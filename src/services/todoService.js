// Todo Service
// src/services/todoService.js

import { 
    collection, 
    doc, 
    setDoc, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    query, 
    where 
  } from "firebase/firestore";
  import { db } from "../firebase";
  
  export const todoService = {
    // Get all todos for a specific user
    getUserTodos: async (userId) => {
      const todosRef = collection(db, "todos");
      const q = query(todosRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
  
    // Add a new todo
    addTodo: async (userId, todo) => {
      const todosRef = collection(db, "todos");
      return await addDoc(todosRef, {
        ...todo,
        userId,
        completed: false,
        createdAt: new Date()
      });
    },
  
    // Update a todo
    updateTodo: async (todoId, updates) => {
      const todoRef = doc(db, "todos", todoId);
      return await updateDoc(todoRef, updates);
    },
  
    // Delete a todo
    deleteTodo: async (todoId) => {
      const todoRef = doc(db, "todos", todoId);
      return await deleteDoc(todoRef);
    },
  
    // Toggle todo completion status
    toggleTodoComplete: async (todoId, currentStatus) => {
      const todoRef = doc(db, "todos", todoId);
      return await updateDoc(todoRef, {
        completed: !currentStatus
      });
    }
  };