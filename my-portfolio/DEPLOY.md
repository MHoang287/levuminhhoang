# Hướng dẫn Deploy Portfolio lên GitHub Pages 🚀

Tài liệu này hướng dẫn bạn cách đưa website của mình lên GitHub Pages một cách tự động sử dụng GitHub Actions.

## Bước 1: Cấu hình Vite

Trong file `vite.config.js`, bạn cần thêm thuộc tính `base`. 

1. Mở file `my-portfolio/vite.config.js`.
2. Sửa lại thành:
```javascript
export default defineConfig({
  plugins: [react()],
  base: "/TÊN_REPO_CỦA_BẠN/", // Ví dụ: base: "/my-portfolio/"
})
```
*Lưu ý: Thay `TÊN_REPO_CỦA_BẠN` bằng tên chính xác của repository trên GitHub.*

## Bước 2: Tạo GitHub Action Workflow

Tôi đã tạo sẵn file cấu hình tự động cho bạn tại đường dẫn `.github/workflows/deploy.yml`. Khi bạn push code lên nhánh `main`, GitHub sẽ tự động build và deploy website.

## Bước 3: Đưa code lên GitHub

Mở terminal và thực hiện các lệnh sau:

```bash
git add .
git commit -m "Setup deployment"
git push origin main
```

## Bước 4: Cấu hình trên GitHub Dashboard

1. Truy cập vào Repository của bạn trên GitHub.
2. Chọn **Settings** (Cài đặt).
3. Chọn mục **Pages** ở cột bên trái.
4. Ở phần **Build and deployment** > **Source**, hãy chọn **GitHub Actions**.

## Bước 5: Kiểm tra kết quả

1. Chọn tab **Actions** trên GitHub để xem quá trình deploy đang chạy.
2. Khi quá trình hoàn tất (hiện dấu tích xanh), quay lại mục **Settings** > **Pages**.
3. Bạn sẽ thấy link website của mình ở phía trên (thường có dạng: `https://username.github.io/repo-name/`).

---
**Chúc mừng! Website của bạn đã trực tuyến!** 🎉
