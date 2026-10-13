# UrbanShield Lite – Hệ Thống Hỗ Trợ Theo Dõi Ngập Nước & Sự Cố Giao Thông Bằng Edge AI

> **Dự án phát triển bởi:** **SingleNode** ([nphat-code](https://github.com/nphat-code))  
> **Chủ đề:** AI - Kỷ nguyên vươn mình (An toàn đô thị & Dân sinh)  
> **Cuộc thi:** SGU Hackathon 2026 – Trường Đại học Sài Gòn  
> **Repository:** [sgu-hackathon-2026-ai](https://github.com/nphat-code/sgu-hackathon-2026-ai)

---

## 📂 Cấu trúc thư mục dự án (Project Structure)

```text
HackathonSGU2026/
├── docs/                                  # Tài liệu thuyết minh & Thể lệ cuộc thi
│   ├── DE_AN_Y_TUONG_URBANSHIELD_LITE.md   # Đề án ý tưởng giải pháp kỹ thuật
│   ├── KICH_BAN_PITCHING_URBANSHIELD_LITE.md # Kịch bản thuyết trình tổng quan & Q&A
│   ├── LOI_THOAI_THUYET_TRINH_8_SLIDE.md   # Lời thoại chi tiết khớp từng giây cho 8 slide
│   ├── THE_LE_CUOC_THI.md                 # Quy chế & Thể lệ cuộc thi Hackathon SGU 2026
│   └── prompts/                           # Các bộ prompt AI đã được chuẩn hóa (Anti-hype)
│       ├── PROMPT_NOTEBOOKLM_SLIDES.md    # Prompt tạo bộ Slide trình chiếu (Presenter Slides)
│       ├── PROMPT_NOTEBOOKLM_INFOGRAPHIC.md # Prompt tạo Poster Infographic
│       └── PROMPT_VIDEO_PITCHING.md       # Prompt tạo Video Pitching (Giọng nam tiếng Việt)
│
├── slides/                                # Tài nguyên trình chiếu, Infographic & Video
│   ├── SingleNode_UrbanShieldLite.pdf     # Slide thuyết trình chính thức (Bản vẽ kỹ thuật 16:9)
│   ├── SingleNode_UrbanShieldLite.png     # Poster Infographic sắc nét tóm tắt đề án
│   ├── SingleNode_UrbanShieldLite.mp4     # Video pitch giới thiệu giải pháp (2.5 phút)
│   └── SingleNode_UrbanShieldLite.pptx        # Slide định dạng PowerPoint
│
├── backend/                               # Máy trạm xử lý tại biên (Edge AI Service)
│   ├── detector.py                        # Logic nhận diện YOLOv8n, đo ngập & ngã xe (CLAHE)
│   ├── main.py                            # FastAPI Gateway, Telegram Bot Alert & WebSocket
│   ├── requirements.txt                   # Thư viện phụ thuộc (Python 3.10+)
│   ├── yolov8n.pt                         # Trọng số mô hình YOLOv8-nano (~6.5MB)
│   └── videos/                            # Video mẫu thử nghiệm (ngập nước, tai nạn)
│
├── frontend/                              # Bảng điều khiển giám sát trung tâm (Dashboard)
│   ├── src/                               # Mã nguồn React + Tailwind + Leaflet
│   ├── package.json                       # Cấu hình gói Vite / React
│   └── vite.config.js
│
├── GEMINI.md                              # Quy tắc làm việc & Phong cách kỹ thuật của Agent
├── notes.md                               # Sổ tay ghi chú tiến độ công việc
└── README.md                              # Tài liệu hướng dẫn tổng quan dự án
```

---

## 📑 Danh mục tài liệu & Tài nguyên dự thi

### 1. Tài liệu thuyết minh:
* 📄 **Đề án ý tưởng giải pháp:** [docs/DE_AN_Y_TUONG_URBANSHIELD_LITE.md](file:///c:/Competition/HackathonSGU2026/docs/DE_AN_Y_TUONG_URBANSHIELD_LITE.md)
* 🎙️ **Kịch bản thuyết trình ý tưởng & Bộ Q&A:** [docs/KICH_BAN_PITCHING_URBANSHIELD_LITE.md](file:///c:/Competition/HackathonSGU2026/docs/KICH_BAN_PITCHING_URBANSHIELD_LITE.md)
* 🗣️ **Lời thoại thuyết trình chi tiết 8 slide (3 phút):** [docs/LOI_THOAI_THUYET_TRINH_8_SLIDE.md](file:///c:/Competition/HackathonSGU2026/docs/LOI_THOAI_THUYET_TRINH_8_SLIDE.md)
* 📜 **Thể lệ cuộc thi:** [docs/THE_LE_CUOC_THI.md](file:///c:/Competition/HackathonSGU2026/docs/THE_LE_CUOC_THI.md)

### 2. Slide trình chiếu & Truyền thông:
* 🖥️ **Slide PDF chính thức (16:9):** [slides/SingleNode_UrbanShieldLite.pdf](file:///c:/Competition/HackathonSGU2026/slides/SingleNode_UrbanShieldLite.pdf)
* 📊 **Slide PowerPoint:** [slides/SingleNode_UrbanShieldLite.pptx](file:///c:/Competition/HackathonSGU2026/slides/SingleNode_UrbanShieldLite.pptx)
* 📜 **Poster Infographic đề án:** [slides/SingleNode_UrbanShieldLite.png](file:///c:/Competition/HackathonSGU2026/slides/SingleNode_UrbanShieldLite.png)
* 🎬 **Video thuyết trình ý tưởng:** [slides/SingleNode_UrbanShieldLite.mp4](file:///c:/Competition/HackathonSGU2026/slides/SingleNode_UrbanShieldLite.mp4)

---

## 💡 Định hướng kỹ thuật cốt lõi

1. **Xử lý hình ảnh tại biên (Edge Computing):** Tối ưu hóa mô hình **YOLOv8-nano (~6.5MB)** thực thi trực tiếp trên vi xử lý **CPU phổ thông** (25 - 30 FPS), không bắt buộc trang bị GPU rời đắt đỏ.
2. **Đo ngập bằng tham chiếu hình học:** Lấy đường kính chuẩn **~50cm của bánh xe máy** lưu thông thực tế làm thước đo tương đối; phân loại 3 cấp độ ngập (<10cm, 10-20cm, >20cm) mà không cần cảm biến đặt dưới cống.
3. **Nhận diện ngã xe đa tầng (Triệt tiêu báo giả):** Kết hợp tỷ lệ khung bao nằm ngang ($W/H > 1.15$), **bộ đếm bất động liên tục > 5 giây** và thuật toán cân bằng sáng thích ứng **CLAHE** ban đêm.
4. **Bảo vệ quyền riêng tư (Privacy-by-design):** Luồng video chỉ nạp vào bộ nhớ RAM tạm thời để suy luận và **hủy vĩnh viễn ngay lập tức (Zero-Disk storage)**; không nhận diện khuôn mặt người dân.
5. **Tiết kiệm chi phí & Băng thông (TCO):** Mô hình Trạm cụm (Cluster) 1 máy tính cơ sở gom 20 - 30 camera ngõ xóm; **tiết kiệm 70% - 80% chi phí** và **giảm >95% lưu lượng băng thông**.

---

## 🛠️ Kiến trúc công nghệ (Tech Stack)

```
[ Camera IP / Webcam ngõ xóm ]
               │
               ▼ (Mạng LAN nội bộ khu phố)
┌────────────────────────────────────────────────────────┐
│               Máy trạm Edge AI (Python)                │
│  • YOLOv8-nano (Object Detection trên CPU)             │
│  • Optical Wheel-Occlusion Ratio (Đo ngập bánh xe)     │
│  • Aspect Ratio & Inactivity Timer > 5s (Ngã xe đêm)   │
│  • Privacy-by-design RAM (Hủy video tức thì)           │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌─────────────────────────┐ ┌─────────────────────────┐
│ FastAPI Gateway         │ │ Telegram Bot API        │
│ Quản lý luồng dữ liệu   │ │ Gửi cảnh báo GPS + ảnh  │
└────────────┬────────────┘ └─────────────────────────┘
             │
             ▼
┌────────────────────────────────────────────────────────┐
│ Giao diện Quản trị (React + Leaflet OpenStreetMap)     │
│ Bản đồ giám sát trực quan các điểm ngõ xóm             │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Hướng dẫn chạy thử nghiệm PoC

### 1. Khởi động Backend (FastAPI + YOLOv8n):
```bash
cd backend
.\venv\Scripts\activate
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```
*Tài liệu API Swagger:* `http://127.0.0.1:8000/docs`

### 2. Khởi động Frontend Dashboard (React + Leaflet):
```bash
cd frontend
npm install
npm run dev
```
*Truy cập bảng điều khiển:* `http://localhost:5173/`

---

## 📅 Các mốc thời gian quan trọng Hackathon SGU 2026

* **15/10/2026 (Hạn chót):** Nộp đề án `SingleNode_UrbanShieldLite.pdf` & Lệ phí dự thi.
* **17/10/2026 (08:30 - 11:00):** Vòng Sơ loại Pitching (Hội trường Lầu 7, Nhà E, ĐH Sài Gòn).
* **31/10 – 01/11/2026:** Vòng Thử thách Hackathon 24H (Tập trung tại SGU - khởi tạo Repo trống).
