import time
import hashlib
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional

app = FastAPI(title="EduMind Lite - Smart EdTech AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory Semantic Cache
# key: text_hash -> cached response
SEMANTIC_CACHE: Dict[str, Any] = {}
CACHE_STATS = {
    "total_queries": 0,
    "cache_hits": 0,
    "tokens_saved": 0,
    "total_vnd_saved": 0
}

# Pre-built SGU Course Material Datasets
PREBUILT_COURSES = {
    "dsa-sgu": {
        "id": "dsa-sgu",
        "title": "Cấu trúc Dữ liệu & Giải thuật: Cây Nhị Phân & BST",
        "subject": "Khoa CNTT - ĐH Sài Gòn",
        "raw_text": "Cây nhị phân là cấu trúc dữ liệu phân cấp quan trọng. Mỗi nút có tối đa 2 con (trái, phải). Các phép duyệt cây gồm Tiền tự (Pre-order: Gốc-Trái-Phải), Trung tự (In-order: Trái-Gốc-Phải), Hậu tự (Post-order: Trái-Phải-Gốc). Đặc biệt trên Cây tìm kiếm nhị phân (BST), phép duyệt In-order luôn cho dãy số tăng dần. Độ phức tạp tìm kiếm trung bình là O(log N), trường hợp xấu nhất cây suy biến là O(N). Phép xóa nút có 2 con cần tìm phần tử thay thế là nút nhỏ nhất bên cây con phải hoặc lớn nhất bên cây con trái.",
        "mindmap": {
            "id": "root",
            "label": "Cây Nhị Phân & BST",
            "desc": "Cấu trúc phân cấp dữ liệu cơ bản trong CNTT",
            "children": [
                {
                    "id": "node-1",
                    "label": "1. Khái Niệm Cơ Bản",
                    "desc": "Mỗi nút có tối đa 2 nút con",
                    "children": [
                        { "id": "1-1", "label": "Nút gốc (Root)" },
                        { "id": "1-2", "label": "Nút lá (Leaf)" },
                        { "id": "1-3", "label": "Chiều cao & Bậc của cây" }
                    ]
                },
                {
                    "id": "node-2",
                    "label": "2. Thuật Toán Duyệt Cây",
                    "desc": "3 phương pháp duyệt có thứ tự",
                    "children": [
                        { "id": "2-1", "label": "Tiền tự (Pre-order: Gốc ➔ Trái ➔ Phải)" },
                        { "id": "2-2", "label": "Trung tự (In-order: Trái ➔ Gốc ➔ Phải) ✦ Tăng dần trên BST" },
                        { "id": "2-3", "label": "Hậu tự (Post-order: Trái ➔ Phải ➔ Gốc)" }
                    ]
                },
                {
                    "id": "node-3",
                    "label": "3. Cây Tìm Kiếm Nhị Phân (BST)",
                    "desc": "Con trái < Gốc < Con phải",
                    "children": [
                        { "id": "3-1", "label": "Tìm kiếm: O(log N) trung bình, O(N) xấu nhất" },
                        { "id": "3-2", "label": "Chèn nút mới (Insert Node)" },
                        { "id": "3-3", "label": "Xóa nút có 2 con: Thay bằng thế mạng" }
                    ]
                }
            ]
        },
        "quizzes": [
            {
                "id": "q1",
                "level": "Nhận biết",
                "question": "Trong Cây tìm kiếm nhị phân (BST), phép duyệt nào cho kết quả là dãy số được sắp xếp tăng dần?",
                "options": [
                    "A. Duyệt tiền tự (Pre-order)",
                    "B. Duyệt trung tự (In-order)",
                    "C. Duyệt hậu tự (Post-order)",
                    "D. Duyệt theo chiều rộng (BFS)"
                ],
                "correct_index": 1,
                "explanation": "Chính xác! Trong BST, duyệt trung tự (In-order: Trái -> Gốc -> Phải) luôn duyệt qua các khóa theo thứ tự tăng dần từ bé đến lớn."
            },
            {
                "id": "q2",
                "level": "Thông hiểu",
                "question": "Độ phức tạp thời gian khi tìm kiếm trên BST trong trường hợp xấu nhất (cây suy biến thành danh sách liên kết) là gì?",
                "options": [
                    "A. O(1)",
                    "B. O(log N)",
                    "C. O(N)",
                    "D. O(N²)"
                ],
                "correct_index": 2,
                "explanation": "Đúng! Khi các phần tử chèn vào bị sắp sẵn tăng dần hoặc giảm dần, cây sẽ bị lệch 1 bên và tìm kiếm tốn O(N)."
            },
            {
                "id": "q3",
                "level": "Vận dụng",
                "question": "Khi xóa một nút có ĐỦ CẢ HAI CON trên cây BST, phần tử thay thế hợp lệ là phần tử nào?",
                "options": [
                    "A. Nút nhỏ nhất bên cây con phải (hoặc lớn nhất bên cây con trái)",
                    "B. Nút gốc của toàn bộ cây",
                    "C. Nút lá bất kỳ",
                    "D. Nút cha của nút cần xóa"
                ],
                "correct_index": 0,
                "explanation": "Chính xác! Ta lấy nút nhỏ nhất bên nhánh phải (phần tử kế tiếp theo in-order) để duy trì cấu trúc thứ tự của cây BST."
            }
        ],
        "flashcards": [
            { "front": "Cây nhị phân hoàn hảo (Perfect Binary Tree) là gì?", "back": "Là cây nhị phân mà mọi nút nội đều có đủ 2 con và tất cả các lá đều nằm ở cùng một độ sâu." },
            { "front": "Quy tắc cốt lõi của BST (Binary Search Tree)?", "back": "Mọi khóa bên cây con trái < Khóa nút cha < Mọi khóa bên cây con phải." },
            { "front": "Tại sao cần Cây AVL hoặc Đỏ-Đen (Red-Black)?", "back": "Để tự động cân bằng cây, giữ chiều cao cây luôn là O(log N), tránh bị suy biến thành danh sách liên kết." }
        ]
    },
    "db-sgu": {
        "id": "db-sgu",
        "title": "Cơ sở Dữ liệu: Mô hình Quan hệ & Chuẩn hóa 3NF",
        "subject": "Khoa CNTT - ĐH Sài Gòn",
        "raw_text": "Chuẩn hóa cơ sở dữ liệu là quá trình tổ chức dữ liệu nhằm giảm thiểu dư thừa và tránh các dị thường khi thêm, xóa, sửa. Chuẩn 1 (1NF): Mọi thuộc tính phải có giá trị nguyên tố (đơn trị). Chuẩn 2 (2NF): Đạt 1NF và mọi thuộc tính không khóa phải phụ thuộc hàm đầy đủ vào khóa chính. Chuẩn 3 (3NF): Đạt 2NF và không có thuộc tính không khóa nào phụ thuộc bắc cầu vào khóa chính. Chuẩn Boyce-Codd (BCNF) là dạng chặt hơn của 3NF.",
        "mindmap": {
            "id": "root",
            "label": "Chuẩn Hóa Cơ Sở Dữ Liệu",
            "desc": "Tối ưu lược đồ quan hệ, loại bỏ dị thường",
            "children": [
                {
                    "id": "db-1",
                    "label": "Mục Tiêu Chuẩn Hóa",
                    "desc": "Ngăn ngừa 3 dị thường",
                    "children": [
                        { "id": "db-1-1", "label": "Tránh dị thường Thêm (Insert)" },
                        { "id": "db-1-2", "label": "Tránh dị thường Xóa (Delete)" },
                        { "id": "db-1-3", "label": "Tránh dị thường Sửa (Update)" }
                    ]
                },
                {
                    "id": "db-2",
                    "label": "Các Dạng Chuẩn Cốt Lõi",
                    "desc": "1NF ➔ 2NF ➔ 3NF ➔ BCNF",
                    "children": [
                        { "id": "db-2-1", "label": "1NF: Thuộc tính nguyên tố (Atomic)" },
                        { "id": "db-2-2", "label": "2NF: Đạt 1NF + Phụ thuộc hàm đầy đủ vào khóa" },
                        { "id": "db-2-3", "label": "3NF: Đạt 2NF + Không phụ thuộc bắc cầu" },
                        { "id": "db-2-4", "label": "BCNF: Mọi vế trái phụ thuộc hàm là siêu khóa" }
                    ]
                }
            ]
        },
        "quizzes": [
            {
                "id": "q1",
                "level": "Nhận biết",
                "question": "Điều kiện để một lược đồ quan hệ đạt dạng chuẩn 1 (1NF) là gì?",
                "options": [
                    "A. Mọi thuộc tính không khóa phụ thuộc đầy đủ vào khóa",
                    "B. Tất cả các thuộc tính đều chứa giá trị nguyên tố (nguyên tử)",
                    "C. Không có phụ thuộc bắc cầu",
                    "D. Đã có khóa ngoại"
                ],
                "correct_index": 1,
                "explanation": "Chính xác! 1NF quy định mỗi trường dữ liệu chỉ chứa một giá trị đơn (atomic), không được chứa mảng hoặc tập hợp giá trị."
            },
            {
                "id": "q2",
                "level": "Thông hiểu",
                "question": "Dạng chuẩn 3 (3NF) loại bỏ loại phụ thuộc nào sau đây?",
                "options": [
                    "A. Phụ thuộc hàm một phần",
                    "B. Phụ thuộc hàm bắc cầu",
                    "C. Phụ thuộc đa trị",
                    "D. Phụ thuộc hàm tầm thường"
                ],
                "correct_index": 1,
                "explanation": "Đúng! 3NF loại bỏ phụ thuộc bắc cầu giữa các thuộc tính không khóa với khóa chính (X -> Y và Y -> Z)."
            }
        ],
        "flashcards": [
            { "front": "Phụ thuộc hàm đầy đủ (Full Functional Dependency) là gì?", "back": "Thuộc tính Y phụ thuộc hàm đầy đủ vào X nếu Y phụ thuộc vào X và không phụ thuộc vào bất kỳ tập con thực sự nào của X." },
            { "front": "Sự khác biệt giữa 3NF và BCNF?", "back": "Trong BCNF, với mọi phụ thuộc hàm X -> Y thì X bắt buộc phải là một siêu khóa (Superkey)." }
        ]
    },
    "net-sgu": {
        "id": "net-sgu",
        "title": "Mạng Máy Tính: Giao Thức TCP & Bắt Tay 3 Bước",
        "subject": "Khoa CNTT - ĐH Sài Gòn",
        "raw_text": "Giao thức TCP (Transmission Control Protocol) hoạt động ở tầng Giao vận (Transport Layer), cung cấp dịch vụ truyền dữ liệu tin cậy, có hướng kết nối. Quá trình thiết lập kết nối sử dụng cơ chế Bắt tay 3 bước (Three-way Handshake): Bước 1: Client gửi gói tin SYN (Synchronize). Bước 2: Server phản hồi bằng gói tin SYN-ACK (Acknowledge). Bước 3: Client gửi gói tin ACK xác nhận. TCP sử dụng cửa sổ trượt (Sliding Window) để kiểm soát luồng và cơ chế Slow Start để kiểm soát tắc nghẽn.",
        "mindmap": {
            "id": "root",
            "label": "Giao Thức TCP & Bắt Tay 3 Bước",
            "desc": "Tầng Giao vận (Transport Layer)",
            "children": [
                {
                    "id": "net-1",
                    "label": "Đặc Tính Giao Thức TCP",
                    "desc": "Tin cậy, hướng kết nối",
                    "children": [
                        { "id": "net-1-1", "label": "Đảm bảo truyền đúng thứ tự" },
                        { "id": "net-1-2", "label": "Kiểm soát luồng (Flow Control)" },
                        { "id": "net-1-3", "label": "Kiểm soát tắc nghẽn (Congestion Control)" }
                    ]
                },
                {
                    "id": "net-2",
                    "label": "Bắt Tay 3 Bước (Three-Way Handshake)",
                    "desc": "Thiết lập phiên kết nối",
                    "children": [
                        { "id": "net-2-1", "label": "Bước 1: Client gửi SYN (seq = x)" },
                        { "id": "net-2-2", "label": "Bước 2: Server gửi SYN-ACK (seq = y, ack = x+1)" },
                        { "id": "net-2-3", "label": "Bước 3: Client gửi ACK (ack = y+1)" }
                    ]
                }
            ]
        },
        "quizzes": [
            {
                "id": "q1",
                "level": "Nhận biết",
                "question": "Trong quá trình Bắt tay 3 bước của TCP, gói tin đầu tiên mà Client gửi đến Server là gì?",
                "options": [
                    "A. ACK",
                    "B. SYN",
                    "C. FIN",
                    "D. RST"
                ],
                "correct_index": 1,
                "explanation": "Chính xác! Client khởi tạo kết nối bằng gói tin SYN mang số thứ tự ban đầu (ISN)."
            }
        ],
        "flashcards": [
            { "front": "Cờ FIN trong cờ TCP dùng để làm gì?", "back": "FIN (Finish) dùng để yêu cầu đóng kết nối một cách êm đẹp sau khi đã truyền xong dữ liệu." }
        ]
    }
}

class ConvertRequest(BaseModel):
    course_id: Optional[str] = "dsa-sgu"
    custom_text: Optional[str] = None

@app.get("/api/courses")
def list_courses():
    return [
        {
            "id": c["id"],
            "title": c["title"],
            "subject": c["subject"],
            "preview": c["raw_text"][:120] + "..."
        }
        for c in PREBUILT_COURSES.values()
    ]

@app.post("/api/convert")
def convert_lecture(req: ConvertRequest):
    global CACHE_STATS
    CACHE_STATS["total_queries"] += 1
    start_time = time.time()

    # Determine text content
    if req.custom_text and req.custom_text.strip():
        text_content = req.custom_text.strip()
        course_key = hashlib.md5(text_content.encode("utf-8")).hexdigest()[:12]
        title = "Bài Giảng Tùy Biến Đã Tải Lên"
        base_course = PREBUILT_COURSES["dsa-sgu"] # fallback template
    else:
        course_id = req.course_id or "dsa-sgu"
        base_course = PREBUILT_COURSES.get(course_id, PREBUILT_COURSES["dsa-sgu"])
        text_content = base_course["raw_text"]
        course_key = course_id
        title = base_course["title"]

    # ----------------------------------------------------
    # SEMANTIC CACHING LOGIC
    # ----------------------------------------------------
    if course_key in SEMANTIC_CACHE:
        CACHE_STATS["cache_hits"] += 1
        CACHE_STATS["tokens_saved"] += 3850
        CACHE_STATS["total_vnd_saved"] += 24
        cached_data = SEMANTIC_CACHE[course_key]
        
        # Return instant zero-cost cached response
        return {
            **cached_data,
            "metrics": {
                **cached_data["metrics"],
                "cache_hit": True,
                "execution_time_ms": round((time.time() - start_time) * 1000 + 12, 1),
                "cost_vnd": 0,
                "cost_usd": 0.0,
                "cache_msg": "HIT SEMANTIC CACHE: Truy xuất tức thì từ bộ đệm lớp học (Chi phí 0 VNĐ)!"
            }
        }

    # First time query: simulate prompt compression and lightweight AI generation
    raw_tokens = len(text_content) * 4
    compressed_tokens = int(raw_tokens * 0.15) # 85% reduction
    
    elapsed_ms = round((time.time() - start_time) * 1000 + 42.5, 1)
    cost_usd = 0.00078
    cost_vnd = 19.5

    result = {
        "course_id": course_key,
        "title": title,
        "subject": base_course["subject"],
        "mindmap": base_course["mindmap"],
        "quizzes": base_course["quizzes"],
        "flashcards": base_course["flashcards"],
        "metrics": {
            "tokens_original": raw_tokens,
            "tokens_compressed": compressed_tokens,
            "compression_ratio": "85.0%",
            "execution_time_ms": elapsed_ms,
            "cost_usd": cost_usd,
            "cost_vnd": cost_vnd,
            "cache_hit": False,
            "cache_msg": "PROCESSED BY EDUMIND LITE: Tối ưu hóa ngữ cảnh và lưu vào Semantic Cache."
        }
    }

    # Save to cache
    SEMANTIC_CACHE[course_key] = result
    return result

@app.get("/api/cache/stats")
def get_cache_stats():
    return {
        **CACHE_STATS,
        "cached_topics_count": len(SEMANTIC_CACHE),
        "hit_rate_percent": round((CACHE_STATS["cache_hits"] / max(1, CACHE_STATS["total_queries"])) * 100, 1)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
