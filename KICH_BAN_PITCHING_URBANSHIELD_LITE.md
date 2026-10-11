# 🎙️ KỊCH BẢN THUYẾT TRÌNH GIẢI PHÁP (PITCHING SCRIPT) 3 PHÚT
# DỰ ÁN: URBANSHIELD LITE – MẠNG LƯỚI THỊ GIÁC AI PHÂN TÁN BẢO VỆ ĐÔ THỊ
### Đơn vị phát triển: **SingleNode**

---

## ⏱️ BỐ CỤC 3 PHÚT CHUẨN XÁC THEO QUY ĐỊNH (HỘI TRƯỜNG E7 SGU)

* **0:00 - 0:45 (45s):** Vấn đề thực tiễn tại đô thị & Nghịch lý chi phí Camera AI.
* **0:46 - 1:45 (60s):** Ý tưởng giải pháp & Cơ chế thị giác AI (Đo ngập & Phát hiện ngã xe).
* **1:46 - 2:30 (45s):** Bài toán kinh tế, Tái chế phần cứng & Khả năng nhân rộng phân tán.
* **2:31 - 3:00 (30s):** Tầm nhìn dự án & Lời kết phụng sự cộng đồng.
* **Sau 3:00:** 2 phút phản biện Q&A trước Hội đồng.

---

## 📜 LỜI THOẠI CHI TIẾT (WORD-BY-WORD SCRIPT)

### 🔴 PHẦN 1: ĐẶT VẤN ĐỀ – ĐÁNH TRÚNG NỖI ĐAU (0:00 - 0:45)
*(Mở slide 1 & 2: Hình ảnh triều cường ngập sâu trên đường phố và tai nạn ngõ hẻm)*

> *"Kính thưa Quý Hội đồng và Quý vị theo dõi,*
> 
> *Là người dân và sinh viên sống tại các đô thị lớn, chắc hẳn ai trong chúng ta cũng từng nếm trải cảm giác dắt bộ chiếc xe máy chết máy giữa biển nước ngập trên các trục đường trũng thấp mỗi mùa triều cường hay mưa lớn. Thậm chí đau lòng hơn, những vụ va chạm ngã xe đêm khuya trong các con hẻm vắng bị lỡ mất 'thời gian vàng' cấp cứu vì không ai phát hiện kịp thời.*
> 
> *Thành phố thông minh đã được nói đến nhiều năm, nhưng tại sao từng con hẻm, từng góc phố quanh chúng ta vẫn chưa có camera AI bảo vệ?*
> 
> *Bởi vì một nghịch lý: **Camera AI truyền thống quá đắt đỏ!** Mỗi mắt camera chuyên dụng tốn từ 15 đến 30 triệu đồng, cộng thêm tiền máy chủ GPU và tiền đường truyền băng thông khổng lồ để stream video liên tục về trung tâm.*
> 
> *Hôm nay, đội **SingleNode** mang đến giải pháp: **UrbanShield Lite – Mạng lưới thị giác AI phân tán**, biến mọi webcam 200 ngàn hay smartphone cũ thành trạm giám sát thông minh với **chi phí gần như bằng 0**!"*

---

### 🟢 PHẦN 2: Ý TƯỞNG CỐT LÕI & CƠ CHẾ HOẠT ĐỘNG (0:46 - 1:45)
*(Trình chiếu Slide 4 & 5: Ý tưởng mô hình Edge AI & Cơ chế hoạt động 2 tình huống)*

> *"Ý tưởng của UrbanShield Lite giải quyết 2 bài toán nhức nhối bằng 2 cơ chế thị giác máy tính thông minh:
> 
> * **Cơ chế 1: Ý tưởng đo ngập vật lý không cần cảm biến thủy văn.**  
>   Thay vì cắm que đo dưới cống dễ kẹt rác, mô hình Edge AI phân tích tỷ lệ che khuất bánh xe máy đang lưu thông (vốn có đường kính chuẩn 50cm). Bằng thuật toán Wheel-Occlusion Ratio, hệ thống tính toán chính xác mực nước ngập: 15cm chạm mép pô (Cảnh báo Vàng) hay 26cm vượt nửa bánh xe (Cảnh báo Đỏ nguy cơ chết máy cao). Vị trí ngập lập tức được ghim cảnh báo lên bản đồ số để người dân chủ động chuyển hướng an toàn.
> 
> * **Cơ chế 2: Ý tưởng phát hiện tai nạn ngã xe đêm khuya và người nằm bất động.**  
>   Hệ thống theo dõi tỷ lệ khung hình cơ thể (Width / Height > 1.3 khi ngã nằm ngang) kết hợp bộ đếm bất động thông minh (Inactivity Timer > 5 giây) để loại bỏ báo động giả khi người dân chỉ ngồi xổm hoặc nhặt đồ.
> 
> * **Kênh cảnh báo tức thời 0 đồng:**  
>   Khi phát hiện sự cố, thiết bị biên lập tức gửi một gói tin Alert Metadata siêu nhẹ (< 5KB) kèm ảnh hiện trường và tọa độ GPS về kênh Telegram của Tổ dân phố và Lực lượng cứu hộ chỉ trong 1 giây, giữ trọn 'thời gian vàng' cấp cứu nạn nhân."*

---

### 🟡 PHẦN 3: BÀI TOÁN KINH TẾ & ĐỘT PHÁ CÔNG NGHỆ (1:46 - 2:30)
*(Chuyển sang slide 5: Bảng so sánh chi phí & Kiến trúc Edge AI)*

> *"Điều gì làm nên tính khả thi đột phá của UrbanShield Lite? Đó là triết lý **Edge AI Siêu Tiết Kiệm**:*
> 
> 1. ***Tái chế thiết bị:*** *Chạy trên mô hình YOLOv8-nano chỉ 6MB, xử lý mượt mà 30 FPS ngay trên CPU thông thường mà không cần GPU tiền triệu.*
> 2. ***Tiết kiệm 99% băng thông:*** *Camera không stream video liên tục. Chỉ khi có ngập nước hoặc tai nạn, thiết bị biên mới gửi đúng 1 gói tin Alert Metadata vài Kilobyte.*
> 3. ***Hạ tầng 0 đồng:*** *Sử dụng bản đồ nguồn mở OpenStreetMap và Telegram API miễn phí hoàn toàn.*
> 
> *Thay vì chi 50 triệu cho 1 điểm camera AI cao cấp, UrbanShield Lite có thể phủ sóng an toàn cho **250 con hẻm** với cùng số tiền đó!"*

---

### 🔵 PHẦN 4: KẾT LUẬN & CAM KẾT (2:31 - 3:00)
*(Chuyển sang slide 6: Thông điệp kết luận)*

> *"UrbanShield Lite chứng minh rằng: AI đỉnh cao không nhất thiết phải xa xỉ nghìn tỷ. Bằng sự tối ưu hóa điện toán biên, công nghệ hoàn toàn có thể phụng sự và bảo vệ từng góc phố, từng người dân một cách thiết thực nhất.*
> 
> *Đội ngũ **SingleNode** xin chân thành cảm ơn và sẵn sàng giải đáp mọi câu hỏi chuyên sâu về giải pháp!"*

---

## 🛡️ BỘ 5 CÂU HỎI PHẢN BIỆN "HẠ GỤC" BAN GIÁM KHẢO (Q&A DEFENSE)

### Câu 1: *"Camera 200k chất lượng thấp, trời mưa to hoặc ban đêm tối mờ thì AI có nhận diện được không?"*
* **Trả lời:**
  > *"Dạ thưa Thầy/Cô, câu hỏi này rất thực tế ạ. UrbanShield Lite không cần nhận diện biển số xe hay khuôn mặt (vốn đòi hỏi camera 4K đắt tiền), mà chỉ cần nhận diện **hình thái học (Morphology)**:*
  > 1. *Với ngập lụt: Thuật toán đo tỷ lệ che lấp hình học của bánh xe máy (vốn có hình tròn đối xứng đặc trưng). Bánh xe bị cắt cụt 1/3 là ~10cm, cắt cụt 1/2 là ~20cm.*
  > 2. *Với trời mưa và ban đêm: Hệ thống tích hợp bộ lọc tiền xử lý ảnh **CLAHE (Contrast Limited Adaptive Histogram Equalization)** giúp cân bằng sáng cục bộ, giúp mô hình YOLOv8n phân biệt rõ xe và người dù trong điều kiện ánh sáng yếu."*

### Câu 2: *"Tại sao dùng camera đo mực nước mà không cắm cảm biến siêu âm (Ultrasonic Sensor) xuống cống?"*
* **Trả lời:**
  > *"Dạ thưa Thầy Cô, cảm biến siêu âm cắm dưới cống có 2 nhược điểm chết người:*
  > * *Thứ nhất: Rác thải, bùn đất và nước cống ăn mòn làm cảm biến hỏng sau vài tuần.*
  > * *Thứ hai: Nước trong cống dâng không đồng nghĩa với việc mặt đường bị ngập (do độ dốc thoát nước).*
  > * *Camera đo trực tiếp **trên mặt đường thực tế**, vừa thấy được xe ngập vừa giám sát được an toàn giao thông mà không sợ bị bùn rác làm nghẹt cảm biến."*

### Câu 3: *"TP.HCM và Sở GTVT đã có hàng ngàn camera giao thông rồi, hệ thống của bạn có bị trùng lặp không?"*
* **Trả lời:**
  > *"Dạ thưa Thầy Cô, hệ thống của Sở GTVT hiện nay chủ yếu tập trung trên các **trục đại lộ lớn** và phục vụ điều tiết đèn tín hiệu. 
  > Điểm mù lớn nhất của đô thị chính là **ngõ hẻm dân cư, đường nhánh quanh trường học và khu nhà trọ sinh viên** — nơi mà nhà nước không đủ kinh phí lắp camera đắt tiền. 
  > UrbanShield Lite sinh ra để lấp đầy điểm mù đó: Phổ cập công nghệ AI bình dân cho tổ dân phố và cộng đồng cơ sở."*

### Câu 4: *"Bạn đi thi một mình (Solo Dev), liệu trong 24 giờ có làm kịp toàn bộ hệ thống này không?"*
* **Trả lời:**
  > *"Dạ thưa Ban Giám Khảo, em tự tin 100% vì hệ thống được thiết kế theo kiến trúc module hóa cực kỳ chặt chẽ:*
  > * *Module AI: Dùng YOLOv8n tiền huấn luyện, chỉ tinh chỉnh hàm tính toán góc nghiêng người ngã và diện tích bánh xe.*
  > * *Module Gateway: FastAPI và WebSocket bất đồng bộ siêu nhẹ.*
  > * *Module Bản đồ: Tận dụng Leaflet.js mã nguồn mở không phụ thuộc khóa API.*
  > * *Hôm nay bản PoC đã chạy trực tiếp trên máy của em, chứng minh khả năng hoàn thiện 100% sản phẩm trong vòng 24 giờ của em."*

### Câu 5: *"Hình ảnh camera an ninh có bị vi phạm quyền riêng tư (Privacy) của người dân không?"*
* **Trả lời:**
  > *"Dạ thưa Thầy/Cô, đây chính là thế mạnh vượt trội của kiến trúc **Edge AI**:
  > Các camera thông thường stream video liên tục lên đám mây $\rightarrow$ Nguy cơ lộ lọt hình ảnh sinh hoạt riêng tư của người dân. 
  > Còn UrbanShield Lite **xử lý cục bộ 100% tại thiết bị biên**. Hình ảnh bình thường bị hủy ngay lập tức trong RAM. Chỉ khi xảy ra sự cố (tai nạn, ngập lụt), hệ thống mới gửi đúng 1 ảnh snapshot đính kèm tọa độ cảnh báo. Dữ liệu riêng tư của người dân được bảo vệ tuyệt đối."*
