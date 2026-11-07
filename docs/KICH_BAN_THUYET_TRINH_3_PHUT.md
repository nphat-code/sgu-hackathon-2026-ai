# 🎙️ KỊCH BẢN THUYẾT TRÌNH LIVE DEMO (3 PHÚT)
## DỰ ÁN: URBANSHIELD LITE — HACKATHON SGU 2026
**Người trình bày:** Phát (Đội SingleNode)  
**Thời lượng:** 3 phút (180 giây) chuẩn thi đấu  
**Quy tắc vàng (Mentor Advice):** 
1. **Show sản phẩm ngay từ đầu (Product-First)**
2. **Demo luồng vận hành quan trọng (Core Flow: Ngập $\rightarrow$ Ngã xe 5s $\rightarrow$ Telegram)**
3. **Sau đó mới nói về Code & Tối ưu kỹ thuật ngầm**
4. 100% Văn nói tự nhiên, mộc mạc, Anti-hype, không kịch tính hóa.

---

### PHẦN 1: SHOW SẢN PHẨM NGAY TỪ GIÂY ĐẦU TIÊN (0:00 – 0:25)
*(Màn hình máy chiếu đang mở sẵn WebGIS trên Google Cloud Run, tay cầm điện thoại sẵn)*

> "Chào Thầy Cô và các bạn, em là Phát đến từ đội SingleNode.
>
> Thay vì chiếu slide lý thuyết, em xin phép mở ngay hệ thống **UrbanShield Lite** đang chạy trực tiếp trên Google Cloud Run mà nhóm em đã triển khai.
>
> Xuất phát từ thực tế bà con đi làm về hay bị chết máy dắt bộ trong những con hẻm ngập sâu, hoặc bị trượt ngã xe trong hẻm tối mà không ai hay biết — tụi em xây dựng giải pháp này để biến chính những camera an ninh sẵn có trong khu phố thành mắt thần cảnh báo tự động."

---

### PHẦN 2: DEMO LUỒNG VẬN HÀNH QUAN TRỌNG (CORE FLOW) (0:25 – 1:40)
*(Thao tác chuột trực tiếp trên giao diện WebGIS theo 3 chặng)*

#### 🌊 Luồng 1: Đo ngập tự động theo thời gian thực (Trạm 01 - Đường Trần Xuân Soạn)
> "Đầu tiên, Thầy Cô đang thấy hình ảnh trực tiếp từ **Trạm 01 - Đường Trần Xuân Soạn**.
>
> Máy tính tại chỗ tự động nhận diện xe máy đang chạy làm mốc đo, quét tìm vạch cắt của mặt nước trên lốp xe và tính ra ngay mực nước ngập là **21.9 cm** — vượt qua nửa bánh xe máy.
>
> Ngay lập tức, thanh thước đo bên dưới đổi sang màu đỏ cảnh báo, và trên bản đồ số GIS bên phải, đoạn đường này cũng tự động chuyển sang màu đỏ để người dân biết tránh đi vào."

#### 🚨 Luồng 2: Phát hiện ngã xe kèm bộ đếm 5 giây chống báo nhầm (Trạm 05 - Dốc Cầu Kênh Tẻ)
> *(Click chuột chuyển sang Tab Trạm 05)*  
> "Tiếp theo, em bấm sang **Trạm 05 - Dốc Cầu Kênh Tẻ**, nơi có độ dốc cao và trơn trượt khi mưa:
>
> Thầy Cô thấy vừa có một người bị trượt ngã xe máy. Điểm đặc biệt là hệ thống **không báo động bừa bãi**. Dòng trạng thái đang đếm thời gian nạn nhân nằm im: 1 giây... 2 giây... Nếu người dân tự đứng dậy được trước 5 giây, hệ thống tự hủy đếm. Nhưng khi nạn nhân nằm bất động chạm mốc **5.0 giây**, hệ thống lập tức chốt sự cố ngã xe nguy hiểm."

#### 📲 Luồng 3: Cảnh báo tức thì về điện thoại chỉ với 82 Bytes (Telegram Alert)
> *(Giơ nhẹ điện thoại lên cho Giám khảo thấy)*  
> "Và ngay khoảnh khắc 5 giây đó, điện thoại của lực lượng trực ban khu phố nhận ngay một tin nhắn Telegram: Có đầy đủ vị trí ngõ hẻm, định vị GPS, thời gian chuẩn Việt Nam và mực nước ngập để dân quân kịp thời đến hỗ trợ bà con.
>
> Toàn bộ quá trình từ lúc xe ngã đến khi tin nhắn reo chuông chỉ mất chưa tới **1.5 giây**."

---

### PHẦN 3: LẬT MỞ HẬU TRƯỜNG CODE & KỸ THUẬT (1:40 – 2:35)
*(Chuyển sang 1 slide kiến trúc hoặc mở terminal/code ngắn gọn)*

> "Dạ, để hệ thống chạy mượt mà như vậy trên máy tính văn phòng cũ mà không cần GPU đắt tiền, tụi em đã giải quyết 3 bài toán cốt lõi trong phần code:
>
> 1. **Về thuật toán hình học:** Tụi em không dùng cảm biến dưới cống vì dễ bị rác nghẹt. Thay vào đó, máy tính lấy phần thân xe máy không bị chìm làm mốc chuẩn để tính ra đường kính bánh xe nguyên bản là 50cm, rồi dùng toán đạo hàm Sobel dò mép nước. Dù camera quay thẳng hay chéo góc, tỷ lệ này vẫn chính xác với sai số chỉ **4.4 cm**.
> 2. **Về tối ưu hiệu năng CPU:** Tụi em tinh chỉnh đa luồng PyTorch trên CPU (torch operator parallelism), kéo tốc độ suy luận từ 280ms xuống chỉ còn **63ms mỗi khung hình**, đạt tốc độ khung hình thời gian thực mà chỉ tốn khoảng **600MB RAM**. Đặc biệt, toàn bộ video chỉ giải mã trên RAM rồi tự hủy, cam kết **Zero-Disk** để bảo vệ quyền riêng tư tuyệt đối cho người dân ngõ hẻm.
> 3. **Về mạng và độ tin cậy:** Gói tin cảnh báo gửi đi chỉ đúng **82 Bytes**, tiết kiệm hơn 99% băng thông so với việc kéo video về trung tâm. Toàn bộ mã nguồn đã được kiểm chứng qua **16 bài kiểm thử tự động (Unit Tests)** bao phủ 100% các ca ngập sâu và tai nạn."

---

### PHẦN 4: LỢI ÍCH DÂN SINH & KẾT BÀI (2:35 – 3:00)
*(Phong thái tự tin, mộc mạc, mở lời cho phần Q&A)*

> "Nhờ tận dụng máy tính và camera sẵn có, UrbanShield Lite có thể triển khai ngay tại hàng trăm con hẻm tại TP.HCM với chi phí thiết bị mới là **0 đồng**.
>
> Nhóm em mong muốn giải pháp nhỏ bé này sẽ giúp bà con lao động đi làm về không còn cảnh dắt xe chết máy giữa đêm mưa, và người gặp nạn trong hẻm vắng luôn được cứu giúp kịp thời.
>
> Em xin cảm ơn Thầy Cô và các bạn đã theo dõi. Em xin mời Ban Giám khảo đặt câu hỏi ạ!"

---

## 🎯 GHI NHỚ CHO BẠN KHI LÊN SÂN KHẤU (FLOW ANH CẢNH):
1. **Tuyệt đối không chiếu slide mở đầu dài dòng:** Bật sẵn tab WebGIS trên trình duyệt trước khi bước lên. Giọng cất lên là tay rê chuột trên sản phẩm thật.
2. **Thứ tự thần thánh:** `Show WebGIS` $\rightarrow$ `Trạm 1 (Ngập)` $\rightarrow$ `Trạm 5 (Ngã xe đếm 5s)` $\rightarrow$ `Giơ điện thoại có Telegram` $\rightarrow$ `Mới nói CPU 63ms / Bánh xe 50cm / 16 Tests`.
3. **Phân bổ thời gian chuẩn:**
   - 0:00 - 1:40 (hơn nửa thời gian): Dành trọn cho **Sản phẩm & Demo**.
   - 1:40 - 2:35: Dành cho **Code & Kỹ thuật**.
   - 2:35 - 3:00: Chốt ý nghĩa & Cảm ơn.
