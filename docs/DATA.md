# 📊 TÀI LIỆU DỮ LIỆU ĐÁNH GIÁ (DATA.MD) - URBANSHIELD LITE

> **Dự án:** UrbanShield Lite – Hệ thống giám sát ngập nước & sự cố ngõ hẻm bằng Edge AI  
> **Đội thi:** SingleNode  
> **Mục tiêu tài liệu:** Minh bạch nguồn gốc tập dữ liệu đánh giá 100% video thực tế, quy trình gán nhãn, và cam kết bảo vệ quyền riêng tư người dân.

---

## 1. 🛡️ NGUYÊN TẮC BẢO VỆ QUYỀN RIÊNG TƯ & LÝ DO KHÔNG PUSH VIDEO LÊN GITHUB

Theo cam kết thiết kế **Privacy-by-Design** của giải pháp:
- **Không đẩy video lên kho mã nguồn (Git Repository):** Các video quay cảnh ngập lụt và sinh hoạt của người dân trên đường phố chứa hình ảnh cá nhân và phương tiện. Để bảo đảm quyền riêng tư của cộng đồng và tránh làm nặng repo, toàn bộ tệp `.mp4` lớn được loại trừ qua `.gitignore` và chỉ lưu trên máy tính cục bộ phục vụ quá trình đo đạc kỹ thuật.
- **Tính toán hoàn toàn trên bộ nhớ RAM (Zero-Disk Write):** Khung hình camera chỉ được nạp tạm vào RAM để trích xuất thông số tọa độ và độ sâu, sau đó được giải phóng ngay lập tức, không lưu trữ video thô xuống ổ cứng.
- **Chỉ công khai nhãn kiểm thử:** File [`labels.csv`](../labels.csv) được lưu trữ công khai để Ban Giám Khảo có thể tái lập và đối chiếu quy trình đánh giá mô hình.

---

## 2. 📋 QUY TRÌNH GÁN NHÃN THỰC TẾ (GROUND TRUTH ANNOTATION)

### 2.1. Phân loại cấp độ ngập nước (Flood Levels)
Do điều kiện thực tế trong ngõ hẻm không thể cắm cọc đo vật lý ở mọi góc quay, độ sâu ngập được gán nhãn **bằng mắt dựa theo tỷ lệ che khuất bánh xe máy tiêu chuẩn (~50cm)** khi phương tiện lưu thông:

| Cấp độ | Tên mức độ | Đặc điểm nhận diện thực tế | Độ sâu tương đương | Khuyến cáo an toàn |
| :---: | :---: | :--- | :---: | :--- |
| **0** | **Bình thường** | Đường khô ráo hoặc chỉ có vũng nước nhỏ dưới mép lốp | $< 10\text{ cm}$ | Lưu thông an toàn |
| **1 / 2** | **Chú ý** | Nước ngập qua mép lốp, mấp mé ống xả xe máy | $10 - 20\text{ cm}$ | Xe số đi số thấp; xe tay ga chú ý |
| **3** | **Nguy hiểm** | Nước ngập vượt nửa bánh xe máy, tràn lọc gió / bugi | $> 20\text{ cm}$ | Nguy cơ chết máy cao, khuyến cáo đổi hướng |

---

## 3. 📑 DANH MỤC 5 CLIP ĐÁNH GIÁ THỰC TẾ (TRÍCH XUẤT TỪ LABELS.CSV)

| Tên clip | Thể loại | Cấp ngập | Độ dài | Độ phân giải | Mô tả bối cảnh |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `real_flood_1.mp4` | FLOOD | Mức 3 | 16.3s | 1920x1080 | Xe máy lội nước ngập nửa bánh (~22-26cm) đường ngập triều cường TP.HCM |
| `real_flood_2.mp4` | FLOOD | Mức 2 | 17.2s | 1280x720 | Xe cộ qua đoạn trũng ngập mấp mé ống xả (~18-22cm) |
| `real_flood_3.mp4` | FLOOD | Mức 3 | 15.3s | 1280x720 | Đoạn ngập lụt sâu có người lội ngang gối và thuyền nhỏ (>30cm) |
| `real_flood_4.mp4` | FLOOD | Mức 2 | 14.5s | 1280x720 | Ngõ hẻm dân cư ngập nước mưa (~15-20cm) |
| `real_accident_1.mp4`| WEATHER | Mức 1 | 24.8s | 1280x720 | Mưa to mặt đường ngập trơn trượt, các xe lưu thông chậm |

---

## 4. 🔬 HƯỚNG DẪN CHẠY ĐÁNH GIÁ MÔ HÌNH

Chạy script đánh giá tự động trên tập clip để thu thập Precision, Recall và độ trễ CPU:
```bash
# Kích hoạt môi trường ảo
backend\venv\Scripts\activate

# Chạy đánh giá và đối chiếu với labels.csv
python backend/eval_benchmark.py
```
Kết quả đo đạc thực tế sẽ được tự động xuất ra file [`docs/TEST_REPORT.md`](./TEST_REPORT.md).
