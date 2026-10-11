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
  TrendingDown,
  Layers,
  BarChart3,
  Users,
  RotateCcw
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
    tag: "CTDL&GT SGU"
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

  // Economic Simulator State
  const [simStudents, setSimStudents] = useState(250);

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
    setSuccessToast("🎉 Chúc mừng! Bạn đã tự suy luận bản chất và sửa code thành công!");
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleResetToBug = () => {
    if (!analysisData) return;
    setCurrentCode(analysisData.code);
    setIsFixed(false);
  };

  const metrics = analysisData?.metrics || {
    cost_vnd: 16.5,
    execution_time_ms: 35.0,
    cache_hit: false
  };

  // Simulator Calculations
  const simQueriesPerStudent = 4;
  const simTotalQueries = simStudents * simQueriesPerStudent;
  const simCostWithoutCache = Math.round(simTotalQueries * 18);
  const simHitRate = 0.88;
  const simCachedQueries = Math.round(simTotalQueries * simHitRate);
  const simNewQueries = simTotalQueries - simCachedQueries;
  const simCostWithSocratic = Math.round(simNewQueries * 18);
  const simVndSaved = simCostWithoutCache - simCostWithSocratic;
  const simPctSaved = Math.round((simVndSaved / Math.max(1, simCostWithoutCache)) * 100);

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
          padding: '14px 22px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 9999,
          fontWeight: '700',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid #6ee7b7'
        }}>
          <CheckCircle2 size={20} />
          <span>{successToast}</span>
        </div>
      )}

      {/* 1. Header Command Bar */}
      <header className="socratic-header">
        <div className="header-left">
          <div className="socratic-logo-badge">
            <Code2 size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 className="socratic-title">SocraticCode AI</h1>
              <span className="single-node-badge">ĐỘI SINGLENODE</span>
            </div>
            <div className="socratic-sub">
              <span>Trợ Giảng Gợi Mở Tư Duy Lập Trình & Trực Quan Hóa Bộ Nhớ</span>
              <span>•</span>
              <span style={{ color: 'var(--cyan-400)', fontWeight: '600' }}>HACKATHON SGU 2026 – 2027</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="socratic-pill">
            <BrainCircuit size={15} />
            <span>NÓI KHÔNG VỚI CHÉP CODE GIẢI HỘ</span>
          </div>
        </div>
      </header>

      {/* 2. Bug Scenarios Selection Bar */}
      <section className="control-section">
        <div className="section-label">
          <span>CHỌN DẠNG LỖI THUẬT TOÁN KINH ĐIỂN CỦA SINH VIÊN CNTT ĐH SÀI GÒN:</span>
          <span style={{ color: 'var(--cyan-400)' }}>Cơ sở dữ liệu giáo trình SGU (K23 - K25)</span>
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
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              className="analyze-btn"
              onClick={() => handleAnalyze(selectedSampleId)}
              disabled={loading}
            >
              {loading ? <RefreshCw size={17} className="spin" /> : <Sparkles size={17} />}
              <span>{loading ? 'Đang phân tích AST & Bộ nhớ...' : 'Phân Tích Bằng Socratic AI (Demo)'}</span>
            </button>

            {isFixed && (
              <button
                onClick={handleResetToBug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '11px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--slate-300)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={14} />
                <span>Đặt lại mã lỗi ban đầu</span>
              </button>
            )}
          </div>

          {/* Metrics */}
          <div className="live-metrics-group">
            <div className={`metric-chip ${metrics.cache_hit ? 'cache-hit' : ''}`}>
              <Coins size={14} />
              <span>Chi phí: <strong>{metrics.cost_vnd === 0 ? '0 VNĐ (Hit Cache)' : `${metrics.cost_vnd} VNĐ`}</strong></span>
            </div>

            <div className="metric-chip">
              <Zap size={14} style={{ color: 'var(--amber-400)' }} />
              <span>Độ trễ: <strong>{metrics.execution_time_ms}ms</strong></span>
            </div>

            <div className="metric-chip">
              <ShieldCheck size={14} style={{ color: 'var(--emerald-400)' }} />
              <span>Code giải hộ: <strong>0% (Tự tư duy)</strong></span>
            </div>
          </div>
        </div>

        {/* Semantic Cache Notice Banner */}
        {metrics.cache_hit && (
          <div className="cache-banner">
            <Zap size={18} style={{ flexShrink: 0 }} />
            <div>
              <strong>SEMANTIC ERROR CACHE HIT:</strong> Dạng lỗi này đã từng được sinh viên khác hỏi trong môn học. 
              SocraticCode trả về ngay cây cú pháp và sơ đồ ô nhớ trong <strong>{metrics.execution_time_ms}ms</strong> với chi phí <strong>0 VNĐ</strong>!
            </div>
          </div>
        )}
      </section>

      {/* 3. Main Mode Navigation Tabs */}
      <div className="workspace-tabs-bar">
        <button 
          className={`tab-btn ${activeView === 'socratic' ? 'active' : ''}`}
          onClick={() => setActiveView('socratic')}
        >
          <Terminal size={15} />
          <span>1. Bàn Gỡ Lỗi Trực Quan & Vấn Đáp Socratic</span>
        </button>

        <button 
          className={`tab-btn ${activeView === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveView('comparison')}
        >
          <AlertTriangle size={15} />
          <span>2. So Sánh: ChatGPT Chép Code vs SocraticCode</span>
        </button>

        <button 
          className={`tab-btn ${activeView === 'economics' ? 'active' : ''}`}
          onClick={() => setActiveView('economics')}
        >
          <BarChart3 size={15} />
          <span>3. Bài Toán Kinh Tế & Mô Phỏng Phòng Máy SGU</span>
        </button>
      </div>

      {/* 4. Main Workspace Content Area */}
      <main className="main-content-layout">
        {activeView === 'socratic' && (
          <div className="ide-split-grid">
            {/* Left Column: Code Editor & Memory Trace */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <CodeEditorView 
                code={currentCode}
                bugLine={analysisData?.bug_line}
                bugType={analysisData?.bug_type}
                onResetCode={handleResetToBug}
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
          <div className="clean-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '14px', color: 'var(--slate-900)', fontFamily: 'var(--font-mono)' }}>
              ĐỐI CHIẾU: TÁC HẠI CHÉP CODE CHATGPT VS GIÁ TRỊ CỦA SOCRATICCODE
            </h3>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>
              Tại sao Ban giám khảo và Giảng viên Khoa CNTT SGU luôn khuyến cáo sinh viên không nên phụ thuộc vào ChatGPT thường:
            </p>

            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Tiêu chí đào tạo</th>
                    <th style={{ width: '39%' }}>ChatGPT / Copilot Thường</th>
                    <th style={{ width: '39%' }}>SocraticCode AI (Đội SingleNode)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Hành vi xử lý</strong></td>
                    <td style={{ color: 'var(--crimson-700)', fontWeight: '600' }}>Viết lại 100% code mới cho sinh viên copy nộp bài</td>
                    <td style={{ color: 'var(--emerald-700)', fontWeight: '700' }}>Từ chối viết code; Đặt 3 câu hỏi gợi mở suy luận</td>
                  </tr>
                  <tr>
                    <td><strong>Trực quan hóa</strong></td>
                    <td>Chỉ có văn bản (Text) dài dòng, khó hình dung</td>
                    <td style={{ color: 'var(--cobalt-600)', fontWeight: '700' }}>Vẽ sơ đồ ô nhớ Stack/Heap, biến lặp từng bước</td>
                  </tr>
                  <tr>
                    <td><strong>Hiểu bản chất máy tính</strong></td>
                    <td style={{ color: 'var(--crimson-700)', fontWeight: '600' }}>Không hiểu vì sao con trỏ rác hay vòng lặp kẹt</td>
                    <td style={{ color: 'var(--emerald-700)', fontWeight: '700' }}>Thấy rõ biến left kẹt ở ô 2, con trỏ trỏ vào vùng nhớ đã hủy</td>
                  </tr>
                  <tr>
                    <td><strong>Kỳ thi viết trên giấy</strong></td>
                    <td style={{ color: 'var(--crimson-700)', fontWeight: '600' }}>Rớt môn vì khi thi giấy không có AI viết hộ</td>
                    <td style={{ color: 'var(--emerald-700)', fontWeight: '700' }}>Đỗ điểm cao nhờ tự hình thành Mental Model thuật toán</td>
                  </tr>
                  <tr>
                    <td><strong>Chi phí cho nhà trường</strong></td>
                    <td>Mỗi câu hỏi đều tốn token đắt đỏ</td>
                    <td style={{ color: 'var(--emerald-700)', fontWeight: '700' }}>Semantic Cache phục vụ 88% câu hỏi với giá 0 VNĐ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeView === 'economics' && (
          <div className="clean-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '8px', color: 'var(--slate-900)', fontFamily: 'var(--font-mono)' }}>
                BÀI TOÁN KINH TẾ: MÔ PHỎNG PHÒNG THỰC HÀNH SGU
              </h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                Chứng minh tiêu chí <em>"tiết kiệm chi phí tối đa"</em> của Hackathon SGU 2026 thông qua bộ đệm ngữ nghĩa Semantic Error Cache.
              </p>
            </div>

            {/* Interactive Student Count Slider */}
            <div style={{
              background: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--slate-200)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={18} style={{ color: 'var(--cobalt-600)' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--slate-900)' }}>
                    Quy mô sinh viên thực hành trong học kỳ:
                  </span>
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--cobalt-600)', fontFamily: 'var(--font-mono)' }}>
                  {simStudents} sinh viên
                </span>
              </div>

              <input 
                type="range" 
                min="50" 
                max="1000" 
                step="25"
                value={simStudents}
                onChange={(e) => setSimStudents(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--cobalt-600)',
                  cursor: 'pointer'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>
                <span>50 sinh viên (1 lớp)</span>
                <span>250 sinh viên (1 khóa học)</span>
                <span>1,000 sinh viên (toàn khoa CNTT SGU)</span>
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <div className="stat-card">
                <span className="stat-label">Tổng lượt phân tích bug</span>
                <span className="stat-val">{simTotalQueries.toLocaleString()}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>4 lượt / sinh viên</span>
              </div>

              <div className="stat-card">
                <span className="stat-label">Chi phí LLM thường</span>
                <span className="stat-val" style={{ color: 'var(--crimson-600)' }}>{simCostWithoutCache.toLocaleString()}đ</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--crimson-600)' }}>Gọi API 100%</span>
              </div>

              <div className="stat-card">
                <span className="stat-label">Chi phí SocraticCode</span>
                <span className="stat-val" style={{ color: 'var(--emerald-600)' }}>{simCostWithSocratic.toLocaleString()}đ</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--emerald-600)' }}>88% truy vấn 0đ</span>
              </div>

              <div className="stat-card">
                <span className="stat-label">Số tiền tiết kiệm</span>
                <span className="stat-val" style={{ color: 'var(--cobalt-600)' }}>{simVndSaved.toLocaleString()}đ</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--cobalt-600)' }}>Giảm {simPctSaved}% chi phí</span>
              </div>
            </div>

            {/* Semantic Cache Explanation */}
            <div style={{ padding: '18px 24px', background: '#eff6ff', borderRadius: 'var(--radius-md)', border: '1px solid #bfdbfe' }}>
              <div style={{ fontWeight: '700', color: 'var(--slate-900)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} style={{ color: 'var(--cobalt-600)' }} />
                <span>Giải thích cơ chế Semantic Error Cache cho Ban giám khảo:</span>
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--slate-700)', lineHeight: '1.6' }}>
                Trong các môn Nhập môn lập trình, Kỹ thuật lập trình và Cấu trúc dữ liệu tại SGU, hàng trăm sinh viên thường gặp chung các nhóm lỗi kinh điển. 
                SocraticCode AI trích xuất cây cú pháp (AST) và tính toán vector embedding cấu trúc lỗi. Khi sinh viên sau gặp lỗi tương đồng, 
                hệ thống đối soát bộ nhớ đệm và trả về ngay sơ đồ bộ nhớ trong <strong>12ms</strong> với <strong>chi phí đúng 0 đồng</strong>!
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. Footer */}
      <footer className="socratic-footer">
        <div>
          SocraticCode AI • Dự án tham dự cuộc thi <strong>HACKATHON SGU 2026 – 2027</strong>
        </div>
        <div>
          Đội thi: <strong>SingleNode</strong> (Khoa CNTT - Đại học Sài Gòn)
        </div>
      </footer>
    </div>
  );
}
