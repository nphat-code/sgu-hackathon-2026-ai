# 🎬 Bộ Prompt Tạo Video Trình Bày Ý Tưởng (Pitch Video 2.5 Phút)
## ĐỀ ÁN: URBANSHIELD LITE – SINGLE NODE

> **Mục tiêu:** Tạo video giới thiệu ý tưởng đề án (thời lượng 2 – 2.5 phút) phục vụ nộp bài hoặc trình chiếu trước Hội đồng Giám khảo.  
> **Phong cách:** Chuyên nghiệp, phóng sự công nghệ, điềm đạm, khiêm tốn, không dùng từ ngữ phóng đại.  
> **Công cụ tương thích:** [InVideo AI](https://invideo.io/), [CapCut](https://www.capcut.com/), [Fliki](https://fliki.ai/), [HeyGen](https://www.heygen.com/), [Runway](https://runwayml.com/).

---

## 📝 1. MASTER PROMPT TẠO TOÀN BỘ VIDEO (Sao chép vào InVideo AI / Fliki)

```markdown
Create a professional 2.5-minute concept pitch video for a civic tech solution called "UrbanShield Lite - Edge AI for Urban Safety".

OVERALL STYLE & TONE:
- Tone: Professional, sincere, modest, technically grounded, documentary and tech-case-study style. Absolutely NO hyperbole, NO buzzwords (no "revolutionary", "game-changing", "miraculous").
- Visuals: Clean white minimalist infographics combined with realistic urban street footage in Vietnam (rainy flooded streets, nighttime quiet alleys, CCTV angles) and clean software UI mockups (Telegram alerts, digital maps).
- Voiceover: Calm, confident, articulate Vietnamese male voice (Trầm ấm, điềm đạm, rõ ràng).
- Background Music: Subtle, low-tempo ambient electronic corporate tech music (không ồn ào, làm nổi bật giọng nói).

SCENE-BY-SCENE BREAKDOWN (STORYBOARD):

[SCENE 1: 0:00 - 0:25 | INTRODUCTION]
- Visual: Clean white screen with title "UrbanShield Lite - Theo dõi ngập nước & sự cố giao thông". Logo "SingleNode". Transition to B-roll of busy Vietnamese street traffic.
- Text on Screen: UrbanShield Lite | Giải pháp Edge AI phân tán | SingleNode
- Voiceover (Tiếng Việt): "Kính chào Hội đồng Giám khảo, chúng tôi là đội ngũ SingleNode. Hôm nay, chúng tôi xin giới thiệu đề án UrbanShield Lite – Hệ thống hỗ trợ theo dõi ngập nước và an toàn giao thông đô thị dựa trên kiến trúc AI biên nhỏ gọn, với mục tiêu mang công nghệ bảo vệ đến với những tuyến đường nhánh và khu dân cư bình dị."

[SCENE 2: 0:25 - 0:55 | THE REAL-WORLD PROBLEM & BOTTLENECK]
- Visual: Footage of heavy rain, motorbikes struggling through 20cm floodwater on a narrow street; cut to a deserted dark alley at night. Split screen showing a traditional expensive AI camera with price tag "$1,000+" and a bottleneck graphic showing overloaded server bandwidth.
- Text on Screen: Nút thắt: Camera AI đắt đỏ & Quá tải băng thông máy chủ
- Voiceover (Tiếng Việt): "Vào mùa mưa bão, đô thị thường đối mặt với hai rủi ro lớn: các tuyến đường nhánh trũng thấp bị ngập nước gây chết máy phương tiện, và các sự cố ngã xe ban đêm trong ngõ vắng dễ bị bỏ lỡ thời gian vàng cứu hộ. Tuy nhiên, việc mở rộng camera AI truyền thống là bất khả thi vì chi phí thiết bị quá cao và áp lực truyền phát video 24/7 lên máy chủ trung tâm."

[SCENE 3: 0:55 - 1:25 | THE EDGE AI SOLUTION]
- Visual: Diagram showing an affordable USB webcam connected to a compact office computer / mini PC running YOLOv8-nano. Visual of video being processed locally, without streaming heavy video to the cloud.
- Text on Screen: Edge AI | Xử lý tại chỗ trên CPU | Tận dụng phần cứng sẵn có
- Voiceover (Tiếng Việt): "UrbanShield Lite giải quyết nghịch lý này bằng kiến trúc Điện toán biên (Edge AI): Thay vì dồn video về máy chủ trung tâm, chúng tôi tối ưu mô hình YOLOv8-nano hoạt động trực tiếp trên vi xử lý CPU của máy tính phổ thông tại cơ sở. Hệ thống phân tích hình ảnh tại chỗ và chỉ gửi dữ liệu khi phát sinh sự cố."

[SCENE 4: 1:25 - 1:55 | CORE TECHNOLOGY: FLOOD ESTIMATION & FALL DETECTION]
- Visual: Close-up of CCTV angle showing motorbike in water with green bounding box around the wheel and 3 water depth marker lines (Level 1, Level 2, Level 3). Next shot: Night alley with fallen rider, timer counting >5s, red bounding box labeled "SOS: FALLEN DETECTED".
- Text on Screen: Đo ngập qua bánh xe 50cm | Nhận diện ngã xe bất động > 5s (CLAHE)
- Voiceover (Tiếng Việt): "Về đo ngập, hệ thống lấy đường kính chuẩn 50cm của bánh xe máy lưu thông làm vật tham chiếu để tính tỷ lệ che khuất, phân loại 3 mức độ ngập mà không cần cảm biến dưới cống. Về an toàn ban đêm, hệ thống nhận diện dáng người nằm ngang và bộ đếm thời gian bất động quá 5 giây để triệt tiêu báo động giả, kết hợp bộ lọc cân bằng sáng CLAHE khi trời tối."

[SCENE 5: 1:55 - 2:15 | PRIVACY-BY-DESIGN & INSTANT ALERT]
- Visual: Animated graphic of video stream immediately deleted in RAM (trash icon). Cut to a smartphone receiving a Telegram Bot notification with GPS coordinates and 1 photo snapshot.
- Text on Screen: Privacy-by-design | Không lưu trữ video | Cảnh báo Telegram < 1s
- Voiceover (Tiếng Việt): "Hệ thống tuân thủ nguyên tắc Privacy-by-design: Video chỉ nạp vào bộ nhớ RAM và bị xóa vĩnh viễn ngay lập tức, không lưu trữ vào ổ cứng và không nhận diện khuôn mặt. Chỉ khi có sự cố, đúng một bức ảnh hiện trường kèm tọa độ GPS mới được gửi về bot Telegram của đội cứu hộ."

[SCENE 6: 2:15 - 2:35 | ECONOMIC VIABILITY: CLUSTER MODEL]
- Visual: Cluster diagram showing 1 local neighborhood PC managing 20-30 surrounding cameras. Clean cost comparison table showing 70-80% initial cost reduction.
- Text on Screen: Mô hình Trạm cụm: 1 Máy trạm gánh 20-30 Camera | Tiết kiệm 70-80% chi phí
- Voiceover (Tiếng Việt): "Về tính kinh tế, chúng tôi triển khai mô hình Trạm cụm: Một máy tính cơ sở tại trụ sở khu phố có thể quản lý 20 đến 30 camera xung quanh, giúp tiết kiệm ước tính 70 đến 80% chi phí đầu tư ban đầu và cắt giảm hơn 95% lưu lượng băng thông mạng."

[SCENE 7: 2:35 - 3:00 | CONCLUSION & CLOSING]
- Visual: Clean white closing screen with open-source digital map interface, team name "SingleNode", and contact info.
- Text on Screen: SingleNode - Giải pháp kỹ thuật khiêm tốn, giá trị thực tiễn cho cộng đồng
- Voiceover (Tiếng Việt): "Với kế hoạch thử nghiệm bước đầu tại khu dân cư diện hẹp để đo lường độ ổn định thực tế, đội ngũ SingleNode cam kết mang lại một giải pháp kỹ thuật khiêm tốn, thiết thực và vì sự an toàn của cộng đồng. Xin chân thành cảm ơn."
```

---

## 🎥 2. PROMPT TẠO CÁC CLIP CCTV FOOTAGE NGẮN (Kling AI / Runway / Luma)

Dùng để tạo 3 video tư liệu ngắn (B-roll) chèn vào slide hoặc bỏ vào thư mục `backend/videos/` để chạy thử mô hình:

### 🌊 Clip 1: Xe máy lội nước ngập (Dùng cho `backend/videos/flood.mp4`)
```text
CCTV surveillance camera angle, slightly elevated viewpoint mounted on a street pole, looking down at a flooded urban street in Vietnam during rain. Muddy floodwater covers the road about 15-20cm deep. Several typical commuter motorbikes are slowly wading through the water, with water splashing and reaching halfway up the motorcycle wheels. Realistic lighting, cloudy overcast rainy day, raw authentic surveillance footage style, 24fps, high quality, photorealistic, no motion blur, 1080p.
```

### 🚨 Clip 2: Ngã xe trong ngõ vắng ban đêm (Dùng cho `backend/videos/accident.mp4`)
```text
High-angle CCTV security camera view of a quiet, empty urban residential alley at night. Dim warm streetlights illuminating asphalt road and sidewalks. A scooter motorcycle slips and falls onto the ground, and a person lies motionless on the road next to the fallen motorcycle. Realistic static security camera perspective, authentic nighttime lighting, realistic shadows, grainy surveillance aesthetic, completely still scene showing inactivity, 1080p, photorealistic.
```

### 🛵 Clip 3: Giao thông ban ngày bình thường (Dùng cho `backend/videos/normal.mp4`)
```text
Static elevated CCTV camera footage of a regular urban street intersection in daylight. Normal moderate traffic of motorbikes moving smoothly across asphalt road with sidewalk and small shops. Clear daytime lighting, natural street activity, authentic surveillance camera framing, realistic motion, 1080p.
```
