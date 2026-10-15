# 🤖 AGENT RULES & PROJECT INSTRUCTIONS

## 📌 Quy tắc làm việc cốt lõi (Core Workflow Rules)

### 🔄 1. Tự động Commit & Push Git khi xong phần việc (Mandatory)
Mỗi khi hoàn thành xong bất kỳ phần việc nào (tạo file mới, chỉnh sửa logic, cập nhật tài liệu, hoàn thiện slide, hoặc fix lỗi theo yêu cầu của user):
- **Tự động thực hiện các bước:**
  1. `git status`
  2. `git add .` (hoặc add các file liên quan)
  3. `git commit -m "..."` với commit message rõ ràng, đúng chuẩn (ví dụ: `docs: ...`, `feat: ...`, `fix: ...`)
  4. `git push` lên repository
  5. Báo cáo ngắn gọn cho người dùng commit đã được push thành công.

### 🎯 2. Phong cách kỹ thuật & Thuyết trình Hackathon (Quy tắc vàng)
- Tuân thủ nguyên tắc **Problem-First**: Luôn nêu thực trạng / nỗi đau dân sinh và rào cản hạ tầng trước khi giới thiệu giải pháp kỹ thuật.
- Tuyệt đối **Anti-hype (Chống phóng đại) & Anti-drama (Chống kịch tính hóa)**: 
  - Không dùng từ ngữ khoa trương: Cấm dùng tiền tố *"siêu..."* (*siêu nhẹ, siêu AI, siêu nhanh*). Thay bằng từ mộc mạc: *gọn nhẹ, mẩu tin cảnh báo*.
  - Không dùng văn mẫu giật gân, báo chí: Cấm dùng *"thời gian vàng cứu hộ"*. Thay bằng: *"khó được phát hiện kịp thời để giúp đỡ"*.
- Giữ vững tính trung thực kỹ thuật (YOLOv8-nano trên CPU phổ thông, đo ngập hình học qua bánh xe máy 50cm, bộ đếm bất động 5s chống báo giả, Privacy-by-design RAM).

### 🗣️ 3. Quy chuẩn ngôn từ thuyết trình (Spoken-Word Standards)
- **100% Văn nói đời thường, tự nhiên:** Tuyệt đối không dùng văn viết hoặc dịch từ tiếng Anh (như *"Bằng cách...", "Cơ chế lọc đa tầng...", "Kiểm tra hình thái học..."*).
- **Xưng hô gần gũi, không trịnh trọng quá mức:** Dùng *"Chào Thầy Cô và các bạn, em là Phát đến từ đội SingleNode"*. Không dùng *"Kính chào Quý Thầy Cô... cùng toàn thể hội trường"*, không lặp lại *"Thưa Thầy Cô"* ở mỗi slide.
- **Cấm tiệt từ ngữ hành chính / quan liêu:**
  - Không nói *"tuyến đường nhánh trũng thấp"* $\rightarrow$ Nói: *"những con đường nhỏ và ngõ hẻm hay bị ngập sâu"*.
  - Không nói *"đưa công nghệ xuống từng con đường"* $\rightarrow$ Nói: *"gắn camera AI / lắp camera AI khắp các con đường nhỏ và ngõ hẻm"*.
- **Gọt bỏ từ ghép ngô nghê, lượng từ rườm rà, sến súa:**
  - Không dùng lượng từ thừa: Bỏ *"chiếc máy tính"* $\rightarrow$ Nói *"máy tính"*; bỏ *"cây thước đo"* $\rightarrow$ Nói *"thước đo"*; bỏ *"mắt camera"* $\rightarrow$ Nói *"camera"*.
  - Không nói *"an toàn xăm xắp"*. Dùng từ thuần khẩu ngữ mộc mạc: *"rất nhẹ"*.
  - Không nói văn thơ phim tài liệu: *"Bởi vì ở chính những nơi ấy..."* $\rightarrow$ Nói văn nói: *"Thực tế là mỗi khi mùa mưa đến..."*.

### 🧩 4. Quy chuẩn Logic & Dẫn dắt bài nói (Logic & Transitions)
- **Chủ ngữ phải rõ ràng, không lơ lửng:** Khi nói *"tự phân tích tại chỗ"*, phải chỉ rõ chủ ngữ là ai/cái gì (ví dụ: *"máy tính ở khu phố tự phân tích..."*).
- **So sánh phải đối xứng, chặt chẽ:** Khi nêu rào cản, phải rõ 2 vế đối lập: *"mua camera chuyên dụng thì quá đắt đỏ, còn dùng camera thường kéo video liên tục về máy chủ thì lại làm nghẽn toàn bộ đường truyền mạng"*.
- **Luôn có từ nối dẫn dắt theo sơ đồ thị giác:** Khi chuyển khối trên slide, luôn dùng từ mồi và thứ tự thời gian: *"Quy trình rất đơn giản: Đầu tiên... truyền về máy tính... Tại đây, máy tính tự phân tích... và chỉ khi có sự cố thì mới gửi tin nhắn..."*.
- **Tránh tranh cãi con số giá tiền:** Thay vì nêu con số cụ thể dễ bị Giám khảo bắt bẻ (*15-25 triệu*), hãy đánh thẳng vào bản chất: *"camera chuyên dụng thì quá đắt đỏ"*.
