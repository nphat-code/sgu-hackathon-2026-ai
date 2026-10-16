# 🎨 BỘ PROMPT TẠO GIAO DIỆN DEMO Ý TƯỞNG & LUỒNG ACTIVITY (FIGMA MAKE)
## DỰ ÁN: URBANSHIELD LITE – NHÓM SINGLENODE (HACKATHON SGU 2026)

> **Mục tiêu:** Cung cấp prompt hoàn chỉnh để dán trực tiếp vào **Figma Make** (`https://www.figma.com/make/`) nhằm sinh ra giao diện web prototype có khả năng tương tác (Interactive Demo) để trình bày đề án, sơ đồ luồng hoạt động (Activity Flow) và mô phỏng trực quan 2 tính năng cứu nạn dân sinh (Đo ngập hình học & Phát hiện ngã xe bằng Edge AI).

---

## 🚀 1. PROMPT TIẾNG ANH (TỐI ƯU HÓA CAO NHẤT CHO FIGMA MAKE AI)
*(Figma Make hiểu tiếng Anh và sinh component React/Tailwind chuẩn xác nhất. Hãy sao chép toàn bộ khối lệnh bên dưới dán vào ô "What do you want to make?"):*

```text
Build a high-fidelity, interactive civic-tech web demo prototype for "UrbanShield Lite" - a low-cost, decentralized Edge-AI neighborhood flood and motorbike accident alert system designed for narrow alleys in Ho Chi Minh City by team SingleNode.

Theme & Aesthetics:
- Sleek modern dark mode (Slate-950 #0B0F17 background, Slate-900 cards, Slate-800 borders, Emerald #10B981, Amber #F59E0B, Crimson #EF4444, Electric Blue #3B82F6 accents).
- High visual contrast, crisp typography (Inter/Plus Jakarta Sans), clean status pills, glassmorphism cards, smooth state transitions.

Top Header Navigation:
- Brand: "UrbanShield Lite" with a shield icon, subtitle "Decentralized Edge-AI Civic Safety System | SingleNode".
- System Live Status Pills: "Edge Mode: Local CPU Only (YOLOv8-nano)", "Privacy: Zero-Cloud Video Stream (RAM Only)", "FPS: 28.4 FPS", "Active Nodes: 3/3 Online".
- Navigation Tabs with active indicators:
  1. [Sơ đồ Luồng Activity (Interactive Flow)]
  2. [Thử Nghiệm Kịch Bản (Live Activity Sandbox)]
  3. [Bản Đồ Ngõ Hẻm & Cảnh Báo Telegram (Alert Dispatch)]

View 1: [Interactive Activity Flow]
- An interactive horizontal step-by-step pipeline displaying the system's operational workflow:
  * Step 1: Camera ghi hình cục bộ (Local RTSP / Webcam feed at neighborhood level).
  * Step 2: Xử lý tại biên (Edge CPU Inference via YOLOv8-nano ~6.5MB, Privacy-by-design RAM buffer).
  * Step 3: Phân nhánh sự cố (Decision Fork):
    - Sub-branch A: Đo ngập hình học (Motorbike wheel 50cm reference -> Water height: <10cm Safe, 10-20cm Warning, >20cm Stall Danger).
    - Sub-branch B: Phát hiện ngã xe (CLAHE night enhancement -> Aspect ratio W/H > 1.15 horizontal fallen posture -> 5-Second stationary debounce timer to prevent false alarms).
  * Step 4: Kích hoạt sự cố (Incident Trigger -> Pack lightweight Alert JSON metadata + 1 single frame snapshot).
  * Step 5: Bắn thông báo (Alert Dispatch to Telegram Bot & OpenStreetMap/Leaflet Civic Dashboard).
- Interactivity: Clicking any step highlights that node with a glowing border and opens an interactive detail drawer on the right showing: Technical logic, pseudocode snippet, privacy guarantee, and live diagram preview.

View 2: [Live Activity Sandbox / Interactive Playground]
- A 2-column interactive simulator where judges can test the algorithms live:
  * Left Column: Water Depth Geometric Estimation (Đo ngập hình học)
    - Interactive slider to adjust water level from 0 cm to 35 cm.
    - SVG graphic of a motorbike wheel (diameter 50cm) with animated rising blue translucent water level.
    - Dynamic status badge:
      - Under 10cm: Green badge "Mức 1: An toàn (<10cm) - Phương tiện lưu thông bình thường".
      - 10 - 20cm: Amber badge "Mức 2: Chú ý (10-20cm) - Nước chạm mép ống xả xe máy".
      - Above 20cm: Red pulsing badge "Mức 3: Ngập sâu (>20cm) - Nguy cơ chết máy!". Automatically triggers alert package.
  * Right Column: Motorbike Fall & 5-Second Stationary Timer (Phát hiện ngã xe & Chống báo giả)
    - Camera viewport simulation with night/rain filter.
    - Button: "Mô phỏng ngã xe (Simulate Fall)".
    - When clicked: Shows detected bounding box (W/H > 1.15), starts a realistic 5-second countdown timer badge: "Kiểm tra bất động: 5s... 4s... 3s... 2s... 1s...".
    - Two interactive response buttons appear during countdown:
      1. "Người tự đứng dậy (Cancel / Recover)" -> Immediately stops timer, shows green success message: "Đã hủy cảnh báo: Người đã đứng dậy (Triệt tiêu báo động giả thành công!)".
      2. Let timer expire -> Triggers red emergency SOS alert, generates Telegram notification with timestamp and GPS alley coordinates.

View 3: [Alert Dispatch & Civic Map View]
- Left pane: Interactive simulated Telegram Mobile App chat showing live incident messages arriving from @UrbanShieldBot with thumbnail photo, street address (Hẻm 254 Nguyễn Văn Cừ, Quận 5), water level / fall status, and action buttons ("Xem lộ trình", "Báo lực lượng tổ dân phố").
- Right pane: Dark-mode vector interactive map of local alley network with 3 colored node pins (Green, Amber, Red pulsing) that can be clicked to view node telemetry.

Include realistic dummy data, interactive toggles, responsive layout, and polish every micro-interaction.
```

---

## 🇻🇳 2. PROMPT TIẾNG VIỆT (PHIÊN BẢN THUẦN VIỆT CHO FIGMA MAKE HOẶC CÁC AI WEB KHÁC)

```text
Tạo một ứng dụng web demo tương tác (Interactive Demo Prototype) hoàn chỉnh cho đề án "UrbanShield Lite - Hệ thống theo dõi ngập nước và cảnh báo ngã xe bằng Edge AI chi phí thấp" của nhóm SingleNode (Hackathon SGU 2026).

Phong cách giao diện:
- Giao diện Dark Mode hiện đại (Nền đen xanh slate #0B0F17, thẻ card bo góc tinh tế, viền kính mờ glassmorphism, màu cảnh báo: Xanh lá #10B981, Vàng hổ phách #F59E0B, Đỏ báo động #EF4444, Xanh công nghệ #3B82F6).
- Thanh tiêu đề trên cùng: Logo UrbanShield Lite kèm biểu tượng khiên, tên nhóm SingleNode, kèm các chỉ số trạm biên thời gian thực: "Xử lý CPU phổ thông (YOLOv8-nano)", "Không truyền video về máy chủ (Bảo vệ quyền riêng tư)", "Tốc độ: 28.5 FPS", "Trạng thái trạm: 3/3 Đang hoạt động".

Thanh chuyển đổi chế độ xem (Tabs):
1. [Sơ đồ Luồng Hoạt động (Activity Flow)]
2. [Phòng Thử Nghiệm Tương Tác (Live Sandbox)]
3. [Bản Đồ Ngõ Hẻm & Cảnh Báo Telegram]

Nội dung chi tiết từng tab tương tác:

1. TAB 1: SƠ ĐỒ LUỒNG HOẠT ĐỘNG TƯƠNG TÁC (ACTIVITY FLOW):
- Thể hiện sơ đồ các bước xử lý dữ liệu từ trái qua phải:
  * Bước 1: Camera ghi hình tại chỗ (Camera có sẵn / Webcam trong ngõ xóm).
  * Bước 2: AI biên phân tích tại máy trạm (Chạy YOLOv8-nano trên CPU khu phố, hình ảnh xử lý trên RAM rồi hủy ngay).
  * Bước 3: Rẽ nhánh phân tích nghiệp vụ:
    - Nhánh 1: Đo ngập hình học (Lấy bánh xe máy 50cm làm mốc tham chiếu -> Đo mức nước: Dưới 10cm an toàn, 10-20cm chạm ống xả, trên 20cm nguy cơ chết máy).
    - Nhánh 2: Phát hiện ngã xe ban đêm (Cân bằng sáng CLAHE -> Nhận diện khung bao nằm ngang W/H > 1.15 sát xe -> Bộ đếm bất động liên tục 5 giây để chống báo giả).
  * Bước 4: Đóng gói sự cố (Gói tin Alert Metadata siêu nhẹ + 1 ảnh chụp hiện trường duy nhất).
  * Bước 5: Phân phối cảnh báo (Bắn thông báo qua Telegram Bot và cập nhật Bản đồ số quản trị).
- Tính năng tương tác: Khi người dùng bấm vào từng khối trên sơ đồ, bên phải sẽ hiển thị bảng thông tin chi tiết giải thích logic, đoạn mã giả lập và cam kết bảo vệ dữ liệu cá nhân.

2. TAB 2: THỬ NGHIỆM KỊCH BẢN TƯƠNG TÁC (INTERACTIVE SANDBOX):
- Bố cục 2 cột cho phép Giám khảo trải nghiệm thực tế:
  * Cột trái - Mô phỏng đo ngập:
    - Có thanh kéo (slider) độ ngập từ 0cm đến 35cm.
    - Đồ họa bánh xe máy kèm mực nước dâng lên hạ xuống theo thanh kéo.
    - Thẻ trạng thái đổi màu trực tiếp: <10cm hiện Xanh "An toàn", 10-20cm hiện Vàng "Chú ý chạm pô xe", >20cm hiện Đỏ nhấp nháy "Nguy cơ chết máy!".
  * Cột phải - Mô phỏng phát hiện ngã xe & Bộ đếm 5s:
    - Nút bấm "Mô phỏng ngã xe".
    - Khi bấm: Khung camera nhận diện khung nằm ngang và bắt đầu đếm ngược 5 giây (5s... 4s... 3s... 2s... 1s...).
    - Có nút "Người tự đứng dậy": Khi bấm sẽ dừng ngay bộ đếm, thông báo màu xanh "Đã hủy cảnh báo: Người đã đứng dậy (Tránh báo động giả thành công)".
    - Nếu để hết 5 giây: Kích hoạt chuông SOS đỏ, phát sinh cảnh báo gửi về hệ thống.

3. TAB 3: GIAO DIỆN BẢN ĐỒ & TELEGRAM BOT:
- Khung mô phỏng ứng dụng Telegram nhận tin nhắn cảnh báo tự động gồm: Tên hẻm, hình ảnh hiện trường, mức nước/tai nạn, tọa độ GPS.
- Bản đồ ngõ xóm trực quan với các điểm camera đổi màu trạng thái theo thời gian thực.
```

---

## 💡 3. HƯỚNG DẪN THAO TÁC NHANH TRÊN FIGMA MAKE (HÌNH ẢNH TAB BẠN ĐANG MỞ)

1. **Bước 1:** Chuyển sang tab **Figma Make** đang mở trên trình duyệt của bạn (`https://www.figma.com/make/`).
2. **Bước 2:** Nhấp chuột vào khung tìm kiếm **"What do you want to make?"**.
3. **Bước 3:** Dán đoạn **Prompt Tiếng Anh (Mục 1)** *(khuyên dùng vì Figma Make được tối ưu prompt tiếng Anh tốt nhất)* hoặc **Prompt Tiếng Việt (Mục 2)** vào ô nhập.
4. **Bước 4:** Bấm phím **Enter** hoặc nhấp vào nút **Mũi tên tròn (Submit)** bên phải ô nhập liệu.
5. **Bước 5:** Figma Make sẽ tiến hành sinh giao diện và cấu trúc tương tác trong khoảng 1 - 2 phút. Sau khi sinh xong, bạn có thể bấm **Play / Preview** để tương tác thử thanh slider ngập nước và bộ đếm 5s ngã xe ngay trên Figma!
