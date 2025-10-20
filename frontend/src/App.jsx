// src/App.jsx
import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export default function App(){
  return (
    <div style={{padding:20, maxWidth:800, margin:'0 auto'}}>
      <h1>To-Do App</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

