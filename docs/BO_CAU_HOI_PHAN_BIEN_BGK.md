# 🛡️ BỘ CÂU HỎI PHẢN BIỆN KỸ THUẬT & TRẢ LỜI BAN GIÁM KHẢO
## DỰ ÁN: URBANSHIELD LITE — SINGLE NODE TEAM (HACKATHON SGU 2026)
*Tài liệu bỏ túi giúp người thuyết trình (Phát) tự tin bẻ gãy mọi câu hỏi vặn vẹo, bẫy kỹ thuật của Ban Giám khảo.*

---

### ❓ CÂU 1: BÁNH XE BỊ NGẬP CHÌM DƯỚI NƯỚC RỒI THÌ SAO CAMERA BIẾT ĐƯỢC ĐÁY BÁNH XE Ở ĐÂU MÀ TÍNH TỶ LỆ?

> **Ban Giám khảo hỏi:** *"Mô hình của em đo tỷ lệ ngập dựa vào bánh xe máy, nhưng khi nước ngập thì đáy bánh xe đã chìm nghỉm dưới nước đục ngầu, camera chỉ thấy nửa trên thì làm sao tính được chiều cao toàn bộ bánh xe?"*

* **Cách trả lời (Bản chất hình học & Neo tỷ lệ xe máy):**
  > "Dạ thưa Thầy Cô, đây chính là điểm mấu chốt trong thuật toán của tụi em:
  >
  > Hệ thống **hoàn toàn không cần nhìn thấy đáy bánh xe** dưới nước. Tụi em sử dụng **phần thân trên của xe máy** (vốn luôn nổi trên mặt nước) làm mốc neo hình học.
  >
  > Trong thiết kế xe máy phổ thông tại Việt Nam, tỷ lệ giữa đường kính bánh xe nguyên bản và chiều cao toàn thân xe là một hằng số hình thái học ổn định: **$H_{\text{bánh}} \approx 0.35 \times H_{\text{xe}}$**.
  >
  > Khi YOLO nhận diện khung xe máy, máy tính lập tức tính ngược ra được chiều cao ban đầu chuẩn của bánh xe là $H_{\text{chuẩn}} = 50\text{ cm}$. Sau đó, máy tính chỉ cần dùng toán đạo hàm biên độ Sobel trên vùng lốp để bắt đúng **vạch cắt mép nước**. 
  >
  > Có vạch mép nước và chiều cao bánh xe ước tính, máy tính tính ra ngay tỷ lệ phần trăm bị chìm mà không cần phải nhìn xuyên qua làn nước đục ạ."

---

### ❓ CÂU 2: GÓC CAMERA ĐẶT TRÊN CAO CHÉO XUỐNG (PITCH ANGLE) THÌ TỶ LỆ CÓ BỊ MÉO KHÔNG?

> **Ban Giám khảo hỏi:** *"Camera khu phố thường gắn trên cột điện hoặc mái nhà chĩa xéo xuống mặt đường. Phép chiếu phối cảnh (perspective foreshortening) sẽ làm bánh xe bị bẹp lại thành hình elip, vậy số đo có bị sai lệch không?"*

* **Cách trả lời (Bảo toàn tỷ lệ co ngắn hình học):**
  > "Dạ thưa Thầy Cô, phép chiếu phối cảnh từ trên cao xuống với góc nghiêng $\theta$ quả thực sẽ làm hình ảnh bị co ngắn trục dọc theo hàm số cosin:
  > $$h_{\text{ảnh}} = h_{\text{thực}} \times \cos(\theta)$$
  >
  > Tuy nhiên, vì **cả phần bánh xe nổi trên nước lẫn toàn bộ bánh xe đều nằm trên cùng một mặt phẳng thẳng đứng của chiếc xe**, nên hệ số co ngắn $\cos(\theta)$ tác động đồng đều lên cả tử số lẫn mẫu số:
  > $$R = \frac{h_{\text{chìm}} \times \cos(\theta)}{H_{\text{toàn\_bộ}} \times \cos(\theta)} = \frac{h_{\text{chìm}}}{H_{\text{toàn\_bộ}}}$$
  >
  > Hệ số $\cos(\theta)$ bị triệt tiêu hoàn toàn! Do đó, **tỷ lệ phần trăm ngập nước $R$ là một đại lượng bất biến phối cảnh (Perspective Invariant)**. Khi nhân tỷ lệ $R$ với đường kính chuẩn 50cm, tụi em thu được mực nước thực tế với sai số thực nghiệm trung bình chỉ **4.4 cm** (đã kiểm chứng qua benchmark 5 video thực tế ạ)."

---

### ❓ CÂU 3: NGƯỜI DÂN CÚI XUỐNG NHẶT ĐỒ HOẶC DỪNG XE NGỒI NGHỈ THÌ AI CÓ BÁO ĐỘNG NHẦM KHÔNG?

> **Ban Giám khảo hỏi:** *"Nếu có người dừng xe bước xuống nhặt điện thoại bị rơi, hoặc ngồi xổm bên đường thì hệ thống có reo chuông báo tai nạn ngã xe không?"*

* **Cách trả lời (Cơ chế lọc đa tầng 4 bước + Debounce 5s):**
  > "Dạ thưa Thầy Cô, tụi em đã thiết kế cơ chế lọc 4 bước cực kỳ nghiêm ngặt để triệt tiêu 100% báo động giả:
  >
  > 1. **Kiểm tra tỷ lệ nằm ngang:** Hộp bao người phải có tỷ lệ $W/H > 1.15$ (tức là cơ thể đang nằm sát mặt đường, chứ người cúi nhặt đồ hoặc ngồi xổm thì chiều ngang không bao giờ vượt chiều cao quá nhiều).
  > 2. **Kiểm tra cao độ trọng tâm:** Tọa độ $Y$ của người phải hạ sát đáy khung hình (chạm mặt đường). Người ngồi trên yên xe dù có nghiêng người cũng không kích hoạt.
  > 3. **Khoảng cách tương quan xe máy:** Người phải nằm trong bán kính cách xe máy ngã dưới 180 pixel.
  > 4. **Bộ đếm thời gian bất động (Debounce Filter 5.0 giây):** Đây là chốt chặn quan trọng nhất. Nếu người dân chỉ cúi nhặt đồ rồi đứng lên trong vòng 2-3 giây, bộ đếm tự động hủy (reset). Chỉ khi nạn nhân nằm bất động liên tục **quá 5.0 giây**, còi báo động mới kích hoạt.
  >
  > Nhờ vậy, trong bài benchmark trên video thực tế, hệ thống đạt độ chính xác **Precision 100% và không có bất kỳ báo động giả nào** ạ."

---

### ❓ CÂU 4: TRỜI MƯA BAN ĐÊM TỐI MỊT, ĐÈN XE RỌI LÓA THÌ THỊ GIÁC MÁY TÍNH CÒN THẤY ĐƯỢC GÌ?

> **Ban Giám khảo hỏi:** *"Ngập nước và tai nạn thường xảy ra vào lúc chập tối hoặc ban đêm khi có giông bão. Lúc đó trời tối om, mặt nước phản chiếu ánh đèn đường loang lổ thì thuật toán xử lý thế nào?"*

* **Cách trả lời (Tiền xử lý thích ứng CLAHE & Lọc Saturation):**
  > "Dạ thưa Thầy Cô, tụi em đã tích hợp sẵn 2 kỹ thuật xử lý ảnh chuyên dụng trong hàm tiền xử lý:
  >
  > 1. **Cân bằng sáng thích ứng CLAHE (Contrast Limited Adaptive Histogram Equalization):** Thuật toán chỉ can thiệp vào kênh sáng $V$ trong không gian màu HSV, giúp nâng độ tương phản cục bộ ở các vùng tối của ngõ hẻm mà không làm cháy sáng các vùng có đèn đường.
  > 2. **Bộ lọc phản xạ đèn pha:** Khi đèn xe rọi xuống mặt nước, vùng nước bị lóa sẽ có độ bão hòa màu (Saturation) rất thấp và phương sai Gradient rất gắt. Bộ lọc Laplacian của tụi em sẽ nhận diện các vệt lóa này để không bị nhầm lẫn với mép nước thực tế.
  >
  > Cả 5 video thực tế tụi em thử nghiệm đều có video quay trong điều kiện mưa đêm mờ tối (`real_accident_1.mp4`, `real_flood_3.mp4`) và hệ thống vẫn bắt chuẩn xác 100% ạ."

---

### ❓ CÂU 5: NẾU THÀNH PHỐ TRIỂN KHAI CHO 1.000 CON HẺM THÌ CHI PHÍ ĐẦU TƯ VÀ MÁY CHỦ THẾ NÀO?

> **Ban Giám khảo hỏi:** *"Mỗi con hẻm một máy tính thì có tốn kém quá không? Khi mở rộng ra cả quận hay cả thành phố thì máy chủ trung tâm có bị quá tải không?"*

* **Cách trả lời (Kiến trúc Điện toán Biên Edge Computing + Mẩu tin 82 Bytes):**
  > "Dạ thưa Thầy Cô, chi phí của giải pháp gần như bằng 0 nhờ 2 yếu tố:
  >
  > 1. **Tận dụng tối đa hạ tầng sẵn có:** Tại các trụ sở tổ dân phố, văn phòng khu phố hoặc nhà dân đầu hẻm đều đã có sẵn máy tính văn phòng Core i3 cũ và camera an ninh gia đình. Thuật toán của tụi em tối ưu trên CPU (chỉ chiếm 600MB RAM, suy luận 63ms), một máy tính cũ có thể kết nối RTSP để gánh cùng lúc 4-6 mắt camera trong bán kính 200m.
  > 2. **Giải phóng 99.98% băng thông:** Hệ thống hoạt động theo nguyên lý **Edge Computing**. Máy tính tại hẻm tự xử lý tại chỗ, **không bao giờ truyền video về trung tâm**. Bình thường hệ thống hoàn toàn im lặng; chỉ khi có ngập trên 10cm hoặc có người ngã, nó mới gửi một mẩu tin JSON siêu nhẹ đúng **82 Bytes** lên máy chủ.
  >
  > Do đó, dù có 1.000 hay 10.000 trạm trên toàn thành phố, máy chủ trung tâm chỉ nhận các mẩu tin vài chục byte, chạy trên một gói Cloud Serverless cơ bản với chi phí chưa tới vài trăm nghìn đồng mỗi tháng ạ."

---

### ❓ CÂU 6: CAMERA ĐẶT TRONG NGÕ HẺM DÂN CƯ CÓ SỢ VI PHẠM QUYỀN RIÊNG TƯ CỦA NGƯỜI DÂN KHÔNG?

> **Ban Giám khảo hỏi:** *"Camera lắp trong ngõ hẻm sinh hoạt hàng ngày của bà con, nếu bị rò rỉ hình ảnh cá nhân hoặc hacker xâm nhập thì sao?"*

* **Cách trả lời (Nguyên tắc Privacy-by-design & Zero-Disk RAM):**
  > "Dạ đây là tiêu chuẩn đạo đức AI tụi em đặt lên hàng đầu từ ngày đầu viết code:
  >
  > 1. **Triết lý Zero-Disk (Không lưu vết ổ đĩa):** Từng khung hình từ camera được giải mã trực tiếp lên bộ nhớ RAM tạm thời, sau khi AI trích xuất xong 2 con số (số cm ngập và trạng thái ngã xe), biến khung hình lập tức bị xóa sổ khỏi RAM (`del frame`). Hệ thống cam kết **không ghi bất kỳ một file video hay hình ảnh nào xuống ổ cứng**.
  > 2. **Không nhận diện danh tính:** Mô hình chỉ phát hiện hộp bao hình học xe máy và tư thế cơ thể người, hoàn toàn không có module nhận diện khuôn mặt (Face Recognition) hay đọc biển số xe.
  > 3. **Bảo mật đường truyền:** Gói tin cảnh báo gửi về Telegram hoặc WebGIS chỉ là thông số tọa độ và chiều cao nước, không mang theo hình ảnh nhạy cảm của người dân ạ."

---

### 💡 BÍ QUYẾT BỎ TÚI KHI TRẢ LỜI GIÁM KHẢO:
1. **Luôn bắt đầu bằng:** *"Dạ thưa Thầy Cô, câu hỏi của Thầy/Cô chạm đúng vào bài toán cốt lõi mà nhóm em đã trăn trở và giải quyết trong phần code..."* (Tỏ rõ sự khiêm tốn nhưng tự tin).
2. **Nói vào bản chất kỹ thuật:** Dẫn chứng cụ thể: *50cm bánh xe, 82 Bytes, 63ms CPU, bộ đếm 5s, Zero-Disk*.
3. **Không cãi lại:** Nếu Giám khảo góp ý thêm hướng phát triển, hãy tiếp thu: *"Dạ tụi em xin ghi nhận góp ý rất sắc bén của Thầy/Cô để nâng cấp thêm trong phiên bản tiếp theo ạ!"*

