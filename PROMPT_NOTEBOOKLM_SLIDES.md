# 📌 Bộ Prompt Tạo Slide Trình Chiếu Chuẩn Trên NotebookLM / Gemini Notebook

> **Mục tiêu:** Tạo bộ 8 slide trình chiếu trực quan (Presenter Slides) cho bài thuyết trình 3 phút về đề án **UrbanShield Lite** trước Ban Giám khảo.  
> **Hình thức:** Tạo **1 LƯỢT DUY NHẤT** bằng tính năng **Customize Slide Deck** để xuất ra 1 file slide hoàn chỉnh dùng thuyết trình trực tiếp.

---

## ⚙️ 1. CẤU HÌNH TRÊN GIAO DIỆN "CUSTOMIZE SLIDE DECK"

Trước khi bấm tạo, thiết lập các tùy chọn trên popup như sau:

| Mục thiết lập | Giá trị chọn | Lý do |
| :--- | :--- | :--- |
| **Format** | **`Presenter Slides`** *(Bắt buộc)* | Slide thoáng, trực quan, nhiều sơ đồ/icon, cô đọng chữ để vừa chiếu vừa nói (KHÔNG chọn `Detailed Deck` vì sẽ bị quá nhiều chữ). |
| **Choose language** | **`Tiếng Việt`** | Giữ ngôn ngữ tiếng Việt đồng bộ với đề án. |
| **Length** | **`Default`** | Vừa vặn tạo 7 - 8 slide cho bài thuyết trình 3 phút. |
| **Sources** | **`2 sources`** | Đã chọn sẵn `DE_AN_Y_TUONG_URBANSHIELD_LITE.md` và `KICH_BAN_PITCHING_URBANSHIELD_LITE.md`. |

---

## 📝 2. NỘI DUNG PROMPT CHÍNH (COPY DÁN VÀO Ô "Describe the slide deck you want to create")

*Sao chép toàn bộ nội dung trong khung bên dưới, dán vào ô mô tả và bấm **Generate now** (chỉ làm 1 lượt duy nhất):*

```text
Tạo bộ slide trình chiếu (Presenter Slides) đúng 8 slide cho bài thuyết trình 3 phút về đề án UrbanShield Lite trước Ban Giám khảo kỹ thuật.
Yêu cầu thiết kế: Nền trắng tinh tế (#FFFFFF), phong cách tối giản hiện đại, chữ to rõ ràng, sử dụng bố cục thẻ bento box, sơ đồ khối và icon trực quan. Tuyệt đối không dùng từ ngữ phóng đại, không sáo rỗng.

Mạch logic chuẩn (Đặt vấn đề & Rào cản TRƯỚC ➔ Giải pháp SAU):

- Slide 1: Bìa & Định vị đề án
  + Tiêu đề: UrbanShield Lite - Hệ thống hỗ trợ theo dõi ngập nước & an toàn giao thông dân sinh
  + Nhóm phát triển: SingleNode
  + Định vị: Giải pháp AI biên nhỏ gọn tối ưu chi phí cho các tuyến đường nhánh và khu dân cư thiếu vắng hạ tầng tập trung.
  + Trực quan: Slide thoáng đãng, hình ảnh bối cảnh khu dân cư đô thị (CHƯA đưa sơ đồ kỹ thuật vào slide này).

- Slide 2: Thực trạng dân sinh & Rào cản hạ tầng
  + 2 Vấn đề dân sinh:
    1. Ngập lụt cục bộ đường nhánh: Triều cường/mưa lớn gây chết máy xe hàng loạt, cản trở lưu thông.
    2. Sự cố ngã xe ban đêm trong ngõ vắng: Khó phát hiện kịp thời, lỡ "thời gian vàng" cứu hộ.
  + 2 Rào cản công nghệ truyền thống:
    1. Phần cứng đắt đỏ: Camera AI chuyên dụng có chi phí đầu tư ban đầu quá cao (15 - 25 triệu/mắt), khó nhân rộng.
    2. Nút thắt cổ chai băng thông: Truyền video liên tục 24/7 từ hàng ngàn điểm làm quá tải băng thông máy chủ.
  + Trực quan: Sơ đồ nút thắt cổ chai (Bottleneck) với icon cảnh báo màu đỏ/cam thể hiện điểm nghẽn đường truyền.

- Slide 3: Ý tưởng cốt lõi - Kiến trúc Edge AI phân tán
  + Vai trò: Lời giải tháo gỡ nút thắt băng thông và chi phí ở Slide 2.
  + Cốt lõi: Xử lý hình ảnh cục bộ ngay tại máy trạm CPU cơ sở; dùng camera có sẵn; chỉ gửi gói tin cảnh báo siêu nhẹ khi có sự cố. Tối ưu hóa mô hình YOLOv8-nano (~6.5MB, 25-30 FPS trên CPU phổ thông).
  + Trực quan: ĐẶT SƠ ĐỒ LUỒNG XỬ LÝ TẠI ĐÂY: [Camera phổ thông] ➔ [CPU Máy trạm (Edge AI / YOLOv8n)] ➔ [Cảnh báo Telegram & Bản đồ].

- Slide 4: Phương pháp 1 - Ước lượng ngập nước qua hình học
  + Cốt lõi: Lấy đường kính bánh xe máy ~50cm lưu thông thực tế làm vật tham chiếu tương đối; đo tỷ lệ che khuất kết hợp phân tích màu phản xạ bề mặt HSV.
  + Phân loại 3 mức độ cảnh báo: Dưới 10cm (xăm xắp an toàn), 10 - 20cm (cảnh báo chạm ống xả), trên 20cm (ngập sâu nguy hiểm). Không cần cảm biến dưới cống.
  + Trực quan: Bánh xe máy với 3 vạch mức nước nét đứt Xanh - Vàng - Đỏ.

- Slide 5: Phương pháp 2 - Nhận diện sự cố ngã xe đa tầng
  + Nhận diện hình thái: Khung bao cơ thể người nằm ngang (W/H > 1.15) trong cự ly gần phương tiện.
  + Bộ lọc chống báo giả: Bộ đếm thời gian bất động liên tục > 5 giây (loại bỏ trường hợp ngồi nghỉ, nhặt đồ).
  + Xử lý ban đêm: Tích hợp thuật toán cân bằng sáng thích ứng CLAHE tăng tương phản khi thiếu sáng.
  + Trực quan: Quy trình lọc 4 bước: [Khung bao ngang W/H > 1.15] ➔ [Cự ly gần xe] ➔ [Bộ đếm bất động 5s] ➔ [Xác nhận sự cố].

- Slide 6: Kiến trúc dữ liệu & Bảo vệ quyền riêng tư
  + Nguyên tắc Privacy-by-design: Video sinh hoạt nạp vào RAM tạm thời để suy luận và hủy vĩnh viễn ngay lập tức (Zero-Disk storage); không lưu ổ cứng; không nhận diện khuôn mặt người dân.
  + Cơ chế cảnh báo: Chỉ gửi đúng 1 ảnh chụp hiện trường kèm tọa độ GPS qua Bot Telegram và bản đồ điều hành khi xảy ra sự cố.
  + Trực quan: Sơ đồ luồng video nạp vào RAM rồi giải phóng vào thùng rác, chỉ 1 gói tin sự cố nhẹ thoát ra ngoài.

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
* Slide được thiết kế tối giản, đóng vai trò làm nền tảng trực quan cho người nghe.
* Người thuyết trình không đọc chữ trên slide mà nói theo kịch bản lời thoại chi tiết trong file [LOI_THOAI_THUYET_TRINH_8_SLIDE.md](file:///c:/Competition/HackathonSGU2026/LOI_THOAI_THUYET_TRINH_8_SLIDE.md).
