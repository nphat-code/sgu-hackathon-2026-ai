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
    blank_layout = prs.slide_layouts[6]

    # Color Palette - Clean White & Minimalist (Factual, modest)
    C_WHITE = RGBColor(255, 255, 255)
    C_BG_SUBTLE = RGBColor(248, 250, 252) # #F8FAFC
    C_TEXT_MAIN = RGBColor(15, 23, 42)    # #0F172A
    C_TEXT_MUTED = RGBColor(71, 85, 105)  # #475569
    C_PRIMARY = RGBColor(37, 99, 235)     # #2563EB
    C_PRIMARY_LIGHT = RGBColor(239, 246, 255)
    C_SUCCESS = RGBColor(5, 150, 105)     # #059669
    C_SUCCESS_LIGHT = RGBColor(236, 253, 245)
    C_DANGER = RGBColor(220, 38, 38)      # #DC2626
    C_DANGER_LIGHT = RGBColor(254, 242, 242)
    C_BORDER = RGBColor(226, 232, 240)

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
        p_t.font.size = Pt(23)
        p_t.font.bold = True
        p_t.font.color.rgb = C_TEXT_MAIN

        p_sub = tf_t.add_paragraph()
        p_sub.text = subtitle_text
        p_sub.font.size = Pt(13)
        p_sub.font.color.rgb = C_TEXT_MUTED

        # Brand mark
        brand_box = slide.shapes.add_textbox(Inches(10.2), Inches(0.5), Inches(2.3), Inches(0.4))
        tf_b = brand_box.text_frame
        p_b = tf_b.paragraphs[0]
        p_b.text = "● UrbanShield Lite"
        p_b.font.size = Pt(12)
        p_b.font.bold = True
        p_b.font.color.rgb = C_PRIMARY
        p_b.alignment = PP_ALIGN.RIGHT

        # Divider
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.85), Inches(11.733), Inches(0.015))
        line.fill.solid()
        line.fill.fore_color.rgb = C_BORDER
        line.line.color.rgb = C_BORDER

    # ==========================================
    # SLIDE 1: COVER
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    set_white_bg(s1)

    s1_badge = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.5), Inches(1.3), Inches(4.333), Inches(0.45))
    s1_badge.fill.solid()
    s1_badge.fill.fore_color.rgb = C_PRIMARY_LIGHT
    s1_badge.line.color.rgb = C_PRIMARY
    tf = s1_badge.text_frame
    p = tf.paragraphs[0]
    p.text = "ĐỀ XUẤT KỸ THUẬT"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY
    p.alignment = PP_ALIGN.CENTER

    t_box = s1.shapes.add_textbox(Inches(1.5), Inches(1.95), Inches(10.333), Inches(1.2))
    tf = t_box.text_frame
    p = tf.paragraphs[0]
    p.text = "URBANSHIELD LITE"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = C_TEXT_MAIN
    p.alignment = PP_ALIGN.CENTER

    slog_box = s1.shapes.add_textbox(Inches(2.0), Inches(3.2), Inches(9.333), Inches(1.2))
    tf = slog_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Đề xuất giải pháp hỗ trợ theo dõi ngập nước và sự cố giao thông sử dụng mô hình AI biên"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY
    p.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "Ứng dụng mô hình thị giác máy tính gọn nhẹ kết hợp thiết bị phần cứng phổ thông"
    p2.font.size = Pt(14)
    p2.font.color.rgb = C_TEXT_MUTED
    p2.alignment = PP_ALIGN.CENTER

    meta_items = [
        ("ĐƠN VỊ PHÁT TRIỂN", "SingleNode"),
        ("MÔ HÌNH SỬ DỤNG", "YOLOv8-nano + OpenCV"),
        ("MÔI TRƯỜNG THỰC THI", "CPU máy tính phổ thông"),
        ("PHẠM VI ỨNG DỤNG", "Theo dõi ngập & Hỗ trợ sự cố")
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
    # SLIDE 2: BỐI CẢNH THỰC TẾ
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    set_white_bg(s2)
    add_header(s2, "01. Bối Cảnh Thực Tế", "Tình Huống Cần Giải Quyết: Ngập Nước & Sự Cố Giao Thông", "Hai vấn đề thực tế thường gặp trong giao thông đô thị")

    c1 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.2), Inches(5.7), Inches(4.5))
    c1.fill.solid()
    c1.fill.fore_color.rgb = C_BG_SUBTLE
    c1.line.color.rgb = C_BORDER
    tf1 = c1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "1. TÌNH TRẠNG NGẬP NƯỚC CỤC BỘ"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    bullets1 = [
        "Mưa lớn và triều cường thường gây ngập nước trên các tuyến đường trũng thấp.",
        "Phương tiện xe máy có thể bị chết máy khi nước ngập cao hơn ống xả.",
        "Người tham gia giao thông khó ước lượng độ sâu thực tế trước khi đi vào vùng ngập.",
        "Các giải pháp bản đồ số hiện tại chủ yếu báo kẹt xe, chưa cung cấp thông tin độ sâu ngập."
    ]
    for b in bullets1:
        pb = tf1.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(13)
        pb.font.color.rgb = C_TEXT_MUTED

    c2 = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.2), Inches(5.7), Inches(4.5))
    c2.fill.solid()
    c2.fill.fore_color.rgb = C_BG_SUBTLE
    c2.line.color.rgb = C_BORDER
    tf2 = c2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "2. SỰ CỐ NGÃ XE TẠI KHU VỰC VẮNG NGƯỜI"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_DANGER

    bullets2 = [
        "Sự cố trượt ngã hoặc va chạm xe máy ban đêm trong ngõ xóm vắng người có thể chậm được phát hiện.",
        "Người gặp nạn khi bất động hoặc chấn thương cần được tiếp cận hỗ trợ kịp thời.",
        "Thiếu cơ chế cảnh báo tự động khi khu vực xung quanh không có người qua lại.",
        "Cần giải pháp quan sát thụ động để kịp thời thông tin cho người phụ trách ứng cứu."
    ]
    for b in bullets2:
        pb = tf2.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(13)
        pb.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 3: KHẢO SÁT KỸ THUẬT
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    set_white_bg(s3)
    add_header(s3, "02. Khảo Sát Kỹ Thuật", "Đặc Điểm Của Các Phương Án Giám Sát", "So sánh yêu cầu hạ tầng giữa hệ thống tập trung và mô hình xử lý tại biên")

    rows = [
        ("Hạng mục so sánh", "Hệ thống camera truyền thống", "Mô hình đề xuất UrbanShield Lite"),
        ("Thiết bị thu nhận", "Camera IP chuyên dụng", "Tận dụng camera hoặc webcam sẵn có"),
        ("Hạ tầng tính toán", "Máy chủ GPU trung tâm", "Chạy mô hình thu gọn trên CPU phổ thông"),
        ("Phương thức truyền tải", "Truyền luồng video liên tục về máy chủ", "Xử lý tại biên; gửi dữ liệu theo sự kiện"),
        ("Phương thức thông báo", "Hệ thống nội bộ chuyên biệt", "Gửi thông báo qua Telegram Bot và bản đồ số"),
        ("Khả năng mở rộng", "Yêu cầu chi phí lớn cho hạ tầng trung tâm", "Có thể triển khai linh hoạt tại nhiều vị trí")
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
                    p.font.color.rgb = C_TEXT_MUTED
                else:
                    p.font.bold = True
                    p.font.color.rgb = C_TEXT_MAIN

    # ==========================================
    # SLIDE 4: PHƯƠNG PHÁP TIẾP CẬN
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    set_white_bg(s4)
    add_header(s4, "03. Phương Pháp Tiếp Cận", "Mô Hình Tiếp Cận Đề Xuất", "Ứng dụng mô hình AI biên nhỏ gọn và tận dụng thiết bị sẵn có")

    pillars = [
        ("MÔ HÌNH XỬ LÝ CỤC BỘ", [
            "Sử dụng mô hình nhận diện vật thể YOLOv8-nano (~6.5MB).",
            "Mô hình được tối ưu để chạy trực tiếp trên CPU thông thường.",
            "Tốc độ xử lý đáp ứng yêu cầu theo dõi khung hình định kỳ.",
            "Giảm phụ thuộc vào kết nối máy chủ đám mây liên tục."
        ], C_PRIMARY, C_PRIMARY_LIGHT),
        ("ƯỚC LƯỢNG ĐỘ SÂU HÌNH HỌC", [
            "Ước lượng độ sâu dựa trên tỷ lệ che khuất bánh xe máy thực tế.",
            "Bánh xe máy có kích thước tiêu chuẩn (~50cm), thuận tiện làm mốc.",
            "Phân loại độ sâu theo các ngưỡng cảnh báo thực tế.",
            "Giảm nhu cầu lắp đặt và bảo trì cảm biến thủy văn chìm."
        ], C_SUCCESS, C_SUCCESS_LIGHT),
        ("THÔNG BÁO THEO SỰ KIỆN", [
            "Gửi thông báo qua Telegram Bot khi phát hiện sự kiện.",
            "Hiển thị trạng thái các điểm quan sát trên nền bản đồ số.",
            "Chỉ gửi hình ảnh hiện trường tại thời điểm phát hiện sự cố.",
            "Bảo vệ dữ liệu: Giải phóng bộ nhớ tạm ngay sau khi suy luận."
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
    # SLIDE 5: CƠ CHẾ HOẠT ĐỘNG
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    set_white_bg(s5)
    add_header(s5, "04. Cơ Chế Hoạt Động", "Cơ Chế Phát Hiện Ngập Nước & Sự Cố Ngã Xe", "Các bước phân tích hình thái học và logic xác thực sự kiện")

    b1 = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.2), Inches(5.7), Inches(4.5))
    b1.fill.solid()
    b1.fill.fore_color.rgb = C_PRIMARY_LIGHT
    b1.line.color.rgb = C_PRIMARY
    b1.line.width = Pt(1.5)
    tf1 = b1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "1. ƯỚC LƯỢNG MỰC NƯỚC NGẬP"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    metric1 = tf1.add_paragraph()
    metric1.text = "DEPTH = OCCLUSION_RATIO × 50CM"
    metric1.font.size = Pt(16)
    metric1.font.bold = True
    metric1.font.color.rgb = C_TEXT_MAIN

    bullets_s1 = [
        "Nhận diện phương tiện xe máy di chuyển qua khu vực có nước.",
        "Xác định tỷ lệ phần dưới bánh xe bị nước che khuất (Occlusion Ratio).",
        "Phân loại các ngưỡng: Mức chú ý (~15cm) và Mức cảnh báo sâu (>25cm).",
        "Cập nhật trạng thái điểm ngập lên bản đồ theo dõi chung.",
        "Ưu điểm: Không cần lắp đặt cảm biến chìm dưới lòng đường."
    ]
    for b in bullets_s1:
        pb = tf1.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(12)
        pb.font.color.rgb = C_TEXT_MAIN

    b2 = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(2.2), Inches(5.7), Inches(4.5))
    b2.fill.solid()
    b2.fill.fore_color.rgb = C_DANGER_LIGHT
    b2.line.color.rgb = C_DANGER
    b2.line.width = Pt(1.5)
    tf2 = b2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "2. HỖ TRỢ PHÁT HIỆN SỰ CỐ NGÃ XE"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_DANGER

    metric2 = tf2.add_paragraph()
    metric2.text = "WIDTH / HEIGHT > 1.3 & TIMER > 5S"
    metric2.font.size = Pt(16)
    metric2.font.bold = True
    metric2.font.color.rgb = C_TEXT_MAIN

    bullets_s2 = [
        "Nhận diện tư thế cơ thể nằm ngang bất thường trên mặt đường.",
        "Theo dõi trạng thái liên tục trong 5 giây nhằm giảm thiểu cảnh báo nhầm.",
        "Nếu đối tượng không thay đổi vị trí, kích hoạt gói tin thông báo sự cố.",
        "Gửi hình ảnh ghi nhận và vị trí đến người phụ trách để kịp thời hỗ trợ.",
        "Giúp rút ngắn thời gian phát hiện khi xảy ra sự cố trong khu vực vắng người."
    ]
    for b in bullets_s2:
        pb = tf2.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(12)
        pb.font.color.rgb = C_TEXT_MAIN

    # ==========================================
    # SLIDE 6: MÔ HÌNH VẬN HÀNH
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    set_white_bg(s6)
    add_header(s6, "05. Mô Hình Vận Hành", "Mô Hình Vận Hành & Thu Thập Dữ Liệu", "Phân loại vị trí quan sát và quy trình xử lý thông tin")

    stations = [
        ("ĐIỂM 01: TUYẾN ĐƯỜNG TRŨNG THẤP", "Khu vực thường xảy ra ngập nước", "Theo dõi biến động mực nước và hỗ trợ cảnh báo phương tiện", C_PRIMARY),
        ("ĐIỂM 02: NÚT GIAO THÔNG", "Khu vực giao lộ có lưu lượng phương tiện", "Quan sát dòng xe và hỗ trợ thông tin lưu thông", C_SUCCESS),
        ("ĐIỂM 03: KHU VỰC NGÕ HẺM", "Khu dân cư vắng người qua lại vào ban đêm", "Hỗ trợ phát hiện tai nạn ngã xe và thông báo cho người phụ trách", C_DANGER)
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
        p_desc.text = "Chức năng chính: " + desc
        p_desc.font.size = Pt(13)
        p_desc.font.color.rgb = C_TEXT_MUTED

    # ==========================================
    # SLIDE 7: TÍNH KHẢ THI
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    set_white_bg(s7)
    add_header(s7, "06. Đánh Giá Khả Thi", "Đánh Giá Tính Khả Thi Trong Thực Tế", "Xem xét về phần cứng, hạ tầng truyền dẫn và bảo vệ dữ liệu")

    phases = [
        ("YÊU CẦU PHẦN CỨNG", [
            "Có thể vận hành trên các máy tính phổ thông hoặc camera sẵn có.",
            "Không bắt buộc trang bị card đồ họa rời tại từng vị trí lắp đặt.",
            "Giảm chi phí mua sắm thiết bị ban đầu.",
            "Phù hợp cho việc triển khai thử nghiệm diện hẹp."
        ], C_SUCCESS),
        ("HẠ TẦNG TRUYỀN DẪN", [
            "Không cần truyền luồng video liên tục 24/7 về máy chủ trung tâm.",
            "Chỉ gửi gói tin dữ liệu sự kiện khi có ngập nước hoặc tai nạn.",
            "Phù hợp với hạ tầng mạng Internet cơ bản.",
            "Có thể mở rộng thêm điểm quan sát mới mà không làm nghẽn mạng."
        ], C_PRIMARY),
        ("BẢO VỆ QUYỀN RIÊNG TƯ", [
            "Dữ liệu video được phân tích tại biên và giải phóng bộ nhớ sau khi suy luận.",
            "Hệ thống không nhận diện khuôn mặt hay thông tin cá nhân của người dân.",
            "Chỉ lưu trữ hình ảnh hiện trường tại thời điểm phát hiện sự kiện.",
            "Phù hợp với yêu cầu bảo vệ quyền riêng tư nơi công cộng."
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
    # SLIDE 8: TỔNG KẾT
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    set_white_bg(s8)

    badge = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.5), Inches(1.3), Inches(4.333), Inches(0.45))
    badge.fill.solid()
    badge.fill.fore_color.rgb = C_SUCCESS_LIGHT
    badge.line.color.rgb = C_SUCCESS
    tf = badge.text_frame
    p = tf.paragraphs[0]
    p.text = "TỔNG KẾT ĐỀ XUẤT"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_SUCCESS
    p.alignment = PP_ALIGN.CENTER

    t_box = s8.shapes.add_textbox(Inches(1.5), Inches(2.0), Inches(10.333), Inches(1.2))
    tf = t_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Tóm Tắt Đề Xuất UrbanShield Lite"
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = C_TEXT_MAIN
    p.alignment = PP_ALIGN.CENTER

    sub_box = s8.shapes.add_textbox(Inches(1.8), Inches(3.2), Inches(9.733), Inches(1.5))
    tf = sub_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Đề xuất kỹ thuật tập trung vào tính khả thi: ứng dụng mô hình AI biên nhỏ gọn trên phần cứng phổ thông để hỗ trợ theo dõi ngập nước và phát hiện sự cố giao thông đô thị."
    p.font.size = Pt(16)
    p.font.color.rgb = C_TEXT_MUTED
    p.alignment = PP_ALIGN.CENTER

    foot_card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(2.5), Inches(5.0), Inches(8.333), Inches(1.6))
    foot_card.fill.solid()
    foot_card.fill.fore_color.rgb = C_BG_SUBTLE
    foot_card.line.color.rgb = C_PRIMARY
    tf = foot_card.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "HỆ THỐNG GIÁM SÁT AN TOÀN ĐÔ THỊ – SINGLENODE"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY
    p.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "Xin chân thành cảm ơn Quý vị đã theo dõi!"
    p2.font.size = Pt(14)
    p2.font.color.rgb = C_TEXT_MAIN
    p2.alignment = PP_ALIGN.CENTER

    output_path = "c:/Competition/HackathonSGU2026/SingleNode_UrbanShieldLite_Slides.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to {output_path}")

if __name__ == "__main__":
    create_deck()
