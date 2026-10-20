# 📋 CHỈ ĐẠO & ĐỊNH HƯỚNG TỪ BAN GIÁM KHẢO (VÒNG CODING HOÀN THIỆN SẢN PHẨM)
## HACKATHON SGU 2026 - MENTOR SUPPORT: ANH CẢNH

> **Người hỗ trợ:** Anh Cảnh (Ban Giám khảo / Cố vấn kỹ thuật Hackathon SGU 2026)  
> **Mục tiêu:** Định hướng đầu ra, tiêu chuẩn sản phẩm thực chiến để không chỉ dừng lại ở demo thi giải, mà có tiềm năng thương mại hóa, làm đồ án tốt nghiệp và làm đẹp CV / Portfolio.

---

## 📌 I. NGUYÊN VĂN NỘI DUNG CHỈ ĐẠO CỦA BAN GIÁM KHẢO

> *"Chào các bạn anh là Cảnh, anh sẽ support giải pháp cho các bạn để chuẩn bị vào vòng thi coding hoàn thiện sản phẩm. Định hướng đầu ra và kỳ vọng của Ban Tổ chức:*
>
> *Anh và Ban Tổ chức mong muốn sau cuộc thi, mỗi đội không chỉ dừng lại ở việc hoàn thành một đề tài hay xây dựng một bản demo, mà có thể phát triển thành một sản phẩm có tiềm năng thương mại hóa, một đồ án có giá trị học thuật hoặc một dự án thực tế đủ chất lượng để đưa vào CV và portfolio cá nhân.*
>
> *Để đạt được mục tiêu đó, các đội cần chú trọng 5 nội dung sau:*
>
> 1. **Planning và quản lý công việc:**
>    - Khuyến khích các đội tìm hiểu và sử dụng GitHub Spec Kit để lập kế hoạch, xác định yêu cầu, thiết kế giải pháp và chia nhỏ các công việc cần thực hiện.
>    - Xây dựng lộ trình phát triển rõ ràng, phân công nhiệm vụ hợp lý và xác định các mốc hoàn thành cụ thể.
>
> 2. **Kiến trúc và triển khai kỹ thuật:**
>    - Các đội cần có định hướng rõ ràng về cách xây dựng và vận hành sản phẩm, bao gồm:
>      - Kiến trúc hệ thống và công nghệ sử dụng.
>      - Thiết kế cơ sở dữ liệu và phương án lưu trữ.
>      - Logging, monitoring và quản lý lỗi.
>      - Quy trình triển khai, vận hành và mở rộng hệ thống (deployment và scalability).
>    - Mục tiêu không chỉ là làm cho sản phẩm chạy được, mà còn hiểu được vì sao đội lựa chọn giải pháp đó và khả năng phát triển trong thực tế.
>
> 3. **Phương án demo trước Ban Giám khảo:**
>    - Các đội cần chuẩn bị một kịch bản demo rõ ràng, thể hiện được:
>      - Vấn đề thực tế mà sản phẩm giải quyết.
>      - Quy trình sử dụng và các chức năng cốt lõi.
>      - Kết quả thực tế mà sản phẩm mang lại.
>      - Khả năng hoạt động ổn định và tính ứng dụng của giải pháp.
>    - Ưu tiên demo trực tiếp trên sản phẩm đang hoạt động thay vì chỉ trình bày slide hoặc video minh họa.
>
> 4. **Điểm mới và lợi thế cạnh tranh:**
>    - Mỗi đội cần xác định rõ điểm khác biệt của đề tài so với những sản phẩm hoặc giải pháp hiện có. Sự khác biệt có thể đến từ công nghệ, thuật toán, cách tiếp cận vấn đề, trải nghiệm người dùng hoặc hiệu quả ứng dụng thực tế.
>    - Quan trọng nhất, đội cần giải thích được điểm mới nằm ở đâu, giải quyết hạn chế gì và mang lại giá trị gì so với các giải pháp khác.
>
> 5. **Tính ứng dụng và khả năng phát triển sau cuộc thi:**
>    - Các đội nên định hướng sản phẩm ngay từ đầu theo khả năng phát triển lâu dài:
>      - Có thể thương mại hóa hoặc xây dựng mô hình kinh doanh.
>      - Có thể tiếp tục phát triển thành đồ án tốt nghiệp hoặc đề tài nghiên cứu.
>      - Có thể triển khai thử nghiệm trong môi trường thực tế.
>      - Có thể trở thành một dự án tiêu biểu để đưa vào CV, portfolio hoặc sử dụng khi ứng tuyển thực tập và việc làm.
>
> *Ví dụ kiến trúc chuẩn mực anh đưa ra:*
> - **Frontend:** Next.js
> - **Backend:** ASP.NET Core (.NET 10)
> - **AI Code Generation:** OpenAI API / Anthropic Claude API
> - **Automated Testing:** Playwright / xUnit
> - **Database:** PostgreSQL
> - **Cache & Message Queue:** Redis / RabbitMQ
> - **Logging:** Serilog
> - **Monitoring & Tracing:** OpenTelemetry + Grafana
> - **Containerization:** Docker
> - **CI/CD:** GitHub Actions
> - **Deployment:** Vercel (Frontend) + Azure App Service (Backend)
> - **File Storage:** Cloudflare R2 / AWS S3
> - **API Documentation:** Swagger / Scalar
> - **Authentication:** Auth.js / ASP.NET Core Identity
> - **Code Execution Sandbox:** Docker containers với giới hạn tài nguyên và quyền truy cập.
>
> *Lưu ý quan trọng:*
> - Dùng **GitHub Spec Kit** (`https://github.com/github/spec-kit`) để planning.
> - Nhóm nào có UI thì connect **MCP** với LLM cho nó đọc nó làm cho nhanh.
> - Đội nào cần tư vấn giải pháp thì ib anh nếu ngại hỏi trong này.
> - **Nhớ làm test report để chứng minh là sản phẩm mình chạy được nha.**"

---

## 🎯 II. PHÂN TÍCH & KẾ HOẠCH ÁP DỤNG VÀO DỰ ÁN URBANSHIELD LITE

Để biến lời khuyên của Giám khảo thành điểm số tối đa trong Vòng Coding, đội **SingleNode** phân bổ và áp dụng cụ thể vào dự án **UrbanShield Lite** như sau:

---

### 1️⃣ Planning & Quản lý công việc (GitHub Spec Kit)
- **Công cụ:** Áp dụng mô hình đặc tả kỹ thuật từ **GitHub Spec Kit** (`github/spec-kit`).
- **Triển khai:**
  - Viết tài liệu đặc tả chức năng (Functional Specifications) và phi chức năng (Non-functional Specifications: FPS $\ge 25$, RAM $< 500\text{ MB}$, độ trễ cảnh báo $< 2\text{s}$).
  - Chia nhỏ lộ trình coding thành các Sprint rõ ràng trên GitHub Issues / Projects:
    - *Sprint 1:* Hoàn thiện Core Engine (YOLOv8n + Bộ lọc ngã xe bất động 5s + Đo ngập bánh xe 50cm).
    - *Sprint 2:* Tối ưu Minimal API, WebSocket thời gian thực và tự động xuất Báo cáo văn bản (Text Report).
    - *Sprint 3:* Dashboard UI hiển thị bản đồ số ngõ hẻm và tích hợp cảnh báo Telegram Bot.
    - *Sprint 4:* Viết Automated Tests & xuất Test Report chứng minh sản phẩm hoạt động.

---

### 2️⃣ Kiến trúc & Triển khai kỹ thuật (Architecture & Scalability)

Anh Cảnh nhấn mạnh: **"Hiểu được vì sao đội lựa chọn giải pháp đó và khả năng phát triển trong thực tế"**. Đây là điểm tựa rất lớn cho bài phản biện của nhóm:

| Thành phần | Giải pháp của UrbanShield Lite | Lý do lựa chọn (Vì sao không dùng Cloud/GPU đắt tiền?) |
| :--- | :--- | :--- |
| **Kiến trúc chính** | **Edge-first Computing** (Xử lý biên phân tán tại nhà văn hóa khu phố) | Đường truyền mạng ở ngõ hẻm dân sinh rất dễ chập chờn khi mưa gió; truyền video liên tục về Cloud sẽ làm nghẽn băng thông và lộ lọt hình ảnh đời tư người dân. |
| **Phần cứng suy luận** | **CPU x86 phổ thông / Mini PC văn phòng cũ** (Intel Core i3/i5, RAM 8GB) | Tiết kiệm chi phí đầu tư công (chỉ 2.5 - 3.5 triệu/máy), tiêu thụ điện chỉ 15W-25W, tận dụng được máy tính văn phòng sẵn có tại cơ sở. |
| **Mô hình AI** | **YOLOv8-nano + OpenCV** | Nhỏ gọn (~6MB), tốc độ suy luận nhanh trên CPU (đạt 25-30 FPS), không cần card đồ họa rời GPU đắt tiền. |
| **Backend & API** | **FastAPI (Python) / Minimal API** | Tốc độ cao, tài nguyên cực thấp, trả về JSON mẩu tin cảnh báo (< 150 bytes) thay vì stream video. |
| **Frontend** | **Vite + Vanilla JS / Modern UI** + Leaflet GIS | Tinh gọn, thời gian tải trang tức thì, bản đồ ngõ hẻm nhẹ nhàng mượt mà trên mọi thiết bị di động của cán bộ dân phòng. |
| **Cơ sở dữ liệu** | **PostgreSQL / SQLite** | Lưu trữ nhật ký sự cố, tọa độ GeoJSON các tuyến hẻm, dễ dàng mở rộng. |
| **Logging & Monitoring** | Structured Logging (Loguru/Python logging) + Health Check API | Giám sát nhịp tim (Heartbeat) của từng Edge node và camera hẻm. |
| **Containerization** | **Docker & Docker Compose** | Đóng gói một lệnh chạy ngay (`docker compose up -d`) trên bất kỳ máy tính khu phố nào. |

---

### 3️⃣ Phương án Demo trước Ban Giám khảo (Live Demo trực tiếp)

Tuân thủ nghiêm ngặt yêu cầu: **"Ưu tiên demo trực tiếp trên sản phẩm đang hoạt động thay vì chỉ trình bày slide hoặc video minh họa"**.

- **Kịch bản Demo tương tác trực tiếp 3 phút:**
  1. **Bước 1 - Giả lập nguồn video ngõ hẻm thực tế:** Nạp luồng video camera hẻm ngập nước và trời mưa vào hệ thống.
  2. **Bước 2 - AI đo mực nước ngập trực tiếp:** Xe máy chạy qua vũng nước, thuật toán tự động nhận diện bánh xe, tính toán tỷ lệ ngập hình học (chuẩn 50cm) $\rightarrow$ Đo chính xác mực nước (ví dụ: $22\text{ cm}$ - ngập nửa bánh xe).
  3. **Bước 3 - Cảnh báo ngã xe tức thời:** Phát hiện người và xe đổ nghiêng ($W/H > 1.15$), bộ đếm bất động đếm đủ 5 giây $\rightarrow$ Kích hoạt chuông/nhấp nháy đỏ trên bản đồ.
  4. **Bước 4 - Bắn tin cảnh báo đa kênh:** Hệ thống tự động gửi mẩu tin cảnh báo dạng văn bản (Text Report) vào Telegram Bot của Giám khảo chỉ sau **1.5 giây**.
  5. **Bước 5 - Bảo vệ quyền riêng tư (Privacy Proof):** Bật tab kiểm tra bộ nhớ RAM: Video giải mã xong xóa ngay trên RAM, không hề ghi video hoặc chụp ảnh khuôn mặt người dân lưu xuống ổ cứng.

---

### 4️⃣ Điểm mới và Lợi thế cạnh tranh (Competitive Advantage)

So sánh trực diện 3 giải pháp:

| Tiêu chí | Cảm biến ngập cống truyền thống | Camera AI giao thông chuyên dụng | UrbanShield Lite (Nhóm SingleNode) |
| :--- | :--- | :--- | :--- |
| **Chi phí lắp đặt** | 10 - 18 triệu / cảm biến | 15 - 25 triệu / mắt camera | **Tận dụng camera an ninh cũ: 0 đ** |
| **Bảo trì thiết bị** | Dễ bị rác thải, bùn nghẹt cống làm hỏng | Phải kéo cáp quang riêng đắt đỏ | **Không chạm nước, không bảo trì thiết bị ngầm** |
| **Băng thông mạng** | Thấp (chỉ gửi số liệu) | Cực cao (kéo video 24/7 về trung tâm) | **Cực thấp (< 150 bytes / lần sự cố)** |
| **Bảo mật đời tư** | Không có hình ảnh | Nguy cơ rò rỉ video sinh hoạt ngõ hẻm | **Privacy-by-design (chỉ xử lý trên RAM, không lưu video)** |
| **Đa năng** | Chỉ đo được mực nước | Đọc biển số, nhận diện xe lớn ngoài đại lộ | **Vừa đo ngập, vừa phát hiện ngã xe cần giúp đỡ** |

---

### 5️⃣ Tính ứng dụng và Khả năng phát triển sau cuộc thi
- **Thương mại hóa & Thực tế:** Mô hình B2G (bán/chuyển giao gói phần mềm biên cho UBND Phường/Xã, Khu đô thị, Ban quản trị chung cư) với mức phí dịch vụ bảo trì rất thấp.
- **Đồ án tốt nghiệp / NCKH:** Đề tài nghiên cứu ứng dụng Thị giác máy tính biên (Edge Computer Vision) và AI cho đô thị thông minh (Smart City) với độ hoàn thiện cao.
- **CV & Portfolio:** Một dự án Full-stack từ Edge AI, Backend API, Web GIS đến CI/CD, Docker và Automated Testing bài bản theo chuẩn kỹ sư phần mềm chuyên nghiệp.

---

## ⚡ III. HÀNH ĐỘNG CẦN THỰC HIỆN NGAY (MANDATORY ACTION ITEMS)

### 🔴 1. Tạo Automated Test & Xuất Test Report (Lời dặn cốt lõi của anh Cảnh)
- Xây dựng thư mục `tests/` với các bài kiểm thử:
  - Unit test cho thuật toán đo ngập (`test_flood_measurement.py`).
  - Unit test cho bộ đếm bất động 5s và tỷ lệ khung ngã xe (`test_fall_detection.py`).
  - Integration test cho API (`test_api_endpoints.py`).
  - End-to-end test luồng cảnh báo sang Telegram / Text Report.
- **Tạo lệnh tự động chạy test và xuất file báo cáo:** `pytest --html=test_report.html` hoặc xuất file Markdown `TEST_REPORT.md` đính kèm log và ảnh chụp chứng minh sản phẩm chạy pass 100%.

### 🟡 2. Chuẩn hóa Repo theo GitHub Spec Kit
- Tạo thư mục `.spec/` hoặc cập nhật `docs/` theo mẫu Spec Kit:
  - `SPEC_OVERVIEW.md`: Mô tả bài toán, mục tiêu, user personas (Cán bộ trực ban, Tổ trưởng dân phố, Dân quân).
  - `TECHNICAL_SPEC.md`: Sơ đồ kiến trúc, API contracts, schema dữ liệu.
  - `DEPLOYMENT_SPEC.md`: Hướng dẫn chạy bằng Docker trong 1 dòng lệnh.

### 🟢 3. Sử dụng MCP (Model Context Protocol) cho UI
- Kết nối MCP Tools để hỗ trợ đọc và cập nhật giao diện Dashboard WebGIS nhanh chóng, tối ưu visual và tương tác demo mượt mà.
