# 📋 TIÊU CHÍ ĐÁNH GIÁ VÒNG THỬ THÁCH (24H) VÀ CHUNG KẾT
## CUỘC THI HACKATHON SGU 2026 – 2027
**ĐOÀN THANH NIÊN – HỘI SINH VIÊN TRƯỜNG ĐẠI HỌC SÀI GÒN**  
**BCH KHOA CÔNG NGHỆ THÔNG TIN – BTC CUỘC THI HACKATHON SGU 2026 – 2027**  
*Số: 05-TL/ĐTN-CNTT | TP. Hồ Chí Minh, ngày 07 tháng 10 năm 2026*  
*(Ban hành kèm theo Kế hoạch số: 37-KH/ĐTN)*  
*Nguồn tài liệu gốc: [Google Docs BTC](https://docs.google.com/document/d/14iHXg75Ksl_LZz5hp70IwQWK9eiAVU5f6Obr73dt8Ok/edit?tab=t.0)*

---

## 🎯 BẢNG TIÊU CHÍ CHẤM ĐIỂM CHI TIẾT (THANG ĐIỂM 100)

| STT | Tiêu chí chính | Tiêu chí thành phần | Mô tả chi tiết đánh giá | Điểm |
| :---: | :--- | :--- | :--- | :---: |
| **I** | **Tính sáng tạo & đổi mới** | Sáng tạo & Giải pháp | Ý tưởng mới lạ, giải pháp độc đáo không sao chép và cách triển khai mang lại giá trị khác biệt và phù hợp với xu hướng phát triển ngày nay. | **10** |
| | | | **TỔNG ĐIỂM PHẦN SÁNG TẠO** | **10** |
| **II** | **Tính thực tiễn & khả năng áp dụng** | Thực tiễn & Khả thi | Giải quyết bài toán thực tế cấp thiết, có đối tượng người dùng rõ ràng và tính khả thi cao khi đưa vào vận hành. | **10** |
| | | | **TỔNG ĐIỂM PHẦN KHẢ THI** | **10** |
| **III** | **Dữ liệu & mô hình** | **1. Dữ liệu** | - Nguồn gốc, tính hợp pháp, chất lượng của dữ liệu và số liệu đáng tin cậy.<br>- Rõ ràng và minh bạch trong phương thức thu thập và xử lý dữ liệu. | **5** |
| | | **2. Mô hình** | - Giải thích lý do lựa chọn/xây dựng mô hình phù hợp.<br>- Thiết kế phương pháp thực nghiệm và đánh giá mô hình đúng đắn, logic, khoa học và có thể tái lập kết quả của mô hình.<br>- Chất lượng đầu ra tin cậy, ổn định và hiệu quả trong bài toán thực tế.<br>- Quản lý tốt giới hạn và rủi ro của mô hình. Đánh giá khả năng kiểm soát thông tin sai lệch, thiên lệch dữ liệu, tính minh bạch trong quyết định của AI. | **5** |
| | | **3. Kiểm soát rủi ro, An toàn AI & Xử lý thiên lệch** | - **Kiểm soát ảo giác & Thiên lệch:** Có cơ chế hạn chế hallucination, xử lý thiên lệch (bias) trong dữ liệu và mô hình.<br>- **An toàn & Minh bạch:** Xây dựng rào chắn an toàn (prompt injection guardrails, toxicity filtering, sensitive data mask); tính minh bạch và khả năng giải thích trong các quyết định cốt lõi của AI. | **5** |
| | | **4. Chất lượng đầu ra & Kiểm thử mô hình** | - **Độ tin cậy & Hiệu quả:** Đánh giá chất lượng thực tế thông qua các chỉ số đo lường cụ thể (Accuracy, F1-score, BLEU, ROUGE, Latency, Retrieval Precision...); có báo cáo đánh giá/test report mô hình minh bạch.<br>- **Độ ổn định:** Mô hình phản hồi ổn định với các trường hợp biên (edge cases) và dữ liệu mới chưa qua xử lý. | **5** |
| | | | **TỔNG ĐIỂM PHẦN DỮ LIỆU VÀ MÔ HÌNH** | **20** |
| **IV** | **Cấu trúc, chất lượng triển khai & độ hoàn thiện sản phẩm** | **1. Cấu trúc dự án** | - Cấu trúc dự án rõ ràng và phân tách tốt giữa các module, tầng logic,...<br>- Code tuân thủ quy ước, sạch sẽ và đảm bảo khả năng mở rộng. | **3** |
| | | **2. Kiến trúc FE, UI/UX** | - Giao diện đẹp mắt và sử dụng trực quan, mượt mà, đồng bộ, tối ưu responsive, dễ dùng và tiếp cận cho người dùng.<br>- Code FE tổ chức module/component mạch lạc. | **3** |
| | | **3. Kiến trúc BE & Hiệu suất** | - Thiết kế RESTful/GraphQL API,... chuẩn mực, xử lý logic và cấu trúc database hiệu quả.<br>- Tốc độ phản hồi nhanh, tối ưu hóa truy vấn cơ sở dữ liệu và sử dụng tài nguyên hiệu quả. | **5** |
| | | **4. CI/CD & Pipeline Deploy** | - Cấu hình tự động hóa quy trình tích hợp và phân phối (sử dụng GitHub Actions, GitLab CI,...).<br>- Tự động build, linting, chạy test và tự động trigger deploy lên môi trường staging/production. | **3** |
| | | **5. Bảo mật & độ tin cậy** | - Bảo vệ dữ liệu người dùng, phòng chống các lỗ hổng phổ biến.<br>- Hệ thống vận hành ổn định và tin cậy. | **3** |
| | | **6. Độ hoàn thiện sản phẩm** | - Có kiểm tra lỗi tự động và đóng gói/triển khai ứng dụng bài bản.<br>- Sản phẩm chạy thực tế ổn định, hoàn thành đầy đủ các tính năng cốt lõi và không phát sinh lỗi nghiêm trọng khi demo. | **3** |
| | | | **TỔNG ĐIỂM PHẦN CẤU TRÚC & ĐỘ HOÀN THIỆN** | **20** |
| **V** | **Đóng góp & tính cộng đồng** | Tác động & Nhân rộng | Có tác động tích cực rõ ràng, phương án triển khai hoặc khả năng nhân rộng, đồng thời chú trọng khả năng tiếp cận và lợi ích lâu dài cho cộng đồng. | **10** |
| | | | **TỔNG ĐIỂM PHẦN ĐÓNG GÓP VÀ TÍNH CỘNG ĐỒNG** | **10** |
| **VI** | **Sử dụng AI tiết kiệm chi phí và hiệu quả** | Tối ưu tài nguyên & Chi phí | - Đánh giá mức độ ứng dụng AI để tối ưu hóa ngân sách và tài nguyên.<br>- Cân bằng giữa chi phí, chất lượng và tốc độ của mô hình.<br>- Có giải pháp đo lường và tối ưu chi phí. | **10** |
| | | | **TỔNG ĐIỂM PHẦN SỬ DỤNG AI TIẾT KIỆM CHI PHÍ VÀ HIỆU QUẢ** | **10** |
| **VII** | **Ứng dụng công nghệ AWS hoặc Google** | Cloud Deployment & Bảo mật Cloud | - Triển khai thành công ứng dụng/dịch vụ lên một trong các nền tảng điện toán đám mây AWS (EC2, ECS, Lambda, S3, Cloud Run,...) hoặc Google Cloud (Compute Engine, Cloud Run, Cloud Functions, Cloud Storage,...).<br>- Hệ thống cấu hình chuẩn môi trường production, có domain/IP công khai và truy cập ổn định.<br>- Quản lý tài nguyên, cấu hình mạng/bảo mật cơ bản (HTTPS, firewall/security groups, biến môi trường cloud) an toàn và tối ưu tài nguyên sử dụng. | **10** |
| | | | **TỔNG ĐIỂM PHẦN TRIỂN KHAI CÔNG NGHỆ AWS HOẶC GOOGLE** | **10** |
| **VIII** | **Khả năng làm việc nhóm, thuyết trình, trình diễn & phản biện** | Pitching, Q&A & Teamwork | - Làm việc nhóm hiệu quả và phân chia công việc hợp lý.<br>- Khả năng trình bày rõ ràng bài toán, giải pháp và giá trị của sản phẩm, các chức năng cốt lõi bằng tình huống thực tế.<br>- Giải thích được cách AI, dữ liệu, mô hình và các quyết định kỹ thuật.<br>- Trả lời, phản biện thuyết phục các câu hỏi của Ban Giám khảo về hiệu quả, giới hạn, chi phí và khả năng triển khai sản phẩm. | **10** |
| | | | **TỔNG ĐIỂM PHẦN LÀM VIỆC NHÓM VÀ TRÌNH BÀY** | **10** |
| **TỔNG** | **TỔNG ĐIỂM TẤT CẢ TIÊU CHÍ** | | | **100** |

---

## 🧭 MA TRẬN ĐỐI CHIẾU CHIẾN LƯỢC CHO ĐỘI SINGLENODE (URBANSHIELD LITE)

Bảng phân bổ giải pháp kỹ thuật bám sát từng barem điểm của Ban Giám khảo:

| Trụ cột tiêu chí | Điểm | Điểm neo kỹ thuật & Bằng chứng thực tế của UrbanShield Lite |
| :--- | :---: | :--- |
| **I. Sáng tạo & Đổi mới** | **10đ** | - Đo ngập nước bằng tỷ lệ hình học bánh xe máy 50cm thay vì lắp cảm biến cống dễ bị rác và bùn làm hỏng.<br>- Bộ phát hiện ngã xe 4 bước kết hợp bộ đếm bất động 5s để triệt tiêu báo động giả. |
| **II. Tính thực tiễn & Khả thi** | **10đ** | - Tận dụng camera an ninh sẵn có tại các con đường nhỏ và ngõ hẻm hay bị ngập sâu.<br>- Không cần mua sắm camera đắt tiền, chạy trực tiếp trên máy tính khu phố sẵn có. |
| **III. Dữ liệu & Mô hình AI** | **20đ** | - **Dữ liệu (5đ):** Nguồn video trích xuất thực tế từ hẻm ngập nước và ngã xe tại TP.HCM, quy trình gán nhãn minh bạch.<br>- **Mô hình (5đ):** YOLOv8-nano gọn nhẹ (~6MB), tối ưu cho CPU phổ thông, đạt tốc độ xử lý 25-30 FPS.<br>- **An toàn AI & Thiên lệch (5đ):** Cân bằng sáng CLAHE chống nhiễu mưa đêm/đèn hắt bóng; cơ chế loại trừ người đứng dắt xe chống báo nhầm.<br>- **Kiểm thử mô hình (5đ):** Có bộ chỉ số đo lường (mAP, F1, Latency < 40ms) và Test Report minh bạch với các edge cases. |
| **IV. Cấu trúc, Triển khai & Hoàn thiện** | **20đ** | - **Cấu trúc (3đ):** Phân tách rõ ràng giữa Edge Engine (Python CV), Backend API (FastAPI) và Frontend Dashboard.<br>- **FE & UI/UX (3đ):** Bản đồ số Leaflet GIS nhẹ mượt, tương tác trực quan thời gian thực, responsive trên điện thoại.<br>- **BE & Hiệu suất (5đ):** RESTful API + WebSockets, xuất mẩu tin JSON nhẹ dưới 150 bytes, phản hồi dưới 100ms.<br>- **CI/CD (3đ):** Pipeline GitHub Actions tự động lint, run unit/integration test và build Docker container.<br>- **Bảo mật (3đ):** Privacy-by-design: video chỉ giải mã trên RAM và tự hủy ngay lập tức, không lưu trữ video người dân xuống đĩa.<br>- **Độ hoàn thiện (3đ):** Đóng gói Docker Compose chạy bằng 1 lệnh, demo live 100% không phát sinh lỗi nghiêm trọng. |
| **V. Đóng góp & Tính cộng đồng** | **10đ** | - Trực tiếp hỗ trợ người dân và lực lượng dân quân/tổ dân phố phát hiện ngập sâu và hỗ trợ người ngã xe kịp thời.<br>- Chi phí 0đ đầu tư cảm biến giúp ngân sách địa phương dễ dàng nhân rộng tới mọi phường/xã. |
| **VI. Tiết kiệm chi phí AI** | **10đ** | - **Không dùng GPU Cloud đắt đỏ:** Suy luận trực tiếp trên CPU Intel Core i3/i5 đời cũ (tiết kiệm hàng chục triệu tiền thuê server/GPU).<br>- **Tối ưu truyền dẫn:** Chỉ gửi tin nhắn cảnh báo khi có sự cố, tiết kiệm 99.9% băng thông so với truyền luồng video liên tục. |
| **VII. Công nghệ AWS / Google Cloud** | **10đ** | - Triển khai Backend API & Web GIS Dashboard lên **AWS EC2 / ECS / Google Cloud Run** có domain / IP công khai, chứng chỉ HTTPS, firewall bảo vệ an toàn.<br>- Lưu trữ lịch sử báo cáo JSON và cấu hình bản đồ ngõ hẻm trên Cloud Storage / S3. |
| **VIII. Làm việc nhóm & Thuyết trình** | **10đ** | - Kịch bản thuyết trình mộc mạc, 100% văn nói tự nhiên, Problem-First.<br>- Live Demo trực quan 3 phút minh chứng trọn vẹn luồng hoạt động từ nhận diện đến gửi tin cảnh báo sang Telegram.<br>- Phản biện tự tin, nắm chắc bản chất kỹ thuật, chi phí và tính khả thi triển khai. |
| **TỔNG CỘNG** | **100đ** | **Sẵn sàng chinh phục điểm số tối đa ở cả 8 trụ cột đánh giá.** |
