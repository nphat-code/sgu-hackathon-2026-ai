# 🚀 KẾ HOẠCH VÒNG THỬ THÁCH 24H – URBANSHIELD LITE (BẢN 2)

> **Đội:** SingleNode (1 thành viên: Phát)
> **Lịch thi:** 07/11/2026 (đã dời từ 31/10). *Giả định khung giờ giữ như thể lệ cũ: 12:00 (07/11) bắt đầu → 09:00 (08/11) dừng code → trước 09:30 nộp slide → 10:00 demo & phản biện. Cần xác nhận lại ở buổi phổ biến quy chế.*
> **Cloud:** Google Cloud Run (đã có tài khoản/credit)
> **Thời gian code thực tế:** khoảng **21 giờ**, làm một mình → phải cắt phạm vi thật gọn, ưu tiên theo điểm.

---

## ⚠️ 0. NHỮNG RÀNG BUỘC QUYẾT ĐỊNH KẾ HOẠCH

| Ràng buộc (theo thể lệ & barem) | Hệ quả cho kế hoạch |
| :--- | :--- |
| Repo thi phải **trống 100%**, chỉ tính commit trong 24h, **cấm push hàng loạt code soạn sẵn** | Code trong repo hiện tại (`backend/`, `frontend/`) **chỉ để luyện tập**. Vào giờ thi phải viết lại từ đầu, commit nhỏ, đều đặn. |
| Làm một mình | Gộp API + Dashboard vào **1 container** trên Cloud Run để đỡ việc hạ tầng. Không làm microservice thật, chỉ tách module rõ ràng trong code. |
| Tiêu chí VII (10đ) đòi **deploy thật**, có URL công khai, HTTPS, biến môi trường | Deploy Cloud Run **sớm** (khoảng giờ thứ 8), không để tới cuối. |
| Tiêu chí III (20đ) đòi dữ liệu minh bạch, đánh giá mô hình tái lập được, có chỉ số | Chuẩn bị **bộ clip đánh giá có gán nhãn** trước ngày thi và viết script đánh giá trong giờ thi. |
| Code cũ đang **gán cứng** độ ngập 26cm khi chọn kịch bản "flood" ([detector.py](file:///c:/Competition/HackathonSGU2026/backend/detector.py#L101-L107)) | Bản thi phải đo thật trên video. Kịch bản demo dùng **video thật** chứ không dùng nút "giả lập kết quả". |

---

## 🧭 1. KIẾN TRÚC CHỌN CHO VÒNG THI

```
 MÁY TÍNH KHU PHỐ (laptop lúc demo)                    GOOGLE CLOUD RUN (URL công khai, HTTPS)
┌──────────────────────────────────┐                 ┌───────────────────────────────────────┐
│ edge/  (Python)                  │  JSON < 150B    │ server/ (FastAPI)                     │
│ • Đọc video / webcam             │ ──────────────► │ • REST API + xác thực khóa từng trạm  │
│ • YOLOv8n + tracking (CPU)       │  + heartbeat    │ • Lưu sự cố (PostgreSQL / Cloud SQL)  │
│ • Đo ngập theo bánh xe ~50cm     │                 │ • Gửi Telegram + sinh Text Report     │
│ • Ngã xe: tỷ lệ khung + đếm 5s   │                 │ • Phục vụ Dashboard (React + Leaflet) │
│ • Khung hình chỉ nằm trên RAM    │                 │ • Log JSON → Cloud Logging            │
│ • Hàng đợi offline (SQLite)      │                 └───────────────────────────────────────┘
└──────────────────────────────────┘                        │                     │
                                                    Dashboard trên điện thoại   Telegram dân phòng
```

**Vì sao chọn như vậy (để trả lời phản biện):**
- **Phần AI chạy tại chỗ, không đưa lên Cloud:** đúng với câu chuyện "không kéo video về máy chủ". Cloud chỉ nhận mẩu tin, nên gói Cloud Run nhỏ nhất là đủ, chi phí thấp.
- **Dashboard trên Cloud không hiện video:** đây là chủ ý bảo vệ đời tư. Video có khung nhận diện chỉ hiện trên màn hình của máy tính khu phố.
- **Phân tích khoảng 5 khung hình/giây thay vì 30:** ngập và ngã xe đều diễn ra trong vài giây, nên xử lý 5 FPS là đủ. Nhờ vậy CPU nhẹ hơn và một máy tính gánh được nhiều camera hơn. Đây là điểm cộng cho tiêu chí VI (tiết kiệm chi phí), và có số đo thật để chứng minh.
- **PostgreSQL trên Cloud SQL, SQLite khi chạy test:** dùng SQLAlchemy nên chỉ cần đổi `DATABASE_URL`, khớp gợi ý của anh Cảnh về thiết kế cơ sở dữ liệu.
- **Dashboard hỏi dữ liệu mỗi 2 giây (polling) thay vì WebSocket:** trên Cloud Run cách này ổn định hơn và ít lỗi khi demo. Đặt `min-instances=1` trong buổi demo để không bị khởi động nguội.

---

## 🎯 2. BẢNG ĐỐI CHIẾU: BAREM → SẢN PHẨM → BẰNG CHỨNG CHO GIÁM KHẢO

| Tiêu chí | Điểm | Làm gì trong 24h | Bằng chứng đưa ra lúc chấm |
| :--- | :---: | :--- | :--- |
| I. Sáng tạo | 10 | Đo ngập theo bánh xe chạy thật trên video | Demo video thật, số cm hiện trên khung hình |
| II. Thực tiễn | 10 | Text Report gửi Telegram cho dân phòng | Điện thoại nhận tin trong lúc demo |
| III.1 Dữ liệu | 5 | `docs/DATA.md`: nguồn từng clip, cách gán nhãn, không đưa video lên repo | Bảng nguồn + file nhãn `labels.csv` |
| III.2 Mô hình | 5 | Giải thích chọn YOLOv8n, ngưỡng, giới hạn | Mục "Giới hạn mô hình" trong README |
| III.3 An toàn AI | 5 | Đếm 5s chống báo giả, CLAHE ban đêm, mỗi cảnh báo kèm **lý do**, không nhận diện mặt/biển số | Mẩu tin hiện rõ "vì sao báo" |
| III.4 Kiểm thử mô hình | 5 | `edge/eval/run_eval.py` chạy trên clip có nhãn → Precision/Recall/F1, độ trễ | `docs/TEST_REPORT.md` |
| IV.1 Cấu trúc | 3 | `edge/`, `server/`, `web/`, `tests/` tách rõ, có ruff | Cây thư mục trong README |
| IV.2 FE/UI | 3 | Bản đồ + danh sách sự cố + trang báo cáo, xem tốt trên điện thoại | Giám khảo mở URL trên điện thoại |
| IV.3 BE & hiệu suất | 5 | REST chuẩn, schema DB, index theo thời gian, đo thời gian phản hồi | Swagger `/docs` + số đo latency |
| IV.4 CI/CD | 3 | GitHub Actions: lint → test → build → deploy Cloud Run | Tab Actions màu xanh |
| IV.5 Bảo mật | 3 | Khóa API cho từng trạm, secret trong Secret Manager, kiểm tra dữ liệu vào bằng Pydantic, không gửi ảnh | Mục Security trong README |
| IV.6 Hoàn thiện | 3 | Docker, `docker compose up` chạy local, demo không lỗi | Demo trực tiếp |
| V. Cộng đồng | 10 | (Phần thuyết trình) + hướng dẫn cài đặt cho phường | README phần "Triển khai cho một phường" |
| VI. Tiết kiệm chi phí AI | 10 | Edge đếm byte đã gửi; Dashboard so với lượng dữ liệu nếu phải gửi video | Widget "Băng thông đã dùng" với số đo thật |
| VII. Cloud | 10 | Cloud Run + Cloud SQL + Secret Manager + Artifact Registry | URL `https://...run.app` |
| VIII. Thuyết trình | 10 | Kịch bản demo 3 phút + bộ Q&A | Diễn tập 3 lần trước 09:00 |

---

## 📅 3. GIAI ĐOẠN CHUẨN BỊ (02/11 – 06/11): KHÔNG VIẾT CODE NỘP THI

> Nguyên tắc: chuẩn bị **dữ liệu, hạ tầng, kiến thức, thử nghiệm**. Có thể thử code trong repo luyện tập này để học, nhưng **không mang file code sang repo thi**.

### 02/11 (hôm nay): Chốt kế hoạch & hỏi BTC
- [ ] Gửi câu hỏi cho BTC/anh Cảnh (xem mục 6).
- [ ] Chốt kế hoạch này.

### 03/11: Dữ liệu đánh giá (phục vụ III.1 và III.4)
- [ ] Gom **20–30 clip ngắn** (10–30 giây): hẻm ngập có xe máy chạy qua, xe máy trượt ngã, và **clip "dễ báo nhầm"** (người cúi nhặt đồ, dắt xe, dừng xe chống chân).
- [ ] Gán nhãn vào `labels.csv`: `clip, loai (FLOOD/FALL/NONE), muc_ngap (1/2/3), giay_bat_dau_nga, ghi_chu`.
- [ ] Ghi rõ nguồn từng clip (link, thời điểm). Video **không đưa lên GitHub** (đời tư và bản quyền).
- [ ] Nói thật trong tài liệu: mức ngập được gán nhãn **bằng mắt theo phần bánh xe bị che**, nên chấm theo cấp độ (1/2/3), không chấm sai số tính bằng cm.

### 04/11: Thử nghiệm thuật toán (rủi ro kỹ thuật lớn nhất)
- [ ] Đo tốc độ YOLOv8n trên CPU laptop ở `imgsz=320` và `640` → ghi lại **số thật**, không dùng con số 25–30 FPS nếu chưa đo được.
- [ ] Thử cách đo ngập: so chiều cao khung xe máy nhìn thấy với chiều cao dự kiến (tính theo bề ngang khung, khi xe quay ngang). Ghi lại những trường hợp không đo được (xe quay thẳng vào camera, bị che).
- [ ] Thử `model.track()` (ByteTrack có sẵn trong ultralytics) để giữ ID người khi đếm 5 giây.
- [ ] Chốt các ngưỡng: `W/H > 1.15`, khoảng cách người–xe, 5 giây, ngưỡng mức ngập.

### 05/11: Hạ tầng Google Cloud & công cụ
- [ ] Tạo GCP project, bật Cloud Run, Artifact Registry, Cloud SQL, Secret Manager.
- [ ] Tạo Cloud SQL PostgreSQL loại nhỏ nhất (tạo mất khoảng 10 phút, nên làm trước).
- [ ] Tạo service account cho GitHub Actions (quyền deploy Cloud Run, đẩy image).
- [ ] Tạo Telegram Bot, lấy `BOT_TOKEN` và `CHAT_ID`, lưu vào Secret Manager.
- [ ] Deploy thử một app "hello" lên Cloud Run từ repo nháp để chắc chắn quy trình chạy được.
- [ ] Cài sẵn: `uv` + `specify-cli` (GitHub Spec Kit), Docker Desktop, Node 20, Python 3.11, `gcloud`; tải sẵn `yolov8n.pt` và các Docker base image.

### 06/11: Tổng duyệt
- [ ] Chạy thử 6–8 tiếng theo đúng lịch mục 4 trên repo nháp để căn thời gian.
- [ ] Khung slide sẵn, chừa chỗ điền số đo thật lúc 08:00 ngày thi.
- [ ] Chuẩn bị đồ: sạc, 4G dự phòng, video demo trong ổ cứng, tài khoản đã đăng nhập sẵn.
- [ ] **Ngủ đủ.**

---

## ⏱️ 4. LỊCH 21 GIỜ CODE (07/11 12:00 → 08/11 09:00)

> Quy tắc: commit + push mỗi 20–40 phút, message dạng `feat: ...`, `test: ...`, `fix: ...`. Mỗi mốc có **điều kiện xong** rõ ràng; trễ quá 30 phút thì cắt bớt theo mục 5.

| Giờ | Khối việc | Điều kiện xong |
| :--- | :--- | :--- |
| **12:00 – 12:45** | **Khởi tạo + Spec Kit:** `specify init`, viết constitution/spec/plan/tasks ngắn gọn, cây thư mục, README khung, `.gitignore`, ruff | Commit đầu tiên có `.specify/` và `specs/` |
| **12:45 – 16:30** | **Edge (phần AI):** đọc video, YOLOv8n + tracking ở 5 FPS, đo ngập theo bánh xe, máy trạng thái ngã xe 5s, CLAHE, gửi sự kiện kèm hàng đợi offline. Viết unit test song song | Chạy trên 1 clip ngập và 1 clip ngã ra đúng sự kiện; test pass |
| **16:30 – 19:30** | **Server:** FastAPI, model DB (`nodes`, `incidents`, `heartbeats`), endpoint, khóa API từng trạm, Telegram, Text Report, `/health`, log JSON | Edge gửi sự kiện → lưu DB → Telegram nhận tin (chạy local) |
| **19:30 – 20:30** | Ăn tối + **Dockerfile + deploy Cloud Run lần đầu** (kết nối Cloud SQL, gắn secret) | URL `https://...run.app/health` trả về `ok` |
| **20:30 – 00:30** | **Dashboard:** Vite + React + Leaflet; bản đồ trạm, danh sách sự cố, trang Text Report, widget băng thông/FPS; build vào cùng container | Mở URL trên điện thoại thấy sự cố mới sau khoảng 2 giây |
| **00:30 – 01:30** | **CI/CD:** GitHub Actions lint → pytest → build → deploy | Push lên `main` tự deploy, tab Actions xanh |
| **01:30 – 03:00** | **Nghỉ / ngủ ngắn** (bắt buộc, làm một mình rất dễ sai lúc 4h sáng) | |
| **03:00 – 05:00** | **Đánh giá mô hình:** `run_eval.py` chạy trên bộ clip có nhãn → Precision/Recall/F1, ma trận nhầm lẫn, độ trễ; xuất `TEST_REPORT.md`. Thêm 1–2 test Playwright cho Dashboard | `docs/TEST_REPORT.md` có số thật |
| **05:00 – 06:30** | Sửa lỗi, viết `DATA.md`, README (kiến trúc, lý do chọn, giới hạn, bảo mật, chi phí) | **06:30 khóa tính năng**, sau đó chỉ sửa lỗi |
| **06:30 – 07:30** | Diễn tập demo 3 lần trên URL thật; đặt `min-instances=1` | Chạy trọn 3 phút không lỗi |
| **07:30 – 09:00** | Điền số đo thật vào slide, kiểm tra lại repo, commit cuối | Nộp slide trước 09:30 |

---

## ✂️ 5. THỨ TỰ CẮT BỚT NẾU TRỄ

Cắt từ trên xuống:
1. Test Playwright (giữ pytest)
2. Tô màu tuyến hẻm bằng GeoJSON (dùng chấm màu tại trạm là đủ)
3. Bản tin tổng hợp ca trực (giữ mẫu cảnh báo tức thời)
4. CLAHE (ghi vào phần "hướng phát triển")
5. Cloud SQL → chuyển sang SQLite trong container (chấp nhận mất dữ liệu khi khởi động lại, và nói thật điều này)

**Không bao giờ cắt:** phát hiện chạy thật trên video, deploy Cloud Run, Telegram, pytest + `TEST_REPORT.md`, CI.

---

## 🛟 6. RỦI RO & PHƯƠNG ÁN DỰ PHÒNG

| Rủi ro | Phương án |
| :--- | :--- |
| Đo ngập theo bánh xe sai nhiều trên một số góc camera | Chỉ đo khi xe quay ngang; báo "không đủ điều kiện đo" thay vì đoán bừa; nói rõ giới hạn khi phản biện |
| Mạng ở trường yếu lúc demo | 4G dự phòng; Edge có hàng đợi offline, mất mạng vẫn chạy và gửi bù khi có mạng lại (đây cũng là một điểm để demo) |
| Cloud Run lỗi lúc demo | `docker compose up` chạy toàn bộ trên laptop làm phương án B |
| Telegram chậm hoặc bị chặn | Dashboard vẫn hiện sự cố; Text Report xem trực tiếp trên web |
| Mệt, code lỗi về sáng | Ngủ 01:30–03:00, khóa tính năng lúc 06:30 |

**Câu hỏi cần hỏi BTC / anh Cảnh trước 07/11:**
1. Có được dùng **bộ clip và file nhãn chuẩn bị trước** không? (dữ liệu, không phải code)
2. Có được dùng trọng số pretrained `yolov8n.pt` và **công cụ AI hỗ trợ viết code** không?
3. Hạ tầng Cloud (project, Cloud SQL, service account) tạo sẵn trước có được không?
4. Khung giờ ngày 07/11 có giữ như thể lệ cũ (12:00 → 09:00) không?

---

## 📦 7. CẤU TRÚC REPO THI DỰ KIẾN

```text
urbanshield-lite/
├── .specify/ , specs/          # GitHub Spec Kit (tạo bằng `specify init`)
├── edge/                       # Chạy tại máy tính khu phố
│   ├── capture.py              # Đọc video/webcam, khung hình chỉ nằm trên RAM
│   ├── detector.py             # YOLOv8n + tracking
│   ├── flood.py                # Đo ngập theo bánh xe
│   ├── fall.py                 # Máy trạng thái ngã xe, đếm 5s
│   ├── sender.py               # Gửi sự kiện + hàng đợi offline
│   └── eval/run_eval.py        # Đánh giá trên clip có nhãn
├── server/                     # Chạy trên Cloud Run
│   ├── main.py , api/ , models.py , db.py
│   ├── reporting.py            # Text Report
│   └── notify.py               # Telegram
├── web/                        # React + Leaflet
├── tests/                      # pytest (+ Playwright)
├── docs/  DATA.md  TEST_REPORT.md
├── Dockerfile , docker-compose.yml
└── .github/workflows/ci.yml
```
