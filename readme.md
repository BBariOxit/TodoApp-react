# Todo App - Full Stack (React + Node.js + MongoDB)

Ứng dụng quản lý công việc (Todo) sử dụng React, Express, MongoDB và Docker.

## 📁 Cấu Trúc Dự Án

```
todo-app/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── TodoList.js  # Main container component
│   │   │   ├── TodoForm.js  # Form thêm todo
│   │   │   └── TodoItem.js  # Todo item component
│   │   ├── styles/
│   │   │   └── main.css     # Global styles
│   │   ├── utils/
│   │   │   └── storage.js   # LocalStorage utilities (legacy)
│   │   └── index.js         # Entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── .gitignore
│
├── backend/                  # Node.js + Express API
│   ├── models/
│   │   └── Todo.js          # Mongoose schema
│   ├── routes/
│   │   └── todos.js         # API routes
│   ├── server.js            # Express server
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── .gitignore
│
└── README.md                # This file
```

## 🚀 Cài Đặt và Chạy

### Yêu Cầu

- Node.js (v16+)
- Docker Desktop
- Git

### 1️⃣ Clone Repository

```bash
git clone https://github.com/BBariOxit/TodoApp-react.git
cd todo-app
```

### 2️⃣ Chạy MongoDB với Docker

```bash
docker run -d \
  --name mongodb-todo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -v mongodb-data:/data/db \
  mongo:latest
```

**Kiểm tra:**

```bash
docker ps
```

### 3️⃣ Cài Đặt Backend

```bash
cd backend
npm install
npm run dev
```

Server chạy tại: `http://localhost:5000`

### 4️⃣ Cài Đặt Frontend

Mở terminal mới:

```bash
cd frontend
npm install
npm start
```

App chạy tại: `http://localhost:1234`

## 📡 API Endpoints

| Method | Endpoint         | Mô tả            |
| ------ | ---------------- | ---------------- |
| GET    | `/api/todos`     | Lấy tất cả todos |
| POST   | `/api/todos`     | Tạo todo mới     |
| PATCH  | `/api/todos/:id` | Toggle completed |
| DELETE | `/api/todos/:id` | Xóa todo         |

## 🛠️ Scripts

### Backend

```bash
npm start       # Chạy production
npm run dev     # Chạy development (nodemon)
```

### Frontend

```bash
npm start       # Chạy dev server (Parcel)
npm run build   # Build production
```

## 🐳 Docker Commands

```bash
# Xem containers
docker ps

# Dừng MongoDB
docker stop mongodb-todo

# Khởi động lại
docker start mongodb-todo

# Xem logs
docker logs mongodb-todo

# Xóa container
docker rm mongodb-todo

# Xóa volume (MẤT DỮ LIỆU!)
docker volume rm mongodb-data
```

## 🔧 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb://admin:password123@localhost:27017/todoapp?authSource=admin
```

## 🎨 Tech Stack

- **Frontend:** React 18, Parcel
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Docker)
- **Styling:** CSS3

## 📝 Features

- ✅ Thêm, sửa, xóa todos
- ✅ Đánh dấu hoàn thành
- ✅ Lưu trữ vào MongoDB
- ✅ Real-time updates
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design

## 🐛 Troubleshooting

### MongoDB không kết nối được

```bash
docker start mongodb-todo
```

### CORS Error

Đảm bảo backend có `app.use(cors())`

### Port đã được sử dụng

Thay đổi PORT trong `.env` hoặc `package.json`

## 👨‍💻 Author

**BBariOxit**

- GitHub: [@BBariOxit](https://github.com/BBariOxit)

## 📄 License

MIT
