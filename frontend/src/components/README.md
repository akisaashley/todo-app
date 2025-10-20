# Todo App

## Overview
This is a simple web-based Todo App built with **React.js** for the frontend and **Node.js (Express)** for the backend.  
Users can add tasks, view them in a list, and the backend serves tasks via a REST API.



## Features
- Add tasks using a form
- Display tasks in a list
- Backend API to store and retrieve tasks
- JSON format for data exchange between frontend and backend



## Tech Stack
- Frontend: React.js
- Backend: Node.js with Express
- Data Storage: In-memory array (can be extended to JSON file or database)
- HTTP Requests: REST API (`/tasks` endpoint)


## Project Structure

todo-app/
├─ backend/
│  ├─ index.js           # Node.js server
├─ frontend/
│  ├─ src/
│  │  ├─ main.jsx        # Entry point
│  │  ├─ App.jsx         # Main App component
│  │  └─ components/
│  │      ├─ TaskForm.jsx
│  │      └─ TaskList.jsx
├─ README.md


---

## Running the App Locally

### 1. Backend
Open terminal in `backend` folder:

```bash
npm install       # Install dependencies
node index.js     # Start the server
````

* Server will run on **[http://localhost:4000](http://localhost:4000)**
* Test API endpoint: `http://localhost:4000/tasks`

### 2. Frontend

Open a new terminal in `frontend` folder:

```bash
npm install       # Install dependencies
npm run dev       # Start the frontend
```

 Open browser at [http://localhost:5173](http://localhost:5173)
 Add tasks and see them appear in the list

---

## Testing the App

### Using Browser

 Add tasks using the input form
 Tasks should appear immediately
 Alternatively Open DevTools  to see requests to `/tasks`

### Using curl

```bash
curl http://localhost:4000/tasks
```

* You should see tasks in 'JSON format'


## Notes
* Tasks are stored in-memory for now; restarting the backend will reset the list
* Can be extended to use a database for persistence




This README file describes my app, how to run it, and how to test it, fulfilling the submission requirements.





