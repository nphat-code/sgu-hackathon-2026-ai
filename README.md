# UrbanShield Lite – Hệ Thống Hỗ Trợ Theo Dõi Ngập Nước & Sự Cố Giao Thông Bằng Edge AI

> **Dự án phát triển bởi:** **SingleNode** ([nphat-code](https://github.com/nphat-code))  
> **Mục tiêu:** Ứng dụng mô hình thị giác AI biên và thiết bị sẵn có vào theo dõi ngập nước và phát hiện sự cố giao thông đô thị.  
> **Repository:** [sgu-hackathon-2026-ai](https://github.com/nphat-code/sgu-hackathon-2026-ai)

---

## 📑 Tài liệu dự án

* 📄 **Đề án ý tưởng giải pháp:** [DE_AN_Y_TUONG_URBANSHIELD_LITE.md](file:///c:/Competition/HackathonSGU2026/DE_AN_Y_TUONG_URBANSHIELD_LITE.md)
* 🎙️ **Kịch bản thuyết trình ý tưởng & Bộ câu hỏi trao đổi:** [KICH_BAN_PITCHING_URBANSHIELD_LITE.md](file:///c:/Competition/HackathonSGU2026/KICH_BAN_PITCHING_URBANSHIELD_LITE.md)
* 🖥️ **Slide trình chiếu ý tưởng (HTML):** [slides/index.html](file:///c:/Competition/HackathonSGU2026/slides/index.html)
* 📊 **Slide PowerPoint (16:9):** [SingleNode_UrbanShieldLite_Slides.pptx](file:///c:/Competition/HackathonSGU2026/SingleNode_UrbanShieldLite_Slides.pptx)

---

## 💡 Định hướng kỹ thuật của giải pháp

Hệ thống tiếp cận bài toán theo hướng tận dụng thiết bị sẵn có kết hợp mô hình AI biên nhỏ gọn:
1. **Tận dụng thiết bị sẵn có:** Có thể vận hành trên webcam hoặc camera thông dụng kết hợp máy tính văn phòng.
2. **Mô hình nhỏ gọn (YOLOv8-nano ~6.5MB):** Có khả năng thực thi trực tiếp trên vi xử lý CPU thông thường mà không bắt buộc trang bị GPU rời.
3. **Giảm tải băng thông:** Xử lý khung hình tại chỗ; chỉ gửi dữ liệu sự kiện (metadata kèm hình ảnh) khi phát hiện ngập sâu hoặc sự cố.
4. **Thông báo qua Telegram Bot:** Tự động gửi thông tin sự cố, ảnh ghi nhận hiện trường và tọa độ điểm quan sát đến người phụ trách.
5. **Bản đồ số nguồn mở:** Hiển thị trực quan trạng thái các điểm quan sát trên nền Leaflet / OpenStreetMap.

---

## 🛠️ Kiến trúc công nghệ (Tech Stack)

```
[ Thiết bị ghi hình / Webcam USB ]
                │
                ▼ (Khung hình cục bộ)
┌────────────────────────────────────────────────────────┐
│               Edge AI Detector (Python)                │
│  • YOLOv8-nano (Object Detection)                      │
│  • Optical Wheel-Occlusion Ratio (Ước lượng mực nước)  │
│  • Aspect Ratio & Inactivity Timer (Nhận diện xe ngã)  │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌─────────────────────────┐ ┌─────────────────────────┐
│ FastAPI Gateway         │ │ Telegram Bot API        │
│ Quản lý luồng dữ liệu   │ │ Gửi thông báo sự kiện   │
└────────────┬────────────┘ └─────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────┐
│ Giao diện Quản trị (React + Leaflet OpenStreetMap)     │
│ Hiển thị điểm quan sát, trạng thái và nhật ký sự cố   │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Hướng dẫn chạy thử nghiệm PoC nội bộ

### 1. Khởi động Backend (FastAPI + YOLOv8n):
```bash
cd backend
.\venv\Scripts\activate
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```
*API Swagger Docs:* `http://127.0.0.1:8000/docs`

### 2. Khởi động Frontend Dashboard (React + Leaflet):
```bash
cd frontend
npm install
npm run dev
```
*Truy cập bảng điều khiển:* `http://localhost:5173/`

---

## 📅 Lộ trình các mốc Hackathon SGU 2026

* **15/10/2026 (Hạn chót):** Nộp đề án `SingleNode_UrbanShieldLite.pdf` & Đóng lệ phí 300.000 VNĐ (BIDV `8813272714`).
* **17/10/2026 (08:30 - 11:00):** Vòng Sơ loại Pitching (Hội trường Lầu 7, Nhà E, ĐH Sài Gòn).
* **31/10 – 01/11/2026:** Vòng Thử thách 24H (Tập trung tại SGU - khởi tạo Repo trống).
