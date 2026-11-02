# 🚀 KẾ HOẠCH TỔNG THỂ VÒNG THỬ THÁCH (24H CODING)
## DỰ ÁN: URBANSHIELD LITE – ĐỘI SINGLENODE
### CUỘC THI: SGU HACKATHON 2026 – TRƯỜNG ĐẠI HỌC SÀI GÒN

> **Mục tiêu:** Hoàn thiện giải pháp UrbanShield Lite từ bản thử nghiệm ban đầu thành một sản phẩm thực tế, chạy ổn định, có cấu trúc kỹ thuật bài bản; đáp ứng trọn vẹn **100/100 điểm theo 8 tiêu chí đánh giá của Ban Tổ chức** và hiện thực hóa các **định hướng chỉ đạo của Mentor Ban Giám khảo (Anh Cảnh)**.

---

## 🎯 MA TRẬN MỤC TIÊU & CHỈ ĐẠO BAN GIÁM KHẢO

| Trụ cột đánh giá (100đ) | Kỳ vọng của Mentor BGK (Anh Cảnh) | Đầu ra kỹ thuật cam kết của UrbanShield Lite |
| :--- | :--- | :--- |
| **1. Planning & Quản lý (10đ)** | Sử dụng GitHub Spec Kit (`spec-kit`), chia nhỏ milestone, sprint rõ ràng. | Cấu trúc thư mục `.spec/` chuẩn mực, định nghĩa rõ ràng yêu cầu chức năng, phi chức năng và kịch bản demo. |
| **2. Dữ liệu & Mô hình AI (20đ)** | Giải thích lý do chọn mô hình, hạn chế báo giả, an toàn AI, có **Test Report** minh bạch. | YOLOv8-nano gọn nhẹ trên CPU phổ thông; đo ngập bánh xe 50cm; bộ đếm bất động 5s chống báo giả; bộ test tự động xuất `TEST_REPORT.md`. |
| **3. Cấu trúc, Triển khai & Hoàn thiện (20đ)** | Phân tách module (Microservice/Modular), Minimal API, CI/CD, Privacy-by-design, Docker 1 lệnh. | Tách Edge Vision, Minimal API (<150 bytes), Text Report Engine, Docker Compose 1 lệnh, GitHub Actions CI. |
| **4. Tiết kiệm chi phí AI & Hạ tầng (10đ)** | Đánh giá mức độ tối ưu ngân sách, không lãng phí tài nguyên. | Xử lý tại chỗ trên CPU máy tính cũ khu phố (0đ GPU đắt đỏ), chỉ gửi mẩu tin khi có sự cố (giảm 99.9% băng thông mạng). |
| **5. Ứng dụng Cloud (AWS / Google) (10đ)** | Triển khai Dashboard và API lên hạ tầng Cloud có IP/Domain công khai, an toàn bảo mật. | Cấu hình Docker container production sẵn sàng deploy lên AWS EC2 / Google Cloud Run, lưu trữ lịch sử báo cáo an toàn. |
| **6. Trình diễn & Phản biện (10đ)** | Ưu tiên 100% Live Demo tương tác thực tế trên sản phẩm đang chạy thay vì chỉ chiếu slide. | Kịch bản tương tác 3 phút: Nạp video hẻm $\rightarrow$ Đo ngập tức thì $\rightarrow$ Báo ngã xe $\rightarrow$ Bắn tin Telegram trong 1.5s $\rightarrow$ Bằng chứng RAM. |

---

## ⏱️ LỘ TRÌNH 5 SPRINT TRIỂN KHAI TRONG 24 GIỜ

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                          LỘ TRÌNH 24 GIỜ VÒNG CODING                            │
└────────────────────────────────────────────────────────────────────────────────┘
 [Giờ 00 - 02] Sprint 0: Chuẩn hóa GitHub Spec Kit & Phân rã cấu trúc dự án
       │
 [Giờ 02 - 07] Sprint 1: Tinh chỉnh Core AI Engine & Thuật toán Edge Vision
       │
 [Giờ 07 - 12] Sprint 2: Minimal API (<150B), Text Report Engine & Telegram Dispatcher
       │
 [Giờ 12 - 16] Sprint 3: Tối ưu WebGIS Dashboard & Công cụ trực quan hóa Live Demo
       │
 [Giờ 16 - 20] Sprint 4: Xây dựng Test Suite tự động & Xuất Test Report (Mandatory)
       │
 [Giờ 20 - 24] Sprint 5: Đóng gói Docker Compose, GitHub Actions CI/CD & Cloud Deployment
```

---

## 📋 CHI TIẾT CÁC HẠNG MỤC CÔNG VIỆC THEO TỪNG SPRINT

### 🏁 SPRINT 0: CHUẨN HÓA GITHUB SPEC KIT & PHÂN RÃ CẤU TRÚC (Giờ 00 - Giờ 02)
*Mục tiêu: Đặt nền móng dự án chuẩn kỹ sư phần mềm chuyên nghiệp theo đúng hướng dẫn của Mentor Anh Cảnh.*

- [x] **Task 0.1:** Khởi tạo thư mục `.spec/` và `.specify/` theo chuẩn **GitHub Spec Kit**:
  - `.spec/constitution.md`: Hiến chương dự án, nguyên tắc bất biến (Anti-hype, Privacy RAM, CPU-first).
  - `.spec/spec.md` & `.spec/functional-spec.md`: Đặc tả chi tiết các tác vụ nghiệp vụ & User Stories.
  - `.spec/plan.md` & `.spec/technical-spec.md`: Thiết kế kiến trúc Modular Edge-First, Minimal API contract.
  - `.spec/tasks.md`: Danh mục nhiệm vụ nguyên tử (atomic tasks) cho cả 5 sprint.
  - `.spec/live-demo-spec.md`: Kịch bản điều phối Live Demo 3 phút từng thao tác cụ thể.
  - `.specify/manifest.json`: Siêu dữ liệu chuẩn hóa công cụ Spec Kit.
- [ ] **Task 0.2:** Rà soát và cấu hình môi trường phát triển (Python 3.10+ venv, Node.js 18+, Docker).
- [ ] **Task 0.3:** Cập nhật tài liệu điều phối dự án và phân công trách nhiệm rõ ràng.

---

### 🧠 SPRINT 1: TINH CHỈNH CORE AI ENGINE & THUẬT TOÁN EDGE VISION (Giờ 02 - Giờ 07)
*Mục tiêu: Đạt độ chính xác cao trên CPU phổ thông, triệt tiêu báo động giả và bảo đảm Privacy-by-design.*

- [ ] **Task 1.1 - Thuật toán đo ngập hình học qua bánh xe máy 50cm:**
  - Hoàn thiện công thức ánh xạ tỷ lệ che khuất bánh xe máy:
    $$D_{\text{ngập}} = 50\text{ cm} \times \left(1 - \frac{H_{\text{hiển thị}}}{H_{\text{gốc}}}\right)$$
  - Phân loại rõ 3 cấp độ thực tế:
    - Mức 1: $< 10\text{ cm}$ (Rất nhẹ - Xe máy đi bình thường).
    - Mức 2: $10 - 20\text{ cm}$ (Chú ý - Mép pô xe máy).
    - Mức 3: $> 20\text{ cm}$ (Nguy hiểm - Nước tràn buồng máy, dễ chết máy).
- [ ] **Task 1.2 - Thuật toán phát hiện ngã xe đa tầng chống báo giả:**
  - Tầng 1: Kiểm tra tỷ lệ khung bao nằm ngang người và xe máy ($W/H > 1.15$).
  - Tầng 2: Kiểm tra cự ly không gian giữa người và xe đổ ($\text{Distance} < 180\text{ px}$).
  - Tầng 3: **Bộ đếm bất động liên tục > 5 giây** (Debounce timer) để loại trừ người dừng xe dắt bộ, người cúi nhặt đồ hoặc dỡ hàng hóa.
- [ ] **Task 1.3 - Thuật toán cân bằng sáng thích ứng CLAHE:**
  - Tự động tăng cường độ tương phản cục bộ khi camera ghi nhận điều kiện mưa đêm hoặc hẻm thiếu sáng.
- [ ] **Task 1.4 - Xác thực cơ chế Privacy-by-design:**
  - Cơ chế giải mã frame video trực tiếp trong bộ nhớ RAM tạm thời và giải phóng ngay sau khi inference (`Zero-Disk write`).
  - Không thu thập đặc trưng khuôn mặt hoặc biển số xe chi tiết của người dân.

---

### ⚡ SPRINT 2: MINIMAL API, TEXT REPORT ENGINE & TELEGRAM DISPATCHER (Giờ 07 - Giờ 12)
*Mục tiêu: Tối ưu hiệu năng, gói tin siêu nhẹ phù hợp hạ tầng mạng ngõ hẻm và tự động gửi tin nhắn cho cơ sở.*

- [ ] **Task 2.1 - Tinh giản API thành Minimal API:**
  - Giảm thiểu tối đa middleware thừa, thiết kế phi trạng thái.
  - Chuẩn hóa payload mẩu tin sự cố **dưới 150 bytes**:
    ```json
    {
      "node_id": "hem_254_q4",
      "type": "FLOOD",
      "val": 22.5,
      "unit": "cm",
      "time": 1729145700
    }
    ```
  - Các endpoint cốt lõi:
    - `GET /health` (Heartbeat node & Uptime).
    - `POST /api/v1/incidents/flood` (Cập nhật mực nước).
    - `POST /api/v1/incidents/accident` (Cảnh báo ngã xe khẩn cấp).
    - `GET /api/v1/reports/summary` (Xuất Text Report).
    - `GET /api/v1/nodes` (Danh sách các trạm giám sát).
- [ ] **Task 2.2 - Xây dựng Text Report Engine (Báo cáo dạng văn bản):**
  - **Mẫu A (Instant Alert):** Mẩu tin ngắn gọn gửi ngay khi phát hiện sự cố (nêu rõ hẻm nào, ngập bao nhiêu cm, ngã xe bao lâu, đề xuất hành động).
  - **Mẫu B (Shift / Daily Digest):** Báo cáo tổng hợp ca trực tóm tắt số vụ ngập, đỉnh triều, số vụ trượt ngã và tỷ lệ uptime của các camera.
- [ ] **Task 2.3 - Module Telegram Alert Dispatcher:**
  - Tích hợp gửi tin tức thời qua Telegram Bot API (gửi kèm tọa độ GPS và thông điệp văn bản chuẩn hóa).
  - Hỗ trợ gửi ảnh sự cố có che mờ/bảo vệ đời tư (nếu cần thiết cho xác minh cứu nạn).

---

### 🗺️ SPRINT 3: TỐI ƯU WEBGIS DASHBOARD & CÔNG CỤ LIVE DEMO (Giờ 12 - Giờ 16)
*Mục tiêu: Giao diện trực quan, nhẹ, mượt mà trên điện thoại và tối ưu cho phần thuyết trình trực tiếp.*

- [ ] **Task 3.1 - Nâng cấp bản đồ số Leaflet GIS:**
  - Thể hiện các tuyến ngõ hẻm trực quan bằng LineString GeoJSON đổi màu theo thời gian thực (Xanh lá: An toàn, Vàng: Ngập nhẹ, Đỏ: Ngập sâu/Có người ngã).
  - Ghim các điểm camera (Trạm 01, Trạm 02, Trạm 03) kèm thông số hoạt động.
- [ ] **Task 3.2 - Bộ chuyển đổi 3 kịch bản Demo tương tác:**
  - Tạo các nút chuyển trạng thái một chạm:
    - *Kịch bản 1:* "Đường khô ráo, giao thông thông thoáng" (Normal).
    - *Kịch bản 2:* "Mưa lớn triều cường, nước ngập 24cm" (Flood).
    - *Kịch bản 3:* "Sự cố trượt bánh ngã xe, nằm bất động 5s" (Accident).
- [ ] **Task 3.3 - Bổ sung các widget kiểm tra kỹ thuật (Technical Proofs):**
  - Widget đo đếm FPS thực tế trên CPU (25 - 30 FPS).
  - Widget "Kiểm tra bộ nhớ RAM & Zero-Disk" (chứng minh không lưu trữ video người dân).
  - Nút bấm "Xem & Sao chép Text Report" để tải báo cáo gửi ngay vào Zalo/Tin nhắn.
- [ ] **Task 3.4 - Hoàn thiện giao diện Responsive:**
  - Đảm bảo hiển thị tối ưu trên màn hình lớn của hội đồng thi và trên màn hình di động của cán bộ dân phòng.

---

### 🧪 SPRINT 4: XÂY DỰNG TEST SUITE TỰ ĐỘNG & TEST REPORT (MANDATORY) (Giờ 16 - Giờ 20)
*Mục tiêu: Đạt điểm tối đa phần Kiểm thử mô hình (Tiêu chí III.4 & Lời dặn sống còn của Mentor Anh Cảnh).*

- [ ] **Task 4.1 - Viết bộ Unit Tests (pytest):**
  - `tests/test_flood_depth.py`:
    - Test công thức ánh xạ hình học với bánh xe 50cm.
    - Test phân loại 3 ngưỡng mực nước (<10cm, 10-20cm, >20cm).
    - Test xử lý giá trị biên (độ sâu âm, vượt quá 100cm).
  - `tests/test_fall_detection.py`:
    - Test tỷ lệ khung bao nằm ngang ($W/H > 1.15$).
    - Test cự ly người - phương tiện.
    - Test bộ đếm bất động liên tục: < 5s không báo động, đủ 5s kích hoạt còi báo.
  - `tests/test_minimal_api.py`:
    - Test kiểm tra phản hồi `/health`.
    - Test tiếp nhận sự kiện ngập nước và ngã xe.
    - Test kích thước payload phản hồi $< 150\text{ bytes}$.
  - `tests/test_text_report.py`:
    - Test tự động sinh văn bản báo cáo theo định dạng mộc mạc, không chứa từ ngữ báo chí kịch tính.
- [ ] **Task 4.2 - Viết Integration Test & Mock End-to-End:**
  - Kiểm thử toàn bộ chuỗi: Nhận diện frame $\rightarrow$ Kích hoạt logic $\rightarrow$ Tạo bản tin Text Report $\rightarrow$ Dispatch sang Telegram.
- [ ] **Task 4.3 - Tạo lệnh tự động chạy Test và xuất Báo cáo:**
  - Viết script `run_tests.py` hoặc lệnh pytest xuất file `docs/TEST_REPORT.md` kèm bảng tổng kết: số lượng test passed 100%, thời gian phản hồi, độ trễ xử lý.

---

### 🐳 SPRINT 5: CONTAINERIZATION, CI/CD PIPELINE & CLOUD READINESS (Giờ 20 - Giờ 24)
*Mục tiêu: Đạt điểm tối đa Tiêu chí IV (Cấu trúc & Triển khai) và Tiêu chí VII (Công nghệ Cloud).*

- [ ] **Task 5.1 - Đóng gói Docker & Docker Compose:**
  - `backend/Dockerfile`: Tối ưu hóa base image Python slim, cài đặt OpenCV headless và YOLOv8n.
  - `frontend/Dockerfile`: Multi-stage build với Node.js và Nginx phục vụ static bundle siêu nhẹ.
  - `docker-compose.yml`: Khởi chạy toàn bộ hệ thống bằng đúng 1 câu lệnh (`docker compose up -d`).
- [ ] **Task 5.2 - Thiết lập GitHub Actions CI Pipeline:**
  - Tạo `.github/workflows/ci.yml`:
    - Tự động kích hoạt khi push code.
    - Chạy linter kiểm tra code sạch.
    - Chạy toàn bộ bộ test `pytest` và kiểm tra pass 100%.
    - Thử nghiệm build Docker container.
- [ ] **Task 5.3 - Cấu hình Cloud Deployment Readiness (AWS / Google Cloud):**
  - Viết tài liệu và kịch bản triển khai lên Google Cloud Run hoặc AWS EC2/ECS.
  - Cấu hình file biến môi trường production (`.env.example`) và hướng dẫn trỏ Domain/HTTPS.
- [ ] **Task 5.4 - Tổng duyệt Kịch bản Live Demo 3 phút:**
  - Diễn tập mượt mà theo 5 bước: Khởi động hệ thống $\rightarrow$ Trình diễn đo ngập $\rightarrow$ Phát hiện ngã xe $\rightarrow$ Nhận tin Telegram $\rightarrow$ Minh chứng RAM sạch.

---

## 📊 BẢNG THEO DÕI ĐẦU RA SẢN PHẨM (DELIVERABLES CHECKLIST)

| STT | Tên tài nguyên / Module | Đường dẫn file dự kiến | Trạng thái |
| :---: | :--- | :--- | :---: |
| 1 | GitHub Spec Kit Overview | `.spec/functional-spec.md` | Chờ thực hiện |
| 2 | Technical Spec & API Contract | `.spec/technical-spec.md` | Chờ thực hiện |
| 3 | Kịch bản Live Demo 3 phút | `.spec/live-demo-spec.md` | Chờ thực hiện |
| 4 | Core AI Detector (Edge) | `backend/detector.py` | Sẵn sàng nâng cấp |
| 5 | Minimal API & Dispatcher | `backend/main.py` | Sẵn sàng nâng cấp |
| 6 | Text Report Generator | `backend/reporting.py` | Tạo mới |
| 7 | Dashboard WebGIS | `frontend/src/App.jsx` | Sẵn sàng nâng cấp |
| 8 | Bộ Unit Tests & Integration | `backend/tests/` | Tạo mới |
| 9 | Báo cáo kiểm thử tự động | `docs/TEST_REPORT.md` | Tạo mới |
| 10 | Dockerfile Backend & Frontend | `backend/Dockerfile`, `frontend/Dockerfile` | Tạo mới |
| 11 | Docker Compose chạy 1 lệnh | `docker-compose.yml` | Tạo mới |
| 12 | GitHub Actions CI Workflow | `.github/workflows/ci.yml` | Tạo mới |
| 13 | Hướng dẫn triển khai Cloud | `docs/CLOUD_DEPLOYMENT_GUIDE.md` | Tạo mới |

---

## 🏆 KẾ HOẠCH NÀY ĐẢM BẢO CHIẾN THẮNG BẰNG CÁCH NÀO?

1. **Khóa chặt lời dặn của Ban Giám khảo:** Bắt buộc có **Test Report** chứng minh sản phẩm chạy thật; dùng **GitHub Spec Kit** làm việc bài bản; ứng dụng **Minimal API** và **Text Report** giải quyết đúng nhu cầu cán bộ cơ sở.
2. **Không bánh vẽ, không cường điệu (Anti-hype):** Toàn bộ kỹ thuật đều dựa trên thực tế: CPU phổ thông, bánh xe 50cm, bộ đếm 5s, RAM sạch không lưu video người dân.
3. **Chuẩn bị hoàn hảo cho 3 phút Live Demo:** Giám khảo được trực tiếp nhìn thấy AI xử lý, chuông kêu, bản đồ đổi màu và điện thoại cá nhân nhận tin nhắn cảnh báo trong chưa đầy 2 giây.
