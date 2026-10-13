# 🎬 Bộ Prompt Tạo Video Trình Bày Ý Tưởng (Pitch Video Giọng Nam 2.5 Phút)
## ĐỀ ÁN: URBANSHIELD LITE – SINGLE NODE

> **Mục tiêu:** Tạo video giới thiệu ý tưởng đề án (thời lượng 2 – 2.5 phút) phục vụ nộp bài hoặc trình chiếu trước Hội đồng Giám khảo.  
> **Yêu cầu giọng đọc:** **100% GIỌNG NAM (Vietnamese Male Voice)** trầm ấm, điềm đạm, rõ ràng, phong cách phóng sự kỹ thuật. Tuyệt đối không dùng giọng nữ.  
> **Công cụ tương thích:** [NotebookLM Video Overview](https://notebooklm.google.com/), [InVideo AI](https://invideo.io/), [CapCut](https://www.capcut.com/), [Fliki](https://fliki.ai/), [HeyGen](https://www.heygen.com/).

---

## 🎙️ 1. HƯỚNG DẪN CẤU HÌNH GIỌNG NAM TRÊN NOTEBOOKLM (VIDEO OVERVIEW)

Nếu bạn đang tạo video trực tiếp trong mục **Video Overview** của NotebookLM:

1. Bấm vào nút **Customize** (hoặc biểu tượng cây bút / dấu 3 chấm) cạnh nút `Video Overview` trong thanh Studio bên phải.
2. Dán đoạn hướng dẫn bắt buộc giọng nam này vào ô tùy chỉnh:

```text
Tạo video thuyết trình dạng độc thoại chuyên môn kỹ thuật (Solo Male Presenter).
- GIỌNG ĐỌC: BẮT BUỘC sử dụng DUY NHẤT một người dẫn chuyện là GIỌNG NAM TIẾNG VIỆT (Vietnamese Male Voice) trầm ấm, rõ ràng, điềm đạm và đĩnh đạc. TUYỆT ĐỐI KHÔNG DÙNG GIỌNG NỮ và không dùng định dạng đối thoại trò chuyện 2 người nam-nữ.
- NỘI DUNG: Bám sát bài thuyết trình ý tưởng giải pháp UrbanShield Lite của nhóm SingleNode:
  1. Giới thiệu đề án UrbanShield Lite cho khu dân cư đô thị.
  2. Nêu thực trạng ngập nước đường nhánh & tai nạn ngã xe ban đêm, rào cản chi phí camera AI đắt đỏ và nghẽn băng thông 24/7.
  3. Giải pháp Edge AI phân tán trên CPU phổ thông với YOLOv8-nano.
  4. Cơ chế đo ngập bánh xe máy 50cm & nhận diện ngã xe bất động > 5s (CLAHE).
  5. Bảo vệ quyền riêng tư Privacy-by-design (hủy video trên RAM) & gửi cảnh báo Telegram.
  6. Mô hình trạm cụm (Cluster) tiết kiệm 70-80% chi phí và lộ trình PoC khiêm tốn vì cộng đồng.
```

---

## 📝 2. MASTER PROMPT CHO CÁC CÔNG CỤ TẠO VIDEO (InVideo AI / Fliki / CapCut)

Sao chép toàn bộ prompt bên dưới nếu bạn dùng InVideo AI hoặc Fliki:

```markdown
Create a professional 2.5-minute concept pitch video for a civic tech solution called "UrbanShield Lite - Edge AI for Urban Safety".

OVERALL STYLE & AUDIO SPECS:
- Voiceover: STRICTLY A SOLO VIETNAMESE MALE VOICE (Trầm ấm, đĩnh đạc, rõ ràng, phong cách kỹ sư công nghệ). NO female voice. Single narrator presentation format.
- Tone: Professional, sincere, modest, technically grounded, documentary and tech-case-study style. Absolutely NO hyperbole, NO buzzwords.
- Visuals: Clean white minimalist infographics combined with bright, natural daylight urban street footage in Vietnam and clean software UI mockups (Telegram alerts, digital maps).
- Background Music: Subtle, low-tempo ambient electronic corporate tech music (không ồn ào, làm nổi bật giọng nam).

SCENE-BY-SCENE BREAKDOWN (STORYBOARD):

[SCENE 1: 0:00 - 0:25 | INTRODUCTION]
- Visual: Clean bright daylight urban street in Vietnam with a CCTV camera mounted on a pole. Text overlay "UrbanShield Lite - Theo dõi ngập nước & an toàn giao thông dân sinh". Team logo "SingleNode".
- Text on Screen: UrbanShield Lite | Giải pháp Edge AI phân tán | SingleNode
- Voiceover (Giọng nam tiếng Việt): "Xin chào mọi người và Ban Giám khảo, em là đại diện nhóm SingleNode. Hôm nay, nhóm muốn chia sẻ về UrbanShield Lite – một giải pháp nhỏ gọn hỗ trợ theo dõi ngập nước và an toàn giao thông đô thị dựa trên kiến trúc AI biên phân tán, với mục tiêu mang công nghệ an toàn đến với những tuyến đường nhánh và khu dân cư bình dị nhất."

[SCENE 2: 0:25 - 0:55 | THE REAL-WORLD PROBLEM & BOTTLENECK]
- Visual: Full-color footage of heavy rain with motorbikes riding through flooded roads in daylight; cut to a quiet urban street under warm streetlights. Split screen showing expensive AI camera with price tag "$1,000+" and an engineering bottleneck graphic showing overloaded server bandwidth.
- Text on Screen: Nút thắt: Camera AI đắt đỏ & Quá tải băng thông máy chủ
- Voiceover (Giọng nam tiếng Việt): "Vào mùa mưa tại các đô thị, hai rủi ro dân sinh thường xuyên xuất hiện: các tuyến đường nhánh trũng thấp bị ngập nước gây chết máy phương tiện hàng loạt, và các vụ ngã xe ban đêm trong ngõ vắng dễ bị bỏ lỡ thời gian vàng cứu hộ. Tuy nhiên, việc mở rộng camera AI truyền thống gặp rào cản lớn vì chi phí thiết bị quá cao và áp lực truyền phát video 24/7 gây quá tải băng thông máy chủ trung tâm."

[SCENE 3: 0:55 - 1:25 | THE EDGE AI SOLUTION]
- Visual: Technical diagram showing standard existing camera connected to an affordable local CPU mini-PC running YOLOv8-nano. Clean animation showing local processing, without streaming continuous video to cloud.
- Text on Screen: Edge AI | Xử lý tại chỗ trên CPU phổ thông | Không cần GPU đắt đỏ
- Voiceover (Giọng nam tiếng Việt): "UrbanShield Lite tiếp cận bài toán bằng kiến trúc Điện toán biên (Edge AI): Thay vì dồn video về máy chủ trung tâm, nhóm chuyển dịch tính toán về ngay máy trạm CPU phổ thông tại cơ sở với mô hình YOLOv8-nano nhỏ gọn khoảng 6.5MB. Hệ thống phân tích hình ảnh tại chỗ và chỉ phát đi siêu dữ liệu sự kiện siêu nhẹ khi có sự cố."

[SCENE 4: 1:25 - 1:55 | CORE TECHNOLOGY: FLOOD ESTIMATION & FALL DETECTION]
- Visual: Clean CAD schematic of motorbike wheel with 50cm diameter reference and 3 color depth zones (Green <10cm, Yellow 10-20cm, Red >20cm). Cut to night camera UI with green bounding box around motorcycle and red bounding box labeled "W/H > 1.15, Timer > 5s".
- Text on Screen: Đo ngập qua bánh xe 50cm | Quy trình lọc 4 bước nhận diện ngã xe (CLAHE)
- Voiceover (Giọng nam tiếng Việt): "Về bài toán ngập nước, hệ thống lấy đường kính chuẩn 50cm của bánh xe máy lưu thông làm vật tham chiếu để đo tỷ lệ che khuất, phân loại 3 mức độ ngập mà không cần gắn cảm biến dưới cống. Về phát hiện ngã xe, hệ thống áp dụng quy trình lọc 4 bước: kiểm tra dáng người nằm ngang W/H lớn hơn 1.15 gần xe, kết hợp bộ đếm bất động liên tục quá 5 giây để triệt tiêu báo động giả và thuật toán CLAHE tăng sáng ban đêm."

[SCENE 5: 1:55 - 2:15 | PRIVACY-BY-DESIGN & INSTANT ALERT]
- Visual: Animated graphic of video stream immediately deleted from RAM (Zero-Disk storage). Cut to a smartphone receiving a Telegram Bot notification with GPS coordinates, mini map, and 1 static photo.
- Text on Screen: Privacy-by-design | Video hủy trên RAM | Cảnh báo Telegram < 1s
- Voiceover (Giọng nam tiếng Việt): "Hệ thống tuân thủ nguyên tắc Privacy-by-design: Video sinh hoạt nạp vào RAM và bị hủy vĩnh viễn ngay lập tức, hoàn toàn không lưu ổ cứng và không nhận diện khuôn mặt người dân. Chỉ khi có sự cố, đúng một bức ảnh hiện trường kèm tọa độ GPS mới được gửi về bot Telegram của đội cứu hộ."

[SCENE 6: 2:15 - 2:35 | ECONOMIC VIABILITY: CLUSTER MODEL]
- Visual: Cluster diagram showing 1 local neighborhood PC managing 20-30 surrounding cameras. Clean cost comparison table showing 70-80% initial cost reduction and >95% bandwidth saving.
- Text on Screen: Mô hình Trạm cụm: 1 Máy trạm gom 20-30 Camera | Tiết kiệm 70-80% chi phí
- Voiceover (Giọng nam tiếng Việt): "Về tính khả thi kinh tế, nhóm áp dụng mô hình Trạm cụm: Một máy tính cơ sở tại khu dân cư có thể gom và xử lý 20 đến 30 camera phụ cận, giúp cắt giảm ước tính 70 đến 80% chi phí đầu tư ban đầu và tiết kiệm hơn 95% lưu lượng băng thông internet."

[SCENE 7: 2:35 - 3:00 | CONCLUSION & CLOSING]
- Visual: Clean white closing screen with open-source project roadmap, team name "SingleNode", and contact info.
- Text on Screen: SingleNode - Giải pháp AI biên nhỏ gọn vì cộng đồng đô thị
- Voiceover (Giọng nam tiếng Việt): "Với kế hoạch thử nghiệm thực địa diện hẹp tại một đến hai ngõ xóm để thu thập dữ liệu và tinh chỉnh ngưỡng lọc, nhóm SingleNode hy vọng mang lại một giải pháp kỹ thuật thiết thực, khiêm tốn và phục vụ an toàn cho cộng đồng. Em xin chân thành cảm ơn Ban Giám khảo đã lắng nghe."
```

---

## 🎥 3. HƯỚNG DẪN CẤU HÌNH GIỌNG NAM TRÊN CAPCUT / CLIPCHAMP

Nếu bạn đưa lời thoại vào CapCut hoặc Clipchamp để lồng tiếng tự động:
1. Mở CapCut ➔ Chọn công cụ **Văn bản sang giọng nói (Text to Speech)**.
2. Chọn ngôn ngữ: **Tiếng Việt**.
3. Chọn giọng nam đề xuất:
   * **Nam thanh niên** hoặc **Thanh niên điềm đạm** (phù hợp với phong cách sinh viên thuyết trình kỹ thuật).
   * **Người kể chuyện nam (Male Narrator)**: Giọng trầm ấm, chuyên nghiệp.
4. Tốc độ đọc: Đặt ở mức **1.0x** hoặc **1.05x** để đảm bảo thời lượng vừa vặn 2.5 – 3 phút.
