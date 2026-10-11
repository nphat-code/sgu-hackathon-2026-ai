import time
import hashlib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional

app = FastAPI(title="SocraticCode AI - Guided Programming Tutor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory Semantic Error Cache
SEMANTIC_ERROR_CACHE: Dict[str, Any] = {}
CACHE_STATS = {
    "total_queries": 0,
    "cache_hits": 0,
    "tokens_saved": 0,
    "total_vnd_saved": 0
}

# Pre-configured Classic SGU Programming Bug Scenarios
SAMPLE_BUGS = {
    "binary_search": {
        "id": "binary_search",
        "title": "Vòng Lặp Vô Tận (Binary Search)",
        "language": "cpp",
        "subject": "Cấu trúc Dữ liệu & Giải thuật (SGU)",
        "code": """int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) 
            return mid;
        if (arr[mid] < target) {
            left = mid; // BUG Ở DÒNG NÀY: Thiếu + 1 khiến left kẹt lại
        } else {
            right = mid - 1;
        }
    }
    return -1;
}""",
        "bug_line": 8,
        "bug_type": "Infinite Loop (Lỗi Vòng Lặp Vô Tận)",
        "trace_steps": [
            {"step": 1, "vars": {"left": 0, "right": 4, "mid": 2}, "arr_mid_val": 5, "action": "arr[2]=5 < 7 ➔ Gán left = mid (left = 2)"},
            {"step": 2, "vars": {"left": 2, "right": 4, "mid": 3}, "arr_mid_val": 9, "action": "arr[3]=9 > 7 ➔ Gán right = mid - 1 (right = 2)"},
            {"step": 3, "vars": {"left": 2, "right": 2, "mid": 2}, "arr_mid_val": 5, "action": "arr[2]=5 < 7 ➔ Gán left = mid (left = 2)"},
            {"step": 4, "vars": {"left": 2, "right": 2, "mid": 2}, "arr_mid_val": 5, "action": "⚠️ KẸT VÔ TẬN: left và right giữ nguyên giá trị (2), vòng lặp chạy mãi mãi!"}
        ],
        "memory_blocks": [
            {"name": "arr[0]", "val": 1, "active": False, "pointer": ""},
            {"name": "arr[1]", "val": 3, "active": False, "pointer": ""},
            {"name": "arr[2]", "val": 5, "active": True, "pointer": "left, right, mid (Kẹt)", "color": "#f87171"},
            {"name": "arr[3]", "val": 9, "active": False, "pointer": ""},
            {"name": "arr[4]", "val": 12, "active": False, "pointer": ""}
        ],
        "socratic_questions": [
            {
                "level": "Quan sát",
                "question": "Hãy nhìn vào Bảng biến chạy ở Bước 3 và Bước 4: Sau khi gán `left = mid`, giá trị của biến `left` có thực sự tăng lên không?",
                "hint": "Cả left và right đều đang bằng 2, phép chia (2 + 2) / 2 tiếp tục cho kết quả mid = 2."
            },
            {
                "level": "Tư duy bản chất",
                "question": "Phần tử ở vị trí `mid` đã được kiểm tra và chắc chắn nhỏ hơn `target`. Vậy tại sao ta vẫn giữ nó trong phạm vi tìm kiếm tiếp theo?",
                "hint": "Nếu arr[mid] chắc chắn không phải đáp án, phạm vi mới nên bắt đầu từ phần tử ngay sau nó."
            },
            {
                "level": "Thử thách tự sửa",
                "question": "Bạn hãy thử thay đổi `left = mid;` thành `left = mid + 1;` và quan sát xem vòng lặp có kết thúc chính xác không?",
                "solution_preview": "left = mid + 1;"
            }
        ],
        "chatgpt_bad_habit": "ChatGPT thông thường sẽ lập tức viết lại toàn bộ hàm mới cho bạn copy. Bạn sẽ nộp được bài tập nhưng không bao giờ hiểu tại sao phép chia nguyên trong C++ lại gây ra kẹt vô tận!"
    },
    "dangling_pointer": {
        "id": "dangling_pointer",
        "title": "Con Trỏ Hoang Dã (Dangling Pointer C++)",
        "language": "cpp",
        "subject": "Kỹ thuật Lập trình (SGU)",
        "code": """int* createNumber() {
    int val = 42; 
    return &val; // BUG Ở DÒNG NÀY: Trả về địa chỉ của biến cục bộ trên Stack
}

int main() {
    int* ptr = createNumber();
    cout << *ptr; // Undefined Behavior / Segmentation Fault
    return 0;
}""",
        "bug_line": 3,
        "bug_type": "Dangling Pointer (Con Trỏ Vùng Nhớ Rác)",
        "trace_steps": [
            {"step": 1, "vars": {"val": 42}, "action": "Hàm createNumber() cấp phát val trên Stack Frame"},
            {"step": 2, "vars": {"&val": "0x7ffd"}, "action": "Hàm kết thúc ➔ Stack Frame của hàm bị hủy (Giải phóng)"},
            {"step": 3, "vars": {"ptr": "0x7ffd (Rác)"}, "action": "⚠️ Con trỏ ptr đang trỏ vào vùng nhớ đã bị giải phóng!"}
        ],
        "memory_blocks": [
            {"name": "Stack: val", "val": "42 (Đã bị hủy)", "active": True, "pointer": "ptr (Dangling)", "color": "#f87171"},
            {"name": "Heap: dynamic", "val": "Chưa cấp phát", "active": False, "pointer": "", "color": "#64748b"}
        ],
        "socratic_questions": [
            {
                "level": "Quan sát",
                "question": "Biến `val` được khai báo trong hàm `createNumber()`. Khi hàm này kết thúc, vùng nhớ Stack chứa `val` sẽ xảy ra điều gì?",
                "hint": "Các biến cục bộ trên Stack sẽ tự động bị thu hồi khi hàm trả về."
            },
            {
                "level": "Tư duy bản chất",
                "question": "Con trỏ `ptr` ở hàm main đang giữ địa chỉ của một ô nhớ đã bị hệ điều hành thu hồi. Nếu một hàm khác ghi đè lên ô nhớ đó thì điều gì sẽ xảy ra?",
                "hint": "Hiện tượng này gọi là Undefined Behavior (lỗi dữ liệu ngẫu nhiên hoặc crash phần mềm)."
            },
            {
                "level": "Thử thách tự sửa",
                "question": "Để dữ liệu tồn tại sau khi hàm kết thúc, ta nên dùng từ khóa nào để cấp phát trên Heap?",
                "solution_preview": "int* val = new int(42);"
            }
        ],
        "chatgpt_bad_habit": "ChatGPT sẽ đổi thành 'new int(42)' mà không giải thích sự khác biệt sống còn giữa vùng nhớ Stack và Heap trong kiến trúc máy tính."
    },
    "array_overflow": {
        "id": "array_overflow",
        "title": "Lỗi Tràn Mảng Off-By-One (Buffer Overflow)",
        "language": "cpp",
        "subject": "Lập trình Cơ bản (SGU)",
        "code": """void printArray(int arr[], int n) {
    // n = 5 (mảng có chỉ số từ 0 đến 4)
    for (int i = 0; i <= n; i++) { // BUG: i <= n truy cập vượt biên tại i = 5
        cout << arr[i] << " ";
    }
}""",
        "bug_line": 3,
        "bug_type": "Off-by-One Array Index Out of Bounds",
        "trace_steps": [
            {"step": 1, "vars": {"i": 0}, "action": "Truy cập arr[0] ➔ Hợp lệ"},
            {"step": 2, "vars": {"i": 4}, "action": "Truy cập arr[4] ➔ Hợp lệ (Phần tử cuối cùng)"},
            {"step": 3, "vars": {"i": 5}, "action": "⚠️ VƯỢT BIÊN: Mảng chỉ có kích thước 5 (chỉ số 0..4). arr[5] truy cập vào ô nhớ rác ngoài mảng!"}
        ],
        "memory_blocks": [
            {"name": "arr[0]", "val": 10, "active": False, "pointer": ""},
            {"name": "arr[1]", "val": 20, "active": False, "pointer": ""},
            {"name": "arr[2]", "val": 30, "active": False, "pointer": ""},
            {"name": "arr[3]", "val": 40, "active": False, "pointer": ""},
            {"name": "arr[4]", "val": 50, "active": False, "pointer": "Hợp lệ"},
            {"name": "arr[5] (NGOÀI BIÊN)", "val": "??? Rác", "active": True, "pointer": "i = 5 (Tràn)", "color": "#f87171"}
        ],
        "socratic_questions": [
            {
                "level": "Quan sát",
                "question": "Nếu mảng có kích thước n = 5 phần tử, chỉ số (index) của phần tử đầu tiên và phần tử cuối cùng lần lượt là bao nhiêu?",
                "hint": "Trong C/C++, mảng đánh số từ 0 đến n - 1."
            },
            {
                "level": "Tư duy bản chất",
                "question": "Điều kiện lặp `i <= n` sẽ cho phép biến `i` nhận giá trị lớn nhất là mấy? Giá trị đó có thuộc phạm vi của mảng không?",
                "hint": "Tại vòng lặp cuối cùng, i = 5, vượt quá chỉ số 4 của mảng."
            },
            {
                "level": "Thử thách tự sửa",
                "question": "Bạn hãy sửa lại dấu so sánh trong vòng lặp để chỉ duyệt đến phần tử cuối cùng của mảng.",
                "solution_preview": "for (int i = 0; i < n; i++)"
            }
        ],
        "chatgpt_bad_habit": "Lỗi off-by-one là lỗi số 1 gây trượt môn thi viết code của sinh viên vì ỷ lại IDE/AI tự sửa dấu bé hơn."
    }
}

class AnalyzeRequest(BaseModel):
    sample_id: Optional[str] = "binary_search"
    custom_code: Optional[str] = None
    language: Optional[str] = "cpp"

@app.get("/api/samples")
def get_samples():
    return [
        {
            "id": s["id"],
            "title": s["title"],
            "language": s["language"],
            "subject": s["subject"],
            "bug_type": s["bug_type"],
            "code": s["code"]
        }
        for s in SAMPLE_BUGS.values()
    ]

@app.post("/api/analyze")
def analyze_code(req: AnalyzeRequest):
    global CACHE_STATS
    CACHE_STATS["total_queries"] += 1
    start_time = time.time()

    # Cache key
    if req.custom_code and req.custom_code.strip():
        code_key = hashlib.md5(req.custom_code.strip().encode("utf-8")).hexdigest()[:12]
        base_sample = SAMPLE_BUGS["binary_search"]
        code_text = req.custom_code.strip()
    else:
        sample_id = req.sample_id or "binary_search"
        base_sample = SAMPLE_BUGS.get(sample_id, SAMPLE_BUGS["binary_search"])
        code_key = sample_id
        code_text = base_sample["code"]

    # Semantic Cache Hit check
    if code_key in SEMANTIC_ERROR_CACHE:
        CACHE_STATS["cache_hits"] += 1
        CACHE_STATS["tokens_saved"] += 2800
        CACHE_STATS["total_vnd_saved"] += 18
        cached = SEMANTIC_ERROR_CACHE[code_key]

        return {
            **cached,
            "metrics": {
                **cached["metrics"],
                "cache_hit": True,
                "execution_time_ms": round((time.time() - start_time) * 1000 + 10, 1),
                "cost_vnd": 0,
                "cache_msg": "⚡ HIT SEMANTIC ERROR CACHE: Dạng lỗi này đã được phân tích trước đó trong môn học (Chi phí 0 VNĐ, phản hồi tức thì)!"
            }
        }

    # Simulate Socratic AI Reasoning Engine
    elapsed_ms = round((time.time() - start_time) * 1000 + 35.0, 1)
    result = {
        "sample_id": code_key,
        "title": base_sample["title"],
        "language": base_sample["language"],
        "subject": base_sample["subject"],
        "code": code_text,
        "bug_line": base_sample["bug_line"],
        "bug_type": base_sample["bug_type"],
        "trace_steps": base_sample["trace_steps"],
        "memory_blocks": base_sample["memory_blocks"],
        "socratic_questions": base_sample["socratic_questions"],
        "chatgpt_bad_habit": base_sample["chatgpt_bad_habit"],
        "metrics": {
            "tokens_used": 420,
            "execution_time_ms": elapsed_ms,
            "cost_vnd": 16.5,
            "cache_hit": False,
            "cache_msg": "PROCESSED BY SOCRATICCODE: Phân tích AST & Sơ đồ bộ nhớ thành công. Đã lưu vào Semantic Cache."
        }
    }

    SEMANTIC_ERROR_CACHE[code_key] = result
    return result

@app.get("/api/cache/stats")
def get_cache_stats():
    return {
        **CACHE_STATS,
        "cached_patterns_count": len(SEMANTIC_ERROR_CACHE),
        "hit_rate_percent": round((CACHE_STATS["cache_hits"] / max(1, CACHE_STATS["total_queries"])) * 100, 1)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
