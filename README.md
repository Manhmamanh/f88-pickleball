# F88 Pickleball Club - Đăng ký đánh đôi

## 🚀 Cách Deploy

### 1. Google Apps Script (Backend API)

1. Vào https://script.google.com/
2. Tạo project mới, copy nội dung file `Code.gs` vào
3. Lưu → **Deploy** → **New deployment**
4. Chọn type: **Web app**
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Deploy → copy URL (dạng: `https://script.google.com/macros/s/.../exec`)
6. Mở file `index.html`, thay `YOUR_APPS_SCRIPT_WEB_APP_URL` bằng URL vừa copy

### 2. Host Landing Page

Cách đơn giản: dùng **GitHub Pages** hoặc **Cloudflare Pages**

**GitHub Pages:**
```bash
git init
git add .
git commit -m "F88 Pickleball registration"
# Tạo repo trên GitHub, push lên
# Settings → Pages → deploy từ main branch
```

**Hoặc Vercel/Netlify:** kéo thả folder vào.

## 🏓 Cách sử dụng

- Mở URL landing page
- Điền tên 4 thành viên (2 đội)
- Chọn mức cược (bội số 10k)
- Bấm đăng ký → dữ liệu tự động ghi vào Google Sheet

## 📊 Google Sheet

https://docs.google.com/spreadsheets/d/1bYzGiBg7iTSPX0r3CtgTDJwIGIVcXuTObUp-ODSTasE/edit
