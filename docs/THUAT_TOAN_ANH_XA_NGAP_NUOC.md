# 🌊 THUẬT TOÁN & CÔNG NGHỆ XỬ LÝ ÁNH XẠ KHI NGẬP NƯỚC (URBANSHIELD LITE)

Khi Giám khảo hỏi: *"Xử lý ánh xạ khi ngập nước như thế nào, bằng thuật toán công nghệ gì?"*, câu trả lời bao gồm **2 bài toán ánh xạ bổ trợ cho nhau**:
1. **Ánh xạ Hình học (Geometric Mapping):** Chuyển từ điểm ảnh (Pixel) trên camera sang độ sâu thực tế (Centimet).
2. **Ánh xạ Không gian (Spatial / GIS Mapping):** Chuyển từ độ sâu ngập của camera lên đoạn đường (Polyline) trên bản đồ số.

---

## 📐 PHẦN 1: ÁNH XẠ HÌNH HỌC (TỪ PIXEL RA CENTIMET)

Hệ thống **không cần cảm biến dưới cống** (dễ nghẹt rác, tốn bảo trì) và **không cần camera đo chiều sâu đắt tiền (Depth/LiDAR)**, mà dùng thị giác máy tính và hình học không gian phẳng trên camera 2D thường:

### Bước 1: Nhận diện vật thể tham chiếu bằng YOLOv8-nano
- **Công nghệ:** Thư viện `ultralytics` chạy trên CPU máy tính khu phố.
- **Cách làm:** Phát hiện người và xe máy (`class 3: motorcycle`). Lấy tọa độ hộp nhận diện (Bounding Box) của xe máy, xác định vùng bánh xe tiếp xúc mặt đường $(x_1, y_1, x_2, y_2)$.

### Bước 2: Tách ranh giới mặt nước & Khử bóng phản xạ (Water Reflection Suppression)
Khi bánh xe đi vào vùng ngập, mặt nước đóng vai trò như một tấm gương tạo ra **bóng phản xạ ngược (Specular / Mirror Reflection)** của bánh xe. Nếu không xử lý, bóng này sẽ làm bánh xe trông dài ra hoặc làm sai lệch điểm tiếp xúc mặt nước. Hệ thống xử lý triệt để qua 3 kỹ thuật:

1. **Khớp cung tròn RANSAC từ phần bánh xe trên cạn (RANSAC Circle Fitting - Cốt lõi):**
   - Bánh xe máy luôn có vành tròn chuẩn. Khi xe đi vào vũng nước, **phần bánh xe nổi trên cạn luôn là một cung tròn (Circular Arc)** hoàn hảo không bị nước che khuất.
   - Thuật toán trích xuất các điểm biên (Edge points) của cung tròn phía trên và dùng **RANSAC Circle Fitting** để khôi phục lại toàn bộ đường tròn $(x - a)^2 + (y - b)^2 = R^2$.
   - Từ tâm $(a, b)$ và bán kính $R$, hệ thống suy ra chính xác tọa độ đáy bánh xe $y_{bottom} = b + R$ mà **không bị đánh lừa bởi bóng phản xạ dập dềnh phía dưới**.

2. **Dò đường ranh giới mặt nước (Waterline Horizontal Gradient):**
   - Mặt nước luôn là mặt phẳng ngang. Ranh giới cắt giữa lốp xe cao su màu đen và mặt nước tạo ra một bước nhảy độ sáng rất lớn theo trục thẳng đứng.
   - Áp dụng toán tử vi sai **Sobel theo trục $Y$ ($G_y$)**: Tìm đường cắt ngang có gradient cực đại ($\partial I / \partial y = \max$) xuyên qua bánh xe. Tọa độ này chính là mực nước thực tế ($y_{water}$).

3. **Phân tích độ mờ & độ tương phản (Blur & Contrast Analysis):**
   - Bóng phản xạ trên mặt nước luôn bị suy giảm độ sắc nét (độ biến thiên Laplacian giảm hơn 50%) và bị méo mó do gợn sóng nước.
   - Thuật toán so sánh độ sắc nét phía trên và phía dưới đường ranh giới; toàn bộ vùng ảnh mờ đối xứng phía dưới bị gắn cờ là vùng phản xạ (Reflection mask) và bị triệt tiêu khỏi tính toán.

### Bước 3: Khử biến dạng phối cảnh (Inverse Perspective Mapping - IPM / Homography)
- **Vấn đề:** Camera lắp chéo từ trên cao nhìn xuống (Perspective distortion), khiến bánh xe ở xa nhìn nhỏ, ở gần nhìn to; mặt phẳng thẳng đứng bị nghiêng.
- **Thuật toán:** Dùng ma trận biến đổi phối cảnh $3 \times 3$ trong OpenCV (`cv2.getPerspectiveTransform` hoặc `cv2.findHomography`).
- **Cách làm:** Khi lắp camera tại con hẻm, cấu hình trước 4 điểm mốc cố định trên mặt đường (chiều rộng hẻm, mép vỉa hè) để chuẩn hóa góc nhìn về hệ tọa độ thẳng đứng.

### Bước 4: Phân loại phương tiện & Bảng kích thước tham chiếu (Vehicle Prior Profiling)
Khi Giám khảo hỏi: *"Bánh xe mỗi dòng xe có kích thước khác nhau, hệ thống có phân loại không?"*, hệ thống xử lý theo **cơ chế phân tầng thông minh (Multi-tier Classification)**:

#### 1. Phân loại theo lớp phương tiện & hình thái thân xe:
YOLOv8 phân biệt sẵn các lớp phương tiện (`bicycle`, `motorcycle`, `car`). Riêng với `motorcycle` (chiếm >90% lưu lượng hẻm), hệ thống dựa vào tỉ lệ khung hình (Aspect Ratio) thân xe và sàn để chân để phân biệt 2 nhóm chính:

| Nhóm phương tiện | Dòng xe tiêu biểu | Đường kính bánh kèm lốp ($D_{ref}$) | Chiều cao ống pô & lọc gió | Ngưỡng ngập nguy hiểm (Đỏ) |
| :--- | :--- | :--- | :--- | :--- |
| **Xe tay ga bánh nhỏ (Scooter)** | Honda Lead, Vision, Yamaha Grande, Janus | **$46 - 48\text{ cm}$** | Rất thấp: $16 - 18\text{ cm}$ | **$\ge 15\text{ cm}$** (Nước tràn lọc gió, chết máy ngay) |
| **Xe số & Xe côn tay (Underbone)** | Wave Alpha, Sirius, Future, Exciter, Winner | **$56 - 58\text{ cm}$** | Trung bình: $24 - 28\text{ cm}$ | **$\ge 22\text{ cm}$** (Vượt cổ pô mới có nguy cơ) |
| **Xe tay ga bánh lớn (High-wheel)** | Honda SH, Piaggio Medley | **$58 - 60\text{ cm}$** | Trung bình: $25 - 28\text{ cm}$ | **$\ge 22\text{ cm}$** |
| **Xe đạp / Xe đạp điện** | Xe đạp mini, xe Asama, Pega, VinFast Klara | **$45 - 60\text{ cm}$** | Vị trí bình ắc quy: $20\text{ cm}$ | **$\ge 15\text{ cm}$** (Nguy cơ chập điện động cơ) |
| **Ô tô con (Sedan / Hatchback)** | Vios, Accent, Morning, i10 | **$60 - 64\text{ cm}$** | Cổ hút gió / sàn: $25 - 30\text{ cm}$ | **$\ge 25\text{ cm}$** (Thủy kích) |

#### 2. Công thức tính độ ngập theo từng xe:
$$\text{Tỉ lệ (cm/pixel)} = \frac{D_{ref}}{2 \times R_{pixel}}$$
$$\text{Độ sâu ngập (cm)} = (y_{bottom} - y_{water}) \times \text{Tỉ lệ (cm/pixel)}$$
Trong đó $D_{ref}$ được nạp động từ bảng profile phương tiện tương ứng.

#### 3. Cơ chế Dự phòng an toàn (Fallback) & Bầu chọn đa xe (Multi-vehicle Voting):
- **Cơ chế Fallback:** Nếu trời mưa quá to, camera mờ hoặc góc nhìn bị che khuất không phân biệt được cụ thể là Lead hay Wave, hệ thống tự động lấy giá trị trung bình thống kê chuẩn của xe máy Việt Nam là **$50\text{ cm}$** (sai số chỉ $\pm 3\text{cm}$, hoàn toàn nằm trong dung sai an toàn để phân luồng người dân).
- **Cơ chế Bầu chọn đa xe (Multi-vehicle Voting):** Khi có nhiều xe cùng đi qua đoạn ngập (ví dụ 1 xe Vision và 1 xe Wave), hệ thống tính độ sâu từ từng xe và lấy trung bình trọng số theo độ tin cậy nhận diện (Confidence Score).
- **Cảnh báo thông minh theo từng loại xe (Smart Alert):** Điểm giá trị nhất của việc phân loại là **nội dung cảnh báo gửi về Telegram cho người dân được cá nhân hóa**:
  - *Ví dụ:* *"Mực nước 17cm: Nguy hiểm với xe tay ga (Vision, Lead), khuyến cáo không đi vào; xe số (Wave, Sirius) có thể qua nhưng chú ý đi số thấp."*

---

## 🗺️ PHẦN 2: ÁNH XẠ KHÔNG GIAN (LÊN BẢN ĐỒ SỐ GIS)

Khi máy tính tại khu phố đã tính được độ sâu $H_{flood}$, dữ liệu được ánh xạ lên bản đồ giao diện web theo quy trình:

### 1. Bảng ánh xạ ID Camera $\rightarrow$ Tuyến đường (Segment Key-Value Mapping)
- **Công nghệ:** `Leaflet.js` / OpenStreetMap kết hợp định dạng bản đồ chuẩn **GeoJSON**.
- **Cơ chế:** Mỗi con hẻm được số hóa bằng một đoạn đường `LineString` có mã định danh `segment_id` (ví dụ: `hem_254_ben_van_don`).
- Camera gắn ở đầu hẻm mang `camera_id: "cam_hem_254"` sẽ được map 1-1 với `segment_id` tương ứng.

### 2. Ánh xạ mức ngập sang mã màu cảnh báo trực quan
Hệ thống phân loại độ sâu thành 3 cấp độ thực tế với người đi xe máy:
- **Dưới 10cm (Bình thường - Xanh lục `#10B981`):** Nước chỉ ngập mép lốp, xe chạy an toàn.
- **10cm - 20cm (Chú ý - Vàng cam `#F59E0B`):** Nước mấp mé ống xả (pô xe), khuyến cáo xe số đi số thấp, xe tay ga cẩn thận.
- **Trên 20cm (Nguy hiểm - Đỏ `#EF4444`):** Nước vượt quá nửa bánh xe, tràn vào lọc gió và bugi, nguy cơ chết máy cao.

### 3. Gói tin truyền nhẹ qua WebSockets / REST API
Máy tính khu phố **không truyền video**, chỉ bắn một mẩu tin JSON siêu nhẹ (~120 bytes) lên máy chủ bản đồ và bot Telegram:
```json
{
  "camera_id": "cam_hem_254",
  "street_name": "Hẻm 254 Bến Vân Đồn, P.1, Q.4",
  "flood_depth_cm": 22,
  "level": "DANGER",
  "color": "#EF4444",
  "timestamp": "2026-10-17T09:15:00Z"
}
```
Frontend chỉ cần nhận gói tin này và đổi thuộc tính `style.color` của LineString trên bản đồ ngay lập tức mà không tốn băng thông.

---

## 🎙️ KỊCH BẢN TRẢ LỜI MẪU CHO BẠN KHI GIÁM KHẢO HỎI (30 - 45 GIÂY)

> *"Dạ em cảm ơn câu hỏi của hai anh chị. Về việc ánh xạ mực nước ngập, tụi em chia làm hai phần rất rõ ràng:*
>
> * **Thứ nhất là từ hình ảnh ra số đo centimet:** Vì camera hẻm là camera 2D thường nhìn chéo từ trên xuống, tụi em không dùng cảm biến dưới cống vì rất dễ bị rác nghẹt. Thay vào đó, tụi em dùng **OpenCV** để khử góc nghiêng phối cảnh và bắt đường ranh giới mặt nước dựa vào độ phản xạ ánh sáng HSV. Sau đó, hệ thống lấy chính **bánh xe máy lưu thông trên đường có đường kính chuẩn khoảng 50cm làm vật tham chiếu**. Đo xem mặt nước che khuất bao nhiêu phần trăm bánh xe là tính ra được ngay độ sâu ngập xấp xỉ centimet.
>
> * **Thứ hai là ánh xạ lên bản đồ số:** Mỗi camera ở con hẻm được gán cố định với một đoạn đường trên bản đồ **GeoJSON của Leaflet**. Máy tính chỉ gửi đúng một mẩu tin JSON độ sâu vài chục byte, bản đồ sẽ tự đổi màu đoạn hẻm sang Xanh dưới 10cm, Vàng từ 10 đến 20cm khi nước chạm mép pô, và Đỏ khi ngập sâu trên 20cm để người dân tránh đi vào ạ."*
