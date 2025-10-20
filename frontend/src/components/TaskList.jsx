import React, { useEffect, useState } from 'react';

export default function TaskList(){
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:4000/tasks');
    const data = await res.json();
    setTasks(data);
  };
  useEffect(() => {
    fetchTasks();
    const handler = () => fetchTasks();
    window.addEventListener('task-changed', handler);
    return () => window.removeEventListener('task-changed', handler);
  }, []);
  const toggle = async (task) => {
    await fetch(`http://localhost:4000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({...task, completed: task.completed ? 0 : 1})
    });
    fetchTasks();
  };
  const remove = async (id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };
  return (
    <div>
      {tasks.length === 0 && <div>No tasks yet</div>}
      {tasks.map(t => (
        <div key={t.id} style={{display:'flex', alignItems:'center', gap:10, padding:8, borderBottom:'1px solid #eee'}}>
          <input type="checkbox" checked={Boolean(t.completed)} onChange={() => toggle(t)} />
          <div style={{flex:1, textDecoration: t.completed ? 'line-through' : 'none'}}>{t.title}</div>
          <button onClick={() => remove(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
