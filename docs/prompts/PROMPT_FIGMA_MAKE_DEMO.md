# 🎨 PROMPT TẠO GIAO DIỆN DEMO Ý TƯỞNG TRỰC QUAN (FIGMA MAKE)
## DỰ ÁN: URBANSHIELD LITE – NHÓM SINGLENODE (HACKATHON SGU 2026)

> **Định hướng thiết kế:** Vào thẳng trọng tâm giao diện **Sản phẩm Giám sát Thực tế** (Dashboard 1 màn hình tập trung tương tác thử nghiệm tính năng ngập nước & ngã xe), **loại bỏ hoàn toàn các tab lý thuyết / sơ đồ pipeline rườm rà**.  
> **Phong cách:** **Clean Light Mode** (nền sáng Apple-style, thẻ trắng viền xám nhẹ tinh tế).  
> **Giới hạn độ dài:** Cả 2 bản đều kiểm soát nghiêm ngặt **dưới 1.800 ký tự** (chuẩn < 2.000 ký tự của Figma Make).

---

## 🚀 1. PROMPT TIẾNG ANH (1.743 KÝ TỰ - TẬP TRUNG 100% VÀO SẢN PHẨM & TƯƠNG TÁC)
*(Dán trực tiếp vào ô "What do you want to make?" trên Figma Make):*

```text
Build a focused, interactive civic-tech live monitoring demo dashboard for "UrbanShield Lite" (AI camera system for alleyway flood and fall detection by SingleNode). Clean Apple-style light theme (White #FFFFFF, Canvas #F8FAFC, Slate borders #E2E8F0, Accent Blue #2563EB).

Layout: Single-screen dashboard split into 2 main sections:

1. Main AI Camera Viewport (Interactive Playground):
- Video screen simulating a live alleyway camera feed with AI bounding boxes (person, motorbike, wheels).
- Top scenario toggles: [Flood Scenario] [Fall Accident Scenario]

* In [Flood Scenario]:
  - Interactive water slider (0 to 40 cm).
  - Real-time visual: Water rises over the motorbike wheel.
  - Dynamic AI overlay on wheel shows: "Wheel Ø50cm | Depth: [X]cm" with status:
    • <10cm Green: "An toàn (Bình thường)"
    • 10-20cm Amber: "Chú ý chạm pô xe"
    • >20cm Red pulsing: "Nguy cơ chết máy!" -> triggers instant alert.

* In [Fall Accident Scenario]:
  - Button: "Simulate Motorbike Fall".
  - Shows red horizontal AI box on fallen person (Fall W/H: 1.35), with live 5-second countdown timer on screen: "Kiểm tra bất động: 5s... 4s...".
  - 2 interactive test buttons:
    a) "Người đứng dậy": cancels countdown, turns box green, displays toast "Hủy cảnh báo: Chống báo giả thành công!".
    b) Let timer expire: triggers flashing red SOS emergency alert.

2. Real-Time Incident Panel & Map:
- Live Telegram alert feed: dynamically pops up an incident card when triggered (with frame snapshot, address "Hẻm 254 Nguyễn Văn Cừ, Q5", GPS, timestamp, and "Điều phối hỗ trợ" button).
- Clean alley mini-map with camera node pin changing color (Green -> Amber -> Red).
- Status bar: "Trạm 01 - Hẻm 254 NVC | YOLOv8n CPU | 28.5 FPS | RAM Buffer".
```

---

## 🇻🇳 2. PROMPT TIẾNG VIỆT (1.719 KÝ TỰ - NGẮN GỌN, TRỰC DIỆN)

```text
Tạo giao diện web demo trực quan, tương tác trực tiếp cho hệ thống "UrbanShield Lite" (Camera AI theo dõi ngập nước & ngã xe ngõ hẻm của SingleNode). Phong cách Light Theme sáng sạch kiểu Apple (Nền #F8FAFC, Thẻ trắng #FFFFFF, Viền xám #E2E8F0, Nhấn xanh #2563EB).

Bố cục 1 màn hình tập trung hoàn toàn vào tương tác thực tế (không làm trang lý thuyết):

1. Màn hình Camera AI Giám sát (Khu vực tương tác chính):
- Khung hình camera ngõ hẻm với các khung nhận diện AI (người, xe máy, bánh xe).
- 2 nút chọn kịch bản nhanh trên thanh công cụ:
  * KỊCH BẢN ĐO NGẬP:
    - Thanh trượt mực nước từ 0 đến 40cm.
    - Mực nước dâng lên trên bánh xe theo thời gian thực.
    - Khung AI trên bánh xe hiển thị: "Bánh xe Ø50cm | Mức ngập: [X]cm" kèm nhãn đổi màu tự động:
      • <10cm Xanh: "An toàn (Lưu thông bình thường)"
      • 10-20cm Vàng: "Chú ý (Nước chạm mép pô)"
      • >20cm Đỏ nhấp nháy: "Nguy hiểm (Nguy cơ chết máy)" -> Kích hoạt gửi cảnh báo ngay.
  * KỊCH BẢN NGÃ XE:
    - Nút bấm: "Mô phỏng người ngã xe".
    - Khung AI chuyển đỏ quanh người nằm ngang kèm bộ đếm ngược 5 giây chạy trực tiếp trên camera: "Kiểm tra bất động: 5s... 4s...".
    - 2 nút tương tác:
      a) Bấm "Người tự đứng dậy": Dừng đếm ngược, khung chuyển xanh, hiện thông báo: "Hủy cảnh báo: Tránh báo giả thành công!".
      b) Để hết 5 giây: Nháy còi SOS đỏ khẩn cấp.

2. Bảng Cảnh Báo Telegram & Bản Đồ Ngõ Hẻm:
- Khung mô phỏng tin nhắn Telegram tự động bật ra khi có sự cố (kèm ảnh chụp hiện trường, địa chỉ "Hẻm 254 Nguyễn Văn Cừ", tọa độ GPS, nút "Xem vị trí cứu hộ").
- Bản đồ ngõ xóm thu nhỏ có điểm ghim camera đổi màu Xanh -> Vàng -> Đỏ theo sự cố.
- Thanh thông số trạm: "Trạm 01 - Hẻm 254 NVC | Edge CPU YOLOv8n | 28.5 FPS".
```
