# 📜 HIẾN CHƯƠNG DỰ ÁN (PROJECT CONSTITUTION)
## DỰ ÁN: URBANSHIELD LITE
### REPOSITORY: sgu-hackathon-2026-ai | ĐỘI THI: SINGLENODE
### CUỘC THI: SGU HACKATHON 2026 – ĐẠI HỌC SÀI GÒN

> **Mục đích:** Tài liệu này thiết lập các nguyên tắc bất biến, ranh giới đạo đức bảo vệ quyền riêng tư của người dân, và các tiêu chuẩn kỹ thuật không thể thỏa hiệp cho giải pháp UrbanShield Lite. Mọi đặc tả kỹ thuật, kế hoạch phát triển và dòng code sinh ra BẮT BUỘC phải tuân thủ nghiêm ngặt Hiến chương này.

---

## 🏛️ ĐIỀU 1: TRIẾT LÝ KỸ THUẬT (PROBLEM-FIRST & CHỐNG PHÓNG ĐẠI)

1. **Bắt đầu từ nỗi đau thực tế (Problem-First):**
   - Mọi tính năng phát triển phải trực tiếp giải quyết vấn đề dân sinh có thật: ngập sâu cục bộ tại các con đường nhỏ, ngõ hẻm trũng thấp trong mùa mưa/triều cường và tai nạn trượt ngã xe máy ban đêm khó được phát hiện kịp thời để giúp đỡ.
   - Giải pháp phải ưu tiên tính khả thi tại cơ sở (phường/xã, tổ dân phố), tuyệt đối không chạy theo các công nghệ phức tạp xa rời thực tế.

2. **Trung thực kỹ thuật & Chống kịch tính hóa (Anti-hype):**
   - **Cấm dùng từ ngữ khoa trương:** Tuyệt đối không dùng các từ như *"siêu nhẹ", "siêu AI", "thời gian vàng cứu hộ", "mắt thần đô thị"*. Thay bằng từ ngữ mộc mạc, đúng bản chất: *gọn nhẹ, mẩu tin cảnh báo, hỗ trợ kịp thời*.
   - **Chạy trực tiếp trên phần cứng phổ thông:** Toàn bộ thuật toán thị giác cốt lõi BẮT BUỘC phải chạy mượt mà trên vi xử lý CPU máy tính văn phòng phổ thông (Intel Core i3/i5 đời cũ, tốc độ 25 - 30 FPS) mà không đòi hỏi card đồ họa rời GPU đắt tiền.
   - **Đo lường hình học thực tế:** Phép đo ngập nước phải dựa trên cơ sở quang học và kích thước chuẩn của bánh xe máy lưu thông thực tế (~50cm đường kính ngoài), không phỏng đoán bằng mô hình chiều sâu trừu tượng.

---

## 🛡️ ĐIỀU 2: BẢO VỆ QUYỀN RIÊNG TƯ NGƯỜI DÂN (PRIVACY-BY-DESIGN)

1. **Bộ nhớ RAM tạm thời - Không lưu video xuống ổ cứng (Zero-Disk Storage):**
   - Luồng video trích xuất từ camera an ninh ngõ xóm CHỈ ĐƯỢC nạp tạm thời vào bộ nhớ RAM dưới dạng mảng dữ liệu số.
   - Ngay sau khi mô hình YOLOv8-nano và thuật toán đo đạc xử lý xong từng khung hình, dữ liệu hình ảnh đó phải bị hủy vĩnh viễn ngay lập tức (`Zero-Disk write`).
   - Nghiêm cấm hoàn toàn việc ghi lại luồng video sinh hoạt hoặc lưu trữ ảnh chụp người dân xuống ổ đĩa cứng của máy tính cơ sở hay máy chủ.

2. **Không nhận diện khuôn mặt hay thông tin định danh cá nhân:**
   - Mô hình AI chỉ nhận diện các lớp phương tiện và dáng người cơ bản phục vụ an toàn (`person`, `motorcycle`, `bicycle`, `car`).
   - Tuyệt đối không tích hợp nhận diện khuôn mặt (Face Recognition), không theo dõi sinh trắc học và không nhận dạng biển số xe (ALPR) của người dân.

---

## ⚡ ĐIỀU 3: TIẾT KIỆM BĂNG THÔNG & TỐI ƯU TÀI NGUYÊN DÂN SINH

1. **Chỉ gửi mẩu tin khi có sự cố (< 150 Bytes):**
   - Các máy tính khu phố tuyệt đối không kéo hay phát luồng video liên tục về máy chủ trung tâm để tránh làm nghẽn toàn bộ đường truyền mạng ngõ xóm.
   - Chỉ khi phát hiện sự cố ngập sâu hoặc ngã xe, hệ thống mới gửi đi một mẩu tin cảnh báo với kích thước **dưới 150 bytes**.

2. **Bộ đếm thời gian triệt tiêu báo động giả:**
   - Mọi cảnh báo tai nạn ngã xe phải đi qua bộ lọc kiểm tra bất động:
     - Nạn nhân phải nằm bất động trên mặt đường liên tục **trên 5.0 giây** thì còi báo động mới kích hoạt.
     - Các hành động thông thường như dừng xe chống chân, cúi nhặt đồ hay dắt xe qua đoạn trũng phải tự động đặt lại bộ đếm về 0, không kích hoạt báo động sai gây phiền toái.

---

## 🧪 ĐIỀU 4: KIỂM THỬ THỰC TẾ & BẰNG CHỨNG MINH BẠCH

1. **Bắt buộc có báo cáo kiểm thử (Test Report):**
   - Không một tính năng hay thuật toán nào được coi là hoàn thành nếu chưa có bộ kiểm thử tự động (`pytest`) kiểm tra toàn diện cả trường hợp bình thường lẫn trường hợp biên (edge cases).
   - Phải duy trì liên tục file báo cáo kiểm thử minh bạch [`docs/TEST_REPORT.md`](file:///c:/Competition/HackathonSGU2026/docs/TEST_REPORT.md) có ghi rõ tỷ lệ vượt qua (100%) và độ trễ phản hồi.

2. **Đảm bảo Live Demo thực tế không phát sinh lỗi:**
   - Hệ thống mã nguồn phải bảo đảm chạy trực tiếp ổn định 100% trong phần trình diễn trực tiếp trước Ban Giám khảo, không bị crash, không đứng hình.
