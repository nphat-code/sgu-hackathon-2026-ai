# 📌 Bộ Prompt Tạo Slide Trình Chiếu Chuẩn Trên NotebookLM / Gemini Notebook

> **Mục tiêu:** Tạo bộ 8 slide trình chiếu trực quan (Presenter Slides) cho bài thuyết trình 3 phút về đề án **UrbanShield Lite** trước Ban Giám khảo.  
> **Hình thức:** Tạo **1 LƯỢT DUY NHẤT** bằng tính năng **Customize Slide Deck** để xuất ra 1 file slide hoàn chỉnh dùng thuyết trình trực tiếp.  
> **Phong cách hình ảnh:** Kết hợp **HÌNH ẢNH THỰC TẾ (Real-life Photos)** với sơ đồ kỹ thuật tối giản, chân thực, loại bỏ hình vẽ hoạt họa cách điệu.

---

## ⚙️ 1. CẤU HÌNH TRÊN GIAO DIỆN "CUSTOMIZE SLIDE DECK"

Trước khi bấm tạo, thiết lập các tùy chọn trên popup như sau:

| Mục thiết lập | Giá trị chọn | Lý do |
| :--- | :--- | :--- |
| **Format** | **`Presenter Slides`** *(Bắt buộc)* | Slide thoáng, trực quan, nhiều sơ đồ/icon/ảnh thật, cô đọng chữ để vừa chiếu vừa nói (KHÔNG chọn `Detailed Deck`). |
| **Choose language** | **`Tiếng Việt`** | Giữ ngôn ngữ tiếng Việt đồng bộ với đề án. |
| **Length** | **`Default`** | Vừa vặn tạo 7 - 8 slide cho bài thuyết trình 3 phút. |
| **Sources** | **`2 sources`** | Đã chọn sẵn `DE_AN_Y_TUONG_URBANSHIELD_LITE.md` và `KICH_BAN_PITCHING_URBANSHIELD_LITE.md`. |

---

## 📝 2. NỘI DUNG PROMPT CHÍNH (COPY DÁN VÀO Ô "Describe the slide deck you want to create")

*Sao chép toàn bộ nội dung trong khung bên dưới, dán vào ô mô tả và bấm **Generate now** (chỉ làm 1 lượt duy nhất):*

```text
Tạo bộ slide trình chiếu (Presenter Slides) đúng 8 slide cho bài thuyết trình 3 phút về đề án UrbanShield Lite trước Ban Giám khảo kỹ thuật.
YÊU CẦU THỊ GIÁC: Nền trắng tinh tế (#FFFFFF), chữ to rõ, phong cách chuyên nghiệp.
- Slide 1 & Slide 2: Dùng hình ảnh chụp thực tế ngoài đời sống (Real-life documentary photos) để làm nổi bật bối cảnh ngõ xóm và nỗi đau thực trạng dân sinh.
- Slide 4: BẮT BUỘC dùng Sơ đồ bản vẽ kỹ thuật hình học (Technical Schematic Blueprint) của bánh xe máy 50cm sắc nét với thước đo và 3 dải màu Xanh - Vàng - Đỏ chuẩn mực (TUYỆT ĐỐI KHÔNG vẽ vạch màu nguệch ngoạc đè lên ảnh chụp người và xe).
- Slide 3, 5, 6, 7: Dùng sơ đồ khối kỹ thuật tối giản và bảng biểu số liệu rõ ràng. Tuyệt đối không dùng từ ngữ quảng cáo phóng đại.

Mạch logic chuẩn (Đặt vấn đề & Rào cản TRƯỚC ➔ Giải pháp SAU):

- Slide 1: Bìa & Định vị đề án
  + Tiêu đề: UrbanShield Lite - Hệ thống hỗ trợ theo dõi ngập nước & an toàn giao thông dân sinh
  + Nhóm phát triển: SingleNode
  + Định vị: Giải pháp AI biên nhỏ gọn tối ưu chi phí cho các tuyến đường nhánh và khu dân cư thiếu vắng hạ tầng tập trung.
  + Trực quan: Ảnh chụp thực tế camera giám sát gắn trên cột điện góc phố ngõ xóm dân sinh bình dị (CHƯA đưa sơ đồ kỹ thuật vào).

- Slide 2: Thực trạng dân sinh & Rào cản hạ tầng
  + 2 Vấn đề dân sinh (Dùng ảnh chụp thực tế):
    1. Ảnh thực tế xe máy ngập nước chết máy mùa mưa trên đường nhánh/ngõ hẻm đô thị.
    2. Ảnh thực tế sự cố ngã xe ban đêm trong ngõ vắng thiếu ánh sáng, chậm sơ cứu.
  + 2 Rào cản công nghệ truyền thống: Chi phí camera AI đắt đỏ ($$$) & Nút thắt cổ chai băng thông khi stream video 24/7 về máy chủ.
  + Trực quan: Kết hợp 2 ảnh chụp hiện trường thực tế và sơ đồ nút thắt cổ chai băng thông màu đỏ/cam.

- Slide 3: Ý tưởng cốt lõi - Kiến trúc Edge AI phân tán
  + Vai trò: Lời giải tháo gỡ nút thắt băng thông và chi phí ở Slide 2.
  + Cốt lõi: Xử lý hình ảnh cục bộ ngay tại máy trạm CPU cơ sở; dùng camera có sẵn; chỉ gửi gói tin cảnh báo siêu nhẹ khi có sự cố. Tối ưu hóa YOLOv8-nano (~6.5MB, 25-30 FPS trên CPU phổ thông).
  + Trực quan: Sơ đồ luồng xử lý: [Camera thực tế] ➔ [CPU Máy trạm (Edge AI / YOLOv8n)] ➔ [Cảnh báo Telegram & Bản đồ].

- Slide 4: Phương pháp 1 - Ước lượng ngập nước qua hình học
  + Cốt lõi: Lấy đường kính bánh xe máy ~50cm lưu thông thực tế làm vật tham chiếu tương đối; đo tỷ lệ che khuất kết hợp phân tích màu phản xạ bề mặt HSV.
  + Phân loại 3 mức độ cảnh báo: Dưới 10cm (xăm xắp an toàn), 10 - 20cm (cảnh báo chạm ống xả), trên 20cm (ngập sâu nguy hiểm). Không cần cảm biến dưới cống.
  + Trực quan: Bản vẽ sơ đồ kỹ thuật hình học sắc nét (Technical CAD/Blueprint diagram) của bánh xe máy 50cm với thước đo đường kính và 3 phân vùng mặt nước nét đứt: Xanh lá (<10cm), Vàng (10-20cm), Đỏ (>20cm) sạch sẽ, chính xác về tỷ lệ.

- Slide 5: Phương pháp 2 - Nhận diện sự cố ngã xe đa tầng
  + Phụ đề: Quy trình lọc 4 bước (4-Step Filter Pipeline) - hiển thị trung thực, không viết sai chính tả.
  + Sơ đồ 4 bước nối bằng điều kiện logic AND:
    [Thuật toán CLAHE ban đêm] ➔ [Khung bao ngang W/H > 1.15 gần xe] ➔ [Bộ đếm bất động liên tục > 5s] ➔ [Kích hoạt cảnh báo gửi tọa độ & ảnh].
  + Trực quan: Ảnh trích xuất thực tế từ khung hình camera ban đêm sau khi lọc sáng CLAHE, hiển thị Bounding Box đối tượng người và phương tiện.

- Slide 6: Kiến trúc dữ liệu & Bảo vệ quyền riêng tư
  + Nguyên tắc Privacy-by-design: Video sinh hoạt nạp vào RAM tạm thời để suy luận và hủy vĩnh viễn ngay lập tức (Zero-Disk storage); không lưu ổ cứng; không nhận diện khuôn mặt người dân.
  + Cơ chế cảnh báo: Chỉ gửi đúng 1 ảnh chụp hiện trường kèm tọa độ GPS qua Bot Telegram và bản đồ điều hành khi xảy ra sự cố.
  + Trực quan: Ảnh chụp thực tế giao diện tin nhắn Bot Telegram nhận cảnh báo sự cố kèm ảnh hiện trường tĩnh.

- Slide 7: Tính khả thi kinh tế (TCO) & Mô hình trạm cụm
  + Mô hình trạm cụm (Cluster): 1 máy tính cơ sở đặt tại khu dân cư gom xử lý 20 - 30 camera phụ cận.
  + Tối ưu chi phí: Giảm 70% - 80% chi phí đầu tư ban đầu so với hệ thống tập trung (loại bỏ máy chủ GPU đắt đỏ, tận dụng camera sẵn có).
  + Tiết kiệm hạ tầng: Giảm hơn 95% lưu lượng băng thông internet do không phải stream video liên tục 24/7.
  + Trực quan: Bảng so sánh kinh tế TCO ngắn gọn giữa Hệ thống tập trung vs Trạm cụm UrbanShield Lite.

- Slide 8: Lộ trình thử nghiệm (PoC) & Kết luận
  + Kế hoạch PoC diện hẹp: Thử nghiệm thực địa tại 1 - 2 tuyến ngõ xóm để thu thập dữ liệu và tinh chỉnh ngưỡng lọc.
  + Định hướng mở: Cung cấp giải pháp mã nguồn mở phục vụ cộng đồng và an toàn giao thông đô thị.
  + Thông điệp: Tự tin, điềm đạm, khiêm tốn; lời cảm ơn Ban Giám khảo.
  + Trực quan: Trục thời gian 3 bước lộ trình PoC và thông tin liên hệ nhóm SingleNode.
```

---

## 🎯 3. LƯU Ý KHI THUYẾT TRÌNH BẰNG SLIDE NÀY
* Slide được thiết kế trực quan kết hợp ảnh tư liệu thực tế giúp bài thuyết trình tăng tính thuyết phục dân sinh.
* Người thuyết trình không đọc chữ trên slide mà nói theo kịch bản lời thoại chi tiết trong file [LOI_THOAI_THUYET_TRINH_8_SLIDE.md](file:///c:/Competition/HackathonSGU2026/LOI_THOAI_THUYET_TRINH_8_SLIDE.md).
