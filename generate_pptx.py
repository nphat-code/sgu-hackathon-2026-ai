import collections.abc
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]  # Blank slide

    # Color Palette - Clean White & Minimalist Tech (Stripe / Apple Style)
    C_WHITE = RGBColor(255, 255, 255)
    C_BG_SUBTLE = RGBColor(248, 250, 252) # #F8FAFC
    C_TEXT_MAIN = RGBColor(15, 23, 42)    # #0F172A Deep Slate
    C_TEXT_MUTED = RGBColor(100, 116, 139) # #64748B Slate Grey
    C_PRIMARY = RGBColor(37, 99, 235)     # #2563EB Royal Blue
    C_PRIMARY_LIGHT = RGBColor(239, 246, 255) # #EFF6FF
    C_SUCCESS = RGBColor(5, 150, 105)     # #059669 Emerald Green
    C_SUCCESS_LIGHT = RGBColor(236, 253, 245)
    C_DANGER = RGBColor(220, 38, 38)      # #DC2626 Crimson
    C_DANGER_LIGHT = RGBColor(254, 242, 242)
    C_BORDER = RGBColor(226, 232, 240)    # #E2E8F0

    def set_white_bg(slide):
        bg = slide.background
        fill = bg.fill
        fill.solid()
        fill.fore_color.rgb = C_WHITE

    def add_header(slide, badge_text, title_text, subtitle_text):
        # Badge
        badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.5), Inches(3.2), Inches(0.38))
        badge.fill.solid()
        badge.fill.fore_color.rgb = C_PRIMARY_LIGHT
        badge.line.color.rgb = C_PRIMARY
        badge.line.width = Pt(1)
        tf = badge.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = badge_text.upper()
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_PRIMARY
        p.alignment = PP_ALIGN.CENTER

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.95), Inches(9.5), Inches(0.8))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_MAIN

        p_sub = tf_t.add_paragraph()
        p_sub.text = subtitle_text
        p_sub.font.size = Pt(13)
        p_sub.font.color.rgb = C_TEXT_MUTED

        # Brand mark on top-right
        brand_box = slide.shapes.add_textbox(Inches(10.2), Inches(0.5), Inches(2.3), Inches(0.4))
        tf_b = brand_box.text_frame
        p_b = tf_b.paragraphs[0]
        p_b.text = "● UrbanShield Lite"
        p_b.font.size = Pt(12)
        p_b.font.bold = True
        p_b.font.color.rgb = C_PRIMARY
        p_b.alignment = PP_ALIGN.RIGHT

        # Thin header divider line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.85), Inches(11.733), Inches(0.015))
        line.fill.solid()
        line.fill.fore_color.rgb = C_BORDER
        line.line.color.rgb = C_BORDER

    # ==========================================
    # SLIDE 1: COVER
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    set_white_bg(s1)

    # Hero Badge
    s1_badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.5), Inches(1.3), Inches(4.333), Inches(0.45))
    s1_badge.fill.solid()
    s1_badge.fill.fore_color.rgb = C_PRIMARY_LIGHT
    s1_badge.line.color.rgb = C_PRIMARY
    tf = s1_badge.text_frame
    p = tf.paragraphs[0]
    p.text = "🛡️ HACKATHON SGU 2026 – VÒNG SƠ LOẠI"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY
    p.alignment = PP_ALIGN.CENTER

    # Main Title
    t_box = s1.shapes.add_textbox(Inches(1.5), Inches(1.95), Inches(10.333), Inches(1.3))
    tf = t_box.text_frame
    p = tf.paragraphs[0]
    p.text = "URBANSHIELD LITE"
    p.font.size = Pt(46)
    p.font.bold = True
    p.font.color.rgb = C_TEXT_MAIN
    p.alignment = PP_ALIGN.CENTER

    # Slogan
    slog_box = s1.shapes.add_textbox(Inches(2.0), Inches(3.2), Inches(9.333), Inches(1.2))
    tf = slog_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Mạng Lưới Thị Giác AI Phân Tán – Giữ An Toàn Từng Góc Phố Sài Gòn"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY
    p.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "Bảo vệ sinh viên & người dân trước ngập lụt và tai nạn giao thông bằng Edge AI tiết kiệm chi phí"
    p2.font.size = Pt(14)
    p2.font.color.rgb = C_TEXT_MUTED
    p2.alignment = PP_ALIGN.CENTER

    # Meta cards at bottom
    meta_items = [
        ("ĐỘI THI", "SingleNode (Thí sinh độc lập)"),
        ("TÁC GIẢ", "Nguyễn Phúc Phát (@nphat-code)"),
        ("TRƯỜNG HỌC", "Trường Đại học Sài Gòn (SGU)"),
        ("CHỦ ĐỀ", "AI An Toàn Đô Thị & Tiết Kiệm")
    ]
    for i, (k, v) in enumerate(meta_items):
        x = Inches(0.8 + i * 3.0)
        card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.3), Inches(2.75), Inches(1.3))
        card.fill.solid()
        card.fill.fore_color.rgb = C_BG_SUBTLE
        card.line.color.rgb = C_BORDER
        tf = card.text_frame
        tf.word_wrap = True
        p_k = tf.paragraphs[0]
        p_k.text = k
        p_k.font.size = Pt(11)
        p_k.font.bold = True
        p_k.font.color.rgb = C_TEXT_MUTED
        p_v = tf.add_paragraph()
        p_v.text = v
        p_v.font.size = Pt(13)
        p_v.font.bold = True
        p_v.font.color.rgb = C_TEXT_MAIN

    # ==========================================
    # SLIDE 2: VẤN ĐỀ THỰC TIỄN
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    set_white_bg(s2)
    add_header(s2, "01. Vấn Đề Thực Tiễn", "Hai Nghịch Lý An Toàn Tại TP. Hồ Chí Minh", "Những hiểm họa kinh niên sinh viên & người dân phải đối mặt mỗi ngày")

    # Card 1: Ngập lụt
    c1 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.2), Inches(5.7), Inches(4.5))
    c1.fill.solid()
    c1.fill.fore_color.rgb = C_BG_SUBTLE
    c1.line.color.rgb = C_BORDER
    tf1 = c1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "🌊 NỖI ĐAU 1: NGẬP LỤT ĐỘT NGỘT & CHẾT MÁY XE"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    bullets1 = [
        "Mưa lớn và triều cường khiến các trục đường quanh ĐH Sài Gòn (An Dương Vương, Nguyễn Văn Cừ) ngập sâu bất ngờ.",
        "Hàng nghìn xe máy chết máy la liệt, người dân dắt bộ kiệt sức giữa dòng nước bẩn.",
        "Nguy cơ tử vong tiềm ẩn từ nắp hố ga bật trôi hoặc dây điện rò rỉ dưới nước.",
        "Ứng dụng bản đồ hiện tại (Google Maps) chỉ báo kẹt xe, hoàn toàn không đo được mực nước ngập sâu bao nhiêu cm."
    ]
    for b in bullets1:
        pb = tf1.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(13)
        pb.font.color.rgb = C_TEXT_MUTED

    # Card 2: Tai nạn ngõ hẻm
    c2 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.2), Inches(5.7), Inches(4.5))
    c2.fill.solid()
    c2.fill.fore_color.rgb = C_BG_SUBTLE
    c2.line.color.rgb = C_BORDER
    tf2 = c2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "🚨 NỖI ĐAU 2: TAI NẠN NGÕ HẺM & BỎ LỠ CẤP CỨU"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_DANGER

    bullets2 = [
        "TP.HCM có hơn 60% dân cư sinh sống trong các con ngõ, hẻm sâu chật hẹp.",
        "Các vụ té xe máy, va chạm lúc nửa đêm thường không có người qua lại để phát hiện và hỗ trợ.",
        "Bỏ lỡ 'Thời gian vàng' 15 phút sơ cứu y tế khiến nhiều nạn nhân thương tật vĩnh viễn hoặc tử vong thương tâm.",
        "Người dân và lực lượng cứu hộ chỉ biết thông tin sau khi quá muộn vì thiếu trạm cảnh báo tự động."
    ]
    for b in bullets2:
        pb = tf2.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(13)
        pb.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 3: NGHỊCH LÝ CHI PHÍ SMART CITY
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    set_white_bg(s3)
    add_header(s3, "02. Nút Thắt Công Nghệ", "Tại Sao Smart City Chưa Thể Phủ Sóng Từng Con Hẻm?", "Mô hình tập trung truyền thống đòi hỏi chi phí đầu tư khổng lồ")

    # Table
    rows = [
        ("Tiêu Chí So Sánh", "Smart City Truyền Thống", "UrbanShield Lite (Đề Xuất)"),
        ("1. Chi phí Camera", "15 - 30 triệu VNĐ / mắt (Camera AI chuyên dụng)", "200.000 VNĐ (Webcam / Camera dân sinh / Phone cũ)"),
        ("2. Hạ tầng xử lý", "Hàng trăm triệu VNĐ (Server GPU tập trung đồ sộ)", "0 VNĐ (Chạy Edge AI trên CPU laptop/máy phổ thông)"),
        ("3. Băng thông mạng", "Stream video HD 24/7 (Cực tốn băng thông & lưu trữ)", "Chỉ gửi Alert Metadata < 5KB khi có sự cố (Giảm 99%)"),
        ("4. Kênh cảnh báo", "Hệ thống nội bộ cồng kềnh, người dân khó tiếp cận", "Báo tức thời qua Telegram Bot API & Web Map mở (0đ)"),
        ("5. Khả năng phủ sóng", "Chỉ vài ngã tư lớn; bỏ trống 90% ngõ hẻm", "Dân chủ hóa: Tổ dân phố & sinh viên đều tự lắp được")
    ]

    t_shape = s3.shapes.add_table(len(rows), 3, Inches(0.8), Inches(2.2), Inches(11.733), Inches(4.5))
    table = t_shape.table
    table.columns[0].width = Inches(2.5)
    table.columns[1].width = Inches(4.6)
    table.columns[2].width = Inches(4.633)

    for r_idx, row in enumerate(rows):
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx, c_idx)
            cell.text = val
            p = cell.text_frame.paragraphs[0]
            if r_idx == 0:
                cell.fill.solid()
                cell.fill.fore_color.rgb = C_PRIMARY_LIGHT
                p.font.bold = True
                p.font.size = Pt(13)
                p.font.color.rgb = C_PRIMARY
            else:
                p.font.size = Pt(12)
                if c_idx == 2:
                    cell.fill.solid()
                    cell.fill.fore_color.rgb = C_SUCCESS_LIGHT
                    p.font.bold = True
                    p.font.color.rgb = C_SUCCESS
                elif c_idx == 1:
                    p.font.color.rgb = C_DANGER
                else:
                    p.font.bold = True
                    p.font.color.rgb = C_TEXT_MAIN

    # ==========================================
    # SLIDE 4: GIẢI PHÁP ĐỘT PHÁ
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    set_white_bg(s4)
    add_header(s4, "03. Giải Pháp", "UrbanShield Lite – Mạng Lưới Thị Giác AI Phân Tán", "Tận dụng triệt để phần cứng bình dân kết hợp mô hình Edge AI siêu nhẹ")

    pillars = [
        ("⚡ MÔ HÌNH EDGE SIÊU NHẸ", [
            "Mô hình YOLOv8-nano (~6.5MB) được tối ưu hóa xử lý tại biên.",
            "Tốc độ xử lý 30+ FPS trực tiếp trên CPU phổ thông, không cần GPU rời.",
            "Độ trễ phản hồi cực thấp: Chỉ 35ms cho mỗi khung hình suy luận.",
            "Chi phí phần cứng máy chủ trung tâm: 0 đồng."
        ], C_PRIMARY, C_PRIMARY_LIGHT),
        ("📐 THUẬT TOÁN ĐO NGẬP VẬT LÝ", [
            "Thuật toán Optical Wheel-Occlusion Ratio độc quyền.",
            "Nhận diện bánh xe máy (đường kính chuẩn 50cm) và tỷ lệ che khuất.",
            "Đo chính xác mực nước ngập theo cm (Vd: 26cm - nguy cơ chết máy).",
            "Không cần mua hay lắp đặt cảm biến thủy văn đắt đỏ."
        ], C_SUCCESS, C_SUCCESS_LIGHT),
        ("🚨 CẢNH BÁO TỨC THỜI 0 ĐỒNG", [
            "Tích hợp Telegram Bot API gửi ảnh hiện trường và GPS trong 1 giây.",
            "Bản đồ an toàn đô thị nguồn mở Leaflet / OpenStreetMap.",
            "Tự động kích hoạt chuông báo động và chỉ đường người dân tránh ngập.",
            "Bảo vệ quyền riêng tư: Xử lý tại biên, không lưu hình ảnh nhạy cảm."
        ], C_DANGER, C_DANGER_LIGHT)
    ]

    for i, (title, items, border_c, bg_c) in enumerate(pillars):
        x = Inches(0.8 + i * 4.0)
        c = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.2), Inches(3.733), Inches(4.5))
        c.fill.solid()
        c.fill.fore_color.rgb = C_WHITE
        c.line.color.rgb = border_c
        c.line.width = Pt(1.5)
        tf = c.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = border_c

        for it in items:
            pi = tf.add_paragraph()
            pi.text = "• " + it
            pi.font.size = Pt(12)
            pi.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 5: KỸ THUẬT CỐT LÕI & LIVE DEMO
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    set_white_bg(s5)
    add_header(s5, "04. Kỹ Thuật Cốt Lõi", "Cơ Chế Phát Hiện Thực Tế: Ngập Lụt & Cứu Nạn SOS", "Mã nguồn đã được xác thực hoạt động ổn định trên hệ thống thật")

    # Box 1: Ngập lụt
    b1 = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.2), Inches(5.7), Inches(4.5))
    b1.fill.solid()
    b1.fill.fore_color.rgb = C_PRIMARY_LIGHT
    b1.line.color.rgb = C_PRIMARY
    b1.line.width = Pt(1.5)
    tf1 = b1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "🌊 KỊCH BẢN 1: ĐO ĐỘ SÂU NGẬP LỤT (35ms)"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    metric1 = tf1.add_paragraph()
    metric1.text = "MỰC NƯỚC: 26 CM (TỶ LỆ 52%)"
    metric1.font.size = Pt(20)
    metric1.font.bold = True
    metric1.font.color.rgb = C_TEXT_MAIN

    bullets_s1 = [
        "Công thức: Depth (cm) = Occlusion_Ratio × 50cm (Bánh xe chuẩn).",
        "Khi nước chạm 15cm (ngập mép pô): Cảnh báo mức Vàng (Chú ý).",
        "Khi nước vượt 25cm (ngập nửa bánh xe): Cảnh báo Đỏ (Nguy hiểm chết máy).",
        "Tự động vẽ viền Polygon ngập màu đỏ và cảnh báo người lái xe quay đầu.",
        "Đã thử nghiệm thực tế tại trạm Cổng ĐH Sài Gòn (An Dương Vương)."
    ]
    for b in bullets_s1:
        pb = tf1.add_paragraph()
        pb.text = "✓ " + b
        pb.font.size = Pt(12)
        pb.font.color.rgb = C_TEXT_MAIN

    # Box 2: Ngã xe SOS
    b2 = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.2), Inches(5.7), Inches(4.5))
    b2.fill.solid()
    b2.fill.fore_color.rgb = C_DANGER_LIGHT
    b2.line.color.rgb = C_DANGER
    b2.line.width = Pt(1.5)
    tf2 = b2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "🚨 KỊCH BẢN 2: PHÁT HIỆN TÉ XE & BẤT ĐỘNG SOS"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_DANGER

    metric2 = tf2.add_paragraph()
    metric2.text = "TỶ LỆ KHUNG HÌNH W/H > 1.3 & INACTIVITY > 5s"
    metric2.font.size = Pt(18)
    metric2.font.bold = True
    metric2.font.color.rgb = C_TEXT_MAIN

    bullets_s2 = [
        "Người ngã có tỷ lệ khung hình ngang đổi bất thường (Width > Height).",
        "Bộ đếm thời gian bất động (Inactivity Timer > 5 giây) để chống báo động giả khi người dân chỉ ngồi xổm hoặc nhặt đồ.",
        "Ngay khi vượt ngưỡng 5s: Kích hoạt còi báo động tại trạm.",
        "Gửi thông báo SOS đỏ chói về Telegram Tổ cứu hộ kèm tọa độ GPS.",
        "Giúp rút ngắn thời gian tiếp cận y tế từ 45 phút xuống dưới 3 phút."
    ]
    for b in bullets_s2:
        pb = tf2.add_paragraph()
        pb.text = "✓ " + b
        pb.font.size = Pt(12)
        pb.font.color.rgb = C_TEXT_MAIN

    # ==========================================
    # SLIDE 6: TRUNG TÂM GIÁM SÁT & BẢN ĐỒ QUẬN 5
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    set_white_bg(s6)
    add_header(s6, "05. Giao Diện & Vận Hành", "Trung Tâm Giám Sát Dân Sinh & Bản Đồ Số Quận 5", "Tích hợp bản đồ OpenStreetMap trực quan bao quanh Trường ĐH Sài Gòn")

    stations = [
        ("📍 TRẠM 01: CỔNG ĐH SÀI GÒN", "273 An Dương Vương, Phường 3, Quận 5", "Giám sát ngập lụt mùa mưa & bảo vệ sinh viên SGU tan trường", C_PRIMARY),
        ("📍 TRẠM 02: NGÃ TƯ NVC - THĐ", "Ngã tư Nguyễn Văn Cừ & Trần Hưng Đạo", "Trọng điểm giao thông kết nối Quận 1 và Quận 5", C_SUCCESS),
        ("📍 TRẠM 03: HẺM 105 TRẦN HƯNG ĐẠO", "Khu dân cư đông đúc, hẻm nhỏ vắng người", "Giám sát tai nạn xe máy đêm khuya và hỗ trợ y tế khẩn cấp", C_DANGER)
    ]
    for i, (name, addr, desc, col) in enumerate(stations):
        y = Inches(2.2 + i * 1.5)
        st_card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.733), Inches(1.3))
        st_card.fill.solid()
        st_card.fill.fore_color.rgb = C_BG_SUBTLE
        st_card.line.color.rgb = col
        st_card.line.width = Pt(1.5)
        tf = st_card.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = name + "  |  " + addr
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = col

        p_desc = tf.add_paragraph()
        p_desc.text = "Nhiệm vụ: " + desc
        p_desc.font.size = Pt(13)
        p_desc.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 7: TÍNH KHẢ THI & KẾ HOẠCH 24H
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    set_white_bg(s7)
    add_header(s7, "06. Kế Hoạch Triển Khai", "Lộ Trình Phát Triển Tại Vòng Chung Kết 24 Giờ", "Sẵn sàng thi đấu với nền tảng phần mềm đã chạy thực nghiệm hoàn hảo")

    phases = [
        ("GIAI ĐOẠN 1: HIỆN TẠI (ĐÃ XONG)", [
            "Đề án ý tưởng & Kịch bản Pitching hoàn chỉnh.",
            "Backend FastAPI + YOLOv8n detector chạy mượt 35ms.",
            "Frontend React + Leaflet Map hiển thị 3 trạm Quận 5.",
            "Kiểm thử thành công 2 kịch bản Ngập lụt & SOS ngã xe."
        ], C_SUCCESS),
        ("GIAI ĐOẠN 2: 24H CHUNG KẾT", [
            "Tích hợp WebRTC truyền luồng hình ảnh trực tiếp không giật lag.",
            "Thử nghiệm WebGPU chạy suy luận AI trên trình duyệt di động.",
            "Kết nối trực tiếp Bot Telegram gửi thông báo vào điện thoại BGK.",
            "Đóng gói 1-Click Docker triển khai tức thì trên máy chấm thi."
        ], C_PRIMARY),
        ("GIAI ĐOẠN 3: TƯƠNG LAI DÂN SINH", [
            "Thí điểm tại các ngõ hẻm Quận 5 và Hội Sinh viên SGU.",
            "Mở mã nguồn cho cộng đồng tự triển khai camera an toàn.",
            "Tích hợp dữ liệu mở cảnh báo ngập vào ứng dụng TP.HCM.",
            "Nâng cấp mô hình phát hiện trộm cắp và cháy nổ ban đêm."
        ], C_TEXT_MAIN)
    ]
    for i, (title, points, col) in enumerate(phases):
        x = Inches(0.8 + i * 4.0)
        c = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(2.2), Inches(3.733), Inches(4.5))
        c.fill.solid()
        c.fill.fore_color.rgb = C_BG_SUBTLE
        c.line.color.rgb = col
        c.line.width = Pt(1.5)
        tf = c.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = col

        for pt in points:
            pp = tf.add_paragraph()
            pp.text = "• " + pt
            pp.font.size = Pt(12)
            pp.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 8: KẾT LUẬN & SỨ MỆNH
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    set_white_bg(s8)

    badge = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.5), Inches(1.3), Inches(4.333), Inches(0.45))
    badge.fill.solid()
    badge.fill.fore_color.rgb = C_SUCCESS_LIGHT
    badge.line.color.rgb = C_SUCCESS
    tf = badge.text_frame
    p = tf.paragraphs[0]
    p.text = "🤝 KẾT LUẬN & CAM KẾT HÀNH ĐỘNG"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_SUCCESS
    p.alignment = PP_ALIGN.CENTER

    t_box = s8.shapes.add_textbox(Inches(1.5), Inches(2.0), Inches(10.333), Inches(1.4))
    tf = t_box.text_frame
    p = tf.paragraphs[0]
    p.text = "“Một Góc Phố, Một Điểm Chạm An Toàn”"
    p.font.size = Pt(38)
    p.font.bold = True
    p.font.color.rgb = C_TEXT_MAIN
    p.alignment = PP_ALIGN.CENTER

    sub_box = s8.shapes.add_textbox(Inches(1.8), Inches(3.3), Inches(9.733), Inches(1.5))
    tf = sub_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "UrbanShield Lite chứng minh rằng: AI đỉnh cao không nhất thiết phải xa xỉ nghìn tỷ.\nBằng tư duy tối ưu hóa và tinh thần phụng sự cộng đồng, chúng em mang công nghệ AI bảo vệ từng sinh viên và người dân bình dị nhất."
    p.font.size = Pt(16)
    p.font.color.rgb = C_TEXT_MUTED
    p.alignment = PP_ALIGN.CENTER

    # Final Footer card
    foot_card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(2.5), Inches(5.0), Inches(8.333), Inches(1.6))
    foot_card.fill.solid()
    foot_card.fill.fore_color.rgb = C_BG_SUBTLE
    foot_card.line.color.rgb = C_PRIMARY
    tf = foot_card.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "ĐỘI THI SINGLENODE – HACKATHON SGU 2026"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY
    p.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "Xin chân thành cảm ơn Quý Thầy Cô và Ban Giám Khảo đã lắng nghe!"
    p2.font.size = Pt(14)
    p2.font.color.rgb = C_TEXT_MAIN
    p2.alignment = PP_ALIGN.CENTER

    output_path = "c:/Competition/HackathonSGU2026/SingleNode_UrbanShieldLite_Slides.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

if __name__ == "__main__":
    create_deck()
