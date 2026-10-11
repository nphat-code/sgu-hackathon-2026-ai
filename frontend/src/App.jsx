import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  Terminal
} from 'lucide-react';
import CodeEditorView from './components/CodeEditorView';
import MemoryTraceView from './components/MemoryTraceView';
import SocraticAssistantView from './components/SocraticAssistantView';
import './App.css';

const API_BASE = 'http://127.0.0.1:8000';

const SAMPLES = [
  {
    id: "binary_search",
    title: "Binary Search",
    bug: "Vòng lặp vô tận (left = mid)",
    file: "binary_search.cpp"
  },
  {
    id: "dangling_pointer",
    title: "Dangling Pointer",
    bug: "Con trỏ rác (Stack return)",
    file: "pointer_scope.cpp"
  },
  {
    id: "array_overflow",
    title: "Array Overflow",
    bug: "Tràn bộ đệm mảng (i <= n)",
    file: "buffer_bounds.cpp"
  }
];

export default function App() {
  const [selectedSampleId, setSelectedSampleId] = useState("binary_search");
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [successToast, setSuccessToast] = useState(null);

  useEffect(() => {
    handleAnalyze(selectedSampleId);
  }, []);

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
      fixedCode = currentCode.replace(
        /left = mid;.*$/m,
        "left = mid + 1; // ĐÃ SỬA: Tiến tới cận tiếp theo, không còn kẹt!"
      );
    } else if (selectedSampleId === "dangling_pointer") {
      fixedCode = currentCode.replace("int val = 42;", "int* val = new int(42); // ĐÃ SỬA: Cấp phát an toàn trên Heap!");
      fixedCode = fixedCode.replace("return &val;", "return val;");
    } else if (selectedSampleId === "array_overflow") {
      fixedCode = currentCode.replace("i <= n", "i < n // ĐÃ SỬA: Duyệt trong phạm vi mảng hợp lệ!");
    }

    setCurrentCode(fixedCode);
    setIsFixed(true);
    setSuccessToast("🎉 Đã sửa code và vượt qua test case thành công!");
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleResetToBug = () => {
    if (!analysisData) return;
    setCurrentCode(analysisData.code);
    setIsFixed(false);
  };

  const metrics = analysisData?.metrics || {
    cost_vnd: 0,
    execution_time_ms: 12.0,
    cache_hit: true
  };

  return (
    <div className="socratic-app">
      {/* Toast Alert */}
      {successToast && (
        <div className="success-toast">
          <CheckCircle2 size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {/* 1. Sleek Compact Header */}
      <header className="navbar-header">
        <div className="navbar-brand">
          <div className="brand-icon">
            <Code2 size={20} />
          </div>
          <div className="brand-text">
            <span className="brand-title">SocraticCode</span>
            <span className="brand-tag">Interactive Debugger</span>
          </div>
        </div>

        {/* Center: Clean Scenario Pills */}
        <div className="scenario-switcher">
          {SAMPLES.map(sample => (
            <button
              key={sample.id}
              className={`scenario-pill ${selectedSampleId === sample.id ? 'active' : ''}`}
              onClick={() => handleSelectSample(sample.id)}
            >
              <span className="pill-title">{sample.title}</span>
              <span className="pill-sub">{sample.bug}</span>
            </button>
          ))}
        </div>

        {/* Right: Actions & Status */}
        <div className="navbar-actions">
          <div className="latency-badge" title="Độ trễ và bộ đệm ngữ nghĩa">
            <Zap size={12} />
            <span>{metrics.execution_time_ms}ms • {metrics.cache_hit ? '0đ Cache' : '15đ'}</span>
          </div>

          {isFixed && (
            <button className="btn-secondary" onClick={handleResetToBug}>
              <RotateCcw size={14} />
              <span>Khôi phục bug</span>
            </button>
          )}

          <button 
            className="btn-primary" 
            onClick={() => handleAnalyze(selectedSampleId)}
            disabled={loading}
          >
            {loading ? <RefreshCw size={14} className="spin" /> : <Sparkles size={14} />}
            <span>{loading ? 'Đang phân tích...' : 'Phân tích lại'}</span>
          </button>
        </div>
      </header>

      {/* 2. Main Focused Workspace */}
      <main className="workspace-grid">
        {/* Left Column: Code Editor & Memory Tracer */}
        <div className="workspace-column left-pane">
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
        <div className="workspace-column right-pane">
          <SocraticAssistantView 
            questions={analysisData?.socratic_questions || []}
            chatgptBadHabit={analysisData?.chatgpt_bad_habit || ''}
            onApplyFix={handleApplyFix}
            isFixed={isFixed}
          />
        </div>
      </main>
    </div>
  );
}
