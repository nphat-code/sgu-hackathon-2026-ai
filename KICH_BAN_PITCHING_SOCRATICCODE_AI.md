# KỊCH BẢN PITCHING & PHẢN BIỆN ĐỀ TÀI: SOCRATICCODE AI
**Đội thi:** SingleNode | **Cuộc thi:** SGU Hackathon 2026 - 2027  
**Vòng Sơ Loại:** 17/10/2026 (08h30 - 11h00 tại Hội trường E7 SGU)  
**Thời gian trình bày:** 03 phút Pitching + 02 phút Q&A Ban giám khảo  

---

## 1. CẤU TRÚC 6 SLIDE PITCHING CHUẨN ĐỒNG HỒ (3 PHÚT)

| Slide | Tiêu đề slide | Nội dung cốt lõi | Thời lượng |
|---|---|---|---|
| **Slide 1** | **Vấn Nạn "Copy-Paste AI" Trong Giảng Đường IT** | Sinh viên năm 1-2 SGU ném bài tập C++ vào ChatGPT ➔ AI giải hết ➔ Sinh viên qua môn nhưng thi giấy trượt vì không hiểu bản chất bộ nhớ. Thầy cô đau đầu vì "bẫy tư duy lười biếng". | 30s |
| **Slide 2** | **SocraticCode AI: Gia Sư Lập Trình Vấn Đáp** | Định vị sản phẩm: **AI đầu tiên "từ chối giải hộ"**. Áp dụng phương pháp Socratic: AI chỉ đặt câu hỏi gợi mở, bắt sinh viên tự suy luận từng bước. | 30s |
| **Slide 3** | **Vũ Khí Khác Biệt (The Moat): Visual Memory Tracing** | Trực quan hóa biến, con trỏ, ô nhớ Stack/Heap, bảng chạy thuật toán từng bước (Trace Table). Sinh viên "nhìn thấy" bug thay vì chỉ đọc text giải thích chung chung. | 45s |
| **Slide 4** | **Trực Quan Demo (Live Demo / Video Clip)** | Chiếu 3 ca lỗi kinh điển tại SGU: (1) Binary Search vô tận, (2) Con trỏ hoang dã C++, (3) Tràn mảng off-by-one. Bấm "Thử tự sửa" ➔ Sinh viên tự hiểu và vá lỗi. | 45s |
| **Slide 5** | **Giải Pháp Tiết Kiệm Chi Phí: Semantic Error Cache** | Các môn Nhập môn / Kỹ thuật lập trình có 90% lỗi lặp đi lặp lại. Cache lại AST & đồ thị phân tích lỗi ➔ **90% truy vấn tốn 0 VNĐ, phản hồi < 20ms**, chỉ tốn ~18 VNĐ cho các case độc lạ. | 20s |
| **Slide 6** | **Kế Hoạch 24 Giờ Hackathon & Đội Ngũ** | Đội SingleNode (1 thành viên tập trung cao độ). Lộ trình 24h hoàn thiện web IDE + AST parser + Caching engine. | 10s |

---

## 2. KỊCH BẢN THUYẾT TRÌNH CHI TIẾT (LỜI THOẠI 3 PHÚT)

> *"Kính thưa Ban Giám Khảo và các bạn sinh viên,*  
> *Em là đại diện đội **SingleNode**, hôm nay em xin mang đến giải pháp **SocraticCode AI**.*  
>
> *(00:00 - 00:35)*  
> *Hiện nay, bước vào các phòng máy của Khoa CNTT SGU, một cảnh tượng rất phổ biến là: sinh viên gặp bug C++ liền copy cả bài ném vào ChatGPT. ChatGPT ngay lập tức trả về đoạn code hoàn chỉnh. Sinh viên paste vào nộp bài, code chạy đúng, nhưng sinh viên hoàn toàn không hiểu tại sao code cũ lại sai, và tại sao con trỏ hay biến vòng lặp lại bị kẹt. Hậu quả là đến kỳ thi viết trên giấy, sinh viên trượt hàng loạt.*  
>
> *(00:35 - 01:20)*  
> *Các công cụ AI hiện tại đang vô tình 'giết chết' tư duy giải thuật. Đó là lý do em xây dựng **SocraticCode AI** – nền tảng gia sư lập trình **từ chối giải hộ sinh viên**!*  
> *Thay vì đưa code mẫu, SocraticCode AI sử dụng phương pháp vấn đáp Socratic 3 cấp độ: Cấp 1 quan sát, Cấp 2 tư duy bản chất, Cấp 3 gợi ý thử thách tự sửa.*  
>
> *(01:20 - 02:20)*  
> *Điểm khác biệt cốt lõi nhất của SocraticCode so với ChatGPT là: **Visual Memory Tracing**. Khi gặp lỗi Vòng lặp vô tận trong Binary Search hay Dangling Pointer trong C++, hệ thống vẽ ngay sơ đồ ô nhớ Stack/Heap, biến lặp và con trỏ trực quan. Sinh viên tận mắt thấy biến left bị kẹt ở ô số 2, tận mắt thấy con trỏ trỏ vào vùng nhớ rác đã bị hủy. Khi sinh viên trả lời được câu hỏi gợi mở và tự sửa code, não bộ sinh viên mới thực sự kích hoạt cơ chế học tập sâu.*  
>
> *(02:20 - 03:00)*  
> *Về mặt kinh tế theo đúng tiêu chí 'tiết kiệm chi phí' của cuộc thi: Trong một môn học tại trường, hàng trăm sinh viên thường mắc chung một vài lỗi thuật toán kinh điển. Nhờ cơ chế **Semantic Error Cache**, hệ thống tái sử dụng phân tích đồ thị lỗi với **chi phí 0 VNĐ** và tốc độ phản hồi tức thì dưới 20 mili-giây. Một phòng máy 100 máy chỉ tốn chưa tới vài ngàn đồng một buổi thực hành.*  
> *SingleNode tin rằng SocraticCode AI chính là mảnh ghép công nghệ giáo dục đúng nghĩa cho sinh viên CNTT SGU. Em xin cảm ơn và sẵn sàng lắng nghe câu hỏi từ Ban giám khảo!"*

---

## 3. BỘ CÂU HỎI PHẢN BIỆN BAN GIÁM KHẢO SẼ HỎI & CÁCH ĐỐI ĐÁP ĂN ĐIỂM

### Câu 1: "Tại sao tôi không dùng ChatGPT hoặc Claude kèm theo System Prompt bảo nó 'hãy hỏi gợi mở thay vì đưa code'?"
- **Cách trả lời ăn điểm:**
  > *"Dạ thưa Thầy/Cô, prompt chỉ giải quyết được phần câu chữ (text), nhưng điểm nghẽn lớn nhất của sinh viên học C/C++ là **tư duy không gian bộ nhớ (Mental Model)**. Sinh viên không thể hình dung biến lặp đang kẹt ở đâu hay ô nhớ Stack bị hủy như thế nào nếu chỉ đọc các đoạn văn bản dài của ChatGPT. SocraticCode AI phân tích Abstract Syntax Tree (AST) và sinh ra **Trace Table + Sơ đồ ô nhớ trực quan (Visual Memory Blocks)** đồng bộ theo thời gian thực. Đây là điều ChatGPT đơn thuần hoàn toàn không làm được."*

### Câu 2: "Một mình bạn làm (SingleNode) liệu trong 24 giờ có làm kịp một sản phẩm phức tạp như vậy không?"
- **Cách trả lời ăn điểm:**
  > *"Dạ thưa Thầy/Cô, em chọn kiến trúc tối ưu và thực dụng: Frontend dùng React Component hóa cao độ cho bảng bộ nhớ, Backend dùng FastAPI nhẹ và linh hoạt. Em không ôm đồm xây dựng một trình biên dịch C++ từ đầu mà tập trung trọn vẹn 24 giờ vào việc tinh chỉnh pipeline phân tích AST các lỗi kinh điển trong chương trình giảng dạy SGU (LTCB, KTLT, CTDL&GT) kết hợp Semantic Cache. Kiến trúc này hoàn toàn khả thi và em đã kiểm chứng độ mượt của luồng dữ liệu ngay từ giai đoạn chuẩn bị đề án."*

### Câu 3: "Dự án tiết kiệm chi phí như thế nào nếu mở rộng cho toàn bộ trường SGU?"
- **Cách trả lời ăn điểm:**
  > *"Dạ, nếu mỗi sinh viên hỏi một câu đều gọi API LLM thì chi phí cho hàng nghìn sinh viên SGU sẽ rất đắt. Nhưng phân tích thực tế cho thấy 85-90% lỗi của sinh viên năm nhất năm hai là các lỗi mẫu lặp lại (off-by-one, null pointer, dangling pointer, uninitialized variable, infinite recursion/loop). Nhờ tầng Semantic Error Cache lưu trữ vector embedding của cấu trúc lỗi AST, các lần hỏi sau của các bạn sinh viên khác đều được phục vụ trực tiếp từ cache với chi phí **0 VNĐ** và độ trễ chỉ 10-20ms. Chỉ những đoạn code mang tính logic thuật toán mới lạ thì hệ thống mới tốn khoảng 15-20 VNĐ cho LLM."*

### Câu 4: "Thuật toán có hàng ngàn loại, với các bài toán quá lớn hoặc phức tạp thì hệ thống có bao quát và trực quan hóa được không?"
- **Cách trả lời ăn điểm:**
  > *"Dạ thưa Thầy/Cô, không một kỹ sư hay sinh viên nào debug bằng cách nhìn 1 triệu ô nhớ trên màn hình. Trong kỹ nghệ phần mềm, mọi lỗi logic thuật toán luôn xuất hiện ngay trên các ca kiểm thử tối thiểu (Minimal Reproducible Example). SocraticCode AI giải quyết bài toán quy mô lớn bằng 2 kỹ thuật:  
  > 1. Tự động thu nhỏ test case về bộ vi mô (Micro-testbench 3-7 phần tử) tái hiện nguyên vẹn bản chất bug.  
  > 2. Sử dụng kỹ thuật Cửa sổ trượt (Windowed Memory) chỉ phóng to 7 ô nhớ xung quanh con trỏ và Cắt tỉa cây đệ quy (Stack Pruning). Dù bài toán lớn đến đâu, giao diện vẫn luôn gọn gàng và trực quan tuyệt đối."*

### Câu 5: "Nếu LLM bị ảo giác (hallucination) mà tính sai giá trị biến hoặc địa chỉ ô nhớ thì sao?"
- **Cách trả lời ăn điểm:**
  > *"Dạ thưa Thầy/Cô, nếu để LLM tự tính toán biến thì chắc chắn sẽ bị ảo giác vì LLM không phải là CPU. Vì vậy, SocraticCode AI áp dụng kiến trúc Neuro-Symbolic (Lai giữa Máy ảo xác định và AI):  
  > 1. **Dữ liệu ô nhớ, con trỏ và Trace Table là 100% SỰ THẬT VẬT LÝ (Ground Truth)** được sinh ra từ Sandbox máy ảo thực thi thật, LLM hoàn toàn không được tham gia tính nhẩm.  
  > 2. LLM chỉ đóng vai trò là **Lớp chuyển đổi Sư phạm (Pedagogical Layer)**: Nhận bản báo cáo sự thật từ máy ảo và dịch thành các câu hỏi gợi mở thân thiện.  
  > 3. Hệ thống có Guardrail Schema kiểm soát chặt chẽ, triệt tiêu hoàn toàn nguy cơ ảo giác trong môi trường học thuật!"*
