# 🎨 BỘ PROMPT TẠO GIAO DIỆN DEMO Ý TƯỞNG & LUỒNG ACTIVITY (FIGMA MAKE)
## DỰ ÁN: URBANSHIELD LITE – NHÓM SINGLENODE (HACKATHON SGU 2026)

> **Tiêu chuẩn UI/UX:** Áp dụng hệ thống **Bento Grid**, bảng màu **Dark Mode chuẩn WCAG AA (4.5:1+)**, phân cấp thị giác **Progressive Disclosure**, font pairing **Inter + JetBrains Mono**, và mô hình tương tác **Direct Manipulation**.  
> **Độ dài:** Cả 2 bản đều được tối ưu hóa nghiêm ngặt **dưới 2.000 ký tự** để vừa vặn khung prompt của Figma Make.

---

## 🚀 1. PROMPT TIẾNG ANH (1.855 KÝ TỰ - CHUẨN UI/UX PRO MAX, KHUYÊN DÙNG)
*(Dán trực tiếp vào ô "What do you want to make?" trên Figma Make):*

```text
Build an interactive civic-tech web prototype for "UrbanShield Lite" - an Edge-AI flood & fall detection alert system for alleyways by SingleNode.

UI/UX & Design System (Bento Grid + Dark Mode):
- Colors: BG #0B0F17, Cards #1E293B, Border #334155, Accent Sky #0EA5E9, Safe Emerald #10B981, Warning Amber #F59E0B, Danger Rose #F43F5E.
- Typography: Inter (UI) + JetBrains Mono (metrics/telemetry).
- UX Standards: WCAG AA (4.5:1+), 44px touch targets, dual-indicator badges (icon + text), 16px rounded cards, 200ms smooth transitions.

Header (Bento Bar):
- Brand: "UrbanShield Lite | SingleNode"
- Live telemetry: "Local CPU (YOLOv8n)", "RAM-Only (Zero Disk Video)", "28.5 FPS", "3 Nodes Online".
- Tab switcher: [Activity Flow] [Interactive Sandbox] [Alerts & Map]

Tab 1: [Interactive Activity Pipeline]
- Horizontal interactive stepper (Local Cam -> Edge YOLOv8n -> Decision Fork [Water Depth / Fall 5s Debounce] -> Incident Trigger -> Alert Dispatch).
- Node UX: Hover glow & active state. Clicking a node opens a slide-over panel with technical logic, thresholds, and pseudocode.

Tab 2: [Interactive Sandbox - Direct Manipulation]
- 2-column Bento playground:
  * Water Depth: Slider (0-35cm) with dynamic SVG 50cm wheel submersion. Status card: <10cm Green (Safe), 10-20cm Amber (Exhaust warning), >20cm Rose pulsing (Stall danger -> auto-triggers alert package).
  * Fall Detection: "Simulate Fall" starts a 5s circular countdown badge. Two micro-interactions: "Stand Up" button immediately resets timer with green feedback toast ("False Alarm Prevented") OR let timer reach 0 to trigger pulsing SOS emergency modal.

Tab 3: [Alert Dispatch & Telemetry]
- Simulated mobile Telegram card: incident photo thumbnail, GPS tag ("Hẻm 254 Nguyễn Văn Cừ"), severity badge, and action chips.
- Interactive vector dark map with 3 colored pulsing node pins.
```

---

## 🇻🇳 2. PROMPT TIẾNG VIỆT (1.792 KÝ TỰ - CHUẨN UI/UX)

```text
Tạo web prototype tương tác cho "UrbanShield Lite" - Hệ thống Edge-AI giám sát ngập nước & ngã xe ngõ hẻm (SingleNode).

Hệ thống UI/UX (Bento Grid + Dark Mode):
- Bảng màu: Nền #0B0F17, Thẻ #1E293B, Viền #334155, Nhấn #0EA5E9, An toàn #10B981, Cảnh báo #F59E0B, Báo động #F43F5E.
- Typography: Inter (giao diện) + JetBrains Mono (thông số kỹ thuật).
- Chuẩn UX: Tương phản WCAG AA (4.5:1+), nút bấm >= 44px, nhãn trạng thái kép (icon + chữ), bo góc 16px, hiệu ứng 200ms mượt mà.

Header (Thanh trạng thái Bento):
- Thương hiệu: "UrbanShield Lite | SingleNode".
- Chỉ số trực tiếp: "CPU phổ thông (YOLOv8n)", "Bộ đệm RAM (Không lưu video)", "28.5 FPS", "3 Trạm Online".
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
- Bản đồ ngõ xóm tối màu với 3 ghim camera đổi màu động.
```
