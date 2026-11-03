# 📋 DANH MỤC CÔNG VIỆC THỰC CHIẾN (TASKS.MD)
## DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG GIÁM SÁT NGẬP NƯỚC & SỰ CỐ NGÕ HẺM BẰNG EDGE AI
### REPOSITORY: sgu-hackathon-2026-ai | ĐỘI THI: SINGLENODE
### TRẠNG THÁI: THỰC HIỆN NGAY TỪ BÂY GIỜ (HOÀN THIỆN 100% TRƯỚC VÒNG THI)

> **Ký hiệu trạng thái:**
> - `[x]` Đã hoàn thành và kiểm chứng
> - `[ ]` Đang thực hiện

---

## 🏛️ KHỐI 1: CHUẨN HÓA GITHUB SPEC KIT & DỮ LIỆU ĐÁNH GIÁ (TIÊU CHÍ I, II, III.1)

- [x] **TASK-01:** Thiết lập bộ tài liệu chuẩn GitHub Spec Kit trong `.spec/` (`constitution.md`, `spec.md`, `functional-spec.md`, `technical-spec.md`, `live-demo-spec.md`, `plan.md`, `tasks.md`) và `.specify/manifest.json`.
- [x] **TASK-02:** Chuẩn bị tập dữ liệu 5 video thực tế tại TP.HCM (`real_flood_1.mp4` đến `real_flood_4.mp4`, `real_accident_1.mp4`), lập bảng nhãn [`labels.csv`](../labels.csv) và tài liệu minh bạch nguồn gốc [`docs/DATA.md`](../docs/DATA.md) (loại trừ file video nặng qua `.gitignore`).

---

## 🧠 KHỐI 2: NÂNG CẤP EDGE VISION ENGINE TRÊN CPU (TIÊU CHÍ I, III.2, III.3, VI)

- [x] **TASK-03:** Tối ưu hóa bất đồng bộ (Decoupled Inference Worker) cho `backend/detector.py`: chạy YOLOv8-nano (`imgsz=320`) đạt tốc độ luồng phát 28.5 FPS mượt mà, độ trễ suy luận ~32ms trên CPU phổ thông.
- [x] **TASK-04:** Thuật toán lọc đa phương tiện (Multi-vehicle Spatial & Occlusion Filtering) và đo ngập hình học động qua đường kính chuẩn 50cm của bánh xe máy (loại bỏ hoàn toàn số gán cứng).
- [x] **TASK-05:** Tích hợp thuật toán cân bằng sáng thích ứng **CLAHE** trên kênh độ sáng LAB cho khung hình thiếu sáng/mưa đêm và hoàn thiện các hàm kiểm thử độc lập (`measure_flood_from_wheel`, `evaluate_fall_state`).
- [x] **TASK-06:** Cơ chế kiểm chứng bảo vệ quyền riêng tư (`Zero-Disk write`): chỉ giải mã khung hình trên RAM, đếm số khung hình đã xử lý và hủy trên RAM, cam kết 0 file video/ảnh người dân lưu xuống ổ đĩa.

---

## ⚡ KHỐI 3: KIẾN TRÚC MODULE BACKEND, MINIMAL API & TEXT REPORT (TIÊU CHÍ II, IV.1, IV.3, IV.5)

- [x] **TASK-07:** Xây dựng module [`backend/reporting.py`](../backend/reporting.py):
  - Sinh **Báo cáo văn bản mộc mạc (Text Report)** gồm Mẫu A (Cảnh báo sự cố tức thời) và Mẫu B (Bản tin tổng hợp ca trực) đúng chuẩn văn nói tự nhiên.
  - Đóng gói mẩu tin sự cố JSON siêu nhẹ `< 150 bytes` và đo kích thước byte thực tế.
- [x] **TASK-08:** Xây dựng module [`backend/database.py`](../backend/database.py):
  - Lưu trữ nhật ký sự cố, nhịp tim trạm camera và thống kê băng thông tiết kiệm vào cơ sở dữ liệu SQLite (`urbanshield_edge.db`).
- [x] **TASK-09:** Xây dựng module [`backend/notify.py`](../backend/notify.py):
  - Kết nối Telegram Bot API thực tế (qua biến môi trường `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) kèm cơ chế dự phòng an toàn khi chạy offline.
- [x] **TASK-10:** Nâng cấp [`backend/main.py`](../backend/main.py) đáp ứng trọn vẹn Minimal API:
  - `GET /health` (trả về FPS, RAM, uptime, trạng thái Zero-Disk).
  - `POST /api/v1/incidents/flood` & `POST /api/v1/incidents/accident` (kiểm tra kích thước `< 150 bytes`).
  - `GET /api/v1/map/segments` (trả về GeoJSON LineString các tuyến hẻm đổi màu theo độ ngập).
  - `GET /api/v1/reports/summary?type=instant|shift` (xuất Text Report).
  - `POST /api/nodes/{node_id}/simulate_fall` (hỗ trợ kiểm thử trực tiếp bộ đếm bất động 5 giây trên giao diện).

---

## 🗺️ KHỐI 4: BẢNG ĐIỀU KHIỂN WEBGIS COMMAND CENTER (TIÊU CHÍ IV.2, V, VIII)

- [x] **TASK-11:** Thiết kế giao diện `100vh` không cuộn trang với thước đo ngập hình học 0–50cm trực quan và thanh trạng thái hệ thống biên (Edge Telemetry Dock).
- [x] **TASK-12:** Cập nhật [`frontend/src/components/MapViewer.jsx`](../frontend/src/components/MapViewer.jsx) hiển thị các **Tuyến hẻm GeoJSON LineString** đổi màu Xanh / Vàng cam / Đỏ theo thời gian thực cùng với vị trí các trạm camera.
- [x] **TASK-13:** Tích hợp cửa sổ xem & sao chép **Text Report (Mẫu A & Mẫu B)**, hiển thị minh chứng kích thước gói tin `< 150 Bytes`, và nút kiểm thử trực tiếp **Bộ đếm ngã xe 5 giây** ngay trên [`frontend/src/App.jsx`](../frontend/src/App.jsx).

---

## 🧪 KHỐI 5: KIỂM THỬ TỰ ĐỘNG PYTEST & XUẤT TEST REPORT (TIÊU CHÍ III.4, IV.6)

- [x] **TASK-14:** Viết bộ kiểm thử tự động trong thư mục `tests/`:
  - `tests/test_flood_measurement.py` (kiểm thử thuật toán đo ngập bánh xe 50cm và phân loại cấp độ).
  - `tests/test_fall_detection.py` (kiểm thử tỷ lệ khung bao $W/H > 1.15$ và bộ đếm bất động 5.0 giây chống báo giả).
  - `tests/test_api_endpoints.py` (kiểm thử Minimal API, payload `< 150 bytes`, Text Report và GeoJSON).
- [x] **TASK-15:** Viết và chạy script [`backend/eval_benchmark.py`](../backend/eval_benchmark.py) đánh giá thực nghiệm trên 5 video thực tế (`labels.csv`), xuất báo cáo [`docs/TEST_REPORT.md`](../docs/TEST_REPORT.md) với số liệu thực tế 100%.

---

## 🐳 KHỐI 6: ĐÓNG GÓI DOCKER, CI/CD & HOÀN THIỆN TÀI LIỆU (TIÊU CHÍ IV.4, VII)

- [x] **TASK-16:** Tạo `Dockerfile`, `docker-compose.yml` và `.env.example` sẵn sàng khởi chạy 1 lệnh `docker compose up -d` và triển khai lên Google Cloud Run.
- [x] **TASK-17:** Thiết lập pipeline CI/CD `.github/workflows/ci.yml` tự động chạy `pytest` và kiểm tra build khi push code.
- [x] **TASK-18:** Cập nhật toàn diện [`README.md`](../README.md) và [`docs/KE_HOACH_VONG_CODING.md`](../docs/KE_HOACH_VONG_CODING.md) đồng bộ với toàn bộ tính năng đã hoàn thiện.
