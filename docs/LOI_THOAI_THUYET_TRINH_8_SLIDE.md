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

### 🧠 CUE CARDS: BẢNG TỪ KHÓA BỎ TÚI (DÀNH CHO 3 PHÚT TRÊN SÂN KHẤU)
*(Khi đứng trên bục, chỉ cần nhớ 2 - 3 keyword này cho mỗi slide là tự khắc nói trôi chảy, không sợ quên bài)*

- **Slide 1:** `UrbanShield Lite` | `AI biên nhỏ gọn` | `Dân sinh ngõ hẻm bình dị`
- **Slide 2:** `2 vấn đề: Ngập xe chết máy + Ngã xe đêm khuất tầm nhìn` | `Nút thắt cổ chai: Cam đắt + Nghẽn mạng 24/7`
- **Slide 3:** `Giải quyết chi phí: Edge AI tại chỗ` | `Camera cũ -> CPU máy tính khu phố (YOLOv8-nano)` | `Chỉ gửi tin nhắn sự cố`
- **Slide 4:** `Không cảm biến cống` | `Thước đo bánh xe 50cm` | `3 dải màu: <10cm an toàn | 10-20cm ống xả | >20cm chết máy`
- **Slide 5:** `4 bước chống báo nhầm:` `CLAHE ban đêm` -> `Dáng nằm ngang sát xe` -> `Bộ đếm bất động >5s` -> `Bắn cảnh báo`
- **Slide 6:** `Privacy: Không nhận diện mặt` | `Video hủy vĩnh viễn trên RAM` | `Telegram: Đúng 1 ảnh + Tọa độ`
- **Slide 7:** `Bảng TCO: Trạm cụm 1 CPU gom 20-30 cam` | `Giảm 95% băng thông` | `Cắt giảm 70-80% tổng chi phí`
- **Slide 8:** `Nếu có cơ hội: Thử nghiệm 1-2 ngõ` -> `Tinh chỉnh thuật toán` -> `Mở mã nguồn cộng đồng` | `Cảm ơn & Lắng nghe những câu hỏi`

---

## 🗣️ LỜI THOẠI TỪNG CÂU CHO TỪNG SLIDE

---

### 🟢 SLIDE 1: GIỚI THIỆU ĐỀ ÁN (0:00 – 0:20 | 20 giây)
*(Màn hình hiển thị: UrbanShield Lite – Theo dõi ngập nước & sự cố giao thông)*

> *"Dạ em chào hai anh chị cùng mọi người, em là Phát đến từ đội **SingleNode**.*  
> 
> *Hôm nay, em xin được chia sẻ về **UrbanShield Lite** – một giải pháp AI biên nhỏ gọn hỗ trợ theo dõi ngập nước và an toàn giao thông **dân sinh**, với mong muốn của em là mang công nghệ an toàn đến với những con đường nhỏ và khu dân cư bình dị nhất."*

*(Bấm chuyển Slide 2)*

---

### 🟢 SLIDE 2: THỰC TRẠNG & RÀO CẢN HẠ TẦNG (0:20 – 0:45 | 25 giây)
*(Màn hình hiển thị: Nút thắt cổ chai băng thông và 2 vấn đề dân sinh)*

> *"Thực tế là mỗi khi mùa mưa đến, chúng ta lại thấy hai vấn đề rất rõ: Đầu tiên là những con đường hay bị **ngập sâu làm xe chết máy**; và thứ hai là những vụ trượt ngã xe trong ngõ vắng ban đêm **khuất tầm nhìn**, rất khó được phát hiện kịp thời để giúp đỡ.*  
> 
> *Thế nhưng, hạ tầng hiện nay lại gặp phải một **nút thắt cổ chai rất lớn** như sơ đồ phía dưới: Mua camera AI chuyên dụng thì quá đắt đỏ; còn dùng camera thường kéo video liên tục 24/7 về máy chủ thì lại làm nghẽn toàn bộ đường truyền mạng."*

*(Bấm chuyển Slide 3)*

---

### 🟢 SLIDE 3: TIẾP CẬN BẰNG EDGE AI PHÂN TÁN (0:45 – 1:05 | 20 giây)
*(Màn hình hiển thị: Sơ đồ luồng Edge AI từ Camera -> CPU Máy trạm YOLOv8-nano -> Gói tin cảnh báo -> Telegram & Bản đồ số)*

> *"Để giải quyết vấn đề chi phí này, em chọn cách đưa AI về xử lý trực tiếp ngay tại chỗ — tức là **Edge AI**.*  
> 
> *Quy trình hoạt động rất đơn giản: Đầu tiên, hình ảnh từ các camera có sẵn sẽ được truyền về máy tính ở khu phố, chạy mô hình **YOLOv8-nano rất nhẹ** mà không cần GPU đắt tiền. Tại đây, máy tính sẽ tự phân tích tại chỗ, và chỉ khi thực sự có sự cố thì mới gửi một **tin nhắn cảnh báo** về Telegram và Bản đồ số."*

*(Bấm chuyển Slide 4)*

---

### 🟢 SLIDE 4: ƯỚC LƯỢNG NGẬP QUA HÌNH HỌC (1:05 – 1:30 | 25 giây)
*(Màn hình hiển thị: Bánh xe máy 50cm và 3 mức nước nét đứt Xanh - Vàng - Đỏ)*

> *"Cụ thể với bài toán ngập nước: Thay vì gắn cảm biến dưới cống rất dễ bị nghẹt rác và hỏng hóc, em tận dụng chính bánh xe máy lưu thông trên đường làm thước đo.*  
> 
> *Với đường kính bánh xe khoảng 50cm, hệ thống sẽ nhìn vào phần bánh xe bị nước che khuất để chia làm ba mức cảnh báo **như ba dải màu trên màn hình**: Dưới 10cm là an toàn, xe chạy bình thường; từ 10 đến 20cm là nước chạm mép ống xả; và trên 20cm là ngập sâu, xe rất dễ bị chết máy."*

*(Bấm chuyển Slide 5)*

---

### 🟢 SLIDE 5: NHẬN DIỆN SỰ CỐ NGÃ XE (1:30 – 1:55 | 25 giây)
*(Màn hình hiển thị: Quy trình lọc 4 bước: CLAHE -> Khung bao ngang W/H > 1.15 gần xe máy -> Bộ đếm bất động liên tục > 5s -> Kích hoạt cảnh báo)*

> *"Còn với sự cố ngã xe ban đêm: Để tránh báo nhầm khi người dân chỉ cúi nhặt đồ hay ngồi nghỉ, em áp dụng **quy trình lọc 4 bước** như trên màn hình:*  
> 
> *Đầu tiên, thuật toán **CLAHE** tự động cân bằng sáng để nhìn rõ vào ban đêm. Tiếp theo, mô hình nhận diện **dáng người nằm ngang sát cạnh xe máy**. Và quan trọng nhất là **bộ đếm 5 giây**: Chỉ khi người đó nằm bất động liên tục quá 5 giây mà không đứng dậy, hệ thống mới kích hoạt cảnh báo, gửi hình ảnh và tọa độ để ứng cứu kịp thời."*

*(Bấm chuyển sang Tab Trình duyệt Demo Prototype)*

---

### 💻 PHẦN THAO DIỄN NGUYÊN MẪU TRỰC TIẾP (LIVE PROTOTYPE DEMO | 60 – 75 giây)
*(Màn hình trình chiếu giao diện UrbanShield Lite Dashboard)*

> *"Dạ, để hai anh chị hình dung rõ nhất cách hệ thống vận hành trong thực tế, em xin phép thao tác trực tiếp hai kịch bản trên bản demo prototype:*
>
> *(Thao tác 1: Kịch bản Đo ngập nước – bấm nút [15cm Chạm pô xe])*  
> *Đầu tiên là bài toán ngập nước: Khi mực nước ở mức 15cm, nước dâng ngập khoảng một phần ba bánh xe và chạm mép pô, hệ thống lập tức bật cảnh báo màu cam. Đồng thời ở góc phải, tuyến Hẻm 254 trên bản đồ số cũng tự động đổi sang màu vàng cam để bà con biết tránh đi vào.*
>
> *(Thao tác 2: Bấm nút [26cm Ngập sâu])*  
> *Còn khi nước dâng vượt quá 20cm – tức là hơn nửa bánh xe, hệ thống sẽ chuyển sang cảnh báo đỏ nguy cơ chết máy. Ngay lập tức, một mẩu tin cảnh báo tự động bắn về Telegram cho Tổ Dân Phố kèm định vị chính xác con hẻm.*
>
> *(Thao tác 3: Chuyển sang tab [Thử nghiệm Ngã xe] – bấm nút đỏ [Mô phỏng ngã xe])*  
> *Kịch bản thứ hai là sự cố ngã xe ban đêm: Khi xe ngã, camera bắt được dáng người nằm ngang sát cạnh xe và kích hoạt bộ đếm 5 giây ở góc trên.*
>
> *(Thao tác 4: Bấm nút [Người tự đứng dậy])*  
> *Nếu người dân tự đứng dậy được trước 5 giây – ví dụ như người ta chỉ cúi nhặt đồ hay ngồi nghỉ, cảnh báo sẽ tự hủy ngay lập tức để triệt tiêu báo động giả. Còn nếu người đó bất động liên tục quá 5 giây, chuông SOS đỏ sẽ reo và mẩu tin cứu trợ khẩn cấp sẽ được phát đi ngay lập tức."*

*(Bấm Alt+Tab chuyển lại Slide PowerPoint – Chuyển Slide 6)*

---

### 🟢 SLIDE 6: KIẾN TRÚC DỮ LIỆU & QUYỀN RIÊNG TƯ (1:55 – 2:15 | 20 giây)
*(Màn hình hiển thị: Khung Privacy-by-design bên trái và Giao diện Telegram Real UI bên phải)*

> *"Về quyền riêng tư: Hệ thống **hoàn toàn không nhận diện khuôn mặt**, video chỉ lưu tạm trên RAM để phân tích rồi **hủy vĩnh viễn**, tuyệt đối không lưu ổ cứng.*  
> 
> *Còn về cảnh báo thực tế: Chỉ khi có sự cố, hệ thống mới gửi **đúng một bức ảnh hiện trường kèm tọa độ** về Telegram để hỗ trợ ứng cứu kịp thời."*

*(Bấm chuyển Slide 7)*

---

### 🟢 SLIDE 7: PHÂN TÍCH TÍNH KHẢ THI KINH TẾ TCO (2:15 – 2:40 | 25 giây)
*(Màn hình hiển thị: Bảng so sánh kinh tế TCO và Mô hình trạm cụm 20-30 camera)*

> *"Để giải pháp có tính khả thi cao, em áp dụng **mô hình trạm cụm như bảng so sánh trên màn hình**: Thay vì đầu tư máy chủ GPU đắt đỏ, chỉ cần một máy tính CPU phổ thông đặt tại khu phố là đã xử lý được cho **20 đến 30 camera** xung quanh.*  
> 
> *Nhờ xử lý tại chỗ, hệ thống **tiết kiệm hơn 95% băng thông** mạng; và quan trọng nhất là **cắt giảm từ 70 đến 80% tổng chi phí đầu tư**, giúp việc nhân rộng về các khu dân cư trở nên hoàn toàn khả thi."*

*(Bấm chuyển Slide 8)*

---

### 🟢 SLIDE 8: LỘ TRÌNH THỬ NGHIỆM & KẾT LUẬN (2:40 – 3:00 | 20 giây)
*(Màn hình hiển thị: 3 giai đoạn lộ trình & Lời cảm ơn của SingleNode)*

> *"Nếu có cơ hội được phát triển tiếp, em mong muốn được thử nghiệm thực địa tại 1 đến 2 con ngõ để thu thập thêm dữ liệu và tinh chỉnh thuật toán; sau đó sẽ **mở mã nguồn hoàn toàn** để phục vụ cộng đồng.*  
> 
> *Em xin cảm ơn các thầy và mọi người đã lắng nghe, và em rất mong nhận được **những câu hỏi** cũng như góp ý từ các thầy ạ!"*

*(Cúi chào nhẹ và mỉm cười chờ Ban Giám khảo đặt câu hỏi)*

---

## 🎯 4 LƯU Ý SỐNG CÒN KHI BƯỚC LÊN BỤC THUYẾT TRÌNH:

1. **Giữ nhịp thở đều, nói điềm tĩnh:** Đừng cố nói quá nhanh. 3 phút là đủ thoải mái cho khoảng 350 - 400 từ nếu bạn nói với tốc độ vừa phải.
2. **Ánh mắt hướng vào Giám khảo:** Hãy nhìn trực diện vào các thầy cô trong Hội đồng, chỉ liếc nhìn slide 1 - 2 giây khi bấm chuyển trang để kiểm tra hình.
3. **Chỉ tay vào điểm nhấn hình ảnh:** 
   - Ở Slide 2: Chỉ tay vào 2 bức ảnh trên khi nói về ngập nước và ngã xe, sau đó chỉ xuống sơ đồ nút thắt cổ chai ở dưới.
   - Ở Slide 4: Chỉ tay vào hình bánh xe có 3 dải màu xanh - vàng - đỏ.
   - Ở Slide 5: Chỉ tay từ trái qua phải theo 4 khối: Cân bằng sáng -> Dáng nằm sát xe -> Đếm 5 giây -> Bắn cảnh báo.
   - Ở Slide 6: Chỉ tay sang khung bên trái vào biểu tượng RAM trút vào thùng rác, sau đó chỉ sang khung bên phải vào màn hình điện thoại Telegram.
   - Ở Slide 7: Chỉ tay từ hàng trên xuống dưới theo 2 mũi tên đỏ: Giảm 95% băng thông -> Giảm 70-80% chi phí.
   - Ở Slide 8: Chỉ tay lướt nhẹ từ trái qua phải qua 3 mốc lộ trình, đặc biệt nhấn vào mốc Mã nguồn mở.
4. **Chuẩn bị sẵn tâm thế trả lời Q&A:** Lắng nghe hết câu hỏi của giám khảo, gật đầu cảm ơn *"Dạ cảm ơn câu hỏi rất hay của Thầy/Cô ạ"*, sau đó trả lời đúng trọng tâm kỹ thuật như đã chuẩn bị trong tài liệu.
