# 📁 CẤU TRÚC DỰ ÁN TODO APP

> **Full-stack Todo Application**: React + Node.js + Express + MongoDB + Docker

---

## 🏗️ TỔNG QUAN KIẾN TRÚC

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              FRONTEND (React + Parcel)                      │ │
│  │              Port: 1234                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS (REST API)
                           │ JSON Format
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SERVER (Node.js + Express)                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              BACKEND (Express Server)                       │ │
│  │              Port: 5000                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ Mongoose ODM
                           │ MongoDB Protocol
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│                  DATABASE (MongoDB in Docker)                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              MongoDB Container                              │ │
│  │              Port: 27017                                    │ │
│  │              Volume: mongodb-data                           │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📂 CẤU TRÚC THỨ MỤC

```
todo-app/                           # 🏠 Root dự án
│
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # Hướng dẫn sử dụng dự án
│
├── 📁 docs/                        # 📚 TÀI LIỆU DỰ ÁN
│   ├── PROJECT_STRUCTURE.md       # File này - Cấu trúc dự án
│   └── TECHNICAL_DOCUMENTATION.md  # Tài liệu kỹ thuật chi tiết
│
├── 📁 frontend/                    # ⚛️ REACT APPLICATION
│   │
│   ├── 📄 .gitignore              # Frontend gitignore
│   ├── 📄 package.json            # Dependencies: react, react-dom, parcel
│   ├── 📄 package-lock.json       # Lock file
│   ├── 📄 index.html              # HTML template
│   │
│   └── 📁 src/                    # Source code
│       │
│       ├── 📄 index.js            # 🎯 Entry point - ReactDOM.render()
│       │
│       ├── 📁 components/         # React Components
│       │   ├── 📄 TodoList.js    # 🔥 Main container (State + API)
│       │   ├── 📄 TodoForm.js    # Form input component
│       │   └── 📄 TodoItem.js    # Todo display component
│       │
│       ├── 📁 styles/
│       │   └── 📄 main.css       # Global CSS + Animations
│       │
│       └── 📁 utils/
│           └── 📄 storage.js     # LocalStorage helpers (legacy)
│
├── 📁 backend/                     # 🚀 NODE.JS + EXPRESS API
│   │
│   ├── 📄 .env                    # ⚠️ Environment variables (NOT in Git)
│   ├── 📄 .gitignore              # Backend gitignore
│   ├── 📄 package.json            # Dependencies: express, mongoose, cors, dotenv
│   ├── 📄 package-lock.json       # Lock file
│   ├── 📄 server.js               # 🔥 Main Express server
│   │
│   ├── 📁 models/                 # Mongoose Schemas
│   │   └── 📄 Todo.js            # Todo model definition
│   │
│   └── 📁 routes/                 # API Routes
│       └── 📄 todos.js           # CRUD endpoints
│
├── 📁 node_modules/               # Dependencies (auto-generated)
├── 📁 dist/                       # Build output (auto-generated)
└── 📁 .parcel-cache/              # Parcel cache (auto-generated)
```

---

## 🗂️ CHI TIẾT TỪNG THÀNH PHẦN

### **1. FRONTEND STRUCTURE**

```
frontend/
│
├── index.html                      # HTML Template
│   └── <div id="root"></div>     # React mount point
│
└── src/
    │
    ├── index.js                    # Entry Point
    │   ├── import React
    │   ├── import ReactDOM
    │   ├── import TodoList
    │   └── ReactDOM.render(<TodoList />, root)
    │
    ├── components/
    │   │
    │   ├── TodoList.js            # Container Component
    │   │   ├── State: todos[], loading, error
    │   │   ├── API Calls: fetchTodos(), addTodo(), toggleTodo(), deleteTodo()
    │   │   ├── Render: TodoForm + TodoItem[]
    │   │   └── Props: onAdd, onToggle, onDelete
    │   │
    │   ├── TodoForm.js            # Presentational Component
    │   │   ├── State: input
    │   │   ├── Props: onAdd(text)
    │   │   └── Render: <form> + <input> + <button>
    │   │
    │   └── TodoItem.js            # Presentational Component
    │       ├── Props: todo, onToggle, onDelete
    │       └── Render: <checkbox> + <text> + <button>
    │
    └── styles/
        └── main.css               # Styling
            ├── Layout
            ├── Colors & Gradients
            ├── Animations (slideIn, dots, shake)
            └── Responsive Design
```

**Component Hierarchy:**
```
App (index.js)
  └── TodoList (Container)
      ├── TodoForm (Input)
      └── TodoItem[] (Display)
          ├── TodoItem #1
          ├── TodoItem #2
          └── TodoItem #3
```

---

### **2. BACKEND STRUCTURE**

```
backend/
│
├── .env                           # Environment Config
│   ├── PORT=5000
│   └── MONGODB_URI=mongodb://...
│
├── server.js                      # Main Server File
│   ├── Express setup
│   ├── Middleware (CORS, JSON parser, Logger)
│   ├── MongoDB connection
│   ├── Routes registration
│   ├── Error handling
│   └── Server start (listen on port)
│
├── models/
│   └── Todo.js                    # Mongoose Schema
│       ├── text: String (required, trim)
│       ├── completed: Boolean (default: false)
│       ├── createdAt: Date (auto)
│       └── timestamps: true
│
└── routes/
    └── todos.js                   # API Endpoints
        ├── GET    /api/todos      → Find all todos
        ├── POST   /api/todos      → Create new todo
        ├── PATCH  /api/todos/:id  → Toggle completed
        └── DELETE /api/todos/:id  → Delete todo
```

**Server Flow:**
```
server.js start
  ↓
Load environment (.env)
  ↓
Connect to MongoDB
  ↓
Setup middleware (CORS, JSON)
  ↓
Register routes (/api/todos)
  ↓
Start listening on port 5000
  ↓
Ready to handle requests
```

---

### **3. DATABASE STRUCTURE**

```
MongoDB (Docker Container)
│
├── Database: todoapp
│   │
│   └── Collection: todos
│       │
│       ├── Document #1
│       │   ├── _id: ObjectId("507f1f77bcf86cd799439011")
│       │   ├── text: "Buy milk"
│       │   ├── completed: false
│       │   ├── createdAt: ISODate("2024-10-05T10:30:00Z")
│       │   └── updatedAt: ISODate("2024-10-05T10:30:00Z")
│       │
│       ├── Document #2
│       │   ├── _id: ObjectId("507f1f77bcf86cd799439012")
│       │   ├── text: "Walk the dog"
│       │   ├── completed: true
│       │   ├── createdAt: ISODate("2024-10-05T09:15:00Z")
│       │   └── updatedAt: ISODate("2024-10-05T11:00:00Z")
│       │
│       └── ...
│
└── Volume: mongodb-data (Persistent storage)
```

---

## 🔄 LUỒNG DỮ LIỆU (DATA FLOW)

### **1. LOAD TODOS (GET)**

```
┌─────────────────────────────────────────────────────────────────┐
│ FRONTEND                                                         │
│                                                                  │
│ Component Mount → useEffect()                                   │
│         ↓                                                        │
│ fetchTodos()                                                     │
│         ↓                                                        │
│ fetch('http://localhost:5000/api/todos')                        │
│         ↓                                                        │
│ setLoading(true)                                                │
└──────────┬──────────────────────────────────────────────────────┘
           │
           │ HTTP GET Request
           │
┌──────────▼──────────────────────────────────────────────────────┐
│ BACKEND                                                          │
│                                                                  │
│ Express receives request                                        │
│         ↓                                                        │
│ Middleware: CORS, JSON                                          │
│         ↓                                                        │
│ Route: GET /api/todos                                           │
│         ↓                                                        │
│ routes/todos.js → router.get('/')                               │
│         ↓                                                        │
│ await Todo.find().sort({ createdAt: -1 })                      │
└──────────┬──────────────────────────────────────────────────────┘
           │
           │ Mongoose Query
           │
┌──────────▼──────────────────────────────────────────────────────┐
│ DATABASE                                                         │
│                                                                  │
│ MongoDB: db.todos.find().sort({ createdAt: -1 })               │
│         ↓                                                        │
│ Return array of documents                                       │
└──────────┬──────────────────────────────────────────────────────┘
           │
           │ Response: [{ _id, text, completed, ... }, ...]
           │
┌──────────▼──────────────────────────────────────────────────────┐
│ BACKEND                                                          │
│                                                                  │
│ res.json(todos)                                                 │
└──────────┬──────────────────────────────────────────────────────┘
           │
           │ HTTP Response (JSON)
           │
┌──────────▼──────────────────────────────────────────────────────┐
│ FRONTEND                                                         │
│                                                                  │
│ const data = await response.json()                             │
│         ↓                                                        │
│ setTodos(data)                                                  │
│         ↓                                                        │
│ setLoading(false)                                               │
│         ↓                                                        │
│ Re-render → Display todos                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

### **2. ADD TODO (POST)**

```
┌─────────────────────────────────────────────────────────────────┐
│ FRONTEND                                                         │
│                                                                  │
│ User types "Buy milk" → Click "Add"                            │
│         ↓                                                        │
│ TodoForm: handleSubmit()                                        │
│         ↓                                                        │
│ onAdd("Buy milk") → TodoList.addTodo()                         │
│         ↓                                                        │
│ fetch(API_URL, {                                                │
│   method: 'POST',                                               │
│   body: JSON.stringify({ text: "Buy milk" })                   │
│ })                                                              │
└──────────┬──────────────────────────────────────────────────────┘
           │
           │ HTTP POST Request
           │ Body: { "text": "Buy milk" }
           │
┌──────────▼──────────────────────────────────────────────────────┐
│ BACKEND                                                          │
│                                                                  │
│ Route: POST /api/todos                                          │
│         ↓                                                        │
│ const { text } = req.body                                       │
│         ↓                                                        │
│ const todo = new Todo({ text })                                 │
│         ↓                                                        │
│ await todo.save()                                               │
└──────────┬──────────────────────────────────────────────────────┘
           │
           │ Mongoose Insert
           │
┌──────────▼──────────────────────────────────────────────────────┐
│ DATABASE                                                         │
│                                                                  │
│ Insert new document:                                            │
│ {                                                               │
│   _id: ObjectId("..."),                                         │
│   text: "Buy milk",                                             │
│   completed: false,                                             │
│   createdAt: Date.now()                                         │
│ }                                                               │
│         ↓                                                        │
│ Return saved document                                           │
└──────────┬──────────────────────────────────────────────────────┘
           │
           │ Response: { _id, text, completed, ... }
           │
┌──────────▼──────────────────────────────────────────────────────┐
│ BACKEND                                                          │
│                                                                  │
│ res.status(201).json(newTodo)                                   │
└──────────┬──────────────────────────────────────────────────────┘
           │
           │ HTTP 201 Created
           │
┌──────────▼──────────────────────────────────────────────────────┐
│ FRONTEND                                                         │
│                                                                  │
│ const newTodo = await response.json()                          │
│         ↓                                                        │
│ setTodos([newTodo, ...todos])                                   │
│         ↓                                                        │
│ Re-render → Show new todo at top                                │
└─────────────────────────────────────────────────────────────────┘
```

---

### **3. TOGGLE TODO (PATCH)**

```
User clicks checkbox
  ↓
TodoItem: onChange → onToggle(todo._id)
  ↓
TodoList: toggleTodo(id)
  ↓
fetch(`/api/todos/${id}`, { method: 'PATCH' })
  ↓
Backend: PATCH /api/todos/:id
  ↓
const todo = await Todo.findById(id)
  ↓
todo.completed = !todo.completed
  ↓
await todo.save()
  ↓
MongoDB: Update document
  ↓
Response: updated todo
  ↓
Frontend: Update state
  ↓
Re-render with strikethrough if completed
```

---

### **4. DELETE TODO (DELETE)**

```
User clicks "Delete" button
  ↓
TodoItem: onClick → onDelete(todo._id)
  ↓
TodoList: deleteTodo(id)
  ↓
fetch(`/api/todos/${id}`, { method: 'DELETE' })
  ↓
Backend: DELETE /api/todos/:id
  ↓
await Todo.findByIdAndDelete(id)
  ↓
MongoDB: Remove document
  ↓
Response: success message
  ↓
Frontend: setTodos(todos.filter(t => t._id !== id))
  ↓
Re-render without deleted todo
```

---

## 🌐 API ENDPOINTS DETAIL

### **Base URL:** `http://localhost:5000`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/todos` | Lấy tất cả todos | - | `[{ _id, text, completed, ... }]` |
| POST | `/api/todos` | Tạo todo mới | `{ text: string }` | `{ _id, text, completed, ... }` |
| PATCH | `/api/todos/:id` | Toggle completed | - | `{ _id, text, completed, ... }` |
| DELETE | `/api/todos/:id` | Xóa todo | - | `{ message: "Todo deleted" }` |

---

## 🔐 ENVIRONMENT VARIABLES

### **Frontend**
Không cần environment variables (hard-coded API URL)

### **Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://<username>:<password>@localhost:27017/todoapp?authSource=admin
```

---

## 📦 DEPENDENCIES

### **Frontend (package.json)**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "parcel": "^2.9.3"
  }
}
```

### **Backend (package.json)**
```json
{
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.19.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

---

## 🐳 DOCKER SETUP

### **MongoDB Container**

**⚠️ Security Note:** Example password below is for **development only**. Use strong password for production!

```bash
docker run -d \
  --name mongodb-todo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -v mongodb-data:/data/db \
  mongo:latest
```

**Parameters:**
- `-d`: Detached mode (background)
- `--name`: Container name
- `-p`: Port mapping (host:container)
- `-e`: Environment variables
- `-v`: Volume for data persistence
- `mongo:latest`: Image name

---

## 📊 STATE MANAGEMENT

### **Frontend State (TodoList.js)**

```javascript
const [todos, setTodos] = useState([])      // Array of todo objects
const [loading, setLoading] = useState(true) // Loading indicator
const [error, setError] = useState(null)    // Error message
```

**State Flow:**
```
Initial State
  ↓
{ todos: [], loading: true, error: null }
  ↓
After API call success
  ↓
{ todos: [{...}, {...}], loading: false, error: null }
  ↓
After API call error
  ↓
{ todos: [], loading: false, error: "Could not load todos..." }
```

---

## 🎨 CSS ARCHITECTURE

### **main.css Structure**

```css
/* 1. Reset & Base */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 2. Body & Layout */
body { background: gradient; min-height: 100vh; }

/* 3. Container */
.todo-container { background: white; padding: 2rem; }

/* 4. Form */
.todo-form { display: flex; gap: 10px; }

/* 5. Todo List */
.todo-list { max-height: 400px; overflow-y: auto; }

/* 6. Todo Item */
.todo-item { display: flex; padding: 15px; }
.todo-item.completed { text-decoration: line-through; }

/* 7. Buttons */
.todo-button { background: gradient; }
.delete-button { background: red-gradient; }

/* 8. Loading & Error */
.loading { animation: dots; }
.error-message { background: red; }

/* 9. Animations */
@keyframes slideIn { ... }
@keyframes dots { ... }
@keyframes shake { ... }

/* 10. Responsive */
@media (max-width: 600px) { ... }
```

---

## 🔒 SECURITY CONSIDERATIONS

### **What's Secured:**
- ✅ CORS enabled (only specific origins)
- ✅ Environment variables in `.env` (not in Git)
- ✅ Input validation (trim, required)
- ✅ Error handling (try-catch)

### **What's NOT Secured (TODO for production):**
- ❌ No authentication (anyone can CRUD)
- ❌ No rate limiting
- ❌ No input sanitization (XSS protection)
- ❌ No HTTPS
- ❌ MongoDB credentials in plain text

---

## 📈 SCALABILITY

### **Current Architecture:**
- Single server
- Single database
- No caching
- No load balancing

### **Future Improvements:**
- Add Redis caching
- Implement JWT authentication
- Add rate limiting
- Use MongoDB Atlas (cloud)
- Deploy with Docker Compose
- Add CI/CD pipeline
- Implement WebSocket for real-time updates

---

## 📝 FILE OWNERSHIP

| Component | Owner | Responsibility |
|-----------|-------|----------------|
| `frontend/` | Frontend Dev | UI/UX, State, API calls |
| `backend/` | Backend Dev | API, Business logic, DB |
| `docs/` | Tech Lead | Documentation |
| `README.md` | Project Manager | Overview, Setup |

---

**Last Updated:** October 5, 2025  
**Version:** 1.0.0  
**Author:** BBariOxit
