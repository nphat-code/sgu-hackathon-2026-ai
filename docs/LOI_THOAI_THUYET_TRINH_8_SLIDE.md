# 🎙️ LỜI THOẠI THUYẾT TRÌNH CHI TIẾT 8 SLIDE (PITCHING 3 PHÚT)
## ĐỀ ÁN: URBANSHIELD LITE – SINGLE NODE

> **Thời lượng quy định:** Đúng 3 phút (180 giây).  
> **Phong cách:** Tự tin, điềm đạm, khiêm tốn, dùng từ ngữ kỹ thuật chính xác, không nói từ phóng đại.  
> **Nguyên tắc vàng:** Nói theo ý chính để làm nổi bật hình ảnh trên slide, không đọc lại từng chữ trên màn hình.

---

### ⏱️ BẢNG PHÂN BỔ THỜI GIAN THEO TỪNG SLIDE

| Slide | Tên Slide | Mốc thời gian | Thời lượng | Trọng tâm cần nhấn mạnh |
| :---: | :--- | :---: | :---: | :--- |
| **1** | Tiêu đề: UrbanShield Lite | `0:00 - 0:20` | 20 giây | Tên sản phẩm, nhóm SingleNode, định hướng bài toán dân sinh |
| **2** | Thực trạng & Rào cản hạ tầng | `0:20 - 0:45` | 25 giây | Ngập đường nhánh, ngã xe đêm, nút thắt chi phí & băng thông |
| **3** | Tiếp cận bằng Edge AI phân tán | `0:45 - 1:05` | 20 giây | Xử lý tại biên, tận dụng phần cứng phổ thông, không stream video |
| **4** | Ước lượng ngập qua phân tích hình học | `1:05 - 1:30` | 25 giây | Bánh xe tham chiếu 50cm, phân loại 3 mức độ, không cần cảm biến cống |
| **5** | Cơ chế nhận diện sự cố ngã xe | `1:30 - 1:55` | 25 giây | Tỷ lệ W/H > 1.15, bộ đếm 5s triệt tiêu báo động giả, bộ lọc CLAHE |
| **6** | Kiến trúc dữ liệu & Quyền riêng tư | `1:55 - 2:15` | 20 giây | Privacy-by-design, video hủy trong RAM, chỉ gửi 1 ảnh + metadata |
| **7** | Phân tích tính khả thi kinh tế (TCO) | `2:15 - 2:40` | 25 giây | Mô hình trạm cụm (Cluster) 20-30 cam, tiết kiệm 70-80% chi phí |
| **8** | Lộ trình thử nghiệm (PoC) & Kết luận | `2:40 - 3:00` | 20 giây | Kế hoạch PoC diện hẹp, thông điệp khiêm tốn và lời cảm ơn |

---

## 🗣️ LỜI THOẠI TỪNG CÂU CHO TỪNG SLIDE

---

### 🟢 SLIDE 1: GIỚI THIỆU ĐỀ ÁN (0:00 – 0:20 | 20 giây)
*(Màn hình hiển thị: UrbanShield Lite – Theo dõi ngập nước & sự cố giao thông)*

> *"Chào Thầy Cô và các bạn, em là Phát đến từ đội **SingleNode**.*  
> 
> *Hôm nay, nhóm em xin được chia sẻ về **UrbanShield Lite** – một giải pháp nhỏ gọn hỗ trợ theo dõi ngập nước và an toàn giao thông đô thị dựa trên kiến trúc AI biên phân tán, với mong muốn mang công nghệ an toàn đến với những tuyến đường nhánh và khu dân cư bình dị nhất."*

*(Bấm chuyển Slide 2)*

---

### 🟢 SLIDE 2: THỰC TRẠNG & RÀO CẢN HẠ TẦNG (0:20 – 0:45 | 25 giây)
*(Màn hình hiển thị: Nút thắt cổ chai băng thông và 2 vấn đề dân sinh)*

> *"Bởi vì ở chính những nơi ấy, mỗi khi mùa mưa đến, chúng ta lại thấy hai rủi ro rất quen thuộc: các tuyến đường nhánh trũng thấp bị ngập cục bộ làm xe chết máy hàng loạt, và những vụ trượt ngã xe trong ngõ vắng ban đêm rất khó được phát hiện kịp thời để giúp đỡ.*  
> 
> *Thế nhưng, ta không thể đưa camera AI xuống từng con hẻm nhỏ được: dùng camera chuyên dụng thì quá đắt đỏ, còn nếu truyền hàng ngàn luồng video liên tục 24/7 về máy chủ thì lại làm nghẽn toàn bộ đường truyền mạng."*

*(Bấm chuyển Slide 3)*

---

### 🟢 SLIDE 3: TIẾP CẬN BẰNG EDGE AI PHÂN TÁN (0:45 – 1:05 | 20 giây)
*(Màn hình hiển thị: So sánh Hệ thống tập trung vs Hệ thống phân tán UrbanShield Lite)*

> *"Để giải bài toán chi phí này, nhóm em không gom video về máy chủ trung tâm nữa, mà đưa AI về xử lý trực tiếp ngay tại chỗ — tức là **Edge AI**.*  
> 
> *Nhóm em chọn mô hình **YOLOv8-nano siêu nhẹ**, chạy mượt ngay trên **CPU máy tính bình thường**; tận dụng camera có sẵn ở khu dân cư, tự phân tích tại chỗ và chỉ báo về khi thực sự có sự cố."*

*(Bấm chuyển Slide 4)*

---

### 🟢 SLIDE 4: ƯỚC LƯỢNG NGẬP QUA HÌNH HỌC (1:05 – 1:30 | 25 giây)
*(Màn hình hiển thị: Bánh xe máy 50cm và 3 mức nước nét đứt Xanh - Vàng - Đỏ)*

> *"Cụ thể với bài toán ngập nước: Thay vì gắn cảm biến dưới cống rất dễ bị rác làm nghẹt, nhóm em tận dụng chính bánh xe máy lưu thông trên đường làm thước đo.*  
> 
> *Với đường kính bánh xe khoảng 50cm, hệ thống sẽ nhìn vào phần bánh xe bị nước che khuất để chia làm ba mức cảnh báo: dưới 10cm là an toàn, xe chạy bình thường, từ 10 đến 20cm là nước chạm mép ống xả, và trên 20cm là báo động ngập sâu có nguy cơ chết máy."*

*(Bấm chuyển Slide 5)*

---

### 🟢 SLIDE 5: NHẬN DIỆN SỰ CỐ NGÃ XE (1:30 – 1:55 | 25 giây)
*(Màn hình hiển thị: Quy trình 4 bước: W/H > 1.15 -> Cự ly -> Bộ đếm 5s -> Xác nhận)*

> *"Còn với sự cố ngã xe ban đêm: Để tránh báo nhầm khi người dân chỉ cúi nhặt đồ hay ngồi nghỉ, nhóm em áp dụng **bộ đếm thời gian 5 giây**.*  
> 
> *Cụ thể, khi AI phát hiện **người bị ngã nằm dài trên mặt đường ngay sát cạnh xe máy**, bộ đếm sẽ kích hoạt. Chỉ khi người đó nằm bất động liên tục **quá 5 giây** mà không đứng dậy, hệ thống mới phát cảnh báo. Ngoài ra, thuật toán **CLAHE** cũng được tích hợp sẵn để tăng độ sáng rõ khi trời tối."*

*(Bấm chuyển Slide 6)*

---

### 🟢 SLIDE 6: KIẾN TRÚC DỮ LIỆU & QUYỀN RIÊNG TƯ (1:55 – 2:15 | 20 giây)
*(Màn hình hiển thị: Luồng video rơi vào thùng rác trên RAM & Kênh Telegram/Bản đồ)*

> *"Một vấn đề mà bà con ngõ xóm rất lo lắng là quyền riêng tư. Vì vậy, nhóm em **đặt quyền riêng tư lên hàng đầu**:*  
> 
> *Toàn bộ video chỉ được lưu tạm trên RAM để AI phân tích rồi **xóa sạch ngay lập tức**, không lưu bất kỳ một byte nào vào ổ cứng. Hệ thống hoàn toàn không nhận diện khuôn mặt người dân. Chỉ duy nhất khi có tai nạn hoặc ngập lụt, đúng một bức ảnh hiện trường kèm tọa độ GPS mới được gửi về bot Telegram của đội cứu hộ và cập nhật lên bản đồ điều hành."*

*(Bấm chuyển Slide 7)*

---

### 🟢 SLIDE 7: PHÂN TÍCH TÍNH KHẢ THI KINH TẾ TCO (2:15 – 2:40 | 25 giây)
*(Màn hình hiển thị: Bảng so sánh kinh tế TCO và Mô hình trạm cụm 20-30 camera)*

> *"Để nhân rộng giải pháp này vào đời sống, nhóm em áp dụng **mô hình trạm cụm rất đơn giản**: Chỉ cần một máy tính phổ thông đặt tại văn phòng khu phố là có thể xử lý cho 20 đến 30 camera xung quanh.*  
> 
> *Cách làm này giúp cắt giảm từ **70 đến 80% chi phí đầu tư ban đầu**, do tận dụng lại camera có sẵn và không cần máy chủ GPU đắt đỏ. Đồng thời, hệ thống **tiết kiệm hơn 95% đường truyền mạng** vì không phải phát video liên tục 24/7."*

*(Bấm chuyển Slide 8)*

---

### 🟢 SLIDE 8: LỘ TRÌNH THỬ NGHIỆM & KẾT LUẬN (2:40 – 3:00 | 20 giây)
*(Màn hình hiển thị: 3 giai đoạn lộ trình & Slogan SingleNode)*

> *"Về lộ trình sắp tới, nhóm em chọn cách đi từng bước thực tế: Hoàn thiện thử nghiệm trước mắt tại một khu dân cư cụ thể, để đo lường và tinh chỉnh độ chính xác trước khi nhân rộng.*  
> 
> *Nhóm **SingleNode** mong muốn mang đến một giải pháp nhỏ gọn, gần gũi, góp phần bảo vệ sự an toàn cho bà con mỗi mùa mưa bão.*  
> 
> *Em xin cảm ơn Thầy Cô và các bạn đã chú ý lắng nghe, nhóm em rất mong nhận được những ý kiến đóng góp ạ!"*

*(Cúi chào nhẹ và mỉm cười chờ Ban Giám khảo đặt câu hỏi)*

---

## 🎯 4 LƯU Ý SỐNG CÒN KHI BƯỚC LÊN BỤC THUYẾT TRÌNH:

1. **Giữ nhịp thở đều, nói điềm tĩnh:** Đừng cố nói quá nhanh. 3 phút là đủ thoải mái cho khoảng 350 - 400 từ nếu bạn nói với tốc độ vừa phải.
2. **Ánh mắt hướng vào Giám khảo:** Hãy nhìn trực diện vào các thầy cô trong Hội đồng, chỉ liếc nhìn slide 1 - 2 giây khi bấm chuyển trang để kiểm tra hình.
3. **Chỉ tay vào điểm nhấn hình ảnh:** 
   - Ở Slide 4: Chỉ tay vào hình bánh xe có 3 vạch xanh - vàng - đỏ.
   - Ở Slide 6: Chỉ tay vào mũi tên video trút vào biểu tượng thùng rác khi nói câu *"xóa sạch trong RAM"*.
4. **Chuẩn bị sẵn tâm thế trả lời Q&A:** Lắng nghe hết câu hỏi của giám khảo, gật đầu cảm ơn *"Dạ cảm ơn câu hỏi rất hay của Thầy/Cô ạ"*, sau đó trả lời đúng trọng tâm kỹ thuật như đã chuẩn bị trong tài liệu.
