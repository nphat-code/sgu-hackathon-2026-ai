# 🎨 BỘ PROMPT TẠO GIAO DIỆN DEMO Ý TƯỞNG & LUỒNG ACTIVITY (FIGMA MAKE)
## DỰ ÁN: URBANSHIELD LITE – NHÓM SINGLENODE (HACKATHON SGU 2026)

> **Lưu ý:** Cả hai phiên bản bên dưới đều đã được tối ưu hóa độ dài **dưới 2.000 ký tự** (chuẩn giới hạn nhập liệu của Figma Make).

---

## 🚀 1. PROMPT TIẾNG ANH (1.882 KÝ TỰ - KHUYÊN DÙNG CHO FIGMA MAKE)
*(Figma Make hiểu tiếng Anh và sinh component React/Tailwind chuẩn xác nhất. Dán trực tiếp vào ô "What do you want to make?"):*

```text
Build an interactive civic-tech web demo prototype for "UrbanShield Lite" - a low-cost Edge-AI neighborhood flood & motorbike accident alert system by SingleNode.

Aesthetics:
- Dark mode (Slate-950 #0B0F17, Slate-900 cards, Emerald #10B981, Amber #F59E0B, Red #EF4444, Blue #3B82F6).
- High visual contrast, clean status badges, glassmorphism cards, smooth animations.

Header:
- "UrbanShield Lite | SingleNode"
- Status: "Edge CPU (YOLOv8-nano)", "Zero Cloud Video (RAM Only)", "28.5 FPS", "3 Nodes Online".
- Tabs: [Activity Flow] [Interactive Sandbox] [Alerts & Map]

Tab 1: [Activity Flow]
- Step-by-step horizontal pipeline:
  1. Camera Stream: Local RTSP/Webcam in alley
  2. Edge AI: YOLOv8n on local CPU, RAM buffer
  3. Decision Fork:
     - Branch A: Water Depth (50cm wheel reference: <10cm Safe, 10-20cm Warning, >20cm Stall Danger)
     - Branch B: Fall Detection (CLAHE night enhance -> horizontal box W/H>1.15 -> 5s stationary debounce timer)
  4. Trigger: Pack alert JSON metadata + 1 snapshot
  5. Dispatch: Auto alert to Telegram Bot & Civic Leaflet Map
- Click any node to open a right drawer showing technical logic and pseudocode.

Tab 2: [Interactive Sandbox]
- 2-column playground:
  * Water Depth: Slider 0-35cm. Visual 50cm wheel submerged dynamically. Status badge: Green (<10cm Safe), Amber (10-20cm Warning), Red Pulsing (>20cm Stall Danger -> triggers alert).
  * Fall Detection: "Simulate Fall" button starts 5-second countdown timer (5s...4s...3s...2s...1s). Two action buttons: "Stand Up" (stops timer, cancels alert with green notice: "Debounce Success - False Alarm Prevented") OR let timer expire (triggers red SOS alert).

Tab 3: [Alerts & Map]
- Simulated Telegram mobile chat showing incident messages with photo, GPS address ("Hẻm 254 Nguyễn Văn Cừ"), and quick action buttons.
- Vector alley map with 3 colored node pins (Green, Amber, Red).
```

---

## 🇻🇳 2. PROMPT TIẾNG VIỆT (1.709 KÝ TỰ - CHUẨN XÁC, NGẮN GỌN)

```text
Tạo web demo tương tác cho đề án "UrbanShield Lite - Hệ thống theo dõi ngập nước & ngã xe bằng Edge AI chi phí thấp" (SingleNode).

Giao diện & Thẩm mỹ:
- Dark Mode hiện đại (Nền đen slate #0B0F17, viền kính mờ glassmorphism, màu nhấn: Xanh lá #10B981, Vàng #F59E0B, Đỏ #EF4444, Xanh #3B82F6).
- Header: Logo UrbanShield Lite | SingleNode. Thẻ trạng thái: "CPU phổ thông (YOLOv8-nano)", "Xử lý trên RAM (Không stream video)", "28.5 FPS", "3 Trạm Online".
- 3 Tab điều hướng: [Sơ đồ Luồng Activity] [Thử Nghiệm Tương Tác] [Bản Đồ & Telegram]

Tab 1: [Sơ đồ Luồng Activity]
- Chuỗi quy trình tương tác ngang:
  1. Camera ghi hình: Thu video cục bộ ngõ hẻm
  2. Edge AI: Phân tích YOLOv8n trên CPU máy trạm, xóa video trên RAM
  3. Rẽ nhánh sự cố:
     - Nhánh A (Đo ngập): Lấy bánh xe 50cm làm mốc (<10cm An toàn, 10-20cm Chú ý chạm pô, >20cm Ngập sâu chết máy)
     - Nhánh B (Ngã xe): Cân bằng sáng CLAHE -> Dáng nằm ngang W/H>1.15 -> Bộ đếm bất động liên tục 5s
  4. Đóng gói: Tạo JSON metadata + 1 ảnh hiện trường
  5. Cảnh báo: Bắn tin qua Telegram Bot & Bản đồ số
- Bấm vào từng bước để mở ngăn chi tiết bên phải xem logic và giải thích kỹ thuật.

Tab 2: [Thử Nghiệm Tương Tác]
- 2 cột tương tác trực tiếp:
  * Đo ngập: Thanh trượt 0 - 35cm, đồ họa bánh xe 50cm ngập nước dâng theo trượt. Đổi nhãn màu: Xanh (<10cm), Vàng (10-20cm), Đỏ (>20cm - Bắn tin cảnh báo).
  * Ngã xe & Chống báo giả: Nút "Mô phỏng ngã xe" đếm ngược 5 giây. Có 2 nút: "Người đứng dậy" (Dừng đếm, hủy cảnh báo: "Tránh báo giả thành công") HOẶC để hết 5s (Bật còi SOS đỏ).

Tab 3: [Bản Đồ & Telegram]
- Khung chat Telegram giả lập nhận tin kèm ảnh và tọa độ Hẻm 254 Nguyễn Văn Cừ.
- Bản đồ ngõ xóm với 3 điểm trạm đổi màu theo sự cố.
```
