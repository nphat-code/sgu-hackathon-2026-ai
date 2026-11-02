# 🛠️ KẾ HOẠCH KIẾN TRÚC KỸ THUẬT (PLAN.MD)
## DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG GIÁM SÁT NGẬP NƯỚC & SỰ CỐ NGÕ HẺM BẰNG EDGE AI
### REPOSITORY: sgu-hackathon-2026-ai | ĐỘI THI: SINGLENODE
### QUY CHUẨN: GITHUB SPEC KIT (SPEC-DRIVEN DEVELOPMENT)

---

## 🏗️ 1. SƠ ĐỒ KIẾN TRÚC TỔNG THỂ (EDGE-TO-CLOUD)

Hệ thống được thiết kế theo mô hình xử lý tại biên phân tán (Edge-First), giải quyết triệt để vấn đề chi phí hạ tầng và nghẽn băng thông:

```
┌────────────────────────────────────────────────────────┐
│               1. TẦNG THU THẬP TẠI CHỖ (EDGE)          │
│   • Nguồn cấp: Camera an ninh sẵn có / Webcam USB       │
│   • Kết nối: Mạng LAN nội bộ khu phố                   │
└──────────────────────────┬─────────────────────────────┘
                           │ Luồng video nội bộ (Không ra internet)
                           ▼
┌────────────────────────────────────────────────────────┐
│               2. MÁY TÍNH KHU PHỐ (EDGE COMPUTING)     │
│   • Phần cứng: CPU máy văn phòng cũ (Core i3/i5, RAM 8GB)│
│   • Mô hình AI: YOLOv8-nano (~6.5MB) chạy trên CPU     │
│   • Thuật toán: Đo ngập bánh xe 50cm & Bộ đếm ngã xe 5s│
│   • Bảo mật: Xử lý trên RAM tạm thời, hủy frame tức thì│
└──────────────────────────┬─────────────────────────────┘
                           │ Chỉ gửi mẩu tin sự cố (< 150 Bytes)
                           ▼
┌────────────────────────────────────────────────────────┐
│               3. TẦNG ĐIỀU PHỐI & API (FASTAPI)        │
│   • Minimal API: Phi trạng thái, độ trễ cực thấp       │
│   • Text Report Engine: Sinh bản tin văn bản mộc mạc   │
│   • Telegram Dispatcher: Bắn tin cảnh báo tức thời     │
│   • WebSockets: Cung cấp trạng thái thời gian thực     │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
              ▼                            ▼
┌──────────────────────────┐ ┌──────────────────────────┐
│ 4. BẢNG ĐIỀU KHIỂN (FE)  │ │ 5. KÊNH TIẾP NHẬN CƠ SỞ  │
│ WebGIS React + Leaflet   │ │ Telegram Bot / SMS      │
│ Đổi màu tuyến hẻm        │ │ Dân quân & Tổ dân phố    │
└──────────────────────────┘ └──────────────────────────┘
```

---

## 📦 2. PHÂN TÁCH MODULE & TRÁCH NHIỆM KỸ THUẬT

1. **Module Thị giác Biên (`backend/detector.py`):**
   - Đóng gói lớp `UrbanShieldDetector`.
   - Nạp mô hình YOLOv8-nano và thực thi suy luận trực tiếp trên CPU.
   - Tính toán tỷ lệ che khuất bánh xe máy và tỷ lệ nằm ngang của người.
   - Vận hành máy trạng thái đếm bất động liên tục $\ge 5.0\text{ giây}$.

2. **Module Sinh Báo cáo Văn bản (`backend/reporting.py`):**
   - Tự động sinh nội dung báo cáo văn bản thuần túy không dùng từ giật gân.
   - Hỗ trợ Mẫu A (Cảnh báo tức thời gửi ngay Telegram) và Mẫu B (Bản tin tổng hợp ca trực).

3. **Cổng giao tiếp Minimal API (`backend/main.py`):**
   - Cung cấp các endpoint RESTful gọn nhẹ: `/health`, `/api/v1/incidents/flood`, `/api/v1/incidents/accident`, `/api/v1/reports/summary`.
   - Quản lý kênh WebSocket truyền dữ liệu thời gian thực tới giao diện người dùng.

4. **Giao diện Bản đồ số (`frontend/src/`):**
   - Hiển thị bản đồ OpenStreetMap với các tuyến hẻm LineString GeoJSON đổi màu trực quan (Xanh: an toàn, Vàng: ngập nhẹ, Đỏ: ngập sâu / có người ngã).
   - Nút bấm mô phỏng 3 kịch bản Live Demo một chạm.
   - Bảng đồng hồ kiểm tra kỹ thuật (Đo FPS trên CPU, kiểm tra RAM sạch).

---

## 🛡️ 3. CƠ CHẾ BẢO VỆ ĐỜI TƯ & BẢO MẬT KỸ THUẬT

- **Giải phóng bộ nhớ RAM tức thì:** Từng khung hình sau khi nạp vào mảng NumPy được giải phóng bộ nhớ ngay sau khi suy luận (`Zero-Disk storage`).
- **Không truyền video ra ngoài:** Chỉ truyền mẩu tin JSON nhẹ dưới 150 bytes, loại trừ hoàn toàn nguy cơ rò rỉ hình ảnh sinh hoạt của người dân.
- **Biến môi trường an toàn:** Mã token Telegram Bot và các cấu hình cổng được quản lý tách biệt qua file `.env`.

---

## 🚀 4. KẾ HOẠCH ĐÓNG GÓI & TRIỂN KHAI CLOUD

- **Container hóa Backend:** `backend/Dockerfile` sử dụng Python 3.10-slim tối ưu hóa cho CPU, không cài các thư viện thừa.
- **Container hóa Frontend:** `frontend/Dockerfile` sử dụng quy trình multi-stage build với Node.js và máy chủ tĩnh Nginx gọn nhẹ.
- **Điều phối 1 lệnh:** File `docker-compose.yml` liên kết toàn bộ dịch vụ, chạy ngay bằng lệnh: `docker compose up -d`.
- **Triển khai Cloud:** Chuẩn bị kịch bản sẵn sàng triển khai lên Google Cloud Run hoặc AWS EC2 có địa chỉ IP/tên miền công khai.
