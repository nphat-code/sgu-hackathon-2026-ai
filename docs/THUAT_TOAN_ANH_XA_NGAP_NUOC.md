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

### Bước 2: Tách ranh giới mặt nước (Waterline Edge Detection) bằng OpenCV
- **Công nghệ:** `OpenCV (cv2)` + `NumPy`.
- **Đặc trưng thị giác:** Mặt nước ngập trong ngõ hẻm có hai đặc tính quang học:
  1. **Không gian màu HSV:** Bề mặt ngập nước phản xạ ánh sáng bầu trời hoặc đèn đường, tạo vùng có độ bão hòa màu rất thấp ($S < 45$) và độ sáng cao ($V > 70$).
  2. **Đường cắt ranh giới (Waterline):** Dùng thuật toán **Canny Edge Detection** hoặc bộ lọc vi sai **Sobel** cắt ngang bánh xe để tìm đường ranh giới giao giữa không khí và mặt nước ($y_{water}$).

### Bước 3: Khử biến dạng phối cảnh (Inverse Perspective Mapping - IPM / Homography)
- **Vấn đề:** Camera lắp chéo từ trên cao nhìn xuống (Perspective distortion), khiến bánh xe ở xa nhìn nhỏ, ở gần nhìn to; mặt phẳng thẳng đứng bị nghiêng.
- **Thuật toán:** Dùng ma trận biến đổi phối cảnh $3 \times 3$ trong OpenCV (`cv2.getPerspectiveTransform` hoặc `cv2.findHomography`).
- **Cách làm:** Khi lắp camera tại con hẻm, cấu hình trước 4 điểm mốc cố định trên mặt đường (chiều rộng hẻm, mép vỉa hè) để chuẩn hóa góc nhìn về hệ tọa độ thẳng đứng.

### Bước 4: Ánh xạ tỉ lệ Centimet qua vật thể chuẩn 50cm (Reference Metric Scaling)
- **Vật thể tham chiếu thực tế:** Toàn bộ xe máy phổ thông tại Việt Nam (Wave Alpha, Sirius, Vision, Lead, Exciter) đều dùng vành 14–17 inch kèm lốp, có đường kính chuẩn thực tế dao động từ **48cm đến 52cm** (chuẩn hóa lấy mốc **50 cm**).
- **Công thức ánh xạ:**
  $$\text{Tỉ lệ (cm/pixel)} = \frac{50\text{ cm}}{H_{wheel\_pixel}}$$
  $$\text{Độ sâu ngập (cm)} = (y_{ground} - y_{water}) \times \text{Tỉ lệ (cm/pixel)}$$
- **Lọc sóng nước (Temporal Median Filter):** Mặt nước ngập khi xe chạy qua sẽ bị sóng sánh dập dềnh. Thuật toán lấy giá trị trung vị (Median) qua 10 khung hình liên tiếp (~2 giây) để loại bỏ nhiễu sóng, giữ độ sâu ổn định.

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
