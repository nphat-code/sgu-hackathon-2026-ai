# 🎬 LIVE DEMO SPECIFICATION (GITHUB SPEC KIT)
## DỰ ÁN: URBANSHIELD LITE – SINGLE NODE
### KỊCH BẢN TRÌNH DIỄN THỰC TẾ 3 PHÚT TRƯỚC BAN GIÁM KHẢO

> **Nguyên tắc vàng:** Ưu tiên 100% Live Demo tương tác thực tế trên sản phẩm đang hoạt động; không chỉ chiếu slide hoặc video minh họa đơn thuần.

---

## ⏱️ PHÂN BỔ THỜI GIAN KỊCH BẢN DEMO (TỔNG: 3 PHÚT)

```
[00:00 - 00:30] Mở đầu & Khởi động Dashboard: Trạng thái bình thường của các con hẻm
      │
[00:30 - 01:15] Demo Tình huống 1: Mưa lớn triều cường - Đo ngập bánh xe máy 50cm
      │
[01:15 - 02:00] Demo Tình huống 2: Sự cố ngã xe trong hẻm - Bộ đếm bất động 5s
      │
[02:00 - 02:30] Demo Tình huống 3: Nhận tin nhắn cảnh báo Telegram & Xuất Text Report
      │
[02:30 - 03:00] Bằng chứng kỹ thuật: Tốc độ CPU 28 FPS & Kiểm tra RAM sạch (Privacy Proof)
```

---

## 📝 CHI TIẾT TỪNG THAO TÁC TRÌNH DIỄN

### 🟢 Phút 00:00 - 00:30: Khởi động hệ thống & Giám sát tổng quan
- **Hành động:** Người thuyết trình mở trình duyệt tới Dashboard `http://localhost:5173`.
- **Hiển thị trên màn hình:**
  - Bản đồ GIS hiển thị 3 trạm camera tại các ngõ hẻm Quận 4 / Quận 5, TP.HCM.
  - Các tuyến hẻm hiển thị màu **Xanh lá cây** (An toàn, đường khô ráo).
  - Khung telemetry báo tốc độ xử lý: **28 FPS**, tài nguyên tiêu thụ: **CPU Core i5, RAM 410MB**.
- **Lời nói tự nhiên:**
  > *"Em mời Thầy Cô quan sát trực tiếp trên màn hình: Đây là bảng điều khiển đang chạy thực tế trên máy tính văn phòng tại khu phố. Hiện tại các con hẻm hiển thị màu xanh lá cây – tức là đường xá khô ráo, người dân đi lại an toàn."*

---

### 🟡 Phút 00:30 - 01:15: Tình huống ngập nước triều cường dâng cao
- **Hành động:** Bấm nút chuyển kịch bản **"Kịch bản Ngập nước"** (hoặc nạp luồng camera có xe máy chạy qua đường ngập).
- **Phản ứng tức thì của hệ thống:**
  - AI nhận diện xe máy đang lưu thông.
  - Thuật toán tự động đo phần bánh xe ngập trong nước dựa trên thước đo chuẩn bánh xe 50cm.
  - Thước đo hiển thị trực tiếp trên luồng video: **Ngập 22.5 cm (Vượt nửa bánh xe)**.
  - Tuyến hẻm trên bản đồ tự động chuyển sang màu **Vàng cam** (Chú ý) rồi sang **Đỏ** (Nguy hiểm).
- **Lời nói tự nhiên:**
  > *"Khi mưa lớn nước dâng lên, xe máy vừa chạy qua thì máy tính ở khu phố tự so sánh kích thước bánh xe máy 50cm với phần bị ngập, đo ngay được nước đang sâu 22.5 cm. Con hẻm trên bản đồ tự đổi sang màu đỏ để cảnh báo xe máy không nên đi vào vì rất dễ chết máy."*

---

### 🔴 Phút 01:15 - 02:00: Tình huống sự cố trượt ngã xe máy ban đêm
- **Hành động:** Bấm nút chuyển kịch bản **"Kịch bản Ngã xe"** (người và xe máy đổ nghiêng).
- **Phản ứng tức thì của hệ thống:**
  - AI phát hiện tỷ lệ khung bao nằm ngang $W/H > 1.15$ và cự ly người - xe sát nhau.
  - Màn hình đếm ngược bộ đếm bất động: **1s... 2s... 3s... 4s... Đủ 5s!**
  - Còi báo động kích hoạt nhấp nháy đỏ trên bản đồ tại đúng ngõ hẻm đó.
- **Lời nói tự nhiên:**
  > *"Nếu người dân chẳng may bị trượt bánh ngã xe trong hẻm vắng, máy tính sẽ đếm thời gian. Nếu sau 5 giây người đó vẫn nằm bất động chưa tự đứng dậy được, hệ thống mới kích hoạt cảnh báo khẩn cấp. Cơ chế đếm 5 giây này giúp triệt tiêu hoàn toàn báo động giả khi người dân chỉ dừng xe dắt bộ hay cúi nhặt đồ."*

---

### 📲 Phút 02:00 - 02:30: Nhận tin nhắn cảnh báo Telegram & Xuất Text Report
- **Hành động:**
  - Người thuyết trình giơ điện thoại hoặc mở khung Telegram Bot trên màn hình: Mẩu tin cảnh báo xuất hiện chỉ sau **1.5 giây**.
  - Bấm nút **"Xuất Text Report"** trên Dashboard.
- **Nội dung bản tin:**
  > `🚨 [CẢNH BÁO SỰ CỐ NGÕ HẺM] - Hẻm 254 Bến Vân Đồn: Phát hiện người ngã xe bất động quá 5 giây lúc 09:15. Đề nghị dân quân hỗ trợ ngay!`
- **Lời nói tự nhiên:**
  > *"Ngay khi xác định sự cố, hệ thống chỉ gửi một mẩu tin văn bản siêu nhẹ chưa tới 150 bytes sang Telegram cho lực lượng dân phòng. Không truyền video nặng nề, vừa tiết kiệm mạng vừa tới tay người cứu trợ ngay lập tức."*

---

### 🛡️ Phút 02:30 - 03:00: Minh chứng kỹ thuật & Bảo vệ quyền riêng tư
- **Hành động:** Bật tab **"Kiểm tra bộ nhớ RAM & Không lưu đĩa (Privacy Proof)"**.
- **Hiển thị:**
  - Dung lượng RAM ổn định ở mức ~410MB.
  - Thư mục lưu trữ: **0 tệp video người dân được ghi xuống ổ đĩa**.
- **Lời nói tự nhiên:**
  > *"Đặc biệt, hình ảnh của bà con chỉ được máy tính nạp vào bộ nhớ RAM tạm thời để phân tích và xóa vĩnh viễn ngay sau đó. Tuyệt đối không lưu bất kỳ video hay hình ảnh sinh hoạt nào của người dân xuống ổ cứng, bảo đảm an toàn quyền riêng tư tối đa. Em xin cảm ơn Thầy Cô đã lắng nghe!"*
