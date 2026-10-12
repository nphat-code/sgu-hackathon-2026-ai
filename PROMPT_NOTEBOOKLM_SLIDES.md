# 📌 Bộ Prompt Thiết Kế Slide Thuyết Trình Cho NotebookLM (Dự Án UrbanShield Lite)

> **Mục tiêu:** Tạo dàn ý nội dung chi tiết cho bộ 8 slide thuyết trình ý tưởng giải pháp (thời lượng 3 phút) trước Hội đồng Giám khảo kỹ thuật.  
> **Nguyên tắc cốt lõi:** Tuyệt đối không dùng từ ngữ phóng đại, không sáo rỗng, trung thực về mặt kỹ thuật, không nhắc đến địa danh cụ thể.

---

## 🚀 Hướng Dẫn Sử Dụng Nhanh

1. Mở **[NotebookLM](https://notebooklm.google.com/)** và tạo một Notebook mới.
2. Tải tệp nguồn của dự án vào Notebook (chọn tệp `DE_AN_Y_TUONG_URBANSHIELD_LITE.md` hoặc `KICH_BAN_PITCHING_URBANSHIELD_LITE.md`).
3. Sao chép toàn bộ nội dung trong khung **Prompt Chính** bên dưới và dán vào ô chat của NotebookLM.

---

## 📝 1. PROMPT CHÍNH (Sao chép toàn bộ phần bên dưới)

```markdown
Dựa hoàn toàn vào các tài liệu nguồn đã cung cấp về dự án UrbanShield Lite, hãy soạn thảo một BỘ NỘI DUNG SLIDE THUYẾT TRÌNH (Slide Deck Content Outline) gồm đúng 8 slide cho bài thuyết trình 3 phút trước Hội đồng Giám khảo chuyên môn.

QUY TẮC BẮT BUỘC VỀ NGÔN NGỮ (ANTI-HYPE & KHÔNG PHÓNG ĐẠI):
1. TUYỆT ĐỐI KHÔNG SỬ DÙNG các từ ngữ phóng đại, khoa trương hoặc mang tính quảng cáo tiếp thị, bao gồm:
   - Cấm dùng: "đột phá", "cách mạng", "đỉnh cao", "hoàn hảo", "tuyệt đối 100%", "thần kỳ", "thay đổi cuộc chơi", "duy nhất", "siêu việt", "nghìn tỷ", "tiên tiến bậc nhất".
2. BẮT BUỘC DÙNG từ ngữ kỹ thuật khách quan, khiêm tốn, trung thực và chính xác:
   - Dùng: "hỗ trợ phát hiện", "ước lượng độ sâu", "mô hình nhỏ gọn", "phần cứng phổ thông", "thử nghiệm bước đầu (PoC)", "tính khả thi kinh tế", "giảm thiểu chi phí", "thử nghiệm diện hẹp".
3. KHÔNG ĐỀ CẬP ĐỊA DANH / TÊN TRƯỜNG CỤ THỂ:
   - Tuyệt đối không nhắc đến tên trường đại học, tên quận huyện hay tên tuyến đường cụ thể.
   - Thay vào đó, sử dụng các thuật ngữ chung: "khu vực đô thị thí điểm", "tuyến đường nhánh trũng thấp", "khu dân cư ngõ xóm", "khu vực thực nghiệm cơ sở".
4. TRUNG THỰC VỀ MẶT KỸ THUẬT:
   - Thừa nhận rõ các điều kiện hoạt động thực tế: Đo ngập dựa trên phương tiện xe máy lưu thông thực tế; nhận diện ngã xe cần bộ đếm bất động liên tục > 5 giây để giảm thiểu báo động giả; xử lý thiếu sáng bằng bộ lọc cân bằng sáng thích ứng (CLAHE).
   - Nêu đúng bản chất kiến trúc: Mô hình chạy trên CPU máy trạm biên tại khu vực giám sát (Edge Computing), không phải nhúng bên trong chip của camera.

CẤU TRÚC ĐẦU RA CHO MỖI SLIDE (TỪ SLIDE 1 ĐẾN SLIDE 8):
Với mỗi slide, hãy trình bày rõ các mục sau:
- [TIÊU ĐỀ SLIDE]: Ngắn gọn, trung tính, đúng trọng tâm.
- [THÔNG ĐIỆP CHÍNH (HEADLINE)]: 1 câu tóm tắt cốt lõi, rõ nghĩa, không hoa mỹ.
- [NỘI DUNG TRÌNH CHIẾU]: 3 - 4 gạch đầu dòng súc tích, nêu rõ thông số kỹ thuật hoặc số liệu so sánh kinh tế.
- [GỢI Ý THIẾT KẾ & TRỰC QUAN]: Gợi ý bố cục, sơ đồ khối, bảng so sánh hoặc biểu đồ nên hiển thị.
- [LỜI THOẠI THUYẾT TRÌNH (SPEAKER NOTES)]: 2 - 3 câu nói tự nhiên, khiêm tốn, truyền tải trọn vẹn trong 20 - 25 giây.

DANH MỤC 8 SLIDE CẦN SOẠN:
- Slide 1: Giới thiệu đề án (Tên giải pháp UrbanShield Lite, nhóm phát triển SingleNode, định hướng kỹ thuật theo dõi ngập nước và an toàn giao thông đô thị bằng Edge AI).
- Slide 2: Vấn đề thực tế & Rào cản mở rộng (Thực trạng ngập nước cục bộ gây chết máy và tai nạn ban đêm tại các tuyến đường nhánh/ngõ hẻm; rào cản chi phí camera AI đắt tiền và áp lực băng thông máy chủ).
- Slide 3: Định hướng giải pháp Edge AI phân tán (Tận dụng camera sẵn có kết hợp máy tính phổ thông; xử lý dữ liệu cục bộ tại chỗ, không truyền luồng video liên tục về máy chủ).
- Slide 4: Phương pháp kỹ thuật 1 - Ước lượng mức độ ngập nước (Dựa vào đường kính tiêu chuẩn bánh xe máy ~50cm để đo tỷ lệ che khuất; phân loại 3 mức độ cảnh báo; kết hợp phân tích phản xạ bề mặt HSV).
- Slide 5: Phương pháp kỹ thuật 2 - Hỗ trợ phát hiện người ngã xe (Phân tích tỷ lệ khung hình ngang W/H > 1.15; kiểm tra cự ly gần phương tiện; bộ đếm bất động liên tục > 5 giây nhằm triệt tiêu báo động giả).
- Slide 6: Kiến trúc hệ thống & Bảo vệ quyền riêng tư (Luồng dữ liệu: Camera -> CPU YOLOv8n -> Telegram Bot -> Bản đồ số Leaflet; cam kết không lưu trữ video liên tục trong ổ cứng, chỉ gửi gói tin sự cố kèm ảnh hiện trường).
- Slide 7: Tính khả thi kinh tế & Mô hình triển khai cụm (So sánh chi phí TCO thực tế giữa mô hình tập trung truyền thống và mô hình biên phân tán; kiến trúc trạm cụm gom 20 - 30 camera về một máy trạm cơ sở).
- Slide 8: Lộ trình thử nghiệm & Tổng kết đề xuất (Kế hoạch thử nghiệm kiểm chứng tại khu vực đô thị diện hẹp; cam kết về tính khả thi kỹ thuật và phục vụ cộng đồng).
```

---

## 🔍 2. PROMPT PHỤ (Dùng để rà soát & chuẩn hóa lại nếu cần)

Sau khi NotebookLM sinh nội dung, nếu muốn tinh chỉnh câu chữ cho gọn gàng hơn, hãy dán prompt sau:

```markdown
Hãy rà soát lại toàn bộ 8 slide trên theo tiêu chuẩn kiểm duyệt nội dung kỹ thuật:
1. Loại bỏ triệt để bất kỳ từ ngữ nào còn mang sắc thái quảng cáo, khẳng định tuyệt đối hoặc sáo rỗng.
2. Kiểm tra lại đảm bảo KHÔNG CÓ tên trường học hoặc địa danh cụ thể nào xuất hiện.
3. Đảm bảo các thông số kỹ thuật cốt lõi (YOLOv8-nano ~6.5MB, 25-30 FPS trên CPU, bánh xe máy 50cm, bộ đếm bất động 5 giây, độ sâu ngập 10cm - 20cm) được trình bày chính xác.
4. Rút gọn lời thoại (Speaker Notes) sao cho người thuyết trình nói với nhịp độ điềm tĩnh, vừa vặn trong tổng thời gian 3 phút.
```
