# 🛡️ UrbanShield Lite – Hệ Thống Giám Sát Ngập Lụt & An Toàn Đô Thị Bằng Edge AI Tiết Kiệm Chi Phí

> **Dự án tham dự cuộc thi HACKATHON SGU 2026 – 2027**  
> **Chủ đề dự thi:** *Ứng dụng AI sáng tạo, tiết kiệm chi phí vào giải pháp an toàn đô thị hoặc cuộc sống thường ngày.*  
> **Đội ngũ phát triển:** **SingleNode** ([nphat-code](https://github.com/nphat-code))  
> **Khẩu hiệu:** *“Mạng lưới thị giác AI phân tán – Giữ an toàn từng góc phố Sài Gòn”*  
> **Repository:** [sgu-hackathon-2026-ai](https://github.com/nphat-code/sgu-hackathon-2026-ai)

---

## 📑 Tài liệu dự án

* 📄 **Đề án ý tưởng chính thức (Nộp sơ loại trước 15/10):** [DE_AN_Y_TUONG_URBANSHIELD_LITE.md](file:///c:/Competition/HackathonSGU2026/DE_AN_Y_TUONG_URBANSHIELD_LITE.md)
* 🎙️ **Kịch bản thuyết trình 3 phút & Bộ 5 câu phản biện Q&A:** [KICH_BAN_PITCHING_URBANSHIELD_LITE.md](file:///c:/Competition/HackathonSGU2026/KICH_BAN_PITCHING_URBANSHIELD_LITE.md)
* 📋 **Thể lệ & Quy chế cuộc thi:** [THE_LE_CUOC_THI.md](file:///c:/Competition/HackathonSGU2026/THE_LE_CUOC_THI.md) | [Google Doc Gốc](https://docs.google.com/document/d/1PgbiUjs3lAx1mC2_aQAIZt3utYWmxBShro1ehpxOYe4/edit?tab=t.0)

---

## 💡 Đột phá của giải pháp: "Tiết kiệm chi phí bằng Edge AI"

Khác với các hệ thống Smart City đắt đỏ (camera 15-30 triệu, máy chủ GPU đồ sộ, băng thông streaming nặng nề), **UrbanShield Lite** áp dụng mô hình **Trí tuệ nhân tạo biên (Edge AI)**:
1. 📷 **Tái chế phần cứng bình dân:** Hoạt động trên webcam 200.000 VNĐ, điện thoại thông minh cũ hoặc camera gia đình.
2. ⚡ **Mô hình siêu nhẹ (YOLOv8-nano ~6MB):** Chạy mượt mà 30 FPS trực tiếp trên CPU laptop/máy tính phổ thông mà không cần GPU rời.
3. 📉 **Tiết kiệm 99% băng thông:** Thiết bị chỉ xử lý cục bộ; chỉ phát tín hiệu cảnh báo khẩn cấp (Alert Metadata vài KB) khi phát hiện ngập nước hoặc tai nạn.
4. 🚨 **Cảnh báo tức thời qua Telegram Bot API (0đ chi phí):** Gửi tọa độ GPS + ảnh chụp hiện trường về Tổ dân phố và Đội cứu hộ khẩn cấp trong vòng 1 giây.
5. 🗺️ **Bản đồ an toàn đô thị nguồn mở (Leaflet/OpenStreetMap):** Định vị trực quan các điểm đen ngập lụt và sự cố tai nạn trên các tuyến đường đô thị.

---

## 🛠️ Kiến trúc công nghệ (Tech Stack)

```
[ Camera Dân Sinh / Webcam 200k / Phone Cũ ]
                    │
                    ▼ (Khung hình cục bộ)
┌────────────────────────────────────────────────────────┐
│               Edge AI Detector (Python)                │
│  • YOLOv8-nano (Object Detection & Morphology)         │
│  • Optical Wheel-Occlusion Ratio (Đo mực nước ngập)    │
│  • Fall Aspect Ratio & Inactivity Timer (SOS ngã xe)   │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌─────────────────────────┐ ┌─────────────────────────┐
│ FastAPI Gateway         │ │ Telegram Bot Alert API  │
│ WebSockets / Live Stream│ │ Push thông báo 0đ       │
└────────────┬────────────┘ └─────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────┐
│ React Command Center (Vite + Leaflet OpenStreetMap)    │
│ Trực quan hóa điểm ngập, sự cố & mô phỏng kịch bản     │
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
