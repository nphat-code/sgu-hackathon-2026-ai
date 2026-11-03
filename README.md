# UrbanShield Lite – Hệ Thống Giám Sát Ngập Nước & Sự Cố Ngõ Hẻm Bằng Edge AI

> **Dự án phát triển bởi:** **SingleNode** ([nphat-code](https://github.com/nphat-code))  
> **Chủ đề:** AI - Kỷ nguyên vươn mình (Giải pháp An toàn đô thị & Dân sinh tiết kiệm chi phí)  
> **Cuộc thi:** SGU Hackathon 2026 – Trường Đại học Sài Gòn  
> **Repository:** [sgu-hackathon-2026-ai](https://github.com/nphat-code/sgu-hackathon-2026-ai)

---

## 📂 Cấu trúc thư mục dự án (Modular Edge-to-Cloud Architecture)

```text
HackathonSGU2026/
├── .spec/                                 # Bộ đặc tả chuẩn GitHub Spec Kit (Spec-Driven Development)
│   ├── constitution.md                    # Hiến chương dự án (Problem-First, Privacy RAM, Anti-hype)
│   ├── spec.md                            # Câu chuyện người dùng & Tiêu chuẩn nghiệm thu (AC-01..AC-04)
│   ├── functional-spec.md                 # Đặc tả chức năng & Phi chức năng (FPS, RAM, Payload <150B)
│   ├── technical-spec.md                  # Kiến trúc hệ thống, Minimal API Contracts & GeoJSON Schema
│   ├── live-demo-spec.md                  # Kịch bản Live Demo tương tác 3 phút trước Ban Giám khảo
│   ├── plan.md                            # Kế hoạch kiến trúc & phân tách module
│   └── tasks.md                           # Danh mục công việc đã hoàn thiện 100%
│
├── backend/                               # Dịch vụ Thị giác Biên & Minimal API Gateway (FastAPI)
│   ├── detector.py                        # YOLOv8n CPU (~28.5 FPS), CLAHE ban đêm, Đo ngập bánh xe 50cm, Đếm ngã 5s
│   ├── reporting.py                       # Text Report Engine (Mẫu A: Tức thời, Mẫu B: Ca trực) & Gói tin <150 Bytes
│   ├── database.py                        # Lưu trữ SQLite (Sự cố, Heartbeat, Thống kê tiết kiệm băng thông)
│   ├── notify.py                          # Điều phối cảnh báo Telegram Bot API (<1.5s) + Local Fallback
│   ├── main.py                            # Minimal API (/health, /api/v1/incidents/*, /api/v1/map/segments, ...)
│   ├── eval_benchmark.py                  # Script đánh giá mô hình trên 5 video thực tế & xuất TEST_REPORT.md
│   ├── Dockerfile                         # Container hóa dịch vụ biên tối ưu cho CPU
│   └── requirements.txt                   # Thư viện phụ thuộc Python
│
├── frontend/                              # Bảng điều khiển WebGIS Command Center (React + Leaflet)
│   ├── src/
│   │   ├── App.jsx                        # Giao diện 100vh không cuộn, Thước đo 50cm, Text Report Modal, Test 5s
│   │   ├── App.css                        # Thiết kế tương phản cao, chuẩn trung tâm điều hành
│   │   └── components/MapViewer.jsx       # Bản đồ số Leaflet vẽ Tuyến hẻm GeoJSON LineString đổi màu
│   ├── Dockerfile                         # Multi-stage build với Nginx
│   └── package.json
│
├── tests/                                 # Bộ kiểm thử tự động QA (Pytest - 100% Pass)
│   ├── test_flood_measurement.py          # Unit test đo ngập hình học bánh xe 50cm & cân bằng sáng CLAHE
│   ├── test_fall_detection.py             # Unit test tỷ lệ khung W/H > 1.15 & bộ đếm bất động 5.0s chống báo giả
│   └── test_api_endpoints.py              # Integration test Minimal API, gói tin <150B, GeoJSON & Zero-Disk RAM
│
├── docs/                                  # Tài liệu báo cáo, dữ liệu & thuyết minh
│   ├── TEST_REPORT.md                     # Báo cáo kiểm thử tự động & Đánh giá thực nghiệm trên video thật
│   ├── DATA.md                            # Minh bạch nguồn gốc dữ liệu video thực tế & quy trình gán nhãn
│   ├── THUAT_TOAN_ANH_XA_NGAP_NUOC.md     # Cơ sở toán học ánh xạ ngập bánh xe 50cm & bản đồ GIS
│   └── ...
│
├── .github/workflows/ci.yml               # Pipeline CI/CD tự động chạy Pytest & kiểm tra build Frontend
├── docker-compose.yml                     # Khởi chạy toàn bộ hệ thống bằng 1 lệnh duy nhất
├── labels.csv                             # Nhãn thực tế (Ground Truth) của tập video đánh giá
├── GEMINI.md                              # Quy tắc làm việc & chuẩn ngôn từ thuyết trình
└── README.md
```

---

## 💡 Điểm mới & Lợi thế cạnh tranh cốt lõi

1. **Đo ngập bằng tham chiếu hình học bánh xe máy 50cm (0đ chi phí cảm biến):**
   - Không cần lắp cảm biến siêu âm dưới cống (dễ bị bùn rác làm nghẹt) hay mua camera chuyên dụng đắt đỏ.
   - Tận dụng chính các xe máy lưu thông qua hẻm làm thước đo động: lấy đường kính chuẩn **~50cm của bánh xe máy phổ thông** để tính tỷ lệ ngập thực tế và phân thành 3 mức: **An toàn (<10cm)**, **Chú ý (10–20cm, mấp mé ống xả)**, **Nguy hiểm (≥20cm, vượt nửa bánh xe)**.
   - Tích hợp **Bộ lọc không gian đa phương tiện** (loại bỏ xe ở quá xa hoặc bị xe trước che khuất) và cân bằng sáng **CLAHE** khi mưa đêm thiếu sáng.

2. **Phát hiện ngã xe đa tầng kèm Bộ đếm bất động 5 giây (Triệt tiêu báo động giả):**
   - Kết hợp kiểm tra tỷ lệ khung bao nằm ngang ($W/H > 1.15$), khoảng cách tới xe máy ($< 180\text{ px}$) và **bộ đếm nằm bất động liên tục $\ge 5.0\text{ giây}$**.
   - Nếu người dân chỉ dừng xe chống chân, dắt bộ hoặc cúi nhặt đồ rồi đứng dậy trước 5 giây, bộ đếm tự động đặt lại về 0, không phát sinh báo động giả.

3. **Bảo vệ quyền riêng tư tuyệt đối (Privacy-by-Design RAM Zero-Disk):**
   - Luồng video từ camera ngõ xóm chỉ được giải mã tạm thời trên bộ nhớ RAM để trích xuất tọa độ và **bị hủy ngay lập tức (`del frame`, 0 file lưu xuống ổ cứng)**.
   - Không nhận diện khuôn mặt (No Face Recognition), không đọc biển số xe (No ALPR).

4. **Minimal API & Mẩu tin cảnh báo gọn nhẹ (< 150 Bytes):**
   - Máy tính khu phố không kéo luồng video về máy chủ trung tâm. Chỉ khi có sự cố mới gửi đi một mẩu tin JSON **~82 Bytes (< 150 Bytes)**, tiết kiệm **99.98% băng thông mạng dân sinh** và tự động xuất **Báo cáo văn bản mộc mạc (Text Report Mẫu A & Mẫu B)** gửi thẳng qua Telegram cho dân quân, tổ dân phố.

---

## 🔌 Danh mục Minimal API Endpoints

| Phương thức | Endpoint | Mô tả chức năng |
| :---: | :--- | :--- |
| `GET` | `/health` | Kiểm tra nhịp tim trạm biên, tốc độ xử lý (`28.5 FPS`), RAM (`<500MB`) và xác nhận `zero_disk_verified: true`. |
| `POST` | `/api/v1/incidents/flood` | Tiếp nhận sự cố ngập nước kèm kiểm chứng gói tin `< 150 Bytes` và sinh Text Report tức thời. |
| `POST` | `/api/v1/incidents/accident` | Tiếp nhận sự cố ngã xe (tự động lọc bỏ nếu thời gian bất động `< 5.0s`). |
| `GET` | `/api/v1/map/segments` | Trả về dữ liệu bản đồ `GeoJSON FeatureCollection` (`LineString`) các tuyến hẻm đổi màu Xanh / Vàng / Đỏ. |
| `GET` | `/api/v1/reports/summary` | Xuất Báo cáo văn bản mộc mạc (`?type=instant` cho Mẫu A hoặc `?type=shift` cho Mẫu B). |
| `POST` | `/api/nodes/{id}/fall_test` | Kích hoạt hoặc đặt lại bộ đếm kiểm thử ngã xe bất động 5 giây trực tiếp trên luồng Live Demo. |

---

## 🚀 Hướng dẫn khởi chạy & Kiểm thử

### Cách 1: Chạy trực tiếp trên môi trường máy tính (Local Development)

**1. Khởi động Backend (FastAPI + YOLOv8n CPU):**
```bash
backend\venv\Scripts\python.exe -m uvicorn main:app --app-dir backend --host 127.0.0.1 --port 8000
```
*Swagger UI:* `http://127.0.0.1:8000/docs`

**2. Khởi động Bảng điều khiển WebGIS (React + Leaflet):**
```bash
cd frontend
npm install
npm run dev
```
*Truy cập Dashboard:* `http://localhost:5173`

### Cách 2: Khởi chạy 1 lệnh bằng Docker Compose
```bash
docker compose up --build -d
```

### Cách 3: Chạy bộ kiểm thử tự động (Pytest QA) & Đánh giá mô hình
```bash
# Chạy 13 bài kiểm thử Unit & Integration Test
backend\venv\Scripts\python.exe -m pytest tests/ -v

# Chạy đánh giá thực nghiệm trên 5 video thực tế và xuất docs/TEST_REPORT.md
backend\venv\Scripts\python.exe backend\eval_benchmark.py
```
👉 Xem kết quả kiểm thử chi tiết tại: [`docs/TEST_REPORT.md`](docs/TEST_REPORT.md) và dữ liệu tại [`docs/DATA.md`](docs/DATA.md).
