# 📌 Bộ Prompt Tạo Infographic Dự Án UrbanShield Lite (NotebookLM)

> **Mục tiêu:** Tạo 1 poster đồ họa thông tin (Infographic) toàn diện tóm tắt toàn bộ giải pháp **UrbanShield Lite** của nhóm **SingleNode**.  
> **Ứng dụng:** Dùng làm poster thuyết trình tại bàn, hình ảnh đính kèm đề án hoặc bài đăng mạng xã hội kéo tương tác truyền thông.

---

## ⚙️ 1. CẤU HÌNH TRÊN POPUP "CUSTOMIZE INFOGRAPHIC"

Thiết lập các nút chọn trên popup NotebookLM như sau:

| Mục thiết lập | Giá trị chọn | Lý do |
| :--- | :--- | :--- |
| **Choose language** | **`Tiếng Việt`** *(Bắt buộc)* | Mặc định đang là `English`, phải đổi sang `Tiếng Việt`. |
| **Choose orientation** | **`Portrait` (Khổ dọc)** | Khổ poster dọc từ trên xuống dưới theo dòng chảy câu chuyện (Storytelling), dễ đọc và đẹp nhất cho Infographic. *(Hoặc chọn `Landscape` nếu muốn khổ ngang)* |
| **Choose visual style** | **`Auto-select`** *(hoặc `Minimalist` / `Technical` nếu có)* | Giữ phong cách công nghệ tinh tế, sạch sẽ, không chọn phong cách trẻ con như Kawaii hay Anime. |
| **Level of detail** | **`Standard`** | Đầy đủ thông tin cốt lõi mà không bị dày đặc chữ. |
| **Sources** | **`2 sources`** | Đã chọn sẵn 2 tệp đề án của dự án. |

---

## 📝 2. NỘI DUNG PROMPT CHÍNH (DÁN VÀO Ô "Describe the infographic you want to create")

*Sao chép toàn bộ nội dung trong khung bên dưới dán vào ô mô tả:*

```text
Tạo một tấm Infographic tổng quan giải pháp công nghệ vì cộng đồng: "UrbanShield Lite - Hệ thống hỗ trợ theo dõi ngập nước & an toàn giao thông dân sinh bằng Edge AI" (Nhóm phát triển: SingleNode).
Phong cách thiết kế: Nền trắng tinh tế (#FFFFFF), màu nhấn công nghệ xanh dương (#2563EB), số liệu to rõ nổi bật, biểu tượng kỹ thuật phẳng tối giản, bố cục chia khối (Bento Grid) mạch lạc từ trên xuống dưới. Tuyệt đối không dùng từ ngữ phóng đại.

Nội dung các phần trên Infographic:

1. BANNER TIÊU ĐỀ:
- Tên dự án: URBANSHIELD LITE
- Định vị: Giải pháp Edge AI nhỏ gọn giám sát ngập nước & an toàn giao thông cho các tuyến đường nhánh và ngõ xóm dân sinh.
- Đơn vị phát triển: SingleNode

2. THỰC TRẠNG & NÚT THẮT HẠ TẦNG:
- Vấn đề 1: Ngập lụt cục bộ đường nhánh gây chết máy hàng loạt mùa mưa.
- Vấn đề 2: Ngã xe ban đêm trong ngõ vắng dễ bỏ lỡ thời gian vàng cứu hộ.
- Rào cản: Camera AI chuyên dụng giá quá cao ($$$) và tắc nghẽn băng thông khi truyền video 24/7 về máy chủ tập trung.

3. GIẢI PHÁP EDGE AI PHÂN TÁN (CỐT LÕI):
- Luồng xử lý: Camera phổ thông có sẵn ➔ Máy trạm CPU cơ sở (YOLOv8-nano ~6.5MB, 25-30 FPS) ➔ Gói tin siêu nhẹ ➔ Bot Telegram & Bản đồ số.
- Không cần GPU rời, xử lý tại chỗ, không stream video liên tục.

4. HAI PHƯƠNG PHÁP KỸ THUẬT NỔI BẬT:
- Phương pháp 1 (Đo ngập hình học): Lấy bánh xe máy 50cm làm thước đo tương đối; phân loại 3 mức: <10cm (An toàn), 10-20cm (Chú ý), >20cm (Nguy hiểm). Không cần cảm biến cống.
- Phương pháp 2 (Nhận diện ngã xe 4 bước): CLAHE tăng sáng ➔ Khung bao ngang W/H > 1.15 gần xe ➔ Bộ đếm bất động liên tục > 5s (triệt tiêu báo giả) ➔ Kích hoạt cảnh báo Telegram.

5. BẢO MẬT & HIỆU QUẢ KINH TẾ (SỐ LIỆU NỔI BẬT):
- Privacy-by-design: Video xử lý trên RAM và hủy vĩnh viễn (Zero-Disk storage), không nhận diện khuôn mặt người dân.
- Tiết kiệm 70% - 80% chi phí đầu tư ban đầu nhờ tận dụng phần cứng phổ thông.
- Tiết kiệm >95% băng thông internet do chỉ truyền gói tin khi có sự cố.
- Mô hình Trạm cụm: 1 máy tính cơ sở quản lý chung 20 - 30 camera phụ cận.
```
