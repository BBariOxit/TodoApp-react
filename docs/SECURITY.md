# 🔒 HƯỚNG DẪN BẢO MẬT - SECURITY GUIDE

**Quan trọng:** Đọc kỹ trước khi deploy production!

---

## ⚠️ CẢNH BÁO QUAN TRỌNG

### **1. KHÔNG BAO GIỜ COMMIT SECRETS VÀO GIT**

❌ **KHÔNG được commit:**
- Passwords
- API keys
- Database credentials
- Private keys
- Access tokens
- Environment variables có thông tin nhạy cảm

✅ **Nên làm:**
- Sử dụng `.env` files (và thêm vào `.gitignore`)
- Sử dụng environment variables
- Sử dụng secrets management tools

---

## 🔐 PASSWORDS TRONG DỰ ÁN NÀY

### **Development (Local)**

**MongoDB Password mặc định:**
```
Username: admin
Password: password123
```

**⚠️ Chỉ dùng cho:**
- Development trên máy local
- Testing
- Demo

**❌ KHÔNG dùng cho:**
- Production
- Public servers
- Shared environments

---

### **Production**

**Tạo password mạnh:**

```bash
# Dùng OpenSSL
openssl rand -base64 32

# Dùng Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Kết quả mẫu:
# K9$mPz!x2@Lq8#WnR7vT&Yz3@Jb4*Qc
```

**Yêu cầu password production:**
- ✅ Tối thiểu 16 ký tự
- ✅ Chữ hoa + chữ thường
- ✅ Số
- ✅ Ký tự đặc biệt (!@#$%^&*)
- ✅ Không dùng từ điển
- ✅ Không dùng thông tin cá nhân

---

## 📝 CÁCH SỬ DỤNG .env AN TOÀN

### **Backend .env**

```env
# backend/.env
PORT=5000
NODE_ENV=production

# MongoDB Credentials (THAY ĐỔI CHO PRODUCTION!)
MONGODB_USERNAME=your_secure_username
MONGODB_PASSWORD=your_super_secure_password_here_min_16_chars

# MongoDB URI
MONGODB_URI=mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017/todoapp?authSource=admin

# Session Secret
SESSION_SECRET=your_random_session_secret_here

# JWT Secret (nếu dùng authentication)
JWT_SECRET=your_jwt_secret_min_32_chars
```

### **Đảm bảo .gitignore**

```gitignore
# Backend
backend/.env
backend/.env.*

# Frontend
frontend/.env
frontend/.env.*

# Root
.env
.env.local
.env.*.local
*.env
```

### **Verify không commit .env**

```bash
# Kiểm tra
git status

# Nếu thấy .env, xóa khỏi git
git rm --cached backend/.env
git commit -m "Remove .env from git"
```

---

## 🛡️ ĐỔI PASSWORD MONGODB

### **1. Trong Docker Container**

```bash
# Vào MongoDB shell
docker exec -it mongodb-todo mongosh -u admin -p password123 --authenticationDatabase admin

# Đổi password
use admin
db.changeUserPassword("admin", "NEW_SECURE_PASSWORD_HERE")
exit
```

### **2. Hoặc tạo user mới**

```bash
# Trong MongoDB shell
use admin
db.createUser({
  user: "produser",
  pwd: "SUPER_SECURE_PASSWORD_HERE",
  roles: [
    { role: "readWrite", db: "todoapp" },
    { role: "dbAdmin", db: "todoapp" }
  ]
})
```

### **3. Cập nhật .env**

```env
# backend/.env
MONGODB_URI=mongodb://produser:SUPER_SECURE_PASSWORD_HERE@localhost:27017/todoapp?authSource=admin
```

### **4. Restart Backend**

```bash
cd backend
npm run dev  # hoặc npm start
```

---

## 🌐 PRODUCTION DEPLOYMENT

### **1. MongoDB Atlas (Recommended)**

**Tại sao dùng Atlas:**
- ✅ Managed service (không cần quản lý server)
- ✅ Tự động backup
- ✅ Encryption at rest
- ✅ Network isolation
- ✅ Free tier available

**Setup:**

1. **Tạo account:** https://www.mongodb.com/cloud/atlas
2. **Tạo cluster** (chọn FREE M0 tier)
3. **Whitelist IP:** `0.0.0.0/0` (allow all - chỉ cho dev)
4. **Tạo user:** Username + Strong password
5. **Lấy connection string:**

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
```

6. **Cập nhật .env:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp
```

**⚠️ Lưu ý:**
- Không share connection string
- Sử dụng environment variables
- Không commit vào Git

---

### **2. Environment Variables trên Hosting**

**Heroku:**
```bash
heroku config:set MONGODB_URI="your-atlas-uri"
heroku config:set JWT_SECRET="your-jwt-secret"
```

**Vercel:**
```bash
vercel env add MONGODB_URI
# Nhập URI khi được hỏi
```

**Railway:**
```bash
# Thêm trong Dashboard → Variables
MONGODB_URI=your-atlas-uri
```

**Netlify:**
```bash
# Site settings → Build & deploy → Environment variables
```

---

## 🔍 KIỂM TRA BẢO MẬT

### **Checklist trước khi deploy:**

- [ ] `.env` files KHÔNG trong Git
- [ ] `.gitignore` có `.env`, `*.env`
- [ ] Password production khác development
- [ ] Password tối thiểu 16 ký tự
- [ ] Không có hardcoded secrets trong code
- [ ] CORS configured đúng origin
- [ ] HTTPS enabled (production)
- [ ] MongoDB user có quyền tối thiểu cần thiết
- [ ] Backup strategy có sẵn
- [ ] Monitoring & logging enabled

---

## 🚨 NẾU BỊ LỘ SECRET

### **Bước 1: Đổi ngay credentials**

```bash
# Đổi MongoDB password
docker exec -it mongodb-todo mongosh -u admin -p OLD_PASSWORD --authenticationDatabase admin
use admin
db.changeUserPassword("admin", "NEW_SECURE_PASSWORD")
```

### **Bước 2: Xóa khỏi Git history**

```bash
# Xóa file khỏi git
git rm --cached backend/.env

# Hoặc xóa khỏi toàn bộ history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin main --force
```

### **Bước 3: Rotate tất cả secrets**

- Đổi tất cả passwords
- Tạo lại API keys
- Regenerate tokens
- Update production environment

### **Bước 4: Audit logs**

- Check database access logs
- Review application logs
- Look for suspicious activity

---

## 📚 BEST PRACTICES

### **1. Principle of Least Privilege**

```javascript
// ❌ Không nên
db.createUser({
  user: "appuser",
  roles: ["root"]  // Quá nhiều quyền!
})

// ✅ Nên
db.createUser({
  user: "appuser",
  roles: [
    { role: "readWrite", db: "todoapp" }  // Chỉ quyền cần thiết
  ]
})
```

### **2. Separate Development & Production**

```env
# Development
MONGODB_URI=mongodb://localhost:27017/todoapp_dev

# Production
MONGODB_URI=mongodb+srv://prod:secure@cluster.mongodb.net/todoapp_prod
```

### **3. Use Secrets Management**

**For CI/CD:**
- GitHub Secrets
- GitLab CI/CD Variables
- CircleCI Environment Variables

**For Production:**
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault
- Google Secret Manager

### **4. Regular Security Audits**

```bash
# Check for vulnerable dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update
```

---

## 🔧 TOOLS HƯỠNG DẪN

### **1. git-secrets (Prevent commits)**

```bash
# Install
brew install git-secrets  # Mac
# hoặc download từ GitHub

# Setup
cd your-repo
git secrets --install
git secrets --register-aws  # Cho AWS keys
```

### **2. detect-secrets (Scan repo)**

```bash
# Install
pip install detect-secrets

# Scan
detect-secrets scan > .secrets.baseline

# Audit
detect-secrets audit .secrets.baseline
```

### **3. gitleaks (Find leaked secrets)**

```bash
# Install
brew install gitleaks  # Mac

# Scan
gitleaks detect --source . --verbose
```

---

## 📞 INCIDENT RESPONSE

**Nếu phát hiện secret bị lộ:**

1. **Immediate Actions (< 5 minutes):**
   - Revoke compromised credentials
   - Change all related passwords
   - Disable compromised API keys

2. **Short-term (< 1 hour):**
   - Audit access logs
   - Check for unauthorized access
   - Notify team members

3. **Long-term (< 24 hours):**
   - Root cause analysis
   - Update security procedures
   - Train team on best practices

4. **Follow-up:**
   - Document incident
   - Implement preventive measures
   - Review all other credentials

---

## ✅ SUMMARY

**Remember:**
- 🔒 Never commit secrets to Git
- 🔑 Use strong, unique passwords
- 📝 Use environment variables
- 🛡️ Regular security audits
- 🚨 Have incident response plan

**Key Command:**
```bash
# Always check before committing
git status
git diff
```

**Golden Rule:**
> If you're not sure if something is secret, **treat it as secret!**

---

**Last Updated:** October 5, 2025  
**Next Review:** Monthly  
**Contact:** security@your-domain.com (update this!)
