# 📝 GHI NHẬN GÓP Ý TỪ BAN GIÁM KHẢO (VÒNG SƠ LOẠI - HACKATHON SGU 2026)
## ĐỊNH HƯỚNG PHÁT TRIỂN & TỐI ƯU BACKEND (URBANSHIELD LITE)

> **Thời gian ghi nhận:** Sáng 17/10/2026  
> **Các từ khóa cốt lõi Giám khảo gợi ý:** `Microservice`, `Minimal API`, `Text Report`, `QA`, `Tính toán chi phí`.

---

## 🏗️ 1. MICROSERVICE (Kiến trúc dịch vụ nhỏ, phân tán)

### Nhận xét & Đặt vấn đề của Giám khảo:
Hiện tại backend đang ở dạng nguyên khối (Monolith) chạy chung inference và API. Khi mở rộng ra toàn phường hoặc nhiều cụm hẻm, cần module hóa thành các dịch vụ độc lập để dễ bảo trì, mở rộng và đảm bảo một service lỗi không làm sập cả hệ thống.

### Kế hoạch triển khai kiến trúc Microservice:
- **`edge-vision-service` (Dịch vụ thị giác tại chỗ):**
  - Chạy trực tiếp tại máy tính khu phố (Edge node).
  - Nhiệm vụ: Đọc luồng RTSP camera hẻm, chạy YOLOv8-nano + OpenCV đo ngập và phát hiện ngã xe.
  - Chỉ gửi dữ liệu sự cố dạng sự kiện (Event), không truyền video.
- **`alert-dispatcher-service` (Dịch vụ điều phối cảnh báo):**
  - Tiếp nhận sự kiện từ các Edge node qua hàng đợi tin nhắn (Message Queue như Redis Pub/Sub hoặc RabbitMQ / MQTT).
  - Phân luồng gửi cảnh báo tự động: Telegram Bot cho Tổ Dân Phố, Zalo ZNS / Webhook cho nhóm phản ứng nhanh.
- **`gis-mapping-service` (Dịch vụ bản đồ số & Không gian):**
  - Quản lý cơ sở dữ liệu GeoJSON các con hẻm.
  - Cập nhật trạng thái màu sắc tuyến đường theo thời gian thực (WebSockets).
- **`reporting-service` (Dịch vụ tổng hợp & Báo cáo):**
  - Lưu trữ nhật ký sự cố (SQLite / PostgreSQL).
  - Tự động sinh báo cáo văn bản định kỳ (Text Report).

---

## ⚡ 2. MINIMAL API (Giao diện lập trình tinh gọn, hiệu năng cao)

### Nhận xét & Đặt vấn đề của Giám khảo:
Hệ thống chạy trên hạ tầng mạng dân sinh của khu phố, đường truyền có thể chập chờn. API cần đạt độ trễ thấp nhất, payload siêu nhẹ, không gánh các middleware thừa.

### Kế hoạch thiết kế Minimal API:
- **Triết lý:** Thiết kế phi trạng thái (Stateless), mỗi endpoint phục vụ đúng một mục đích duy nhất.
- **Payload chuẩn hóa siêu nhẹ (< 150 bytes):**
  ```json
  POST /api/v1/incidents
  {
    "node_id": "edge_q4_hem254",
    "type": "FLOOD",
    "val": 22.5,
    "unit": "cm",
    "time": 1729145700
  }
  ```
- **Danh sách Endpoint cốt lõi:**
  - `GET /health` : Kiểm tra nhịp tim (Heartbeat) của các Edge node.
  - `POST /api/v1/events/accident` : Tiếp nhận cảnh báo ngã xe (kèm tọa độ hộp người/xe).
  - `POST /api/v1/events/flood` : Cập nhật mực nước ngập (cm).
  - `GET /api/v1/map/segments` : Trả về dữ liệu LineString GeoJSON kèm trạng thái màu sắc.
  - `GET /api/v1/reports/summary` : Lấy tóm tắt báo cáo dạng text.

---

## 📄 3. TEXT REPORT (Báo cáo dạng văn bản tự động)

### Nhận xét & Đặt vấn đề của Giám khảo:
Lực lượng trực tiếp xử lý ở địa phương (Tổ trưởng dân phố, Công an khu vực, Dân quân) thường lớn tuổi hoặc đang đi tuần tra ngoài đường, họ không có thời gian mở dashboard web phức tạp. Hệ thống cần tự động sinh **Báo cáo dạng văn bản mộc mạc (Text Report)** gửi qua tin nhắn / Telegram.

### Mẫu báo cáo tự động (Text Templates):

#### Mẫu A: Cảnh báo sự cố tức thời (Instant Alert)
```text
🚨 [CẢNH BÁO SỰ CỐ NGÕ HẺM]
- Vị trí: Hẻm 254 Bến Vân Đồn, P.1, Quận 4
- Thời gian: 09:15:32 - 17/10/2026
- Loại sự cố: Ngập nước sâu (22cm - Vượt nửa bánh xe)
- Tình trạng: Nước ngập mép pô xe máy, nguy cơ chết máy cao.
- Đề xuất: Đề nghị phân luồng xe máy tránh đi vào hẻm này.
```

#### Mẫu B: Bản tin tổng hợp ca trực / tuần (Weekly Digest)
```text
📊 BẢN TIN TỔNG HỢP AN TOÀN KHU PHỐ 3 (TUẦN 41/2026)
--------------------------------------------------
1. TAI NẠN / NGÃ XE: 2 vụ
   - Vụ 1: Hẻm 254 (14/10, 18h10) - Người dân hỗ trợ sau 2 phút.
   - Vụ 2: Hẻm 180 (16/10, 07h45) - Trượt bánh do trời mưa, tự đứng dậy sau 15s.
2. NGẬP NƯỚC TRIỀU CƯỜNG: 1 đợt
   - Đỉnh triều: 24cm lúc 17h30 ngày 15/10.
   - Thời gian rút hết nước: 40 phút.
3. TÌNH TRẠNG HỆ THỐNG:
   - 4/4 cụm camera hoạt động liên tục (Uptime 99.8%).
```

---

## 🧪 4. QA - QUALITY ASSURANCE (Đảm bảo chất lượng & Kiểm thử)

### Nhận xét & Đặt vấn đề của Giám khảo:
Để giải pháp ứng dụng thực tế được, cần chứng minh hệ thống có quy trình kiểm thử nghiêm ngặt, hạn chế tối đa báo động giả và không bị tràn bộ nhớ.

### Khung kiểm thử QA cho UrbanShield Lite:
1. **Unit Testing (Kiểm thử đơn vị):**
   - Test thuật toán Aspect Ratio ngã xe ($W/H > 1.15$).
   - Test bộ đếm thời gian bất động 5 giây (`Debounce timer`): Đảm bảo người cúi nhặt đồ hoặc dừng xe chống chân không bị kích hoạt báo động.
   - Test công thức ánh xạ hình học bánh xe ($50\text{ cm} \times \Delta y / H_{wheel}$).
2. **Integration Testing (Kiểm thử tích hợp):**
   - Giả lập luồng dữ liệu liên tục từ video test $\rightarrow$ YOLO $\rightarrow$ OpenCV $\rightarrow$ Bắn API $\rightarrow$ Nhận tin nhắn Telegram.
3. **Stress & Performance Testing (Kiểm thử tải & Độ ổn định):**
   - Đo FPS và mức chiếm dụng CPU Intel Core i3 / i5 phổ thông (giữ ổn định 25-30 FPS).
   - Kiểm tra rò rỉ bộ nhớ (Memory Leak): Chạy liên tục 48 tiếng, dung lượng RAM phải duy trì cố định dưới 500MB nhờ cơ chế buffer RAM xoay vòng (Ring buffer), không ghi video xuống ổ cứng.
4. **Edge Cases Testing (Kiểm thử tình huống đặc biệt):**
   - Trời mưa to hạt lớn gây nhiễu ảnh.
   - Ban đêm thiếu sáng (kiểm thử hiệu quả của thuật toán cân bằng sáng thích ứng CLAHE).
   - Ánh đèn xe máy chiếu ngược gây lóa mặt đường.

---

## 💰 5. TÍNH TOÁN CHI PHÍ (Cost Estimation & Financial Feasibility)

### Nhận xét & Đặt vấn đề của Giám khảo:
Ban giám khảo chấm điểm rất cao yếu tố khả thi kinh tế (Feasibility - 20đ). Cần có bảng tính toán chi phí chi tiết, chứng minh giải pháp của nhóm rẻ hơn bao nhiêu lần so với mua sắm camera AI chuyên dụng của nhà nước.

### Bảng so sánh kinh tế chi tiết:

| Hạng mục | Giải pháp truyền thống (Camera AI / Cảm biến cống) | Giải pháp UrbanShield Lite (Tận dụng camera sẵn có) | Mức tiết kiệm |
| :--- | :--- | :--- | :--- |
| **Thiết bị ghi hình** | Camera giao thông AI chuyên dụng: **15.000.000 – 25.000.000 đ/mắt** | Tận dụng camera an ninh hẻm có sẵn: **0 đ** (nếu lắp mới chỉ **500.000 - 800.000 đ**) | **Tiết kiệm 95%** |
| **Đo mực nước ngập** | Cảm biến sóng siêu âm / áp suất dưới cống: **10.000.000 – 18.000.000 đ/điểm** | Đo hình học bánh xe máy bằng AI: **0 đ** (hoàn toàn bằng phần mềm) | **Tiết kiệm 100%** |
| **Phần cứng xử lý** | Server trung tâm GPU công nghiệp: **100.000.000 – 200.000.000 đ** | 1 Mini PC văn phòng cũ / x86 tiết kiệm điện: **2.500.000 – 3.500.000 đ** (quản lý 4–8 camera) | **Tiết kiệm 90%** |
| **Đường truyền mạng** | Kéo cáp quang chuyên dụng về trung tâm chỉ huy | Dùng chung mạng Internet WiFi/dân sinh sẵn có của khu phố: **0 đ** phát sinh | **Không tốn thêm** |
| **Điện năng tiêu thụ** | Cụm máy chủ lớn ngốn hàng kilowatt điện | Mini PC tiêu thụ 15W – 25W (~**35.000 đ tiền điện/tháng**) | **Cực kỳ nhỏ** |
| **Bảo trì, rác nghẹt** | Phải cử công nhân nạo vét bùn, cọ rửa cảm biến định kỳ | Không có thiết bị ngập trong nước, không sợ bùn rác làm nghẹt | **Bằng 0** |

### 📌 Dự toán ngân sách triển khai thí điểm cho 1 Phường (Ví dụ: 5 cụm hẻm trọng điểm):
- **Phần cứng (5 máy tính mini PC cũ tại 5 nhà văn hóa khu phố):** $5 \times 3.000.000 = 15.000.000\text{ đ}$.
- **Tận dụng lại 20 camera an ninh sẵn có:** $0\text{ đ}$.
- **Phần mềm mã nguồn mở (Python, YOLOv8n, Leaflet, PostgreSQL):** $0\text{ đ}$ phí bản quyền.
- **Tổng chi phí đầu tư ban đầu:** **~15.000.000 VNĐ** (chỉ bằng tiền mua đúng **1 chiếc camera chuyên dụng** của dự án truyền thống).

---

## 🎯 HÀNH ĐỘNG TIẾP THEO CHO VÒNG CHUNG KẾT
1. Bổ sung endpoint Minimal API và module xuất Text Report vào mã nguồn `backend/main.py`.
2. Viết bộ test QA tự động bằng `pytest` trong thư mục `tests/`.
3. Đưa bảng so sánh chi phí này vào Slide trình bày Vòng Chung kết để "ăn trọn" 20 điểm Tính khả thi!
