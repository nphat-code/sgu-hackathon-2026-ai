# 🚀 HƯỚNG DẪN TRIỂN KHAI URBANSHIELD LITE LÊN GOOGLE CLOUD RUN
## ĐẠT TRỌN VẸN 10 ĐIỂM TIÊU CHÍ VII (CÔNG NGHỆ CLOUD GOOGLE / AWS)

---

### 🌟 TẠI SAO CHỌN GOOGLE CLOUD RUN?
1. **Đúng 100% tiêu chí chấm điểm của BTC Hackathon SGU:** Sử dụng dịch vụ điện toán đám mây Google Cloud (Cloud Run).
2. **Có ngay Domain Public HTTPS:** Google tự cấp chứng chỉ SSL/TLS miễn phí, link có dạng `https://urbanshield-sgu-xxxx-as.a.run.app`.
3. **Miễn phí 100% (GCP Free Tier):** Google Cloud Run miễn phí 2 triệu requests và 360,000 GB-seconds tính toán mỗi tháng.
4. **Kiến trúc Single-Container:** Đã đóng gói cả Frontend React (WebGIS) và Backend FastAPI (YOLO Edge Engine) vào chung 1 container, không lo lỗi CORS hay mixed-content.

---

### ⚡ CÁCH 1: TRIỂN KHAI NHANH QUA GOOGLE CLOUD SHELL (KHÔNG CẦN CÀI GÌ TRÊN MÁY) - KHUYÊN DÙNG

Đây là cách nhanh nhất và tiện lợi nhất trong phòng thi (chỉ mất **3 phút** thực hiện trực tiếp trên trình duyệt):

#### Bước 1: Mở Google Cloud Shell
* Đăng nhập tài khoản Google vào: **[https://shell.cloud.google.com](https://shell.cloud.google.com)**
* Cloud Shell là một máy ảo Linux miễn phí đã cài sẵn `gcloud`, `docker` và `git`.

#### Bước 2: Clone repository từ GitHub
Dán lệnh sau vào cửa sổ Cloud Shell:
```bash
git clone https://github.com/nphat-code/sgu-hackathon-2026-ai.git
cd sgu-hackathon-2026-ai
```

#### Bước 3: Chạy lệnh triển khai Cloud Run
```bash
gcloud run deploy urbanshield-sgu \
  --source . \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 2 \
  --set-env-vars STREAM_FPS=28.5
```

* Cloud Shell sẽ hỏi:
  - *Allow unauthenticated invocations?* $\rightarrow$ Nhấn **`y`** (để công khai cho Ban Giám khảo truy cập).

#### Bước 4: Nhận link kết quả và kiểm tra
Sau khoảng 2 - 3 phút, Google Cloud Run sẽ in ra link dịch vụ:
```text
Service [urbanshield-sgu] revision [urbanshield-sgu-00001-xxx] has been deployed and is serving 100 percent of traffic.
Service URL: https://urbanshield-sgu-xxxxxx-as.a.run.app
```
* Mở link này trên điện thoại hoặc máy tính để kiểm tra giao diện bản đồ và camera nhận diện thời gian thực.
* In hoặc dán mã QR của link này lên slide thuyết trình để Ban Giám khảo tự quét điện thoại trải nghiệm.

---

### 💻 CÁCH 2: TRIỂN KHAI TỪ MÁY TÍNH CÁ NHÂN (NẾU CÓ GOOGLE CLOUD SDK)

Nếu trên máy tính đã cài đặt Google Cloud CLI (`gcloud`):

1. Mở PowerShell tại thư mục dự án `C:\Competition\HackathonSGU2026`.
2. Đăng nhập và chọn Project GCP:
   ```powershell
   gcloud auth login
   gcloud config set project <PROJECT_ID_CUA_BAN>
   ```
3. Chạy lệnh deploy:
   ```powershell
   gcloud run deploy urbanshield-sgu --source . --region asia-southeast1 --allow-unauthenticated --memory 1Gi --cpu 1
   ```

---

### 🛡️ MINH CHỨNG AN TOÀN & BẢO MẬT TRÊN CLOUD ĐỂ TRẢ LỜI BGK:
Khi Ban Giám khảo hỏi về phần triển khai Cloud (Tiêu chí VII), mình trình bày tự tin:
1. **Bảo mật HTTPS:** Sử dụng chứng chỉ bảo mật của Google quản lý, mã hóa toàn bộ dữ liệu truyền tải giữa máy tính người dùng và server.
2. **Kiến trúc Serverless:** Cloud Run tự động co giãn từ 0 đến n instances. Khi không có truy vấn thì scale về 0, giúp tiết kiệm chi phí 0đ khi không sử dụng.
3. **Region Đông Nam Á (asia-southeast1 - Singapore):** Đặt tại cụm máy chủ gần Việt Nam nhất, độ trễ phản hồi API cực thấp (< 40ms).
4. **Cô lập bộ nhớ:** Ứng dụng chạy trong Sandbox container an toàn, tuân thủ nguyên tắc Privacy-by-design (Zero-Disk).
