# 🎙️ KỊCH BẢN THUYẾT TRÌNH GIẢI PHÁP (PITCHING SCRIPT) 3 PHÚT
# DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG THEO DÕI NGẬP NƯỚC & TAI NẠN BẰNG AI BIÊN
### Đơn vị phát triển: **SingleNode**

---

## ⏱️ BỐ CỤC 3 PHÚT

* **0:00 - 0:45 (45s):** Thực trạng ngập nước, sự cố giao thông & Hạn chế của hệ thống camera truyền thống.
* **0:46 - 1:45 (60s):** Ý tưởng giải pháp & Phương pháp kỹ thuật (Ước lượng độ sâu & Nhận diện người ngã).
* **1:46 - 2:30 (45s):** Tính khả thi, Chi phí phần cứng & Cơ chế bảo vệ quyền riêng tư.
* **2:31 - 3:00 (30s):** Tóm tắt giải pháp & Lời cảm ơn.
* **Sau 3:00:** 2 phút trao đổi, trả lời câu hỏi chuyên môn.

---

## 📜 NỘI DUNG THUYẾT TRÌNH

### 1. ĐẶT VẤN ĐỀ THỰC TẾ (0:00 - 0:45)
*(Trình chiếu Slide 1 & 2: Hình ảnh thực tế ngập nước và sự cố giao thông)*

> *"Kính thưa Hội đồng và Quý vị,
> 
> Tại các đô thị vào mùa mưa hoặc triều cường, tình trạng ngập nước cục bộ trên các tuyến đường trũng thường gây chết máy xe và cản trở lưu thông. Bên cạnh đó, các sự cố ngã xe hoặc va chạm vào ban đêm tại các đoạn đường vắng, ngõ xóm cũng khó được phát hiện kịp thời để hỗ trợ người gặp nạn.
> 
> Hiện nay, việc mở rộng hệ thống camera AI giám sát thông minh thường gặp khó khăn vì chi phí thiết bị chuyên dụng cao, đòi hỏi máy chủ xử lý đồ họa tập trung và đường truyền video băng thông lớn liên tục.
> 
> Xuất phát từ thực tế đó, nhóm phát triển đề xuất giải pháp: **UrbanShield Lite** – Ứng dụng mô hình AI biên nhỏ gọn trên các thiết bị phổ thông để hỗ trợ phát hiện ngập nước và sự cố giao thông với chi phí tiết kiệm."*

---

### 2. Ý TƯỞNG GIẢI PHÁP & CƠ CHẾ KỸ THUẬT (0:46 - 1:45)
*(Trình chiếu Slide 4 & 5: Mô hình Edge AI và 2 cơ chế xử lý)*

> *"UrbanShield Lite tiếp cận bài toán qua 2 phương pháp xử lý hình thái học cơ bản:
> 
> * **1. Phương pháp ước lượng độ sâu ngập bằng bánh xe máy:**  
>   Thay vì lắp đặt cảm biến đo mực nước dưới lòng đường, hệ thống nhận diện phương tiện xe máy di chuyển qua vùng ngập. Dựa vào đường kính tiêu chuẩn của bánh xe (~50cm), thuật toán tính toán tỷ lệ phần bánh xe bị mặt nước che khuất để ước lượng độ sâu theo centimet: mức chú ý khoảng 15cm (chạm mép ống xả) và mức cảnh báo ngập sâu trên 25cm. Vị trí ngập sau đó được cập nhật lên bản đồ để người tham gia giao thông chủ động chuyển hướng.
> 
> * **2. Phương pháp nhận diện sự cố ngã xe:**  
>   Hệ thống theo dõi tỷ lệ khung hình cơ thể (Width / Height > 1.3 khi đối tượng ở tư thế nằm ngang) kết hợp kiểm tra trạng thái bất động liên tục trong 5 giây nhằm giảm thiểu các trường hợp báo nhầm (như người dân ngồi nghỉ hoặc nhặt đồ).
> 
> * **3. Cơ chế gửi thông tin cảnh báo:**  
>   Khi phát hiện sự cố, thiết bị biên chỉ gửi một gói tin dữ liệu nhỏ (~vài KB) kèm hình ảnh chụp hiện trường và tọa độ qua bot Telegram đến người phụ trách, giúp rút ngắn thời gian phát hiện và hỗ trợ người bị nạn."*

---

### 3. TÍNH KHẢ THI & BẢO MẬT (1:46 - 2:30)
*(Trình chiếu Slide 6 & 7: Mô hình kiến trúc & Đánh giá kinh tế)*

> *"Về mặt kỹ thuật và tính khả thi:
> 
> 1. **Khả năng chạy trên phần cứng phổ thông:** Sử dụng mô hình YOLOv8-nano kích thước khoảng 6.5MB, được tối ưu hóa để chạy trực tiếp trên vi xử lý CPU thông thường mà không bắt buộc trang bị card đồ họa rời.
> 2. **Tiết kiệm tài nguyên mạng:** Do hình ảnh được xử lý cục bộ tại máy trạm, hệ thống không cần truyền phát video liên tục 24/7 về máy chủ, chỉ truyền dữ liệu sự kiện khi có sự cố.
> 3. **Bảo vệ quyền riêng tư:** Khung hình video chỉ được lưu tạm trong bộ nhớ RAM để phân tích và giải phóng ngay sau đó. Hệ thống không lưu trữ video sinh hoạt và không nhận diện khuôn mặt người dân."*

---

### 4. TỔNG KẾT (2:31 - 3:00)
*(Trình chiếu Slide 8: Tổng kết đề xuất)*

> *"Tóm lại, UrbanShield Lite hướng đến một giải pháp kỹ thuật thiết thực: tận dụng phần cứng có sẵn kết hợp mô hình AI nhỏ gọn để hỗ trợ cảnh báo ngập nước và tai nạn giao thông tại các khu vực đô thị.
> 
> Đội ngũ **SingleNode** xin chân thành cảm ơn và sẵn sàng lắng nghe các câu hỏi, góp ý từ Hội đồng!"*

---

## 🛡️ CÁC CÂU HỎI THƯỜNG GẶP (Q&A)

### Câu 1: *"Camera phổ thông chất lượng trung bình, trời mưa to hoặc ban đêm thì mô hình nhận diện thế nào?"*
* **Trả lời:**
  > *"Hệ thống không yêu cầu nhận diện biển số xe hay đặc điểm chi tiết khuôn mặt mà chỉ cần nhận diện hình thái cơ bản của phương tiện và người. Để hỗ trợ điều kiện mưa và thiếu sáng, dữ liệu hình ảnh được áp dụng tiền xử lý cân bằng sáng cục bộ (CLAHE) trước khi đưa vào mô hình YOLOv8n để tăng độ tương phản của vật thể."*

### Câu 2: *"Tại sao dùng camera ước lượng mực nước thay vì dùng cảm biến siêu âm gắn dưới cống?"*
* **Trả lời:**
  > *"Cảm biến gắn dưới cống thường gặp vấn đề về bám bẩn, rác thải hoặc ăn mòn sau thời gian vận hành. Ngoài ra, mực nước trong cống thoát không phải lúc nào cũng phản ánh đúng độ sâu ngập thực tế trên mặt đường. Quan sát bằng camera giúp ghi nhận tình trạng ngập trực tiếp trên bề mặt nơi phương tiện lưu thông."*

### Câu 3: *"Hệ thống camera của thành phố đã có nhiều, đề xuất này hướng vào nhóm đối tượng nào?"*
* **Trả lời:**
  > *"Camera giao thông hiện hữu chủ yếu phục vụ các trục đại lộ lớn. UrbanShield Lite hướng đến việc bổ sung giải pháp chi phí thấp cho các tuyến đường nhánh, khu dân cư hoặc ngõ xóm – những nơi chưa được phủ sóng bởi hệ thống camera chuyên dụng đắt tiền."*

### Câu 4: *"Vấn đề quyền riêng tư của người dân được xử lý ra sao?"*
* **Trả lời:**
  > *"Các luồng hình ảnh chỉ được nạp vào bộ nhớ tạm thời trên thiết bị biên để suy luận và xóa ngay lập tức. Hệ thống không lưu trữ video thô liên tục và không có tính năng nhận diện danh tính công dân. Chỉ khi phát hiện sự cố, 1 ảnh tĩnh ghi nhận hiện trường mới được gửi kèm theo gói tin cảnh báo."*
