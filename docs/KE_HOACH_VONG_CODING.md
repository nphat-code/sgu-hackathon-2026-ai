# 🚀 KẾ HOẠCH TRIỂN KHAI & HOÀN THIỆN SẢN PHẨM – URBANSHIELD LITE
## ĐỘI THI: SINGLENODE | CUỘC THI: SGU HACKATHON 2026

> **Trạng thái cập nhật:** Toàn bộ kiến trúc, thuật toán, Minimal API, cơ sở dữ liệu SQLite, bộ sinh Text Report, bản đồ WebGIS GeoJSON LineString, bộ kiểm thử tự động `pytest` (13/13 Pass), báo cáo đánh giá thực nghiệm [`docs/TEST_REPORT.md`](TEST_REPORT.md), Docker Compose và CI/CD GitHub Actions **đã được triển khai và hoàn thiện 100% ngay từ bây giờ**.

---

## 🎯 1. BẢNG ĐỐI CHIẾU: BAREM CHẤM ĐIỂM → TÍNH NĂNG ĐÃ HOÀN THIỆN → BẰNG CHỨNG TRỰC TIẾP

| Tiêu chí chấm điểm | Điểm | Giải pháp đã triển khai trong mã nguồn | Bằng chứng kiểm chứng trực tiếp |
| :--- | :---: | :--- | :--- |
| **I. Tính sáng tạo & đổi mới** | **10** | Đo ngập hình học theo bánh xe máy chuẩn 50cm kết hợp lọc đa phương tiện; phát hiện ngã xe kèm bộ đếm bất động 5s | [`backend/detector.py`](../backend/detector.py) + Đường ranh giới ngập hiển thị trực tiếp trên video thật |
| **II. Tính thực tiễn & khả thi** | **10** | Tự động sinh **Báo cáo văn bản mộc mạc (Text Report Mẫu A & Mẫu B)** gửi qua Telegram cho dân quân/tổ dân phố | [`backend/reporting.py`](../backend/reporting.py) + Nút **"Xuất Text Report (<150B)"** trên giao diện |
| **III.1 Dữ liệu** | **5** | Tập 5 video ngập & mưa bão thực tế tại TP.HCM, gán nhãn chuẩn hóa, không đẩy video nặng lên Git | [`docs/DATA.md`](DATA.md) + [`labels.csv`](../labels.csv) |
| **III.2 Mô hình** | **5** | YOLOv8-nano (`imgsz=320`) chạy bất đồng bộ trên CPU phổ thông đạt 28.5 FPS, độ trễ ~32ms | Phân tích chi tiết trong [`docs/TEST_REPORT.md`](TEST_REPORT.md) |
| **III.3 An toàn AI & Thiên lệch** | **5** | Cân bằng sáng thích ứng **CLAHE** ban đêm, bộ đếm 5s chống báo giả khi cúi nhặt đồ, chỉ xử lý trên RAM (`Zero-Disk`) | Hàm `preprocess_clahe` & `evaluate_fall_candidate` + Nút **"Test Bộ Đếm Ngã Xe 5s"** |
| **III.4 Kiểm thử mô hình** | **5** | Script đánh giá thực nghiệm trên 5 video thật và bộ 13 bài test tự động `pytest` đạt 100% Pass | [`backend/eval_benchmark.py`](../backend/eval_benchmark.py) + [`docs/TEST_REPORT.md`](TEST_REPORT.md) |
| **IV.1 Cấu trúc dự án** | **3** | Phân tách module rõ ràng: `detector.py`, `reporting.py`, `database.py`, `notify.py`, `main.py`, `frontend/`, `tests/` | Cấu trúc repo chuẩn GitHub Spec Kit (`.spec/`) |
| **IV.2 Kiến trúc FE, UI/UX** | **3** | Giao diện Trung tâm điều hành `100vh` không cuộn, thước đo 0–50cm, bản đồ Leaflet vẽ **Tuyến hẻm GeoJSON đổi màu** | [`frontend/src/App.jsx`](../frontend/src/App.jsx) + [`frontend/src/components/MapViewer.jsx`](../frontend/src/components/MapViewer.jsx) |
| **IV.3 Kiến trúc BE & Hiệu suất** | **5** | Minimal API chuẩn REST, lưu trữ SQLite có đánh chỉ mục (`idx_incidents_created`), phản hồi tức thì | `/health`, `/api/v1/incidents/*`, `/api/v1/map/segments`, `/api/v1/reports/summary` |
| **IV.4 CI/CD & Pipeline** | **3** | GitHub Actions tự động cài đặt môi trường CPU, chạy `pytest` và kiểm tra build giao diện React | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |
| **IV.5 Bảo mật & Độ tin cậy** | **3** | Xác thực khóa `X-Edge-Key`, kiểm tra dữ liệu bằng Pydantic, giải phóng bộ nhớ `del frame` trên RAM | Kiểm chứng tự động trong [`tests/test_api_endpoints.py`](../tests/test_api_endpoints.py) |
| **IV.6 Độ hoàn thiện** | **3** | Đóng gói `Dockerfile` và `docker-compose.yml` khởi chạy 1 lệnh, vận hành ổn định 100% | [`docker-compose.yml`](../docker-compose.yml) + [`backend/Dockerfile`](../backend/Dockerfile) |
| **V. Đóng góp cộng đồng** | **10** | Chi phí 0đ cảm biến, tận dụng camera an ninh sẵn có giúp UBND phường/xã dễ dàng nhân rộng | Bảng phân tích kinh tế trong [`docs/GOP_Y_BAN_GIAM_KHAO_BACKEND.md`](GOP_Y_BAN_GIAM_KHAO_BACKEND.md) |
| **VI. Tiết kiệm chi phí AI** | **10** | Không tốn GPU Cloud; chỉ gửi mẩu tin JSON ~82 Bytes (`< 150 Bytes`), tiết kiệm 99.98% băng thông mạng | Hiển thị số đếm Bytes thực tế trên HUD & thanh Dock hệ thống |
| **VII. Triển khai Cloud** | **10** | Sẵn sàng triển khai container lên Google Cloud Run / AWS với cấu hình biến môi trường `.env.example` | [`backend/Dockerfile`](../backend/Dockerfile) + [`.env.example`](../.env.example) |
| **VIII. Thuyết trình & Demo** | **10** | Kịch bản Live Demo 3 phút tương tác trực tiếp + lời thoại 100% văn nói tự nhiên, chống phóng đại | [`.spec/live-demo-spec.md`](../.spec/live-demo-spec.md) + [`docs/LOI_THOAI_THUYET_TRINH_8_SLIDE.md`](LOI_THOAI_THUYET_TRINH_8_SLIDE.md) |
