<div align="center">

# 📝 Todo App - Full Stack Application

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey?logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

_A modern, full-stack Todo application built with React, Node.js, Express, and MongoDB_

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 About The Project

Todo App là ứng dụng quản lý công việc full-stack hiện đại, được xây dựng với kiến trúc client-server riêng biệt. Dự án này minh họa việc tích hợp React frontend với Node.js/Express backend và MongoDB database thông qua Docker containerization.

### ✨ Highlights

- 🎯 **Clean Architecture**: Tách biệt frontend/backend rõ ràng
- 🔄 **Real-time Updates**: Đồng bộ dữ liệu tức thì
- 🐳 **Docker Ready**: MongoDB containerized, dễ dàng deploy
- 🎨 **Modern UI**: Responsive design với CSS3 animations
- 🔒 **Best Practices**: Error handling, loading states, security guidelines

---

## ✨ Features

### Core Functionality

- ✅ **CRUD Operations**: Create, Read, Update, Delete todos
- ✅ **Task Management**: Add new tasks with form validation
- ✅ **Status Toggle**: Mark tasks as completed/incomplete
- ✅ **Persistent Storage**: Data stored in MongoDB with Docker volumes
- ✅ **Real-time Sync**: Instant UI updates after server changes

### Technical Features

- 🔄 RESTful API architecture
- 📡 CORS-enabled cross-origin requests
- ⚡ Fast development with hot-reload (Parcel + Nodemon)
- 🎨 Smooth animations and transitions
- 📱 Fully responsive design
- 🛡️ Error handling and loading states
- 🔐 Environment-based configuration

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18.2.0
- **Build Tool**: Parcel 2.9.3
- **Styling**: CSS3 (Custom animations)
- **HTTP Client**: Fetch API

### Backend

- **Runtime**: Node.js (v16+)
- **Framework**: Express 5.1.0
- **ODM**: Mongoose 8.19.0
- **Dev Tools**: Nodemon 3.1.10
- **Middleware**: CORS, express.json()

### Database

- **Database**: MongoDB (Docker)
- **Containerization**: Docker with persistent volumes

### Development Tools

- Git for version control
- Docker Desktop for containerization
- npm for package management

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop)
- **Git** - [Download](https://git-scm.com/)
- **npm** (comes with Node.js)

Verify installations:

```bash
node --version   # Should be v16+
npm --version    # Should be 7+
docker --version # Should be 20+
```

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/BBariOxit/TodoApp-react.git
cd todo-app
```

### 2️⃣ Setup MongoDB with Docker

Create and run a MongoDB container with persistent storage:

```bash
docker run -d \
  --name mongodb-todo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=<YOUR_USERNAME> \
  -e MONGO_INITDB_ROOT_PASSWORD=<YOUR_SECURE_PASSWORD> \
  -v mongodb-data:/data/db \
  mongo:latest
```

> **⚠️ Security Warning**: Replace `<YOUR_USERNAME>` and `<YOUR_SECURE_PASSWORD>` with your own credentials. **Never commit these to version control!**

**Verify MongoDB is running:**

```bash
docker ps
# You should see mongodb-todo in the list
```

### 3️⃣ Configure Backend Environment

Navigate to backend directory and create `.env` file:

```bash
cd backend
```

Create a `.env` file with the following content:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
# Format: mongodb://<username>:<password>@<host>:<port>/<database>?authSource=admin
MONGODB_URI=mongodb://<YOUR_USERNAME>:<YOUR_SECURE_PASSWORD>@localhost:27017/todoapp?authSource=admin
```

> **📝 Note**: Replace `<YOUR_USERNAME>` and `<YOUR_SECURE_PASSWORD>` with the credentials you used in Step 2.

### 4️⃣ Install Backend Dependencies

```bash
npm install
```

**Installed packages:**

- express: Web framework
- mongoose: MongoDB ODM
- cors: Cross-Origin Resource Sharing
- dotenv: Environment variable management
- nodemon: Development auto-reload (dev dependency)

### 5️⃣ Install Frontend Dependencies

Open a **new terminal** window:

```bash
cd frontend
npm install
```

**Installed packages:**

- react: UI library
- react-dom: React DOM renderer
- parcel: Zero-config bundler

---

## 💻 Usage

### Starting the Application

You need **two terminal windows** running simultaneously:

#### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

Expected output:

```
[nodemon] starting `node server.js`
Server running on port 5000
MongoDB Connected: localhost
```

**Backend will be available at**: `http://localhost:5000`

#### Terminal 2: Frontend Development Server

```bash
cd frontend
npm start
```

Expected output:

```
Server running at http://localhost:1234
✨ Built in XXXms
```

**Frontend will be available at**: `http://localhost:1234`

### Using the Application

1. Open your browser and navigate to `http://localhost:1234`
2. Enter a task in the input field
3. Click "Add" or press Enter
4. Click checkbox to mark task as complete/incomplete
5. Click "Delete" button to remove tasks
6. All changes are automatically saved to MongoDB

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Todos

```http
GET /api/todos
```

**Response:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "text": "Learn React",
    "completed": false,
    "createdAt": "2025-10-05T10:30:00.000Z",
    "updatedAt": "2025-10-05T10:30:00.000Z"
  }
]
```

#### 2. Create New Todo

```http
POST /api/todos
Content-Type: application/json
```

**Request Body:**

```json
{
  "text": "Build a Todo App"
}
```

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "text": "Build a Todo App",
  "completed": false,
  "createdAt": "2025-10-05T10:30:00.000Z",
  "updatedAt": "2025-10-05T10:30:00.000Z"
}
```

#### 3. Toggle Todo Completion

```http
PATCH /api/todos/:id
```

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "text": "Build a Todo App",
  "completed": true,
  "createdAt": "2025-10-05T10:30:00.000Z",
  "updatedAt": "2025-10-05T10:35:00.000Z"
}
```

#### 4. Delete Todo

```http
DELETE /api/todos/:id
```

**Response:**

```json
{
  "message": "Todo deleted"
}
```

#### 5. Health Check

```http
GET /
```

**Response:**

```json
{
  "message": "Todo API is running"
}
```

---

## 📁 Project Structure

```
todo-app/
│
├── frontend/                 # React Frontend Application
│   ├── src/
│   │   ├── components/      # React Components
│   │   │   ├── TodoList.js  # Main container with state management
│   │   │   ├── TodoForm.js  # Input form for adding todos
│   │   │   └── TodoItem.js  # Individual todo item display
│   │   ├── styles/
│   │   │   └── main.css     # Global styles and animations
│   │   ├── utils/
│   │   │   └── storage.js   # LocalStorage utilities (legacy)
│   │   └── index.js         # React entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   ├── .gitignore          # Git ignore rules
│   └── .parcelrc           # Parcel configuration
│
├── backend/                  # Node.js Backend API
│   ├── models/
│   │   └── Todo.js          # Mongoose schema and model
│   ├── routes/
│   │   └── todos.js         # Express route handlers
│   ├── server.js            # Express server setup
│   ├── .env                 # Environment variables (gitignored)
│   ├── .env.example         # Example environment file
│   ├── package.json         # Backend dependencies
│   └── .gitignore          # Git ignore rules
│
├── docs/                     # Documentation
│   ├── PROJECT_STRUCTURE.md # Architecture diagrams
│   ├── TECHNICAL_DOCUMENTATION.md
│   ├── QUICK_START.md       # 5-minute setup guide
│   ├── CHANGELOG.md         # Version history
│   └── SECURITY.md          # Security best practices
│
├── .gitignore               # Root gitignore
└── README.md                # This file
```

---

## 🎯 Available Scripts

### Backend Scripts

```bash
# Production mode
npm start

# Development mode with auto-reload
npm run dev
```

### Frontend Scripts

```bash
# Start development server (port 1234)
npm start

# Build for production
npm run build

# Clean cache
npm run clean
```

### Docker Commands

```bash
# List running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Stop MongoDB container
docker stop mongodb-todo

# Start existing container
docker start mongodb-todo

# View container logs
docker logs mongodb-todo

# Follow logs in real-time
docker logs -f mongodb-todo

# Remove container (stops if running)
docker rm -f mongodb-todo

# List volumes
docker volume ls

# Remove volume (⚠️ DELETES ALL DATA!)
docker volume rm mongodb-data

# Connect to MongoDB shell
docker exec -it mongodb-todo mongosh -u <YOUR_USERNAME> -p <YOUR_SECURE_PASSWORD>
```

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed

**Symptoms:**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**

1. Check if MongoDB container is running:
   ```bash
   docker ps
   ```
2. Start the container if stopped:
   ```bash
   docker start mongodb-todo
   ```
3. Verify credentials in `.env` match Docker environment variables

---

### Issue: CORS Error in Browser Console

**Symptoms:**

```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```

**Solution:**
Ensure backend has CORS middleware enabled in `server.js`:

```javascript
const cors = require("cors");
app.use(cors());
```

---

### Issue: Port Already in Use

**Symptoms:**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Option 1**: Change port in `backend/.env`:

```env
PORT=5001
```

**Option 2**: Kill process using the port (Windows PowerShell):

```powershell
# Find process
netstat -ano | findstr :5000

# Kill process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

---

### Issue: Frontend Shows "Loading..." Forever

**Causes:**

1. Backend server not running
2. Wrong API URL in frontend code
3. Network request blocked

**Solutions:**

1. Check backend is running at `http://localhost:5000`
2. Open browser DevTools → Network tab to see failed requests
3. Verify backend `.env` PORT matches frontend API calls in `TodoList.js`

---

### Issue: npm install Fails

**Solutions:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 🔒 Security Best Practices

### Environment Variables

- ✅ **DO**: Use `.env` files for sensitive data
- ✅ **DO**: Add `.env` to `.gitignore`
- ✅ **DO**: Provide `.env.example` template
- ❌ **DON'T**: Commit credentials to Git
- ❌ **DON'T**: Use default passwords in production

### MongoDB Security

- Use strong passwords (16+ characters, mixed case, numbers, symbols)
- Change default credentials immediately
- Use different credentials for development/production
- Enable MongoDB authentication
- Restrict network access in production

### Production Checklist

- [ ] Change all default credentials
- [ ] Use environment-specific `.env` files
- [ ] Enable HTTPS/TLS
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Set up proper logging
- [ ] Use MongoDB Atlas or secured MongoDB instance
- [ ] Enable Docker secrets for production

📖 **Read more**: See [`docs/SECURITY.md`](docs/SECURITY.md) for comprehensive security guidelines.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 📚 Additional Documentation

For more detailed information, check out:

- 📖 [Quick Start Guide](docs/QUICK_START.md) - Get running in 5 minutes
- 🏗️ [Project Structure](docs/PROJECT_STRUCTURE.md) - Architecture diagrams
- 📘 [Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md) - Comprehensive guide
- 📝 [Changelog](docs/CHANGELOG.md) - Version history and bug fixes
- 🔐 [Security Guide](docs/SECURITY.md) - Security best practices

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👨‍💻 Author

**BBariOxit**

- GitHub: [@BBariOxit](https://github.com/BBariOxit)
- Repository: [TodoApp-react](https://github.com/BBariOxit/TodoApp-react)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Shields.io](https://shields.io/) for badges

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by BBariOxit

</div>
