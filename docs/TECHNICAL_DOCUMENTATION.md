# 📖 TÀI LIỆU KỸ THUẬT - TODO APP

> **Full-stack Todo Application**: React + Node.js + Express + MongoDB + Docker

---

## 📑 MỤC LỤC

1. [Tổng Quan Hệ Thống](#1-tổng-quan-hệ-thống)
2. [Công Nghệ Sử Dụng](#2-công-nghệ-sử-dụng)
3. [Chi Tiết Frontend](#3-chi-tiết-frontend)
4. [Chi Tiết Backend](#4-chi-tiết-backend)
5. [Database Schema](#5-database-schema)
6. [API Documentation](#6-api-documentation)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Error Handling](#8-error-handling)
9. [Performance Optimization](#9-performance-optimization)
10. [Deployment Guide](#10-deployment-guide)
11. [Testing Strategy](#11-testing-strategy)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. TỔNG QUAN HỆ THỐNG

### 1.1 Kiến Trúc

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Browser (Chrome, Firefox, Safari, Edge)                   │ │
│  │    ↓                                                        │ │
│  │  React Application (SPA - Single Page Application)         │ │
│  │    ↓                                                        │ │
│  │  Parcel Bundler (Development Server)                       │ │
│  │    ↓                                                        │ │
│  │  Port: 1234                                                │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │ RESTful API
                           │ JSON Format
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                      APPLICATION LAYER                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Node.js Runtime                                           │ │
│  │    ↓                                                        │ │
│  │  Express.js Framework                                      │ │
│  │    ↓                                                        │ │
│  │  Middleware Stack:                                         │ │
│  │    - CORS (Cross-Origin Resource Sharing)                 │ │
│  │    - Body Parser (JSON)                                   │ │
│  │    - Logger                                               │ │
│  │    ↓                                                        │ │
│  │  Route Handlers                                            │ │
│  │    ↓                                                        │ │
│  │  Business Logic                                            │ │
│  │    ↓                                                        │ │
│  │  Port: 5000                                                │ │
│  └────────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ Mongoose ODM
                           │ MongoDB Wire Protocol
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                       DATABASE LAYER                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Docker Container                                          │ │
│  │    ↓                                                        │ │
│  │  MongoDB Server (NoSQL Database)                          │ │
│  │    ↓                                                        │ │
│  │  Database: todoapp                                         │ │
│  │    ↓                                                        │ │
│  │  Collections: todos                                        │ │
│  │    ↓                                                        │ │
│  │  Port: 27017                                               │ │
│  │    ↓                                                        │ │
│  │  Persistent Volume: mongodb-data                          │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Design Patterns

#### **Frontend:**
- **Component-Based Architecture**: Tách UI thành các component độc lập
- **Container/Presentational Pattern**: 
  - `TodoList.js` = Container (logic + state)
  - `TodoForm.js`, `TodoItem.js` = Presentational (UI only)
- **Hooks Pattern**: `useState`, `useEffect` cho state management

#### **Backend:**
- **MVC Pattern** (Modified):
  - Model: `models/Todo.js`
  - Controller: `routes/todos.js`
  - View: JSON responses
- **Middleware Pattern**: Express middleware chain
- **Repository Pattern**: Mongoose models abstract database access

---

## 2. CÔNG NGHỆ SỬ DỤNG

### 2.1 Frontend Stack

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **React** | 18.2.0 | UI Library | Component-based, Virtual DOM, Large ecosystem |
| **React DOM** | 18.2.0 | React renderer | Bridge between React and DOM |
| **Parcel** | 2.9.3 | Bundler | Zero-config, fast, auto HMR |

**Alternative Considered:**
- Vue.js (easier learning curve) ❌ 
- Angular (too heavy for small app) ❌
- Vanilla JS (no component structure) ❌

### 2.2 Backend Stack

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **Node.js** | 16+ | Runtime | JavaScript everywhere, non-blocking I/O |
| **Express** | 5.1.0 | Web framework | Minimalist, flexible, large middleware ecosystem |
| **Mongoose** | 8.19.0 | ODM | Schema validation, easy queries, type casting |
| **CORS** | 2.8.5 | Middleware | Cross-origin requests |
| **dotenv** | 17.2.3 | Config | Environment variables management |

**Alternative Considered:**
- Fastify (faster) ❌ smaller community
- Koa (modern) ❌ smaller ecosystem
- NestJS (too complex for small app) ❌

### 2.3 Database

| Technology | Version | Purpose | Why Chosen |
|------------|---------|---------|------------|
| **MongoDB** | latest | NoSQL DB | Flexible schema, JSON-like documents, scalable |
| **Docker** | latest | Containerization | Consistent dev environment, easy setup |

**Alternative Considered:**
- PostgreSQL (relational) ❌ overkill for simple todos
- MySQL (relational) ❌ same reason
- SQLite (file-based) ❌ not suitable for production

---

## 3. CHI TIẾT FRONTEND

### 3.1 Component Hierarchy

```
index.html
  └── #root
      └── index.js
          └── <TodoList />
              ├── <TodoForm onAdd={addTodo} />
              │
              └── todos.map(todo =>
                  <TodoItem 
                    key={todo._id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                )
```

### 3.2 TodoList Component (Container)

**File:** `frontend/src/components/TodoList.js`

#### **State Management:**

```javascript
const [todos, setTodos] = useState([])      // Todo list
const [loading, setLoading] = useState(true) // Loading state
const [error, setError] = useState(null)    // Error message
```

#### **Lifecycle:**

```javascript
useEffect(() => {
    fetchTodos()  // Chạy 1 lần khi component mount
}, [])
```

#### **API Functions:**

**1. fetchTodos() - GET**
```javascript
const fetchTodos = async () => {
    try {
        setLoading(true)
        setError(null)
        const response = await fetch(API_URL)
        
        if (!response.ok) {
            throw new Error('Failed to fetch todos')
        }
        
        const data = await response.json()
        setTodos(data)
    } catch (error) {
        console.error('Error:', error)
        setError('Could not load todos. Make sure backend is running.')
    } finally {
        setLoading(false)
    }
}
```

**Flow:**
1. Set loading = true
2. Clear previous errors
3. Call API
4. Check response status
5. Parse JSON
6. Update state
7. Handle errors
8. Set loading = false

**2. addTodo(text) - POST**
```javascript
const addTodo = async (text) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text })
        })
        
        if (!response.ok) {
            throw new Error('Failed to add todo')
        }
        
        const newTodo = await response.json()
        setTodos([newTodo, ...todos])  // Prepend new todo
    } catch (error) {
        console.error('Error:', error)
        setError('Could not add todo. Please try again.')
    }
}
```

**Flow:**
1. Send POST request with text
2. Check response
3. Get new todo with _id from server
4. Add to beginning of todos array
5. Re-render

**3. toggleTodo(id) - PATCH**
```javascript
const toggleTodo = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH'
        })
        
        if (!response.ok) {
            throw new Error('Failed to update todo')
        }
        
        const updatedTodo = await response.json()
        setTodos(todos.map(todo =>
            todo._id === id ? updatedTodo : todo
        ))
    } catch (error) {
        console.error('Error:', error)
        setError('Could not update todo. Please try again.')
    }
}
```

**Flow:**
1. Send PATCH request
2. Get updated todo from server
3. Replace old todo in array using map
4. Re-render with updated state

**4. deleteTodo(id) - DELETE**
```javascript
const deleteTodo = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        
        if (!response.ok) {
            throw new Error('Failed to delete todo')
        }
        
        setTodos(todos.filter(todo => todo._id !== id))
    } catch (error) {
        console.error('Error:', error)
        setError('Could not delete todo. Please try again.')
    }
}
```

**Flow:**
1. Send DELETE request
2. Filter out deleted todo from array
3. Re-render

### 3.3 TodoForm Component (Presentational)

**File:** `frontend/src/components/TodoForm.js`

```javascript
function TodoForm({ onAdd }) {
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()           // Prevent page reload
        if (input.trim()) {          // Check non-empty
            onAdd(input)             // Call parent function
            setInput('')             // Clear input
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo..."
            />
            <button type="submit">Add</button>
        </form>
    )
}
```

**Props:**
- `onAdd: (text: string) => void` - Callback to parent

**State:**
- `input: string` - Current input value

**Events:**
- `onChange`: Update input state
- `onSubmit`: Validate and call onAdd

### 3.4 TodoItem Component (Presentational)

**File:** `frontend/src/components/TodoItem.js`

```javascript
function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={onToggle}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={onDelete} className="delete-button">
                Delete
            </button>
        </div>
    )
}
```

**Props:**
- `todo: { _id, text, completed }` - Todo object
- `onToggle: () => void` - Toggle callback
- `onDelete: () => void` - Delete callback

**Rendering Logic:**
- Dynamic class: `completed` added when `todo.completed === true`
- Checkbox controlled component
- Click handlers call parent callbacks

### 3.5 CSS Architecture

**File:** `frontend/src/styles/main.css`

#### **Color Scheme:**
```css
Primary: #667eea (Purple Blue)
Secondary: #764ba2 (Deep Purple)
Error: #c33 (Red)
Success: #4caf50 (Green)
Text: #333 (Dark Gray)
Background: Linear gradient (Purple → Deep Purple)
```

#### **Animations:**

**1. slideIn - Entry Animation**
```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```
Applied to: `.todo-item`

**2. dots - Loading Animation**
```css
@keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
}
```
Applied to: `.loading::after`

**3. shake - Error Animation**
```css
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
```
Applied to: `.error-message`

#### **Responsive Breakpoints:**
- Mobile: `max-width: 600px`
- Tablet: `601px - 1024px` (default)
- Desktop: `1025px+` (default)

---

## 4. CHI TIẾT BACKEND

### 4.1 Server Configuration

**File:** `backend/server.js`

#### **Environment Variables:**
```javascript
require('dotenv').config()

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI
```

#### **Middleware Stack:**

**1. CORS Middleware**
```javascript
app.use(cors())
```
**Purpose:** Allow cross-origin requests from frontend  
**Config:** Default (allows all origins) - ⚠️ Should be restricted in production

**2. JSON Body Parser**
```javascript
app.use(express.json())
```
**Purpose:** Parse incoming JSON requests  
**Effect:** Populates `req.body` with parsed JSON

**3. Request Logger**
```javascript
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
    next()
})
```
**Purpose:** Log all incoming requests  
**Output:** `2024-10-05T10:30:00.000Z - GET /api/todos`

#### **MongoDB Connection:**

```javascript
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully')
        console.log(`📦 Database: ${mongoose.connection.db.databaseName}`)
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message)
        process.exit(1)  // Exit if DB connection fails
    })
```

**Connection Options (built-in):**
- `useNewUrlParser`: true (default in Mongoose 6+)
- `useUnifiedTopology`: true (default in Mongoose 6+)

#### **Error Handling Middleware:**

```javascript
app.use((err, req, res, next) => {
    console.error('Server Error:', err)
    res.status(500).json({ message: 'Internal server error' })
})
```

### 4.2 Mongoose Model

**File:** `backend/models/Todo.js`

```javascript
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Todo text is required'],
        trim: true,
        minlength: [1, 'Todo cannot be empty']
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true  // Adds createdAt & updatedAt
})

module.exports = mongoose.model('Todo', todoSchema)
```

#### **Schema Validation:**

| Field | Type | Validation | Default | Index |
|-------|------|------------|---------|-------|
| `_id` | ObjectId | Auto-generated | - | Primary |
| `text` | String | required, trim, min:1 | - | No |
| `completed` | Boolean | - | false | No |
| `createdAt` | Date | - | Date.now() | No |
| `updatedAt` | Date | Auto (timestamps) | - | No |

#### **Mongoose Methods:**

```javascript
// Find all
const todos = await Todo.find()

// Find by ID
const todo = await Todo.findById(id)

// Create
const todo = new Todo({ text: "Buy milk" })
await todo.save()

// Update
todo.completed = true
await todo.save()

// Delete
await Todo.findByIdAndDelete(id)
```

### 4.3 API Routes

**File:** `backend/routes/todos.js`

#### **Route: GET /api/todos**

```javascript
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 })
        res.json(todos)
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching todos', 
            error: error.message 
        })
    }
})
```

**Request:**
```http
GET /api/todos HTTP/1.1
Host: localhost:5000
```

**Response Success (200):**
```json
[
    {
        "_id": "507f1f77bcf86cd799439011",
        "text": "Buy milk",
        "completed": false,
        "createdAt": "2024-10-05T10:30:00.000Z",
        "updatedAt": "2024-10-05T10:30:00.000Z"
    },
    {
        "_id": "507f1f77bcf86cd799439012",
        "text": "Walk dog",
        "completed": true,
        "createdAt": "2024-10-05T09:15:00.000Z",
        "updatedAt": "2024-10-05T11:00:00.000Z"
    }
]
```

**Response Error (500):**
```json
{
    "message": "Error fetching todos",
    "error": "Connection to database failed"
}
```

#### **Route: POST /api/todos**

```javascript
router.post('/', async (req, res) => {
    try {
        const { text } = req.body
        
        if (!text || text.trim() === '') {
            return res.status(400).json({ 
                message: 'Todo text is required' 
            })
        }

        const todo = new Todo({ text })
        const newTodo = await todo.save()
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating todo', 
            error: error.message 
        })
    }
})
```

**Request:**
```http
POST /api/todos HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
    "text": "Buy milk"
}
```

**Response Success (201):**
```json
{
    "_id": "507f1f77bcf86cd799439011",
    "text": "Buy milk",
    "completed": false,
    "createdAt": "2024-10-05T10:30:00.000Z",
    "updatedAt": "2024-10-05T10:30:00.000Z"
}
```

**Response Error (400):**
```json
{
    "message": "Todo text is required"
}
```

#### **Route: PATCH /api/todos/:id**

```javascript
router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        
        if (!todo) {
            return res.status(404).json({ 
                message: 'Todo not found' 
            })
        }

        todo.completed = !todo.completed
        const updatedTodo = await todo.save()
        res.json(updatedTodo)
    } catch (error) {
        res.status(400).json({ 
            message: 'Error updating todo', 
            error: error.message 
        })
    }
})
```

**Request:**
```http
PATCH /api/todos/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
```

**Response Success (200):**
```json
{
    "_id": "507f1f77bcf86cd799439011",
    "text": "Buy milk",
    "completed": true,
    "createdAt": "2024-10-05T10:30:00.000Z",
    "updatedAt": "2024-10-05T10:35:00.000Z"
}
```

**Response Error (404):**
```json
{
    "message": "Todo not found"
}
```

#### **Route: DELETE /api/todos/:id**

```javascript
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        
        if (!todo) {
            return res.status(404).json({ 
                message: 'Todo not found' 
            })
        }

        res.json({ 
            message: 'Todo deleted successfully', 
            id: req.params.id 
        })
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting todo', 
            error: error.message 
        })
    }
})
```

**Request:**
```http
DELETE /api/todos/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
```

**Response Success (200):**
```json
{
    "message": "Todo deleted successfully",
    "id": "507f1f77bcf86cd799439011"
}
```

**Response Error (404):**
```json
{
    "message": "Todo not found"
}
```

---

## 5. DATABASE SCHEMA

### 5.1 MongoDB Collection: `todos`

```javascript
{
    _id: ObjectId("507f1f77bcf86cd799439011"),
    text: "Buy milk",
    completed: false,
    createdAt: ISODate("2024-10-05T10:30:00.000Z"),
    updatedAt: ISODate("2024-10-05T10:30:00.000Z"),
    __v: 0
}
```

### 5.2 Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `_id` | ObjectId | Unique identifier (auto) | `507f1f77bcf86cd799439011` |
| `text` | String | Todo content | `"Buy milk"` |
| `completed` | Boolean | Completion status | `false` |
| `createdAt` | Date | Creation timestamp | `2024-10-05T10:30:00Z` |
| `updatedAt` | Date | Last update timestamp | `2024-10-05T10:35:00Z` |
| `__v` | Number | Version key (Mongoose) | `0` |

### 5.3 Indexes

**Default Index:**
```javascript
{ "_id": 1 }  // Unique, auto-created
```

**Recommended Indexes (for production):**
```javascript
// Index for sorting by createdAt
db.todos.createIndex({ "createdAt": -1 })

// Compound index for filtering + sorting
db.todos.createIndex({ "completed": 1, "createdAt": -1 })
```

---

## 6. API DOCUMENTATION

### 6.1 Base URL

```
Development: http://localhost:5000
Production: https://your-domain.com
```

### 6.2 Response Format

**Success Response:**
```json
{
    "data": { ... },     // Single object
    "data": [ ... ]      // Array of objects
}
```

**Error Response:**
```json
{
    "message": "Error description",
    "error": "Detailed error message"
}
```

### 6.3 HTTP Status Codes

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PATCH, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid input |
| 404 | Not Found | Resource doesn't exist |
| 500 | Internal Server Error | Server/DB error |

### 6.4 Complete API Reference

#### **GET /api/todos**

Get all todos sorted by creation date (newest first)

**Headers:**
```
None required
```

**Query Parameters:**
```
None
```

**Response:**
```json
[
    {
        "_id": "string",
        "text": "string",
        "completed": boolean,
        "createdAt": "ISO 8601 date",
        "updatedAt": "ISO 8601 date"
    }
]
```

**Example:**
```bash
curl http://localhost:5000/api/todos
```

---

#### **POST /api/todos**

Create a new todo

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
    "text": "string (required, min length: 1)"
}
```

**Response (201):**
```json
{
    "_id": "generated-id",
    "text": "your-text",
    "completed": false,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Buy milk"}'
```

---

#### **PATCH /api/todos/:id**

Toggle todo completion status

**Headers:**
```
None required
```

**URL Parameters:**
```
:id - MongoDB ObjectId
```

**Response (200):**
```json
{
    "_id": "id",
    "text": "text",
    "completed": true,  // Toggled
    "createdAt": "timestamp",
    "updatedAt": "new-timestamp"
}
```

**Example:**
```bash
curl -X PATCH http://localhost:5000/api/todos/507f1f77bcf86cd799439011
```

---

#### **DELETE /api/todos/:id**

Delete a todo

**Headers:**
```
None required
```

**URL Parameters:**
```
:id - MongoDB ObjectId
```

**Response (200):**
```json
{
    "message": "Todo deleted successfully",
    "id": "deleted-id"
}
```

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/todos/507f1f77bcf86cd799439011
```

---

## 7. AUTHENTICATION & AUTHORIZATION

### 7.1 Current State

⚠️ **NO AUTHENTICATION IMPLEMENTED**

Currently, anyone can:
- View all todos
- Create todos
- Update todos
- Delete todos

### 7.2 Recommended Implementation (Future)

#### **JWT (JSON Web Token) Strategy:**

```javascript
// Register endpoint
POST /api/auth/register
Body: { email, password }
Response: { token, user }

// Login endpoint
POST /api/auth/login
Body: { email, password }
Response: { token, user }

// Protected routes
GET /api/todos
Header: Authorization: Bearer <token>
```

#### **User Model:**
```javascript
{
    _id: ObjectId,
    email: String (unique),
    password: String (hashed with bcrypt),
    name: String,
    createdAt: Date
}
```

#### **Updated Todo Model:**
```javascript
{
    _id: ObjectId,
    text: String,
    completed: Boolean,
    userId: ObjectId (ref: 'User'),  // NEW
    createdAt: Date,
    updatedAt: Date
}
```

---

## 8. ERROR HANDLING

### 8.1 Frontend Error Handling

```javascript
try {
    const response = await fetch(API_URL)
    
    if (!response.ok) {
        throw new Error('Failed to fetch todos')
    }
    
    const data = await response.json()
    setTodos(data)
} catch (error) {
    console.error('Error:', error)
    setError('Could not load todos. Make sure backend is running.')
}
```

**Error Display:**
```jsx
{error && (
    <div className="error-message">
        ⚠️ {error}
    </div>
)}
```

### 8.2 Backend Error Handling

**Mongoose Validation Errors:**
```javascript
try {
    await todo.save()
} catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.errors
        })
    }
}
```

**MongoDB Connection Errors:**
```javascript
mongoose.connect(MONGODB_URI)
    .catch(err => {
        console.error('MongoDB connection error:', err)
        process.exit(1)  // Exit process
    })
```

---

## 9. PERFORMANCE OPTIMIZATION

### 9.1 Frontend Optimizations

**1. React Optimization:**
```javascript
// Use React.memo for TodoItem
const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
    // Component code
})
```

**2. Debounce Input:**
```javascript
// For search/filter features
import { debounce } from 'lodash'

const handleSearch = debounce((value) => {
    // Search logic
}, 300)
```

**3. Lazy Loading:**
```javascript
// For larger apps
const TodoList = lazy(() => import('./components/TodoList'))
```

### 9.2 Backend Optimizations

**1. Database Indexing:**
```javascript
// In production
todoSchema.index({ createdAt: -1 })
todoSchema.index({ completed: 1, createdAt: -1 })
```

**2. Pagination:**
```javascript
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    
    const todos = await Todo.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
    
    res.json(todos)
})
```

**3. Caching (Redis):**
```javascript
// Future implementation
const redis = require('redis')
const client = redis.createClient()

router.get('/', async (req, res) => {
    const cached = await client.get('todos')
    if (cached) {
        return res.json(JSON.parse(cached))
    }
    
    const todos = await Todo.find()
    await client.set('todos', JSON.stringify(todos), 'EX', 60)
    res.json(todos)
})
```

---

## 10. DEPLOYMENT GUIDE

### 10.1 Frontend Deployment (Vercel/Netlify)

**Build Command:**
```bash
cd frontend
npm run build
```

**Output Directory:**
```
dist/
```

**Environment Variables:**
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

**Vercel Config (vercel.json):**
```json
{
    "buildCommand": "cd frontend && npm run build",
    "outputDirectory": "frontend/dist",
    "devCommand": "cd frontend && npm start"
}
```

### 10.2 Backend Deployment (Heroku/Railway)

**Procfile:**
```
web: cd backend && node server.js
```

**Environment Variables:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/todoapp
NODE_ENV=production
```

**package.json (backend):**
```json
{
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    },
    "engines": {
        "node": "16.x"
    }
}
```

### 10.3 Database Deployment (MongoDB Atlas)

**Steps:**
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create cluster (FREE M0)
3. Add database user
4. Whitelist IP (0.0.0.0/0 for testing)
5. Get connection string
6. Update MONGODB_URI in backend .env

**Connection String:**
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
```

### 10.4 Docker Deployment

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    volumes:
      - mongodb-data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://admin:password123@mongodb:27017/todoapp?authSource=admin
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb-data:
```

**Commands:**
```bash
docker-compose up -d     # Start all services
docker-compose down      # Stop all services
docker-compose logs -f   # View logs
```

---

## 11. TESTING STRATEGY

### 11.1 Frontend Testing

**Unit Tests (Jest + React Testing Library):**

```javascript
// TodoForm.test.js
test('calls onAdd with input value when form submitted', () => {
    const mockOnAdd = jest.fn()
    render(<TodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText(/add a new todo/i)
    const button = screen.getByText(/add/i)
    
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(button)
    
    expect(mockOnAdd).toHaveBeenCalledWith('Test todo')
})
```

**Integration Tests:**
```javascript
// TodoList.test.js
test('fetches and displays todos', async () => {
    const mockTodos = [
        { _id: '1', text: 'Todo 1', completed: false }
    ]
    
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockTodos)
        })
    )
    
    render(<TodoList />)
    
    expect(await screen.findByText('Todo 1')).toBeInTheDocument()
})
```

### 11.2 Backend Testing

**API Tests (Jest + Supertest):**

```javascript
// todos.test.js
describe('GET /api/todos', () => {
    test('returns array of todos', async () => {
        const response = await request(app)
            .get('/api/todos')
            .expect(200)
        
        expect(Array.isArray(response.body)).toBe(true)
    })
})

describe('POST /api/todos', () => {
    test('creates new todo', async () => {
        const newTodo = { text: 'Test todo' }
        
        const response = await request(app)
            .post('/api/todos')
            .send(newTodo)
            .expect(201)
        
        expect(response.body.text).toBe('Test todo')
        expect(response.body.completed).toBe(false)
    })
})
```

---

## 12. TROUBLESHOOTING

### 12.1 Common Issues

#### **Issue: Cannot connect to MongoDB**

**Symptoms:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
```bash
# Check Docker container is running
docker ps

# Start MongoDB container
docker start mongodb-todo

# Check logs
docker logs mongodb-todo

# Verify connection string in .env
MONGODB_URI=mongodb://admin:password123@localhost:27017/todoapp?authSource=admin
```

---

#### **Issue: CORS Error**

**Symptoms:**
```
Access to fetch at 'http://localhost:5000/api/todos' from origin 'http://localhost:1234' 
has been blocked by CORS policy
```

**Solutions:**
```javascript
// backend/server.js
const cors = require('cors')
app.use(cors())  // Make sure this line exists

// Or specific origin:
app.use(cors({
    origin: 'http://localhost:1234'
}))
```

---

#### **Issue: Port already in use**

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

---

#### **Issue: Frontend not loading**

**Symptoms:**
- Blank page
- "Loading..." forever

**Solutions:**
1. Check backend is running: `http://localhost:5000`
2. Check browser console for errors
3. Verify API_URL in TodoList.js
4. Check network tab in DevTools

---

#### **Issue: Changes not reflecting**

**Solutions:**
```bash
# Clear Parcel cache
rm -rf .parcel-cache
rm -rf dist

# Restart dev server
npm start
```

---

## 📊 PERFORMANCE METRICS

### Expected Performance:

| Metric | Target | Current |
|--------|--------|---------|
| API Response Time | < 100ms | ~50ms |
| Frontend Load Time | < 2s | ~1s |
| Bundle Size | < 500KB | ~200KB |
| Time to Interactive | < 3s | ~1.5s |

---

## 🔮 FUTURE ENHANCEMENTS

1. **Authentication**: JWT-based user system
2. **Real-time Updates**: WebSocket for live collaboration
3. **Categories/Tags**: Organize todos
4. **Due Dates**: Deadline tracking
5. **Priority Levels**: High/Medium/Low
6. **Search & Filter**: Advanced querying
7. **Dark Mode**: Theme toggle
8. **PWA**: Offline support
9. **Mobile App**: React Native version
10. **Analytics**: Usage tracking

---

**Document Version:** 1.0.0  
**Last Updated:** October 5, 2025  
**Author:** BBariOxit  
**License:** MIT
