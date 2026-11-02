# 🛠️ TECHNICAL SPECIFICATION (GITHUB SPEC KIT)
## DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG GIÁM SÁT NGẬP NƯỚC & SỰ CỐ NGÕ HẺM BẰNG EDGE AI
### ĐỘI THI: SINGLENODE | CUỘC THI: SGU HACKATHON 2026

---

## 🏛️ 1. KIẾN TRÚC HỆ THỐNG MODULAR & EDGE-FIRST

Hệ thống được thiết kế theo mô hình phân tán (Edge-to-Cloud), giải quyết triệt để rào cản băng thông mạng và chi phí thiết bị:

```
┌────────────────────────────────────────────────────────┐
│               1. TẦNG THU THẬP BIÊN (EDGE)             │
│   Camera an ninh ngõ xóm / Webcam thông dụng (RTSP/USB)│
└──────────────────────────┬─────────────────────────────┘
                           │ Mạng LAN nội bộ khu phố
                           ▼
┌────────────────────────────────────────────────────────┐
│               2. TẦNG XỬ LÝ BIÊN (EDGE COMPUTING)      │
│   Máy tính khu phố (CPU Core i3/i5, RAM 8GB)           │
│   • YOLOv8-nano Object Detection (25 - 30 FPS trên CPU)│
│   • Wheel Geometric Measurement (Ánh xạ bánh xe 50cm)  │
│   • Fall Detection State Machine (Bộ đếm bất động 5s)  │
│   • Privacy Engine: Giải mã frame trên RAM, zero-disk  │
└──────────────────────────┬─────────────────────────────┘
                           │ Gửi mẩu tin JSON nhẹ < 150 bytes
                           ▼
┌────────────────────────────────────────────────────────┐
│               3. TẦNG ĐIỀU PHỐI & API (FASTAPI)        │
│   • Minimal API (Phi trạng thái, phản hồi tức thì)     │
│   • WebSockets Dispatcher (Truyền telemetry Dashboard) │
│   • Text Report Engine (Sinh bản tin văn bản mộc mạc)  │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
              ▼                            ▼
┌──────────────────────────┐ ┌──────────────────────────┐
│ 4. TẦNG GIAO DIỆN (FE)   │ │ 5. TẦNG CẢNH BÁO CƠ SỞ   │
│ WebGIS React + Leaflet   │ │ Telegram Bot Dispatcher  │
│ Giám sát trực quan ngõ hẻm│ │ Bản tin SMS / Tin nhắn cơ sở
└──────────────────────────┘ └──────────────────────────┘
```

---

## 🔌 2. THIẾT KẾ MINIMAL API CONTRACTS

Tất cả các endpoint tuân thủ nguyên tắc Minimal API: tinh gọn, phi trạng thái, độ trễ thấp và kích thước payload tối thiểu.

### 2.1. Health Check
- **Endpoint:** `GET /health`
- **Mục đích:** Kiểm tra nhịp tim (heartbeat) của máy trạm biên và tình trạng camera.
- **Phản hồi mẫu:**
  ```json
  {
    "status": "healthy",
    "uptime_seconds": 3840,
    "fps": 28.4,
    "ram_used_mb": 412
  }
  ```

### 2.2. Nhận diện sự cố ngập nước (Flood Event)
- **Endpoint:** `POST /api/v1/incidents/flood`
- **Payload (< 120 bytes):**
  ```json
  {
    "node_id": "hem_254_q4",
    "depth_cm": 22.5,
    "level": "WARNING",
    "timestamp": 1729145700
  }
  ```

### 2.3. Nhận diện sự cố ngã xe khẩn cấp (Accident Event)
- **Endpoint:** `POST /api/v1/incidents/accident`
- **Payload (< 140 bytes):**
  ```json
  {
    "node_id": "hem_180_q4",
    "stationary_sec": 5.2,
    "vehicle": "motorcycle",
    "timestamp": 1729145810
  }
  ```

### 2.4. Xuất Báo cáo văn bản mộc mạc (Text Report)
- **Endpoint:** `GET /api/v1/reports/summary?type=instant|shift`
- **Mục đích:** Cung cấp văn bản thuần túy không giật gân gửi trực tiếp cho lực lượng dân quân/tổ dân phố.

---

## 🗄️ 3. SCHEMA DỮ LIỆU & QUẢN TRỊ TRẠNG THÁI

### 3.1. Dữ liệu Trạm camera (Node Schema)
```json
{
  "id": "node-sgu-01",
  "name": "Trạm 01 - Tuyến Phố Trũng Thấp",
  "lat": 10.7599,
  "lng": 106.6823,
  "status": "online",
  "scenario": "normal",
  "device": "PC văn phòng cũ + Webcam USB",
  "last_ping": 1729145900
}
```

### 3.2. Dữ liệu Tuyến hẻm (GeoJSON LineString)
```json
{
  "type": "Feature",
  "properties": {
    "segment_id": "seg_hem254",
    "name": "Hẻm 254 Bến Vân Đồn",
    "status_color": "green",
    "water_depth_cm": 4.5
  },
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [106.6820, 10.7595],
      [106.6828, 10.7602]
    ]
  }
}
```

---

## 🛡️ 4. NGUYÊN TẮC BẢO MẬT & PRIVACY-BY-DESIGN

1. **Bộ nhớ RAM tạm thời:**
   - Dữ liệu video từ camera được đọc trực tiếp vào biến `numpy.ndarray` trong bộ nhớ RAM.
   - Ngay sau khi YOLOv8-nano và các thuật toán hình học tính toán xong, mảng frame bị giải phóng vĩnh viễn (`del frame`).
   - Không có bất kỳ lệnh ghi tệp `.mp4` hay `.jpg` nào xuống ổ đĩa cứng (Zero-Disk Storage).
2. **Loại bỏ tính năng định danh cá nhân:**
   - Chỉ sử dụng các lớp đối tượng giao thông (`person`, `motorcycle`, `bicycle`, `car`).
   - Hoàn toàn không tích hợp mô hình nhận diện khuôn mặt (Face Recognition) hay đọc biển số xe (ALPR).
