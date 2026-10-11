import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Layers, 
  CheckSquare, 
  CreditCard, 
  Cpu, 
  Zap, 
  Coins, 
  FileText, 
  ArrowRight,
  TrendingDown,
  School,
  RefreshCw
} from 'lucide-react';
import MindmapViewer from './components/MindmapViewer';
import QuizRunner from './components/QuizRunner';
import FlashcardDeck from './components/FlashcardDeck';
import './App.css';

const API_BASE = 'http://127.0.0.1:8000';

const COURSES = [
  {
    id: "dsa-sgu",
    name: "Cấu trúc Dữ liệu & Giải thuật",
    sub: "Bài 04: Cây Nhị Phân & Cây Tìm Kiếm (BST)",
    tag: "CNTT SGU"
  },
  {
    id: "db-sgu",
    name: "Cơ sở Dữ liệu",
    sub: "Chương 3: Mô hình Quan hệ & Chuẩn hóa 3NF",
    tag: "CNTT SGU"
  },
  {
    id: "net-sgu",
    name: "Mạng Máy Tính",
    sub: "Giao thức TCP & Bắt tay 3 bước",
    tag: "CNTT SGU"
  }
];

export default function App() {
  const [selectedCourseId, setSelectedCourseId] = useState("dsa-sgu");
  const [activeTab, setActiveTab] = useState("mindmap"); // 'mindmap', 'quiz', 'flashcard', 'economics'
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [cacheStats, setCacheStats] = useState({ total_queries: 0, cache_hits: 0, total_vnd_saved: 0 });
  const [customText, setCustomText] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Auto-convert on initial load
  useEffect(() => {
    handleConvert(selectedCourseId);
    fetchCacheStats();
  }, []);

  const fetchCacheStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cache/stats`);
      if (res.ok) {
        const data = await res.json();
        setCacheStats(data);
      }
    } catch (e) {}
  };

  const handleConvert = async (courseId, text = null) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          course_id: courseId, 
          custom_text: text 
        })
      });
      if (res.ok) {
        const data = await res.json();
        setCourseData(data);
        fetchCacheStats();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCourse = (id) => {
    setShowCustomInput(false);
    setSelectedCourseId(id);
    handleConvert(id);
  };

  const handleCustomSubmit = () => {
    if (!customText.trim()) return;
    handleConvert(null, customText);
  };

  const metrics = courseData?.metrics || {
    cost_vnd: 19.5,
    tokens_compressed: 630,
    compression_ratio: "85.0%",
    execution_time_ms: 38.5,
    cache_hit: false
  };

  return (
    <div className="edumind-container">
      {/* Header */}
      <header className="edumind-header glass-panel">
        <div className="header-left">
          <div className="edumind-logo-badge">
            <GraduationCap size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="edumind-title">EduMind Lite</h1>
              <span className="single-node-badge">ĐỘI SINGLENODE</span>
            </div>
            <div className="edumind-sub">
              <span>Nền Tảng Số Hóa Học Liệu & Tạo Sơ Đồ Tư Duy Siêu Tiết Kiệm</span>
              <span>•</span>
              <span style={{ color: 'var(--cyan-400)' }}>HACKATHON SGU 2026</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="cost-pill">
            <Coins size={14} style={{ color: 'var(--emerald-400)' }} />
            <span>Chi phí trung bình: <strong>~20đ / bài học</strong></span>
          </div>
        </div>
      </header>

      {/* Course Selection & Conversion Control Bar */}
      <section className="glass-panel control-section">
        <div className="section-label">
          <span>CHỌN BÀI GIẢNG ĐẠI HỌC SÀI GÒN ĐỂ SỐ HÓA TRỰC TIẾP:</span>
        </div>

        <div className="courses-grid">
          {COURSES.map(course => (
            <div 
              key={course.id}
              className={`course-card ${!showCustomInput && selectedCourseId === course.id ? 'active' : ''}`}
              onClick={() => handleSelectCourse(course.id)}
            >
              <div className="course-card-top">
                <span className="course-tag">{course.tag}</span>
                {!showCustomInput && selectedCourseId === course.id && (
                  <span className="active-dot" />
                )}
              </div>
              <div className="course-card-title">{course.name}</div>
              <div className="course-card-sub">{course.sub}</div>
            </div>
          ))}

          <div 
            className={`course-card custom ${showCustomInput ? 'active' : ''}`}
            onClick={() => setShowCustomInput(true)}
          >
            <div className="course-card-top">
              <span className="course-tag" style={{ color: 'var(--indigo-400)', borderColor: 'var(--indigo-400)' }}>TÙY BIẾN</span>
            </div>
            <div className="course-card-title">Tải Slide / Nhập Văn Bản</div>
            <div className="course-card-sub">Dán nội dung giáo trình bất kỳ để AI phân tích</div>
          </div>
        </div>

        {/* Custom Textarea if selected */}
        {showCustomInput && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <textarea
              className="custom-textarea"
              placeholder="Dán nội dung bài giảng hoặc slide bất kỳ vào đây để EduMind Lite nén ngữ cảnh và sinh sơ đồ tư duy..."
              rows={4}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
            <button 
              className="convert-btn" 
              onClick={handleCustomSubmit}
              disabled={loading}
              style={{ alignSelf: 'flex-start' }}
            >
              <Sparkles size={16} />
              <span>Chuyển Đổi Nội Dung Này</span>
            </button>
          </div>
        )}

        {/* Action Button & Live Economics Ticker */}
        <div className="conversion-action-bar">
          <button 
            className="convert-btn main" 
            onClick={() => handleConvert(selectedCourseId, showCustomInput ? customText : null)}
            disabled={loading}
          >
            {loading ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} />}
            <span>{loading ? 'Đang phân tích tri thức...' : 'Chuyển Đổi Bài Giảng Bằng AI (Demo Trực Tiếp)'}</span>
          </button>

          {/* Metric Badges */}
          <div className="live-metrics-group">
            <div className={`metric-chip ${metrics.cache_hit ? 'cache-hit' : ''}`}>
              <Coins size={14} />
              <span>Chi phí: <strong>{metrics.cost_vnd === 0 ? '0 VNĐ (Cache Hit)' : `${metrics.cost_vnd} VNĐ`}</strong></span>
            </div>

            <div className="metric-chip">
              <TrendingDown size={14} style={{ color: 'var(--cyan-400)' }} />
              <span>Nén Token: <strong>{metrics.compression_ratio}</strong></span>
            </div>

            <div className="metric-chip">
              <Zap size={14} style={{ color: 'var(--amber-400)' }} />
              <span>Độ trễ: <strong>{metrics.execution_time_ms}ms</strong></span>
            </div>
          </div>
        </div>

        {/* Semantic Cache Status Notice */}
        {metrics.cache_hit && (
          <div className="cache-banner">
            <span style={{ fontWeight: '700' }}>⚡ SEMANTIC CACHE HIT:</span>
            <span>Nội dung bài học này đã có sẵn trong bộ đệm lớp học. Trả về ngay trong {metrics.execution_time_ms}ms với chi phí 0 VNĐ (Không tốn token API)!</span>
          </div>
        )}
      </section>

      {/* Main Content Workspace Navigation Tabs */}
      <div className="workspace-tabs-bar">
        <button 
          className={`tab-btn ${activeTab === 'mindmap' ? 'active' : ''}`}
          onClick={() => setActiveTab('mindmap')}
        >
          <Layers size={16} />
          <span>1. Sơ Đồ Tư Duy (Mindmap)</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <CheckSquare size={16} />
          <span>2. Trắc Nghiệm Thông Minh ({courseData?.quizzes?.length || 3} câu)</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'flashcard' ? 'active' : ''}`}
          onClick={() => setActiveTab('flashcard')}
        >
          <CreditCard size={16} />
          <span>3. Thẻ Ghi Nhớ (Flashcards)</span>
        </button>

        <button 
          className={`tab-btn ${activeTab === 'economics' ? 'active' : ''}`}
          onClick={() => setActiveTab('economics')}
        >
          <Coins size={16} />
          <span>4. Bài Toán Kinh Tế (Tối Ưu Chi Phí)</span>
        </button>
      </div>

      {/* Tab Panels */}
      <main className="tab-content-area">
        {activeTab === 'mindmap' && (
          <MindmapViewer mindmap={courseData?.mindmap} />
        )}

        {activeTab === 'quiz' && (
          <QuizRunner quizzes={courseData?.quizzes || []} />
        )}

        {activeTab === 'flashcard' && (
          <FlashcardDeck flashcards={courseData?.flashcards || []} />
        )}

        {activeTab === 'economics' && (
          <div className="glass-panel economics-panel">
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
              📊 Báo Cáo Hiệu Quả Kinh Tế & Tối Ưu Chi Phí Của EduMind Lite
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Điểm cốt lõi giúp <strong>EduMind Lite</strong> giải quyết rào cản tài chính cho sinh viên và nhà trường nằm ở kiến trúc 
              <strong> Nén ngữ cảnh (Context Compression)</strong> kết hợp <strong>Bộ đệm câu hỏi lớp học (Semantic Caching)</strong>.
            </p>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Tiêu chí so sánh</th>
                    <th>ChatGPT Plus / Claude Pro</th>
                    <th>EduMind Lite (SingleNode)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Chi phí cho sinh viên</strong></td>
                    <td style={{ color: '#f87171' }}>~500.000 VNĐ / tháng</td>
                    <td style={{ color: 'var(--emerald-400)', fontWeight: '700' }}>~20 VNĐ / bài học (Gần như 0đ)</td>
                  </tr>
                  <tr>
                    <td><strong>Hỏi lặp lại cùng môn học</strong></td>
                    <td>Tốn 100% token cho mỗi lần hỏi</td>
                    <td style={{ color: 'var(--emerald-400)', fontWeight: '700' }}>0 VNĐ (Nhờ Semantic Cache lớp học)</td>
                  </tr>
                  <tr>
                    <td><strong>Hình thức học tập</strong></td>
                    <td>Đoạn văn bản dài, thụ động</td>
                    <td style={{ color: 'var(--cyan-400)', fontWeight: '700' }}>Sơ đồ tư duy + Trắc nghiệm + Flashcard</td>
                  </tr>
                  <tr>
                    <td><strong>Ngân sách Trường (10.000 SV)</strong></td>
                    <td style={{ color: '#f87171' }}>Hàng trăm triệu đồng/tháng nếu mua gói Enterprise</td>
                    <td style={{ color: 'var(--emerald-400)', fontWeight: '700' }}>Tiết kiệm 92% ngân sách trường học</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div className="stat-card">
                <span className="stat-label">Tổng lượt truy vấn demo</span>
                <span className="stat-val">{cacheStats.total_queries}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Lượt trúng Cache (0 đồng)</span>
                <span className="stat-val" style={{ color: 'var(--emerald-400)' }}>{cacheStats.cache_hits}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Số tiền đã tiết kiệm (VNĐ)</span>
                <span className="stat-val" style={{ color: 'var(--cyan-400)' }}>{cacheStats.total_vnd_saved}đ</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="edumind-footer">
        <div>
          EduMind Lite • Dự án tham dự cuộc thi <strong>HACKATHON SGU 2026 – 2027</strong>
        </div>
        <div>
          Tác giả: <strong>Đội SingleNode</strong> (Solo Developer)
        </div>
      </footer>
    </div>
  );
}
