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

### 🎯 2. Phong cách kỹ thuật & Thuyết trình Hackathon
- Tuân thủ nguyên tắc **Problem-First**: Luôn nêu thực trạng / nỗi đau dân sinh và rào cản hạ tầng trước khi giới thiệu giải pháp kỹ thuật.
- Tuyệt đối **Anti-hype**: Không dùng từ ngữ khoa trương, phóng đại.
- Giữ vững tính trung thực kỹ thuật (YOLOv8-nano trên CPU phổ thông, đo ngập hình học qua bánh xe máy 50cm, bộ đếm bất động 5s chống báo giả, Privacy-by-design RAM).
