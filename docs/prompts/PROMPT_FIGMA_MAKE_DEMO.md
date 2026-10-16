# 🎨 PROMPT TẠO GIAO DIỆN DEMO Ý TƯỞNG TẬP TRUNG (FIGMA MAKE / AI PROTOTYPE)
## DỰ ÁN: URBANSHIELD LITE – NHÓM SINGLENODE (HACKATHON SGU 2026)

> **Mục tiêu:** Cung cấp prompt tinh gọn, tập trung 100% vào **Giao diện Camera mô phỏng trực quan** và **2 tính năng tương tác thực tế** (Đo ngập bánh xe & Thử nghiệm ngã xe 5s).  
> **Lược bỏ triệt để:** Không còn các thẻ thông số kỹ thuật rườm rà (Model, CPU, RAM-Only, FPS, IP...) gây xao nhãng ở thanh tiêu đề.  
> **Phong cách:** **Clean Light Mode** (nền sáng Apple-style, thẻ trắng viền xám nhẹ tinh tế, độ dài dưới 1.600 ký tự).

---

## 🚀 1. PROMPT TIẾNG ANH (1.472 KÝ TỰ - KHUYÊN DÙNG CHO FIGMA MAKE)
*(Dán trực tiếp vào ô prompt của Figma Make / AI Prototype):*

```text
Create a clean, focused interactive demo for "UrbanShield Lite" - a civic alert system for street flooding and motorbike fall detection. Minimalist light theme (Clean white background, no clutter, no technical spec cards).

Top Header (Minimal):
- Title: "UrbanShield Lite"
- Subtitle: "Demo giám sát ngập nước & ngã xe máy"
- (DO NOT add any technical badges, specs, IP addresses, or metadata cards in the header).

Main Interface (2 Columns):

1. Left: Interactive Alley Camera Viewport
- Simulated alley scene with motorbike and person with AI bounding boxes.
- Two interactive control modes at the bottom:
  * Mode 1: [Thử nghiệm Ngập nước]
    - Slider from 0cm to 40cm.
    - Water level visually rises over the motorbike wheel.
    - Real-time indicator on wheel:
      • Under 10cm: Green badge "Bình thường"
      • 10 - 20cm: Amber badge "Nước chạm ống xả"
      • Over 20cm: Red flashing badge "Nguy cơ chết máy!" -> triggers alert.
  * Mode 2: [Thử nghiệm Ngã xe]
    - Button: "Mô phỏng ngã xe" -> Person posture turns horizontal (red box), starts 5s countdown timer.
    - Interactive action: Button "Người tự đứng dậy" (immediately cancels alarm, shows green toast "Đã hủy cảnh báo: Tránh báo giả") OR let countdown reach 0 (triggers red emergency alarm).

2. Right: Live Alert Notification & Mini Map
- Telegram Bot preview card: Pops up automatically when water > 20cm or when fall countdown finishes. Shows snapshot, alert type, and "Xem vị trí" button.
- Simple clean map showing alley camera pin changing color (Green -> Amber -> Red).
```

---

## 🇻🇳 2. PROMPT TIẾNG VIỆT (1.448 KÝ TỰ - BẢN THUẦN VIỆT TƯƠNG ĐƯƠNG)

```text
Tạo giao diện demo tương tác gọn gàng, tập trung cho "UrbanShield Lite" (Hệ thống cảnh báo ngập nước & ngã xe máy ngõ hẻm). Phong cách giao diện sáng (Light mode) tối giản, sạch sẽ, không chèn các thẻ thông số kỹ thuật gây xao nhãng.

Thanh tiêu đề (Rất đơn giản, không thẻ phụ):
- Tên ứng dụng: "UrbanShield Lite"
- Phụ đề: "Mô phỏng giám sát ngập nước & ngã xe máy"
- TUYỆT ĐỐI KHÔNG thêm các thẻ thông số như Model, CPU, RAM, FPS, IP hay vị trí ở thanh trên cùng.

Bố cục chính (2 Cột):
1. Cột trái: Màn hình mô phỏng Camera ngõ hẻm (Khu vực tương tác chính)
- Hình ảnh ngõ hẻm có người và xe máy kèm khung nhận diện AI.
- 2 công cụ tương tác ngay dưới màn hình:
  * Tương tác ngập nước:
    - Thanh trượt mực nước 0 - 40cm.
    - Nước dâng lên bánh xe theo thời gian thực.
    - Nhãn trên bánh xe tự đổi màu: Dưới 10cm hiện Xanh "Bình thường", 10-20cm hiện Vàng "Nước chạm ống xả", Trên 20cm hiện Đỏ nhấp nháy "Nguy cơ chết máy" -> tự kích hoạt cảnh báo.
  * Tương tác ngã xe:
    - Nút "Mô phỏng ngã xe": Dáng người ngã ngang, hiện bộ đếm ngược 5 giây.
    - Nút "Người tự đứng dậy": Bấm vào dừng đếm ngay, báo "Đã hủy: Tránh báo giả thành công". Nếu để hết 5s thì kích hoạt chuông báo động đỏ.

2. Cột phải: Khung tin nhắn cảnh báo Telegram & Bản đồ nhỏ
- Thẻ tin nhắn Telegram tự bật ra khi có sự cố (kèm ảnh hiện trường và nút xem vị trí).
- Bản đồ ngõ hẻm thu nhỏ đổi màu điểm camera (Xanh -> Vàng -> Đỏ).
```
