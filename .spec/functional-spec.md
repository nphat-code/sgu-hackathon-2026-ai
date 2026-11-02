# 📑 FUNCTIONAL SPECIFICATION (GITHUB SPEC KIT)
## DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG GIÁM SÁT NGẬP NƯỚC & SỰ CỐ NGÕ HẺM BẰNG EDGE AI
### ĐỘI THI: SINGLENODE | CUỘC THI: SGU HACKATHON 2026

---

## 🎯 1. BÀI TOÁN THỰC TẾ & BỐI CẢNH (PROBLEM STATEMENT)

### 1.1. Thực trạng dân sinh:
- Tại TP.HCM và các đô thị lớn, cứ đến mùa mưa hoặc triều cường dâng cao thì những con đường nhỏ và ngõ hẻm trũng thấp thường bị ngập rất nhanh và sâu.
- Nước dâng ngập quá nửa bánh xe máy khiến xe chết máy hàng loạt, người đi lại khó khăn.
- Vào ban đêm hoặc lúc mưa to gió lớn, tầm nhìn hạn chế, người đi xe máy rất dễ bị trượt ngã hoặc sụp hố ga. Khi xảy ra sự cố trong ngõ hẻm vắng, người bị nạn khó được phát hiện kịp thời để giúp đỡ.

### 1.2. Rào cản công nghệ & hạ tầng hiện nay:
- **Chi phí đắt đỏ:** Lắp đặt camera AI chuyên dụng tốn từ 15 đến 25 triệu đồng mỗi mắt camera; trang bị cảm biến đo ngập dưới cống tốn từ 10 đến 18 triệu đồng và rất nhanh bị rác thải, bùn đất làm hỏng.
- **Nghẽn băng thông:** Nếu dùng camera thông thường rồi kéo toàn bộ luồng video 24/7 về máy chủ trung tâm thì sẽ làm nghẽn toàn bộ đường truyền mạng dân sinh tại ngõ xóm.
- **Rủi ro đời tư:** Việc truyền và lưu trữ video đời sống sinh hoạt của người dân trong ngõ hẻm lên máy chủ đám mây tiềm ẩn nguy cơ rò rỉ dữ liệu cá nhân nghiêm trọng.

---

## 👥 2. ĐỐI TƯỢNG SỬ DỤNG (USER PERSONAS)

1. **Cán bộ Trực ban UBND Phường / Công an Khu vực:**
   - Cần một bản đồ số trực quan, nắm bắt ngay hẻm nào đang ngập sâu, hẻm nào vừa xảy ra tai nạn để điều phối lực lượng.
2. **Lực lượng Dân quân Tự vệ / Bảo vệ An ninh trật tự cơ sở:**
   - Thường xuyên đi tuần tra ngoài hiện trường, sử dụng điện thoại di động; cần nhận tin nhắn cảnh báo dạng văn bản ngắn gọn (Text Report) kèm tọa độ GPS để chạy đến hỗ trợ ngay.
3. **Người dân sinh sống tại khu phố:**
   - Được bảo vệ quyền riêng tư 100%: hình ảnh sinh hoạt trước cửa nhà không bị thu thập, không bị soi xét khuôn mặt hay biển số xe.

---

## ⚙️ 3. CÁC TÍNH NĂNG CHỨC NĂNG CỐT LÕI (CORE FUNCTIONALITIES)

### FR-01: Đo mực nước ngập bằng tỷ lệ hình học bánh xe máy 50cm
- **Đầu vào:** Luồng hình ảnh từ camera ngõ xóm khi có phương tiện di chuyển qua vũng nước.
- **Xử lý:** Phát hiện xe máy, xác định phần bánh xe bị nước ngập che khuất so với kích thước chuẩn (~50cm đường kính).
- **Đầu ra:** Mực nước đo lường tính bằng centimét (cm) và phân cấp 3 mức:
  - *Mức 1 (< 10cm):* Rất nhẹ, di chuyển bình thường.
  - *Mức 2 (10 - 20cm):* Chú ý, nước ngập mép ống xả xe máy.
  - *Mức 3 (> 20cm):* Nguy hiểm, nước tràn buồng máy, dễ chết máy đột ngột.

### FR-02: Phát hiện ngã xe đa tầng triệt tiêu báo động giả
- **Đầu vào:** Bounding box người và phương tiện.
- **Xử lý:**
  - Tầng 1: Tỷ lệ khung bao nằm ngang $W/H > 1.15$.
  - Tầng 2: Cự ly gần giữa người và xe đổ ($< 180\text{ px}$).
  - Tầng 3: **Bộ đếm bất động liên tục > 5 giây** (Debounce): chỉ kích hoạt báo động khi người ngã nằm yên trên mặt đường quá 5 giây. Nếu người tự đứng dậy hoặc dừng xe dắt bộ, bộ đếm tự động reset.
- **Đầu ra:** Trạng thái sự cố khẩn cấp (Accident SOS).

### FR-03: Bảo vệ quyền riêng tư tuyệt đối (Privacy-by-design)
- Video giải mã frame-by-frame trong bộ nhớ RAM, phân tích xong hủy ngay lập tức (`Zero-Disk write`).
- Không lưu trữ tệp video hoặc ảnh chụp khuôn mặt người dân xuống ổ cứng.

### FR-04: Tự động phát sinh Báo cáo văn bản mộc mạc (Text Report)
- Tự động định dạng báo cáo văn bản thuần túy không dùng từ giật gân, dễ đọc trên mọi thiết bị:
  - *Mẫu Instant Alert:* Bắn ngay khi sự cố xảy ra.
  - *Mẫu Shift Digest:* Tổng hợp ca trực gửi về nhóm điều hành khu phố.

### FR-05: Bản đồ số WebGIS giám sát ngõ xóm
- Thể hiện trạng thái trực quan các con hẻm bằng màu sắc thời gian thực:
  - Xanh lá: Bình thường, đường khô ráo.
  - Vàng cam: Ngập nhẹ (10 - 20cm).
  - Đỏ rực: Ngập sâu (> 20cm) hoặc có sự cố ngã xe cần giúp đỡ.

---

## 📏 4. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

| Mã yêu cầu | Tiêu chí | Ngưỡng cam kết kỹ thuật |
| :---: | :--- | :--- |
| **NFR-01** | Tốc độ xử lý hình ảnh (Inference Frame Rate) | $\ge 25\text{ FPS}$ trực tiếp trên CPU Intel Core i3/i5 thế hệ cũ, không cần GPU rời. |
| **NFR-02** | Độ trễ gửi cảnh báo (Alert Latency) | $< 1.5\text{ giây}$ từ khi phát hiện sự cố đến khi Telegram Bot nhận mẩu tin. |
| **NFR-03** | Kích thước mẩu tin truyền mạng (Payload Size) | $< 150\text{ bytes}$ mỗi sự cố (giảm 99.9% băng thông so với truyền video). |
| **NFR-04** | Sử dụng bộ nhớ RAM (Memory Footprint) | $< 500\text{ MB}$ cho toàn bộ tiến trình Edge AI Gateway. |
| **NFR-05** | Khả năng triển khai (Portability) | Đóng gói Docker Compose, khởi động 1 lệnh duy nhất (`docker compose up -d`). |
