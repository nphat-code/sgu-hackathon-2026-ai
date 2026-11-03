# 🛠️ KẾ HOẠCH KIẾN TRÚC & TRIỂN KHAI KỸ THUẬT (PLAN.MD)
## DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG GIÁM SÁT NGẬP NƯỚC & SỰ CỐ NGÕ HẺM BẰNG EDGE AI
### REPOSITORY: sgu-hackathon-2026-ai | ĐỘI THI: SINGLENODE
### QUY CHUẨN: GITHUB SPEC KIT (SPEC-DRIVEN DEVELOPMENT)

---

## 🏗️ 1. SƠ ĐỒ KIẾN TRÚC TỔNG THỂ (MODULAR EDGE-TO-CLOUD)

Hệ thống được thiết kế theo mô hình xử lý tại biên phân tán (Edge-First), giải quyết trực tiếp bài toán chi phí thiết bị, nghẽn băng thông mạng dân sinh và bảo vệ quyền riêng tư người dân:

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
│   • Phần cứng: CPU máy văn phòng phổ thông (Core i3/i5) │
│   • Tiền xử lý: Cân bằng sáng thích ứng CLAHE ban đêm  │
│   • Mô hình AI: YOLOv8-nano (~6.5MB, imgsz=320, ~28FPS)│
│   • Đo ngập: Tham chiếu hình học bánh xe máy chuẩn 50cm│
│   • Ngã xe: Khung nằm ngang W/H > 1.15 & Đếm bất động 5s│
│   • Bảo mật: Xử lý trên RAM tạm thời, hủy frame tức thì│
└──────────────────────────┬─────────────────────────────┘
                           │ Chỉ gửi mẩu tin sự cố (< 150 Bytes)
                           ▼
┌────────────────────────────────────────────────────────┐
│               3. TẦNG ĐIỀU PHỐI & MINIMAL API          │
│   • Minimal API (FastAPI): /health, /api/v1/incidents  │
│   • Database (SQLite/PostgreSQL): Lưu sự cố & Heartbeat│
│   • Text Report Engine: Sinh bản tin văn bản mộc mạc   │
│   • Telegram Dispatcher: Gửi tin cảnh báo tức thời     │
│   • GIS Service: Ánh xạ độ ngập sang GeoJSON LineString│
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
              ▼                            ▼
┌──────────────────────────┐ ┌──────────────────────────┐
│ 4. BẢNG ĐIỀU KHIỂN (FE)  │ │ 5. KÊNH TIẾP NHẬN CƠ SỞ  │
│ WebGIS React + Leaflet   │ │ Telegram Bot / Tin nhắn  │
│ Đổi màu tuyến hẻm & Trạm │ │ Dân quân & Tổ dân phố    │
└──────────────────────────┘ └──────────────────────────┘
```

---

## 📦 2. PHÂN TÁCH MODULE & TRÁCH NHIỆM KỸ THUẬT (MICRO-MODULAR)

Đáp ứng góp ý của Ban Giám khảo về cấu trúc dịch vụ rõ ràng, dễ mở rộng và kiểm thử độc lập:

1. **Module Thị giác Biên (`backend/detector.py`):**
   - Đóng gói lớp `UrbanShieldDetector` với kiến trúc bất đồng bộ (Decoupled Worker) đạt 28.5 FPS, độ trễ suy luận ~32ms trên CPU.
   - Tích hợp tiền xử lý **CLAHE** (Contrast Limited Adaptive Histogram Equalization) trên kênh độ sáng LAB khi điều kiện thiếu sáng hoặc bóng nước phản chiếu ban đêm.
   - Lọc đa phương tiện (Multi-vehicle Spatial & Occlusion Filtering): Loại bỏ xe ở quá xa hoặc bị che khuất, chọn xe tham chiếu rõ nhất để đo tỷ lệ ngập dựa trên đường kính bánh xe máy 50cm.
   - Vận hành máy trạng thái đếm bất động liên tục $\ge 5.0\text{ giây}$ triệt tiêu báo động giả khi người dân dừng xe chống chân hoặc cúi nhặt đồ.

2. **Module Sinh Báo cáo Văn bản (`backend/reporting.py`):**
   - Tự động sinh nội dung báo cáo văn bản thuần túy, mộc mạc, 100% văn nói tự nhiên, không dùng từ ngữ giật gân.
   - Hỗ trợ **Mẫu A (Instant Alert - Cảnh báo sự cố tức thời)** và **Mẫu B (Shift Digest - Bản tin tổng hợp ca trực)**.
   - Đóng gói mẩu tin JSON tối giản (`< 150 bytes`) và tính toán lượng băng thông tiết kiệm so với truyền luồng video thô.

3. **Module Lưu trữ & Hàng đợi Cục bộ (`backend/database.py`):**
   - Sử dụng SQLite/SQLAlchemy lưu trữ bền vững lịch sử sự cố (`incidents`), nhịp tim trạm biên (`heartbeats`) và thống kê băng thông (`telemetry_stats`).
   - Hỗ trợ hàng đợi cục bộ (Offline Queue) khi mạng khu phố chập chờn và đồng bộ tự động.

4. **Module Điều phối Cảnh báo (`backend/notify.py`):**
   - Gửi tin nhắn cảnh báo trực tiếp qua Telegram Bot API (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) với độ trễ $< 1.5\text{s}$.
   - Có cơ chế dự phòng (Fallback) ghi nhận trạng thái gửi khi chạy môi trường nội bộ không có internet.

5. **Cổng giao tiếp Minimal API (`backend/main.py`):**
   - Cung cấp đầy đủ các endpoint chuẩn mực:
     - `GET /health`
     - `POST /api/v1/incidents/flood` & `POST /api/v1/incidents/accident`
     - `GET /api/v1/map/segments` (GeoJSON LineString các tuyến hẻm)
     - `GET /api/v1/reports/summary?type=instant|shift`
   - Hỗ trợ xác thực khóa trạm biên (`X-Edge-Key`) và kiểm tra dữ liệu đầu vào bằng Pydantic.

6. **Giao diện Bản đồ số Trung tâm (`frontend/src/`):**
   - Bố cục `100vh` không cuộn trang, hiển thị đồng thời luồng video thực tế, thanh đo ngập hình học 0–50cm, bản đồ Leaflet GIS với cả **Tuyến đường LineString GeoJSON đổi màu** và **Trạm camera**, nhật ký sự cố, cửa sổ xem Text Report, và nút kiểm thử bộ đếm ngã xe 5 giây.

---

## 🧪 3. KẾ HOẠCH KIỂM THỬ QA & ĐÁNH GIÁ MÔ HÌNH MINH BẠCH

Thực hiện nghiêm túc chỉ đạo của Ban Giám khảo về bằng chứng kiểm thử (`TEST_REPORT.md`):

- **Kiểm thử đơn vị & tích hợp (`tests/` với `pytest`):**
  - `tests/test_flood_measurement.py`: Kiểm tra công thức ánh xạ hình học bánh xe 50cm và phân cấp 3 mức ngập (<10cm, 10-20cm, >20cm).
  - `tests/test_fall_detection.py`: Kiểm tra tỷ lệ khung nằm ngang $W/H > 1.15$, khoảng cách người-xe $< 180\text{px}$, bộ đếm bất động đủ 5.0s kích hoạt cảnh báo và tự động reset khi < 5.0s.
  - `tests/test_api_endpoints.py`: Kiểm tra các Minimal API `/health`, `/api/v1/incidents/*`, kích thước mẩu tin `< 150 bytes`, `/api/v1/map/segments` và `/api/v1/reports/summary`.
- **Đánh giá thực nghiệm trên tập video thực tế (`backend/eval_benchmark.py`):**
  - Chạy trực tiếp mô hình trên 5 video thực tế đối chiếu với `labels.csv`.
  - Đo đạc tốc độ xử lý FPS, độ trễ suy luận (ms), dung lượng RAM (MB), độ chính xác phân cấp ngập và xuất tự động ra [`docs/TEST_REPORT.md`](../docs/TEST_REPORT.md).

---

## 🚀 4. ĐÓNG GÓI DOCKER, CI/CD & TRIỂN KHAI CLOUD

- **Container hóa:** Cung cấp `Dockerfile` và `docker-compose.yml` giúp khởi chạy toàn bộ hệ thống chỉ bằng 1 lệnh `docker compose up --build -d`.
- **CI/CD Tự động (`.github/workflows/ci.yml`):** Tự động kiểm tra mã nguồn, chạy bộ test `pytest`, kiểm tra đánh giá và build giao diện mỗi khi có commit đẩy lên nhánh `main`.
