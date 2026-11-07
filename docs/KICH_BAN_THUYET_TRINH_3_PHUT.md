# 🎙️ KỊCH BẢN THUYẾT TRÌNH LIVE DEMO (3 PHÚT)
## DỰ ÁN: URBANSHIELD LITE — HACKATHON SGU 2026
**Người trình bày:** Phát (Đội SingleNode)  
**Thời lượng:** 3 phút (180 giây) chuẩn thi đấu  
**Phong cách:** 100% Văn nói tự nhiên, mộc mạc, Problem-First, Anti-hype, không dùng từ ngữ khoa trương.

---

### PHẦN 1: NỖI ĐAU THỰC TẾ & RÀO CẢN HẠ TẦNG (0:00 – 0:45)
*(Mở đầu tự nhiên, đi thẳng vào thực trạng dân sinh ngõ hẻm)*

> "Chào Thầy Cô và các bạn, em là Phát đến từ đội SingleNode.
>
> Thực tế là mỗi khi mùa mưa hoặc triều cường đến, người dân đi làm về rất khổ sở khi lọt vào những con đường nhỏ và ngõ hẻm hay bị ngập sâu. Xe máy bị ngập qua ống xả là chết máy, phải dắt bộ bì bõm hàng cây số. Nguy hiểm hơn là trên những đoạn đường ngập trơn trượt hoặc dốc cầu, người dân bị trượt ngã xe nằm bất động trong hẻm tối rất khó được phát hiện kịp thời để giúp đỡ.
>
> Trước giờ, các camera lớn của thành phố chỉ quan sát ngoài đường lộ chính, chứ không với tới từng ngõ hẻm nhỏ. Trong khi đó, nếu mua camera chuyên dụng lắp khắp các ngõ hẻm thì quá đắt đỏ, còn dùng camera thường kéo video liên tục về máy chủ thì lại làm nghẽn toàn bộ đường truyền mạng.
>
> Đó là lý do nhóm em xây dựng **UrbanShield Lite** — giải pháp giám sát ngập nước và sự cố ngõ hẻm bằng AI chạy trực tiếp trên máy tính tại chỗ."

---

### PHẦN 2: BẢN CHẤT GIẢI PHÁP & CÔNG NGHỆ (0:45 – 1:30)
*(Giải thích cơ chế vận hành mộc mạc, không dùng từ ngữ khoa trương)*

> "Cách làm của tụi em rất đơn giản: Hệ thống tận dụng ngay các camera an ninh sẵn có trong khu phố, nối vào máy tính văn phòng sẵn có tại trụ sở tổ dân phố.
>
> Quy trình xử lý gói gọn trong 3 điểm cốt lõi:
>
> * **Thứ nhất, đo ngập bằng bánh xe máy 50cm:** Máy tính khu phố dùng phần thân xe máy không bị chìm làm mốc để tính ra kích thước bánh xe nguyên bản, rồi quét tìm vạch cắt của mặt nước trên lốp xe. Nhờ vậy, máy tính biết chính xác bánh xe bị chìm bao nhiêu phần trăm để tính ra số cm ngập thực tế mà không cần gắn cảm biến dưới cống.
> * **Thứ hai, phát hiện ngã xe kèm bộ đếm 5 giây chống báo giả:** Khi có người ngã sát cạnh xe máy đổ, máy tính sẽ đếm thời gian bất động. Nếu người dân chỉ cúi nhặt đồ hoặc tự đứng dậy trước 5 giây, hệ thống tự hủy bộ đếm, không bao giờ báo nhầm. Chỉ khi người đó nằm im quá 5 giây, chuông báo động mới reo.
> * **Thứ ba, tiết kiệm tối đa đường truyền và bảo vệ quyền riêng tư:** Toàn bộ hình ảnh camera chỉ giải mã trên bộ nhớ RAM để phân tích rồi tự hủy ngay lập tức, không lưu một tấm ảnh nào xuống đĩa cứng. Bình thường máy tính không gửi gì cả; chỉ khi có sự cố, nó mới gửi một mẩu tin cảnh báo gọn nhẹ **82 Bytes** về máy chủ, tiết kiệm hơn 99% băng thông mạng."

---

### PHẦN 3: TRÌNH DIỄN THỰC TẾ (LIVE DEMO) (1:30 – 2:30)
*(Vừa nói vừa thao tác chuột trên link Google Cloud Run)*

> *(Chuyển sang màn hình WebGIS)*  
> "Dạ đây là giao diện giám sát thực tế tụi em đã triển khai trên Google Cloud Run:
>
> * Ở cột bên trái, Thầy Cô đang thấy hình ảnh trực tiếp từ **Trạm 01 - Đường Trần Xuân Soạn**. Khung màu vàng nhận diện xe máy làm mốc đo, vạch màu đỏ bắt đúng mực nước cắt ngang lốp xe là **21.9cm** — vượt mức nửa bánh xe máy. Thanh thước đo bên dưới đổi ngay sang màu đỏ báo ngập nguy hiểm.
> * Giờ em bấm chuyển sang **Trạm 05 - Dốc Cầu Kênh Tẻ**: Thầy Cô thấy một vụ trượt ngã xe máy trong mưa. Dòng chữ trạng thái hiển thị rõ: máy tính đang đếm thời gian nằm bất động: 1 giây, 2 giây... và ngay khi chạm mốc 5.0 giây, hệ thống lập tức chốt sự cố ngã xe nguy hiểm.
> * Ngay thời điểm này, em mở ứng dụng Telegram trên điện thoại: Một tin nhắn cảnh báo mộc mạc đã được gửi về kênh trực ban của khu phố với đầy đủ vị trí, định vị GPS, mực nước ngập và thời gian chuẩn Việt Nam để dân quân kịp thời đến hướng dẫn bà con đi đường vòng."

---

### PHẦN 4: LỢI ÍCH DÂN SINH & LỜI KẾT (2:30 – 3:00)
*(Kết thúc tự tin, khiêm tốn, mở đường cho phần Q&A)*

> "Nhờ chạy trên CPU phổ thông và chỉ gửi mẩu tin cảnh báo vài chục byte, UrbanShield Lite có thể triển khai ngay tại hàng trăm con hẻm với chi phí gần như 0 đồng tiền đầu tư thiết bị mới.
>
> Mục tiêu lớn nhất của nhóm em là giúp bà con lao động đi làm về tránh được những điểm ngập chết máy, và người không may bị tai nạn trong ngõ hẻm vắng luôn được phát hiện kịp thời để giúp đỡ.
>
> Em xin cảm ơn Thầy Cô và các bạn đã lắng nghe. Em rất mong nhận được những góp ý từ Ban Giám khảo ạ!"

---

### 💡 3 MẸO BỎ TÚI KHI BƯỚC LÊN SÂN KHẤU:
1. **Tốc độ nói vừa phải, ngắt nghỉ rõ ràng:** Không nói vội, mỗi khi chuyển tab trên màn hình thì dừng lại 1 giây cho Giám khảo kịp nhìn hình ảnh.
2. **Tay cầm điện thoại sẵn mở Telegram:** Lúc demo xong Trạm 05, giơ nhẹ điện thoại lên cho Giám khảo thấy tin nhắn báo về vừa kịp lúc.
3. **Giữ phong thái khiêm tốn, mộc mạc:** Luôn gọi *"Thầy Cô"*, dùng từ *"máy tính khu phố"*, *"mẩu tin cảnh báo"*, tránh dùng các từ đao to búa lớn.
