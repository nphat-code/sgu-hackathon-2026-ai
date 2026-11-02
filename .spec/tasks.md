# 📋 DANH MỤC CÔNG VIỆC CHI TIẾT (TASKS.MD)
## DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG GIÁM SÁT NGẬP NƯỚC & SỰ CỐ NGÕ HẺM BẰNG EDGE AI
### REPOSITORY: sgu-hackathon-2026-ai | ĐỘI THI: SINGLENODE
### QUY CHUẨN: GITHUB SPEC KIT (SPEC-DRIVEN DEVELOPMENT)

> **Ký hiệu trạng thái:**
> - `[x]` Đã hoàn thành
> - `[ ]` Đang chờ thực hiện

---

## 🏁 SPRINT 0: CHUẨN HÓA SPEC KIT & THIẾT LẬP MÔI TRƯỜNG (GIỜ 00 - 02)

- [x] **TASK-001:** Thiết lập toàn diện thư mục `.spec/` theo quy chuẩn GitHub Spec Kit (100% Tiếng Việt):
  - [x] `constitution.md`: Hiến chương dự án, nguyên tắc chống phóng đại & bảo vệ quyền riêng tư người dân.
  - [x] `spec.md` & `functional-spec.md`: Đặc tả yêu cầu người dùng, tiêu chuẩn nghiệm thu & tình huống biên.
  - [x] `plan.md` & `technical-spec.md`: Bản thiết kế kiến trúc phân tầng, Minimal API contract & bảo mật.
  - [x] `tasks.md`: Danh mục nhiệm vụ nguyên tử cho cả 5 sprint.
  - [x] `live-demo-spec.md`: Kịch bản trình diễn trực tiếp 3 phút trước Ban Giám khảo.
- [ ] **TASK-002:** Rà soát và cấu hình môi trường phát triển (Python 3.10+ virtualenv, gói frontend Node.js).
- [ ] **TASK-003:** Khởi tạo file `.specify/manifest.json` định danh chuẩn công cụ Spec Kit.

---

## 🧠 SPRINT 1: NÂNG CẤP CORE AI ENGINE & THUẬT TOÁN THỊ GIÁC BIÊN (GIỜ 02 - 07)

- [ ] **TASK-010:** Tinh chỉnh thuật toán đo ngập hình học qua tỷ lệ che khuất bánh xe máy chuẩn ~50cm.
- [ ] **TASK-011:** Triển khai bộ phát hiện ngã xe đa tầng với bộ đếm bất động liên tục nghiêm ngặt $\ge 5.0\text{ giây}$.
- [ ] **TASK-012:** Tích hợp thuật toán cân bằng sáng thích ứng CLAHE cho camera hẻm ban đêm và trời mưa.
- [ ] **TASK-013:** Kiểm chứng vòng đời khung hình chỉ nạp trên RAM tạm thời và hủy ngay (`Zero-Disk write`).

---

## ⚡ SPRINT 2: MINIMAL API & BỘ SINH BÁO CÁO VĂN BẢN (GIỜ 07 - 12)

- [ ] **TASK-020:** Chuẩn hóa các endpoint FastAPI thành Minimal API với kích thước mẩu tin sự cố nghiêm ngặt $< 150\text{ bytes}$.
- [ ] **TASK-021:** Xây dựng module `reporting.py` tự động sinh Mẫu cảnh báo tức thời (Mẫu A) và Mẫu tổng kết ca trực (Mẫu B).
- [ ] **TASK-022:** Tích hợp cổng Telegram Bot Dispatcher bắn cảnh báo kèm tọa độ GPS và văn bản ngắn gọn.
- [ ] **TASK-023:** Cung cấp endpoint `/health` trả về nhịp tim hệ thống, thời gian hoạt động (uptime), FPS và dung lượng RAM sử dụng.

---

## 🗺️ SPRINT 3: BẢNG ĐIỀU KHIỂN WEBGIS & BỘ ĐIỀU PHỐI LIVE DEMO (GIỜ 12 - 16)

- [ ] **TASK-030:** Nâng cấp bản đồ Leaflet OpenStreetMap với cơ chế đổi màu động các tuyến hẻm (Xanh: an toàn, Vàng: ngập nhẹ, Đỏ: ngập sâu/tai nạn).
- [ ] **TASK-031:** Xây dựng bộ nút chuyển đổi 3 kịch bản mô phỏng phục vụ Live Demo (Bình thường, Ngập nước 22.5cm, Ngã xe > 5s).
- [ ] **TASK-032:** Tích hợp đồng hồ đo đạc phần cứng trực tiếp (Đo FPS trên CPU, kiểm tra RAM sạch không ghi đĩa).
- [ ] **TASK-033:** Tạo nút "Sao chép Báo cáo văn bản" trên giao diện để gửi nhanh vào Zalo/Tin nhắn cho cán bộ dân phòng.

---

## 🧪 SPRINT 4: KIỂM THỬ TỰ ĐỘNG & BÁO CÁO TEST REPORT (MANDATORY) (GIỜ 16 - 20)

- [ ] **TASK-040:** Viết bộ kiểm thử đơn vị cho thuật toán đo ngập bánh xe 50cm (`tests/test_flood_depth.py`).
- [ ] **TASK-041:** Viết bộ kiểm thử đơn vị cho bộ phát hiện ngã xe và bộ đếm 5s (`tests/test_fall_detection.py`).
- [ ] **TASK-042:** Viết bộ kiểm thử cho các endpoint Minimal API và kiểm tra kích thước payload $< 150\text{ bytes}$ (`tests/test_minimal_api.py`).
- [ ] **TASK-043:** Viết bộ kiểm thử cho module sinh báo cáo văn bản (`tests/test_text_report.py`).
- [ ] **TASK-044:** Tự động hóa quy trình chạy kiểm thử và xuất file báo cáo minh bạch [`docs/TEST_REPORT.md`](file:///c:/Competition/HackathonSGU2026/docs/TEST_REPORT.md).

---

## 🐳 SPRINT 5: ĐÓNG GÓI DOCKER, CI/CD & TRIỂN KHAI CLOUD (GIỜ 20 - 24)

- [ ] **TASK-050:** Xây dựng Dockerfile tối ưu cho Backend và Frontend (`backend/Dockerfile`, `frontend/Dockerfile`).
- [ ] **TASK-051:** Tạo file `docker-compose.yml` khởi động toàn bộ hệ thống bằng đúng 1 câu lệnh (`docker compose up -d`).
- [ ] **TASK-052:** Thiết lập quy trình tự động hóa GitHub Actions CI (`.github/workflows/ci.yml`).
- [ ] **TASK-053:** Biên soạn hướng dẫn triển khai Cloud ([`docs/CLOUD_DEPLOYMENT_GUIDE.md`](file:///c:/Competition/HackathonSGU2026/docs/CLOUD_DEPLOYMENT_GUIDE.md)) trên AWS / Google Cloud.
- [ ] **TASK-054:** Tổng duyệt kịch bản Live Demo 3 phút khớp từng giây theo `.spec/live-demo-spec.md`.
