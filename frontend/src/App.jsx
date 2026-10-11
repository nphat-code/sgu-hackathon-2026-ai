import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  BrainCircuit, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Coins, 
  Zap, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  FileCode,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import CodeEditorView from './components/CodeEditorView';
import MemoryTraceView from './components/MemoryTraceView';
import SocraticAssistantView from './components/SocraticAssistantView';
import './App.css';

const API_BASE = 'http://127.0.0.1:8000';

const SAMPLES = [
  {
    id: "binary_search",
    title: "1. Vòng Lặp Vô Tận",
    sub: "Binary Search (C++)",
    bug: "left = mid (Thiếu +1)",
    tag: "DSA SGU"
  },
  {
    id: "dangling_pointer",
    title: "2. Con Trỏ Rác",
    sub: "Dangling Pointer (C++)",
    bug: "Trả về biến cục bộ Stack",
    tag: "KTLT SGU"
  },
  {
    id: "array_overflow",
    title: "3. Tràn Mảng Off-By-One",
    sub: "Buffer Overflow (C++)",
    bug: "Duyệt i <= n vượt biên",
    tag: "LTCB SGU"
  }
];

export default function App() {
  const [selectedSampleId, setSelectedSampleId] = useState("binary_search");
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [cacheStats, setCacheStats] = useState({ total_queries: 0, cache_hits: 0, total_vnd_saved: 0 });
  const [activeView, setActiveView] = useState("socratic"); // 'socratic', 'comparison', 'economics'
  const [successToast, setSuccessToast] = useState(null);

  useEffect(() => {
    handleAnalyze(selectedSampleId);
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

  const handleAnalyze = async (sampleId) => {
    setLoading(true);
    setIsFixed(false);
    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sample_id: sampleId })
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysisData(data);
        setCurrentCode(data.code);
        fetchCacheStats();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (id) => {
    setSelectedSampleId(id);
    handleAnalyze(id);
  };

  const handleApplyFix = () => {
    if (!analysisData) return;
    let fixedCode = currentCode;

    if (selectedSampleId === "binary_search") {
      fixedCode = currentCode.replace("left = mid;", "left = mid + 1; // ĐÃ TỰ SỬA: Không còn kẹt vô tận!");
    } else if (selectedSampleId === "dangling_pointer") {
      fixedCode = currentCode.replace("int val = 42;", "int* val = new int(42); // ĐÃ TỰ SỬA: Cấp phát trên Heap!");
      fixedCode = fixedCode.replace("return &val;", "return val;");
    } else if (selectedSampleId === "array_overflow") {
      fixedCode = currentCode.replace("i <= n", "i < n // ĐÃ TỰ SỬA: Không còn tràn mảng!");
    }

    setCurrentCode(fixedCode);
    setIsFixed(true);
    setSuccessToast("🎉 Chúc mừng! Bạn đã tự suy luận và gỡ được bug thành công!");
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const metrics = analysisData?.metrics || {
    cost_vnd: 16.5,
    execution_time_ms: 35.0,
    cache_hit: false
  };

  return (
    <div className="socratic-container">
      {/* Toast Notification */}
      {successToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: 'rgba(16, 185, 129, 0.95)',
          color: '#fff',
          padding: '14px 20px',
          borderRadius: '10px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          zIndex: 9999,
          fontWeight: '700',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid #6ee7b7'
        }}>
          <CheckCircle2 size={20} />
          {successToast}
        </div>
      )}

      {/* Header */}
      <header className="socratic-header glass-panel">
        <div className="header-left">
          <div className="socratic-logo-badge">
            <Code2 size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="socratic-title">SocraticCode AI</h1>
              <span className="single-node-badge">ĐỘI SINGLENODE</span>
            </div>
            <div className="socratic-sub">
              <span>Trợ Giảng Gợi Mở Tư Duy Lập Trình & Trực Quan Hóa Bộ Nhớ</span>
              <span>•</span>
              <span style={{ color: 'var(--cyan-400)' }}>HACKATHON SGU 2026</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="socratic-pill">
            <BrainCircuit size={15} style={{ color: 'var(--cyan-400)' }} />
            <span>Nói KHÔNG với chép code giải hộ</span>
          </div>
        </div>
      </header>

      {/* Bug Scenarios Selection Bar */}
      <section className="glass-panel control-section">
        <div className="section-label">
          <span>CHỌN DẠNG LỖI LẬP TRÌNH KINH ĐIỂN CỦA SINH VIÊN CNTT ĐH SÀI GÒN:</span>
        </div>

        <div className="samples-grid">
          {SAMPLES.map(sample => (
            <div
              key={sample.id}
              className={`sample-card ${selectedSampleId === sample.id ? 'active' : ''}`}
              onClick={() => handleSelectSample(sample.id)}
            >
              <div className="sample-card-top">
                <span className="sample-tag">{sample.tag}</span>
                {selectedSampleId === sample.id && <span className="active-dot" />}
              </div>
              <div className="sample-card-title">{sample.title}</div>
              <div className="sample-card-sub">{sample.sub} • <em>{sample.bug}</em></div>
            </div>
          ))}
        </div>

        {/* Action Button & Live Economics */}
        <div className="action-metrics-bar">
          <button 
            className="analyze-btn"
            onClick={() => handleAnalyze(selectedSampleId)}
            disabled={loading}
          >
            {loading ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} />}
            <span>{loading ? 'Đang phân tích AST & Bộ nhớ...' : 'Phân Tích Bằng Socratic AI (Demo Trực Tiếp)'}</span>
          </button>

          {/* Metrics */}
          <div className="live-metrics-group">
            <div className={`metric-chip ${metrics.cache_hit ? 'cache-hit' : ''}`}>
              <Coins size={14} />
              <span>Chi phí: <strong>{metrics.cost_vnd === 0 ? '0 VNĐ (Cache Hit)' : `${metrics.cost_vnd} VNĐ`}</strong></span>
            </div>

            <div className="metric-chip">
              <Zap size={14} style={{ color: 'var(--amber-400)' }} />
              <span>Độ trễ: <strong>{metrics.execution_time_ms}ms</strong></span>
            </div>

            <div className="metric-chip">
              <ShieldCheck size={14} style={{ color: 'var(--emerald-400)' }} />
              <span>Code giải hộ: <strong>0% (Bảo tồn tư duy)</strong></span>
            </div>
          </div>
        </div>

        {/* Semantic Cache Notice Banner */}
        {metrics.cache_hit && (
          <div className="cache-banner">
            <span style={{ fontWeight: '700' }}>⚡ SEMANTIC ERROR CACHE HIT:</span>
            <span>Dạng lỗi kinh điển này đã được phân tích trước đó trong môn học. Sinh viên nhận ngay sơ đồ bộ nhớ trong {metrics.execution_time_ms}ms với giá 0 VNĐ!</span>
          </div>
        )}
      </section>

      {/* Main Mode Navigation Bar */}
      <div className="workspace-tabs-bar">
        <button 
          className={`tab-btn ${activeView === 'socratic' ? 'active' : ''}`}
          onClick={() => setActiveView('socratic')}
        >
          <Terminal size={16} />
          <span>1. Bàn Gỡ Lỗi Trực Quan & Vấn Đáp Socratic</span>
        </button>

        <button 
          className={`tab-btn ${activeView === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveView('comparison')}
        >
          <AlertTriangle size={16} />
          <span>2. So Sánh: ChatGPT Chép Code vs SocraticCode</span>
        </button>

        <button 
          className={`tab-btn ${activeView === 'economics' ? 'active' : ''}`}
          onClick={() => setActiveView('economics')}
        >
          <Coins size={16} />
          <span>3. Bài Toán Kinh Tế & Bộ Đệm Lớp Học</span>
        </button>
      </div>

      {/* Main Workspace Area */}
      <main className="main-content-layout">
        {activeView === 'socratic' && (
          <div className="ide-split-grid">
            {/* Left Column: Code Editor & Memory Trace */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CodeEditorView 
                code={currentCode}
                bugLine={analysisData?.bug_line}
                bugType={analysisData?.bug_type}
                isFixed={isFixed}
              />

              <MemoryTraceView 
                memoryBlocks={analysisData?.memory_blocks || []}
                traceSteps={analysisData?.trace_steps || []}
              />
            </div>

            {/* Right Column: Socratic Guided Dialogue */}
            <div>
              <SocraticAssistantView 
                questions={analysisData?.socratic_questions || []}
                chatgptBadHabit={analysisData?.chatgpt_bad_habit || ''}
                onApplyFix={handleApplyFix}
                isFixed={isFixed}
              />
            </div>
          </div>
        )}

        {activeView === 'comparison' && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
              ⚖️ So Sánh Trực Tiếp: Tác Hại Của ChatGPT Thường vs Sức Mạnh Của SocraticCode
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Tại sao các giảng viên CNTT Đại học Sài Gòn luôn khuyến cáo sinh viên không nên dùng ChatGPT để copy code giải hộ:
            </p>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Tiêu chí đánh giá</th>
                    <th>ChatGPT / Copilot Thường</th>
                    <th>SocraticCode AI (SingleNode)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Hành vi xử lý</strong></td>
                    <td style={{ color: '#f87171' }}>Viết lại 100% code mới cho sinh viên copy</td>
                    <td style={{ color: 'var(--emerald-400)', fontWeight: '700' }}>Chỉ ra dòng lỗi và đặt câu hỏi gợi mở</td>
                  </tr>
                  <tr>
                    <td><strong>Trực quan hóa</strong></td>
                    <td>Chỉ có văn bản (Text) dài, khó hình dung</td>
                    <td style={{ color: 'var(--cyan-400)', fontWeight: '700' }}>Vẽ sơ đồ ô nhớ, con trỏ và biến chạy từng bước</td>
                  </tr>
                  <tr>
                    <td><strong>Hiệu quả học tập</strong></td>
                    <td style={{ color: '#f87171' }}>Mất tư duy giải thuật, thi viết code trên giấy rớt môn</td>
                    <td style={{ color: 'var(--emerald-400)', fontWeight: '700' }}>Hiểu sâu bản chất máy tính, tự sửa được bug</td>
                  </tr>
                  <tr>
                    <td><strong>Chi phí cho trường</strong></td>
                    <td>Gọi API đắt tiền lặp đi lặp lại</td>
                    <td style={{ color: 'var(--emerald-400)', fontWeight: '700' }}>Semantic Cache tái sử dụng dạng lỗi với giá 0đ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'economics' && (
          <div className="glass-panel" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '14px', color: '#fff' }}>
              📊 Bài Toán Kinh Tế & Bộ Đệm Lớp Học (Semantic Error Cache)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Trong một khóa học Lập trình C++ của SGU có 200 sinh viên, có đến 80% sinh viên gặp cùng các lỗi kinh điển như 
              <em> Vòng lặp vô tận, Dangling Pointer, hoặc Tràn mảng</em>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div className="stat-card">
                <span className="stat-label">Tổng lượt phân tích bug</span>
                <span className="stat-val">{cacheStats.total_queries}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Lượt trúng Cache (0 đồng)</span>
                <span className="stat-val" style={{ color: 'var(--emerald-400)' }}>{cacheStats.cache_hits}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Số tiền tiết kiệm (VNĐ)</span>
                <span className="stat-val" style={{ color: 'var(--cyan-400)' }}>{cacheStats.total_vnd_saved}đ</span>
              </div>
            </div>

            <div style={{ padding: '16px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: '700', color: '#fff', marginBottom: '6px' }}>
                💡 Cơ chế tiết kiệm chi phí cốt lõi:
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Khi một sinh viên gặp lỗi lặp vô tận, AI phân tích mẫu hình mã nguồn (AST pattern) và lưu vào bộ nhớ đệm ngữ nghĩa. 
                Khi sinh viên thứ hai trong lớp gặp lỗi tương tự, hệ thống đối soát độ tương đồng vector và lập tức trả về lời giải thích cùng sơ đồ bộ nhớ trong <strong>12ms</strong> với <strong>chi phí đúng 0 đồng</strong>!
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="socratic-footer">
        <div>
          SocraticCode AI • Dự án tham dự cuộc thi <strong>HACKATHON SGU 2026 – 2027</strong>
        </div>
        <div>
          Tác giả: <strong>Đội SingleNode</strong> (Solo Developer)
        </div>
      </footer>
    </div>
  );
}
