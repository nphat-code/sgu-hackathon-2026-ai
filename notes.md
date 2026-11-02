# 📝 GHI CHÚ NHANH DỰ ÁN & CHỈ ĐẠO BAN GIÁM KHẢO

## 1. Bài toán thực tế (Problem-First)
- Đô thị mùa mưa, triều cường dâng cao ở các ngõ hẻm và đường nhỏ.
- Đường ngập -> Xe chết máy, cản trở lưu thông, người dân té ngã khó được phát hiện kịp thời để giúp đỡ.
- Rào cản: Camera AI chuyên dụng quá đắt đỏ; kéo video liên tục về máy chủ gây nghẽn mạng và lộ lọt đời tư.

## 2. Chỉ đạo & Kỳ vọng Ban Giám khảo (Vòng Coding - Mentor Anh Cảnh)
*Chi tiết xem tại: [`docs/CHI_DAO_SUPPORT_BGK_VONG_CODING.md`](docs/CHI_DAO_SUPPORT_BGK_VONG_CODING.md)*

1. **Planning & Quản lý:** Sử dụng GitHub Spec Kit (`https://github.com/github/spec-kit`), chia task sprint và milestone rõ ràng.
2. **Kiến trúc & Kỹ thuật:** Hiểu rõ vì sao chọn giải pháp (Edge-first trên CPU phổ thông, mẩu tin JSON siêu nhẹ <150 bytes, Docker, Logging).
3. **Kịch bản Demo trực tiếp:** Ưu tiên 100% Live Demo trên sản phẩm đang hoạt động, không chỉ chiếu slide/video.
4. **Điểm mới & Lợi thế cạnh tranh:** Đo ngập bằng hình học bánh xe 50cm (0đ cảm biến), bảo vệ quyền riêng tư người dân (chỉ xử lý trên RAM).
5. **Tính ứng dụng & Phát triển:** Khả năng thương mại hóa cấp phường/xã, làm đồ án tốt nghiệp, làm đẹp CV/Portfolio.
6. **LƯU Ý ĐẶC BIỆT:**
   - **Bắt buộc làm Test Report** (Playwright/pytest) có bằng chứng log/screenshot chứng minh sản phẩm chạy được.
   - Kết nối MCP với LLM để hỗ trợ code UI nhanh.

## 3. Tiêu chí đánh giá Vòng Thử thách (24h) & Chung kết (100 điểm)
*Chi tiết xem tại: [`docs/TIEU_CHI_VONG_24H_VA_CHUNG_KET.md`](docs/TIEU_CHI_VONG_24H_VA_CHUNG_KET.md)*
- I. Tính sáng tạo & đổi mới (10đ)
- II. Tính thực tiễn & khả năng áp dụng (10đ)
- III. Dữ liệu & mô hình (20đ - Dữ liệu 5đ, Mô hình 5đ, An toàn AI 5đ, Test Report 5đ)
- IV. Cấu trúc, chất lượng triển khai & độ hoàn thiện (20đ - Code 3đ, FE 3đ, BE 5đ, CI/CD 3đ, Bảo mật 3đ, Hoàn thiện 3đ)
- V. Đóng góp & tính cộng đồng (10đ)
- VI. Sử dụng AI tiết kiệm chi phí & hiệu quả (10đ)
- VII. Ứng dụng công nghệ AWS hoặc Google Cloud (10đ)
- VIII. Làm việc nhóm, thuyết trình & phản biện (10đ)

## 4. Kế hoạch triển khai Vòng Coding 24H (5 Sprint)
*Chi tiết xem tại: [`docs/KE_HOACH_VONG_CODING.md`](docs/KE_HOACH_VONG_CODING.md)*
- **Sprint 0 (Giờ 0-2):** Chuẩn hóa GitHub Spec Kit (`.spec/`) & Phân rã cấu trúc.
- **Sprint 1 (Giờ 2-7):** Nâng cấp Core AI Engine, đo ngập bánh xe 50cm, ngã xe 5s & CLAHE.
- **Sprint 2 (Giờ 7-12):** Minimal API (<150B), Text Report Engine & Telegram Dispatcher.
- **Sprint 3 (Giờ 12-16):** WebGIS Dashboard (Leaflet) & Bộ điều phối 3 kịch bản Live Demo.
- **Sprint 4 (Giờ 16-20):** Unit/Integration Tests & Xuất `TEST_REPORT.md` (Bắt buộc).
- **Sprint 5 (Giờ 20-24):** Docker Compose (1 lệnh), CI/CD GitHub Actions & Cloud Deployment.

