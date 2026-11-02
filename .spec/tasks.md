# 📋 DANH MỤC CÔNG VIỆC THỰC CHIẾN (TASKS.MD)
## DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG GIÁM SÁT NGẬP NƯỚC & SỰ CỐ NGÕ HẺM BẰNG EDGE AI
### REPOSITORY: sgu-hackathon-2026-ai | ĐỘI THI: SINGLENODE (1 THÀNH VIÊN)
### LỊCH THI MỚI: 07/11/2026 | NỀN TẢNG CLOUD: GOOGLE CLOUD RUN

> **Ký hiệu trạng thái:**
> - `[x]` Đã hoàn thành
> - `[ ]` Đang chờ thực hiện

---

## 🛠️ GIAI ĐOẠN CHUẨN BỊ (02/11 – 06/11) - KHÔNG CODE VÀO REPO THI

- [x] **PREP-01 (02/11):** Chốt kế hoạch thực chiến bản 2 và chuẩn bị danh sách câu hỏi xác nhận với BTC / Mentor.
- [ ] **PREP-02 (03/11):** Thu thập và gán nhãn dữ liệu đánh giá:
  - Gom 20–30 clip ngắn (10–30s) hẻm ngập và sự cố trượt ngã tại TP.HCM kèm các clip dễ báo nhầm (dắt xe, cúi nhặt đồ).
  - Lập file gán nhãn `labels.csv` và tài liệu nguồn gốc `docs/DATA.md` (không đẩy video lên repo).
- [ ] **PREP-03 (04/11):** Thử nghiệm và đo đạc kỹ thuật trên máy tính:
  - Đo FPS thực tế của YOLOv8n trên CPU ở `imgsz=320` và `640`.
  - Thử nghiệm tracking bằng ByteTrack (`model.track()`) để duy trì ID đếm bất động 5s.
  - Chốt công thức đo ngập theo tỷ lệ che khuất bánh xe máy (~50cm) khi xe di chuyển ngang.
- [ ] **PREP-04 (05/11):** Chuẩn bị sẵn hạ tầng Google Cloud:
  - Khởi tạo Google Cloud Project, bật Cloud Run, Artifact Registry, Cloud SQL PostgreSQL và Secret Manager.
  - Tạo Telegram Bot, lấy Token và Chat ID, lưu vào Secret Manager.
  - Tạo Service Account cấp quyền deploy cho GitHub Actions.
  - Cài đặt sẵn môi trường cục bộ: `uv`, `specify-cli`, Docker Desktop, Node 20, Python 3.11, tải sẵn `yolov8n.pt`.
- [ ] **PREP-05 (06/11):** Diễn tập quy trình code nhanh trong 6–8 tiếng trên repo nháp và hoàn thiện khung slide thuyết trình.

---

## ⏱️ GIAI ĐOẠN VÒNG THI 21H CODE (12:00 NGÀY 07/11 – 09:00 NGÀY 08/11)

### Khối 1: Khởi tạo Repo & Spec Kit (12:00 – 12:45)
- [ ] **HACK-01:** Chạy `specify init`, tạo nhanh `.specify/` và các file `specs/` (Constitution, Spec, Plan, Tasks).
- [ ] **HACK-02:** Thiết lập cây thư mục chuẩn (`edge/`, `server/`, `web/`, `tests/`, `docs/`), cấu hình `.gitignore` và `ruff`.

### Khối 2: Edge Vision Engine trên CPU (12:45 – 16:30)
- [ ] **HACK-03:** Module `edge/capture.py`: Đọc video/webcam, cơ chế chỉ giữ khung hình trên RAM tạm thời (`Zero-Disk write`).
- [ ] **HACK-04:** Module `edge/detector.py`: YOLOv8n + ByteTrack chạy ở 5 FPS trên CPU.
- [ ] **HACK-05:** Module `edge/flood.py`: Thuật toán đo ngập theo tỷ lệ bánh xe máy 50cm, phân loại 3 cấp độ (<10cm, 10-20cm, >20cm).
- [ ] **HACK-06:** Module `edge/fall.py`: Máy trạng thái ngã xe với tỷ lệ khung nằm ngang $W/H > 1.15$ và bộ đếm bất động $\ge 5.0\text{s}$.
- [ ] **HACK-07:** Module `edge/sender.py`: Gửi mẩu tin sự cố JSON $< 150\text{ bytes}$ kèm hàng đợi offline (SQLite) khi mất mạng.
- [ ] **HACK-08:** Viết unit test cho các module của Edge với `pytest`.

### Khối 3: Server FastAPI & Điều phối cảnh báo (16:30 – 19:30)
- [ ] **HACK-09:** Xây dựng FastAPI app: endpoint `/health`, `/api/v1/incidents`, `/api/v1/nodes`.
- [ ] **HACK-10:** Cơ chế xác thực mẩu tin qua khóa API riêng cho từng trạm camera ngõ hẻm.
- [ ] **HACK-11:** Tích hợp SQLAlchemy kết nối PostgreSQL (Cloud SQL) và SQLite khi test.
- [ ] **HACK-12:** Module `server/reporting.py`: Bộ sinh báo cáo văn bản mộc mạc (Mẫu A: Cảnh báo tức thời, Mẫu B: Tổng kết ca trực).
- [ ] **HACK-13:** Module `server/notify.py`: Tự động gửi cảnh báo tới Telegram Bot kèm thông số đo đạc thực tế.

### Khối 4: Container hóa & Deploy Google Cloud Run sớm (19:30 – 20:30)
- [ ] **HACK-14:** Viết `Dockerfile` tối ưu kết hợp Backend API và Dashboard tĩnh.
- [ ] **HACK-15:** Deploy lần đầu lên Google Cloud Run, kết nối Cloud SQL và Secret Manager.
- [ ] **HACK-16:** Kiểm tra URL công khai `https://...run.app/health` trả về kết quả thành công.

### Khối 5: Bảng điều khiển WebGIS Dashboard (20:30 – 00:30)
- [ ] **HACK-17:** Giao diện Vite + React + Leaflet: Bản đồ hiển thị các trạm và tuyến hẻm.
- [ ] **HACK-18:** Cơ chế polling hỏi dữ liệu mỗi 2 giây, cập nhật trạng thái sự cố mượt mà trên điện thoại.
- [ ] **HACK-19:** Màn hình xem Text Report trực tiếp và Widget thống kê "Băng thông mạng đã tiết kiệm".
- [ ] **HACK-20:** Build static bundle tích hợp vào container server.

### Khối 6: CI/CD Pipeline với GitHub Actions (00:30 – 01:30)
- [ ] **HACK-21:** Viết workflow `.github/workflows/ci.yml`: tự động chạy linter, chạy test pytest.
- [ ] **HACK-22:** Cấu hình tự động build container image và trigger deploy lên Google Cloud Run khi push nhánh `main`.

### Nghỉ ngơi & Nạp năng lượng (01:30 – 03:00)
- [ ] **HACK-23:** Chợp mắt 1.5 tiếng để duy trì sự tỉnh táo, hạn chế lỗi cú pháp lúc rạng sáng.

### Khối 7: Đánh giá mô hình & Xuất Test Report (03:00 – 05:00)
- [ ] **HACK-24:** Chạy script `edge/eval/run_eval.py` trên tập clip có nhãn đã chuẩn bị.
- [ ] **HACK-25:** Thu thập chỉ số thật: Precision, Recall, F1-score, độ trễ xử lý (latency ms).
- [ ] **HACK-26:** Tự động xuất file báo cáo minh bạch [`docs/TEST_REPORT.md`](file:///c:/Competition/HackathonSGU2026/docs/TEST_REPORT.md) có số liệu thật.

### Khối 8: Hoàn thiện tài liệu & Khóa tính năng (05:00 – 06:30)
- [ ] **HACK-27:** Hoàn thiện `docs/DATA.md` (nguồn gốc clip, quy trình gán nhãn).
- [ ] **HACK-28:** Cập nhật `README.md` đầy đủ: kiến trúc, lý do chọn giải pháp, ranh giới bảo vệ đời tư, phân tích chi phí.
- [ ] **HACK-29:** **06:30 Khóa toàn bộ tính năng**, chỉ sửa lỗi nếu có.

### Khối 9: Diễn tập Live Demo & Hoàn thiện Slide (06:30 – 09:00)
- [ ] **HACK-30:** Bật `min-instances=1` trên Cloud Run để tránh khởi động nguội lúc demo.
- [ ] **HACK-31:** Diễn tập 3 lần liên tục luồng Live Demo 3 phút trên video thật.
- [ ] **HACK-32:** Cập nhật số liệu đo đạc thực tế vào slide trình chiếu và nộp slide trước 09:30.
