# 🚀 QUICK START GUIDE

Hướng dẫn nhanh để chạy dự án Todo App trong 5 phút!

---

## ✅ KIỂM TRA YÊU CẦU

```powershell
# Kiểm tra Node.js
node --version
# Yêu cầu: v16 trở lên

# Kiểm tra npm
npm --version

# Kiểm tra Docker
docker --version
```

---

## 📦 BƯỚC 1: CLONE DỰ ÁN

```powershell
git clone https://github.com/BBariOxit/TodoApp-react.git
cd TodoApp-react\todo-app
```

---

## 🐳 BƯỚC 2: CHẠY MONGODB (DOCKER)

**⚠️ BẢO MẬT:** Password `password123` dưới đây chỉ dùng cho **development local**. 

**Cho production:** Thay bằng password mạnh (16+ ký tự, chứa chữ hoa, số, ký tự đặc biệt)

**Lệnh một dòng (PowerShell):**

```powershell
docker run -d --name mongodb-todo -p 27017:27017 `
  -e MONGO_INITDB_ROOT_USERNAME=admin `
  -e MONGO_INITDB_ROOT_PASSWORD=password123 `
  -v mongodb-data:/data/db mongo:latest
```

**Kiểm tra:**

```powershell
docker ps
# Phải thấy container "mongodb-todo" đang chạy
```

**Nếu container đã tồn tại:**

```powershell
docker start mongodb-todo
```

---

## 🔧 BƯỚC 3: SETUP BACKEND

**Mở Terminal 1:**

```powershell
cd backend

# Cài dependencies (chỉ lần đầu)
npm install

# Chạy server
npm run dev
```

**Kết quả mong đợi:**

```
✅ Connected to MongoDB successfully
📦 Database: todoapp
🚀 Server running on http://localhost:5000
📝 API endpoints: http://localhost:5000/api/todos
```

**Test API:**

Mở trình duyệt: http://localhost:5000

Thấy:
```json
{
  "message": "Todo API is running",
  "endpoints": { ... }
}
```

✅ Backend OK!

---

## ⚛️ BƯỚC 4: SETUP FRONTEND

**Mở Terminal 2:**

```powershell
cd frontend

# Cài dependencies (chỉ lần đầu)
npm install

# Chạy dev server
npm start
```

**Kết quả mong đợi:**

```
Server running at http://localhost:1234
✨ Built in 2.5s
```

**Mở trình duyệt:**

```
http://localhost:1234
```

Thấy giao diện Todo App → ✅ HOÀN THÀNH!

---

## 🎯 KIỂM TRA CHỨC NĂNG

1. **Thêm todo:**
   - Nhập "Buy milk"
   - Click "Add"
   - → Todo xuất hiện

2. **Toggle completed:**
   - Click checkbox
   - → Text gạch ngang

3. **Xóa todo:**
   - Click "Delete"
   - → Todo biến mất

4. **Reload trang:**
   - F5
   - → Todos vẫn còn (lưu trong MongoDB)

---

## 🛑 DỪNG ỨNG DỤNG

**Dừng Frontend:**
- Terminal 2: `Ctrl + C`

**Dừng Backend:**
- Terminal 1: `Ctrl + C`

**Dừng MongoDB:**
```powershell
docker stop mongodb-todo
```

**Khởi động lại sau:**
```powershell
# Terminal 1
docker start mongodb-todo
cd backend
npm run dev

# Terminal 2
cd frontend
npm start
```

---

## 🐛 TROUBLESHOOTING

### ❌ Lỗi: "MongoDB connection error"

**Nguyên nhân:** Docker container chưa chạy

**Giải pháp:**
```powershell
docker start mongodb-todo
docker ps  # Kiểm tra
```

---

### ❌ Lỗi: "Port 5000 already in use"

**Nguyên nhân:** Backend đang chạy ở terminal khác

**Giải pháp:**
```powershell
# Tìm process
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F

# Hoặc đổi port trong backend/.env
PORT=5001
```

---

### ❌ Lỗi: "CORS error"

**Nguyên nhân:** Backend chưa chạy hoặc CORS chưa config

**Giải pháp:**
1. Kiểm tra backend chạy: http://localhost:5000
2. Verify `app.use(cors())` trong `backend/server.js`

---

### ❌ Lỗi: "Could not load todos"

**Nguyên nhân:** Frontend không kết nối được backend

**Giải pháp:**
1. Check backend chạy: http://localhost:5000
2. Check console browser (F12) xem lỗi gì
3. Verify API_URL trong `TodoList.js`: `http://localhost:5000/api/todos`

---

### ❌ Frontend hiển thị trắng

**Giải pháp:**
```powershell
# Xóa cache
cd frontend
Remove-Item -Path .parcel-cache -Recurse -Force
Remove-Item -Path dist -Recurse -Force

# Restart
npm start
```

---

## 📊 TÓM TẮT PORTS

| Service | Port | URL |
|---------|------|-----|
| Frontend | 1234 | http://localhost:1234 |
| Backend | 5000 | http://localhost:5000 |
| MongoDB | 27017 | localhost:27017 |

---

## 🎓 NEXT STEPS

Sau khi app chạy thành công, bạn có thể:

1. **Đọc tài liệu:**
   - `docs/PROJECT_STRUCTURE.md` - Hiểu cấu trúc dự án
   - `docs/TECHNICAL_DOCUMENTATION.md` - Tài liệu kỹ thuật

2. **Thử features:**
   - Thêm nhiều todos
   - Toggle completed
   - Xóa todos
   - Reload trang để test persistence

3. **Modify code:**
   - Thay đổi styles trong `frontend/src/styles/main.css`
   - Thêm field mới vào Todo model
   - Thêm filter (All/Active/Completed)

4. **Deploy:**
   - Frontend → Vercel/Netlify
   - Backend → Heroku/Railway
   - Database → MongoDB Atlas

---

## 💡 TIPS

**Xem logs realtime:**
```powershell
# MongoDB logs
docker logs -f mongodb-todo

# Backend logs (đã có trong terminal)

# Frontend logs (đã có trong terminal)
```

**Xem data trong MongoDB:**

**Option 1: MongoDB Compass (GUI)**
1. Download: https://www.mongodb.com/try/download/compass
2. Connection string: `mongodb://<username>:<password>@localhost:27017/?authSource=admin`
3. Connect → Database `todoapp` → Collection `todos`
4. Thay `<username>` và `<password>` bằng credentials thực tế từ file `.env`

**Option 2: Docker exec (CLI)**
```powershell
docker exec -it mongodb-todo mongosh -u admin -p password123 --authenticationDatabase admin

# In mongosh:
use todoapp
db.todos.find().pretty()
```

---

## 📞 SUPPORT

**Gặp lỗi?**
1. Check `docs/TECHNICAL_DOCUMENTATION.md` section 12 (Troubleshooting)
2. Xem logs trong terminal
3. Check browser console (F12)
4. Create issue trên GitHub

---

**Happy Coding! 🎉**

**Last Updated:** October 5, 2025  
**Version:** 1.0.0
