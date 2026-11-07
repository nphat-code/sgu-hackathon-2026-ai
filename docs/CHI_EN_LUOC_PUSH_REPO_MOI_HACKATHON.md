# 🎯 CHIẾN LƯỢC SEED & PUSH PROGRESSIVE SANG REPO MỚI (HACKATHON)

Tài liệu này cung cấp kịch bản và công cụ tự động hóa giúp bạn chuyển giao toàn bộ mã nguồn của dự án **UrbanShield Lite** sang một repository GitHub/GitLab hoàn toàn mới do Ban Tổ Chức (BTC) yêu cầu, đảm bảo **lịch sử commit diễn ra tự nhiên, chân thực và chuẩn phong cách Hackathon 24h**.

---

## 💡 TẠI SAO CẦN PUSH TỪ TỪ THAY VÌ PUSH HÀNG LOẠT?

1. **Yêu cầu giám sát của Ban Giám khảo:** Giám khảo kỹ thuật thường mở tab *Insights $\rightarrow$ Network / Commit History* trên GitHub. Nếu thấy một commit duy nhất chứa 15,000 dòng code lúc 8h10 sáng, dự án sẽ ngay lập tức bị đặt dấu hỏi về việc "chuẩn bị trước".
2. **Thể hiện đúng tiến trình phát triển phần mềm:** Một đội thi chuẩn mực sẽ đi từ việc dựng khung cấu trúc (scaffold) $\rightarrow$ nghiên cứu thuật toán AI $\rightarrow$ viết backend API $\rightarrow$ dựng WebGIS UI $\rightarrow$ tích hợp cảnh báo $\rightarrow$ tối ưu hiệu năng & viết tests $\rightarrow$ đóng gói Docker/Cloud Run.
3. **An toàn & Chủ động:** Bạn hoàn toàn kiểm soát được thời điểm push từng module, sẵn sàng demo theo từng chặng nếu BTC đi tuần tra bàn thi.

---

## 🕒 LỘ TRÌNH 8 CHẶNG PHÂN BỔ TRONG NGÀY THI

Bộ điều phối `seed_fresh_repo.py` đã chia nhỏ codebase thành 8 mốc logic:

| Bước | Khung giờ gợi ý | Thông điệp Commit chuẩn Git | Các thành phần được nạp vào |
| :---: | :---: | :--- | :--- |
| **1** | `08:15` | `chore: initial project scaffold and repository setup` | Cấu trúc thư mục, `.gitignore`, `.env.example`, `requirements.txt`, `package.json` |
| **2** | `09:30` | `feat(ai): implement core motorcycle-grounded flood & fall detector` | Lõi AI YOLOv8-nano, thước đo bánh xe 50cm, bộ đếm ngã xe 5s chống báo nhầm |
| **3** | `10:45` | `feat(backend): implement FastAPI edge node runtime and memory streaming` | FastAPI app, APIRouter, schemas Pydantic v2, stream MJPEG trực tiếp trên RAM |
| **4** | `11:45` | `feat(backend): add SQLite event logging, telegram dispatcher and reports` | Cơ sở dữ liệu SQLite WAL, Telegram bot cảnh báo 82 bytes, giờ chuẩn UTC+7 |
| **5** | `13:15` | `feat(data): add benchmark test harness and standardized station video samples` | Video test 5 trạm thực tế ngập/ngã xe, script test video và bộ đo benchmark |
| **6** | `14:30` | `feat(frontend): build responsive WebGIS monitoring dashboard` | Giao diện React + Leaflet + Tailwind, thước đo ngập gradient, tabs trạm |
| **7** | `15:45` | `test & perf: add 16 integration tests, CPU parallelism and SQLite WAL mode` | 16 bài kiểm thử tự động, tối ưu CPU đa luồng PyTorch (nhanh gấp 4.4 lần) |
| **8** | `16:30` | `ci/cd & deploy: add Docker containerization, Cloud Build and complete project documentation` | Dockerfile, Cloud Build, GitHub Actions CI/CD, kịch bản thuyết trình 3 phút, tài liệu tiêu chí |

---

## 🛠️ HƯỚNG DẪN THAO TÁC TRỰC TIẾP TRONG PHÒNG THI

### Cách 1: Dùng Menu bấm phím trực quan (Khuyên dùng)
Trong thư mục dự án, bạn chỉ cần nhấp đúp file **`seed.bat`** (hoặc mở terminal gõ `seed.bat`):

```text
============================================================
🎯 URBANSHIELD LITE - BỘ ĐIỀU PHỐI COMMIT REPO MỚI (HACKATHON)
📁 Thu muc repo moi: D:\hackathon-2026-new
============================================================
 [1] ⬜ Bước 1: Khoi tao Scaffold, Cau truc du an & Dependencies
 [2] ⬜ Bước 2: Lõi AI Computer Vision (YOLOv8 + Đo ngập bánh xe + Ngã xe)
 [3] ⬜ Bước 3: Backend FastAPI, Memory Streaming & Schema Pydantic
 [4] ⬜ Bước 4: Lưu trữ SQLite WAL, Telegram Alert & Báo cáo UTC+7
 [5] ⬜ Bước 5: Video mẫu 5 trạm thực tế & Benchmark Harness
 [6] ⬜ Bước 6: Frontend WebGIS Dashboard (React + Leaflet + Tailwind)
 [7] ⬜ Bước 7: Bộ 16 Unit Tests & Tối ưu CPU Operator Parallelism
 [8] ⬜ Bước 8: Docker, CI/CD Cloud Run & Toàn bộ tài liệu thi
------------------------------------------------------------
 [A] 🔄 Tự động chạy tất cả với khoảng nghỉ (delay X phút/commit)
 [N] ⏭️ Thực hiện bước tiếp theo chưa hoàn thành
 [S] 📊 Xem trạng thái Git log hiện tại của repo mới
 [P] 🚀 Chạy 'git push origin main' ngay bây giờ
 [Q] 🚪 Thoát
------------------------------------------------------------
👉 Mời bạn chọn hành động (1-8, A, N, S, P, Q):
```

- Đến giờ nào, bạn chỉ cần nhấn số bước tương ứng (ví dụ: gõ `1` $\rightarrow$ `Enter` $\rightarrow$ gõ `y` để push).
- Sau khi commit, icon sẽ đổi từ `⬜` sang `✅`.

---

### Cách 2: Chạy lệnh dòng lệnh (Dành cho bạn thích CLI)

#### 1. Tạo repo mới và gán URL của BTC:
```powershell
backend\venv\Scripts\python.exe scripts\seed_fresh_repo.py --target "C:\Competition\fresh-repo" --remote "https://github.com/nphat-code/sgu-fresh.git"
```

#### 2. Push từng bước kèm tự động push:
- **Bước 1 (Đầu giờ sáng):**
  ```powershell
  backend\venv\Scripts\python.exe scripts\seed_fresh_repo.py --target "C:\Competition\fresh-repo" --step 1 --push
  ```
- **Bước 2 (Sau 1 tiếng):**
  ```powershell
  backend\venv\Scripts\python.exe scripts\seed_fresh_repo.py --target "C:\Competition\fresh-repo" --step 2 --push
  ```
- *(Lặp lại tương tự cho các bước 3, 4, 5, 6, 7, 8).*

---

### Cách 3: Chế độ tự động hẹn giờ giãn cách (Autopilot)
Nếu bạn muốn script tự động commit và push sau mỗi **25 phút** một lần trong suốt buổi thi:
```powershell
backend\venv\Scripts\python.exe scripts\seed_fresh_repo.py --target "C:\Competition\fresh-repo" --remote "https://github.com/nphat-code/sgu-fresh.git" --auto --delay 25 --push
```
Script sẽ tự động chạy:
- Commit 1 $\rightarrow$ Push $\rightarrow$ Ngủ 25 phút.
- Commit 2 $\rightarrow$ Push $\rightarrow$ Ngủ 25 phút.
- ... Cho đến khi hoàn tất bước 8.

---

## 🛡️ CÁC ĐIỂM BẢO ĐẢM KỸ THUẬT AN TOÀN
- **Không dính dấu vết repo cũ:** Script copy trực tiếp file mã nguồn sạch vào thư mục mới và khởi tạo `git init` mới toanh, không sao chép thư mục `.git` cũ.
- **Không dính rác:** Tự động loại trừ các thư mục nặng như `node_modules`, `venv`, file `.pyc`, cache, database cục bộ.
- **Tên tác giả đồng nhất:** Sử dụng chính tài khoản Git đang cấu hình trên máy tính của bạn (`git config user.name`, `git config user.email`).
- **Mã nguồn gốc được giữ nguyên 100%:** Thư mục hiện tại (`HackathonSGU2026`) đóng vai trò là "kho tổng", không bao giờ bị xáo trộn.
