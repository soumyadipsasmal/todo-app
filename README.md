# 📝 Todo App — Jenkins Practice Project

> React + Node.js + MongoDB + Jenkins CI/CD + Docker

---

## 📂 Project Structure

```
todo-app/
├── Jenkinsfile.frontend       # Jenkins pipeline for React
├── Jenkinsfile.backend        # Jenkins pipeline for Node.js
├── docker-compose.yml         # Run everything locally
│
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   └── index.js
│   ├── public/index.html
│   ├── Dockerfile
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── index.js           # Express server + MongoDB connect
    │   ├── models/Todo.js     # Mongoose schema
    │   └── routes/todo.routes.js  # CRUD API routes
    ├── Dockerfile
    ├── package.json
    └── .env
```

---

## 🚀 Run Locally (Without Docker)

### Backend
```bash
cd backend
npm install
npm run dev
# Running at http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm start
# Running at http://localhost:3000
```

---

## 🐳 Run With Docker Compose

```bash
docker compose up --build
```

- Frontend → http://localhost:3000
- Backend  → http://localhost:4000
- MongoDB  → mongodb://localhost:27017

---

## 🔌 API Endpoints

| Method | Route            | Description     |
|--------|------------------|-----------------|
| GET    | /health          | Health check    |
| GET    | /api/todos       | Get all todos   |
| POST   | /api/todos       | Create todo     |
| PUT    | /api/todos/:id   | Toggle complete |
| DELETE | /api/todos/:id   | Delete todo     |

---

## 🔑 Jenkins Credentials Required

| ID                | Type                   |
|-------------------|------------------------|
| DOCKER_HUB_CREDS  | Username with password |
| DEPLOY_SERVER_IP  | Secret text            |
| DEPLOY_SSH_KEY    | SSH private key        |
| MONGO_URI         | Secret text            |
