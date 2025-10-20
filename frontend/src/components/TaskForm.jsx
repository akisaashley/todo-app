import React, { useState } from 'react';

export default function TaskForm(){
  const [title, setTitle] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ title })
    });
    setTitle('');
    window.dispatchEvent(new Event('task-changed'));
  };
  return (
    <form onSubmit={submit} style={{marginBottom:20}}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button type="submit">Add</button>
    </form>
  );
}
