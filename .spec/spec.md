# 📋 ĐẶC TẢ YÊU CẦU SẢN PHẨM (SPEC.MD)
## DỰ ÁN: URBANSHIELD LITE – HỆ THỐNG GIÁM SÁT NGẬP NƯỚC & SỰ CỐ NGÕ HẺM BẰNG EDGE AI
### REPOSITORY: sgu-hackathon-2026-ai | ĐỘI THI: SINGLENODE
### QUY CHUẨN: GITHUB SPEC KIT (SPEC-DRIVEN DEVELOPMENT)

---

## 🎯 1. TỔNG QUAN & CÂU CHUYỆN NGƯỜI DÙNG (USER STORIES)

### Câu chuyện 1: Cán bộ Trực ban / Dân quân khu phố theo dõi ngập nước
- **Với tư cách là:** Cán bộ Trực ban UBND Phường hoặc Đội trưởng Dân quân Tự vệ,
- **Tôi muốn:** Biết ngay mực nước ngập thực tế tại các tuyến hẻm trũng thấp theo 3 mức rõ ràng (<10cm An toàn, 10-20cm Chú ý, >20cm Nguy hiểm),
- **Để tôi có thể:** Kịp thời cử lực lượng phân luồng giao thông, giăng dây cảnh báo trước khi hàng loạt xe máy đi vào bị chết máy.

### Câu chuyện 2: Phát hiện và hỗ trợ người ngã xe trong hẻm vắng
- **Với tư cách là:** Lực lượng tuần tra khu phố / Tổ bảo vệ an ninh trật tự cơ sở,
- **Tôi muốn:** Nhận được một tin nhắn cảnh báo ngắn gọn trên điện thoại khi có người đi xe máy bị trượt ngã và nằm bất động trên 5 giây,
- **Để tôi có thể:** Nhanh chóng chạy đến hỗ trợ người bị nạn kịp thời, nhất là trong đêm tối mưa gió khi đường vắng người qua lại.

### Câu chuyện 3: Người dân an tâm về sự riêng tư của gia đình
- **Với tư cách là:** Người dân sinh sống trong con hẻm có gắn camera an ninh,
- **Tôi muốn:** Chắc chắn rằng hình ảnh sinh hoạt trước cửa nhà không bị thu thập, không bị ghi lại thành video và không bị nhận diện khuôn mặt,
- **Để tôi có thể:** Hoàn toàn an tâm về quyền tự do và đời sống riêng tư của gia đình mình.

---

## 🔍 2. TIÊU CHUẨN NGHIỆM THU CHỨC NĂNG (ACCEPTANCE CRITERIA)

### AC-01: Thuật toán đo ngập hình học qua bánh xe máy 50cm
- Khi có xe máy chạy qua đoạn đường ngập:
  - Hệ thống tự động nhận diện khung bao của xe máy.
  - Phân tích phần bánh xe tiếp giáp với mặt nước dựa trên đường kính chuẩn ~50cm của bánh xe máy phổ thông tại Việt Nam:
    $$\text{Độ ngập (cm)} = 50\text{ cm} \times \left(1 - \frac{\text{Chiều cao phần bánh xe nhìn thấy}}{\text{Chiều cao toàn bộ bánh xe}}\right)$$
  - Giá trị đo đạc được giới hạn thực tế trong khoảng từ $0\text{ cm}$ đến $60\text{ cm}$.
  - Trạng thái con hẻm được phân loại tự động thành 3 cấp độ:
    - `Mức 1 (An toàn):` Mực nước $< 10\text{ cm}$ (đường ướt nhẹ, xe máy đi bình thường).
    - `Mức 2 (Chú ý):` Mực nước $10 - 20\text{ cm}$ (nước ngập mép ống xả, xe số bắt đầu gặp khó khăn).
    - `Mức 3 (Nguy hiểm):` Mực nước $> 20\text{ cm}$ (ngập quá nửa bánh xe, tràn buồng máy, nguy cơ chết máy cao).

### AC-02: Bộ phát hiện ngã xe đa tầng triệt tiêu báo động giả
- Khi xuất hiện khung bao người và phương tiện:
  - Kiểm tra tỷ lệ nằm ngang: Chiều rộng / Chiều cao ($W/H > 1.15$).
  - Kiểm tra cự ly không gian: Khoảng cách giữa tâm người và tâm xe $< 180\text{ pixels}$.
  - **Cơ chế đếm bất động liên tục:** Nạn nhân phải giữ trạng thái nằm trên đường liên tục $\ge 5.0\text{ giây}$.
  - Nếu người tự đứng dậy hoặc chuyển động trước 5 giây, bộ đếm tự động xóa về 0, không phát sinh bất kỳ cảnh báo giả nào.

### AC-03: Mẩu tin cảnh báo gọn nhẹ (< 150 Bytes)
- Toàn bộ dữ liệu gửi từ máy tính khu phố lên máy chủ hoặc Telegram Bot phải có kích thước dưới 150 bytes:
  ```json
  {"node_id":"hem_254_q4","type":"FLOOD","val":22.5,"unit":"cm","time":1729145700}
  ```

### AC-04: Bộ sinh báo cáo văn bản mộc mạc (Text Report)
- Tự động sinh báo cáo văn bản thuần túy không dùng từ giật gân, dễ đọc trên mọi dòng điện thoại:
  - **Mẫu cảnh báo tức thời:** Ghi rõ hẻm nào, thời gian, loại sự cố, độ ngập/thời gian nằm và hành động khuyến nghị.
  - **Mẫu tổng kết ca trực:** Thống kê số đợt ngập, đỉnh triều, số vụ trượt ngã và độ ổn định của các camera.

---

## ⚡ 3. CÁC TÌNH HUỐNG BIÊN (EDGE CASES) & GIẢI PHÁP XỬ LÝ

1. **Mưa đêm và đèn đường hắt bóng trên mặt nước:**
   - *Rủi ro:* Mặt nước phản chiếu ánh đèn vàng ban đêm gây nhiễu nhận diện đường viền bánh xe.
   - *Giải pháp:* Tích hợp thuật toán cân bằng sáng thích ứng CLAHE trên kênh độ sáng (Luminance) trước khi trích xuất đặc trưng.
2. **Người dân dừng xe dắt bộ hoặc cúi nhặt đồ:**
   - *Rủi ro:* Khung bao người tạm thời có tỷ lệ nằm ngang $W/H > 1.15$.
   - *Giải pháp:* Bộ đếm bất động 5 giây sẽ tự động đặt lại nếu có bất kỳ chuyển dịch tọa độ hoặc người đó đứng thẳng dậy trước 5 giây.
3. **Mạng internet ngõ hẻm bị chập chờn khi mưa gió:**
   - *Rủi ro:* Máy tính khu phố tạm thời mất kết nối với máy chủ trung tâm.
   - *Giải pháp:* Máy tính khu phố tự xử lý hoàn toàn độc lập (Edge-first), sự cố được xếp vào hàng đợi cục bộ và tự động đồng bộ ngay khi mạng phục hồi.
