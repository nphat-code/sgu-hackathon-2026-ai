# 🎨 BỘ PROMPT TẠO GIAO DIỆN DEMO Ý TƯỞNG & LUỒNG ACTIVITY (FIGMA MAKE)
## DỰ ÁN: URBANSHIELD LITE – NHÓM SINGLENODE (HACKATHON SGU 2026)

> **Tiêu chuẩn UI/UX:** Phong cách **Clean Light Theme (Apple-style Civic Tech)** tinh tế, sáng sủa, độ tin cậy cao.  
> **Kiến trúc giao diện:** **Bento Grid**, tương phản chuẩn **WCAG AA (4.5:1+)**, phân cấp **Progressive Disclosure**, font pairing **Inter + JetBrains Mono**, mô hình tương tác **Direct Manipulation**.  
> **Giới hạn độ dài:** Cả 2 bản đều kiểm soát nghiêm ngặt **dưới 2.000 ký tự** để vừa vặn ô nhập của Figma Make.

---

## 🚀 1. PROMPT TIẾNG ANH (1.969 KÝ TỰ - CLEAN LIGHT MODE, KHUYÊN DÙNG CHO FIGMA MAKE)
*(Dán trực tiếp vào ô "What do you want to make?" trên Figma Make):*

```text
Build an interactive civic-tech web prototype for "UrbanShield Lite" - an Edge-AI flood & fall detection alert system for alleyways by SingleNode.

UI/UX & Design System (Clean Light Mode + Bento Grid):
- Theme: Apple-style clean light theme, civic trust aesthetic.
- Colors: Canvas #F8FAFC, Cards #FFFFFF, Borders #E2E8F0, Text #0F172A, Accent Blue #2563EB, Safe Emerald #059669, Warning Amber #D97706, Danger Rose #DC2626.
- Typography: Inter (UI) + JetBrains Mono (telemetry).
- UX Standards: WCAG AA (4.5:1+), 44px touch targets, dual-indicator badges (icon + text), 16px rounded cards, subtle shadows, 200ms transitions.

Header (Bento Bar):
- Brand: "UrbanShield Lite | SingleNode" with shield icon.
- Telemetry: "Local CPU (YOLOv8n)", "RAM-Only (Zero Video Storage)", "28.5 FPS", "3 Nodes Online".
- Tabs: [Activity Flow] [Interactive Sandbox] [Alerts & Map]

Tab 1: [Interactive Activity Pipeline]
- Horizontal interactive stepper (Local Cam -> Edge YOLOv8n -> Decision Fork [Water Depth / Fall 5s Debounce] -> Incident Trigger -> Alert Dispatch).
- Node UX: Clean white cards with hover lift. Clicking a node opens a slide-over panel with technical logic, thresholds, and pseudocode.

Tab 2: [Interactive Sandbox - Direct Manipulation]
- 2-column Bento playground:
  * Water Depth: Slider (0-35cm) with dynamic SVG 50cm wheel submersion. Status card: <10cm Green (Safe), 10-20cm Amber (Exhaust warning), >20cm Rose pulsing (Stall danger -> auto-triggers alert package).
  * Fall Detection: "Simulate Fall" starts a 5s circular countdown badge. Two micro-interactions: "Stand Up" button immediately resets timer with green feedback toast ("False Alarm Prevented") OR let timer reach 0 to trigger pulsing SOS emergency modal.

Tab 3: [Alert Dispatch & Telemetry]
- Simulated mobile Telegram card: incident photo thumbnail, GPS tag ("Hẻm 254 Nguyễn Văn Cừ"), severity badge, and action chips.
- Interactive vector clean light map with 3 colored pulsing node pins.
```

---

## 🇻🇳 2. PROMPT TIẾNG VIỆT (1.937 KÝ TỰ - CLEAN LIGHT THEME)

```text
Tạo web prototype tương tác cho "UrbanShield Lite" - Hệ thống Edge-AI giám sát ngập nước & ngã xe ngõ hẻm (SingleNode).

Hệ thống UI/UX (Clean Light Mode + Bento Grid):
- Phong cách: Giao diện sáng (Light Theme) tinh tế kiểu Apple, thanh lịch, độ tin cậy cao.
- Bảng màu: Nền #F8FAFC, Thẻ trắng #FFFFFF, Viền #E2E8F0, Chữ #0F172A, Nhấn Xanh #2563EB, An toàn #059669, Chú ý #D97706, Báo động #DC2626.
- Typography: Inter (giao diện) + JetBrains Mono (thông số kỹ thuật).
- Chuẩn UX: Tương phản WCAG AA (4.5:1+), nút bấm >= 44px, nhãn trạng thái kép (icon + chữ), bo góc 16px, đổ bóng nhẹ, hiệu ứng 200ms mượt mà.

Header (Thanh trạng thái Bento):
- Thương hiệu: "UrbanShield Lite | SingleNode" kèm icon khiên bảo hộ.
- Chỉ số: "CPU phổ thông (YOLOv8n)", "Bộ đệm RAM (Không lưu video)", "28.5 FPS", "3 Trạm Online".
- 3 Tab điều hướng: [Sơ đồ Luồng Activity] [Thử Nghiệm Tương Tác] [Bản Đồ & Telegram]

Tab 1: [Sơ đồ Luồng Activity Tương Tác]
- Chuỗi quy trình ngang (Camera -> Edge AI YOLOv8n -> Rẽ nhánh [Đo ngập bánh xe 50cm / Ngã xe & Bộ đếm 5s] -> Đóng gói sự cố -> Bắn cảnh báo).
- Trải nghiệm tương tác: Bấm vào từng bước mở ngăn trượt bên phải hiển thị chi tiết logic xử lý, ngưỡng kích hoạt và mã giả.

Tab 2: [Thử Nghiệm Tương Tác - Trực Quan Hóa]
- Bố cục Bento 2 cột:
  * Đo ngập: Thanh trượt 0 - 35cm kèm đồ họa bánh xe 50cm chìm dần theo thời gian thực. Thẻ trạng thái đổi màu linh hoạt: <10cm Xanh (An toàn), 10-20cm Vàng (Chú ý pô xe), >20cm Đỏ nhấp nháy (Nguy cơ chết máy).
  * Ngã xe & Chống báo giả: Nút "Mô phỏng ngã xe" kích hoạt đếm ngược 5s. Hai thao tác: Bấm "Người tự đứng dậy" (hủy báo động ngay, hiện thông báo xanh: "Tránh báo giả thành công") HOẶC để hết 5s (kích hoạt cảnh báo SOS đỏ).

Tab 3: [Bản Đồ Ngõ Hẻm & Cảnh Báo Telegram]
- Khung mô phỏng Telegram trên di động: Tin nhắn sự cố kèm ảnh chụp, tọa độ Hẻm 254 Nguyễn Văn Cừ và nút phản hồi nhanh.
- Bản đồ ngõ xóm nền sáng với 3 ghim camera đổi màu động.
```
