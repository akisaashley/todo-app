// backend/index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('./db.sqlite3');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    due_date TEXT,
    tags TEXT
  )`);
});

// List tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create task
app.post('/tasks', (req, res) => {
  const { title, due_date, tags } = req.body;
  db.run('INSERT INTO tasks (title, due_date, tags) VALUES (?, ?, ?)',
         [title, due_date || null, tags || null],
         function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(row);
    });
  });
});

// Update task
app.put('/tasks/:id', (req, res) => {
  const { title, completed, due_date, tags } = req.body;
  const id = req.params.id;
  db.run('UPDATE tasks SET title = ?, completed = ?, due_date = ?, tags = ? WHERE id = ?',
         [title, completed ? 1 : 0, due_date || null, tags || null, id],
         function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
