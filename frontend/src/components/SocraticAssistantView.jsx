import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

export default function SocraticAssistantView({ 
  questions = [], 
  onApplyFix,
  isFixed = false
}) {
  const [openHintIndex, setOpenHintIndex] = useState(null);

  const handleToggleHint = (idx) => {
    setOpenHintIndex(openHintIndex === idx ? null : idx);
  };

  return (
    <div className="clean-panel socratic-panel">
      {/* Header */}
      <div className="panel-header">
        <div className="panel-title-group">
          <Sparkles size={16} className="text-amber" />
          <span className="panel-title">Trợ giảng Gợi mở (Socratic Guidance)</span>
        </div>
        <span className="subtle-badge">Hướng dẫn tự sửa</span>
      </div>

      {/* Questions Flow */}
      <div className="questions-list">
        {questions.map((q, idx) => {
          const isHintOpen = openHintIndex === idx;
          const levelBadgeClass = idx === 0 
            ? 'badge-sky' 
            : idx === 1 
            ? 'badge-indigo' 
            : 'badge-emerald';

          return (
            <div key={idx} className="question-card">
              <div className="question-card-header">
                <span className={`level-pill ${levelBadgeClass}`}>
                  {idx + 1}. {q.level}
                </span>

                {q.hint && (
                  <button
                    onClick={() => handleToggleHint(idx)}
                    className="hint-toggle-btn"
                  >
                    <Lightbulb size={13} />
                    <span>{isHintOpen ? 'Thu gọn' : 'Xem gợi ý'}</span>
                    {isHintOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                )}
              </div>

              {/* Question Text */}
              <div className="question-text">
                {q.question}
              </div>

              {/* Expandable Hint Box */}
              {isHintOpen && q.hint && (
                <div className="hint-box">
                  <strong>💡 Gợi ý:</strong> {q.hint}
                </div>
              )}

              {/* Solution Preview & Action */}
              {q.solution_preview && (
                <div className="solution-box">
                  <div className="solution-meta">
                    <span>Đề xuất sửa:</span>
                    <code className="solution-code">{q.solution_preview}</code>
                  </div>

                  <button
                    id="btn-apply-fix"
                    onClick={onApplyFix}
                    disabled={isFixed}
                    className={`apply-fix-btn ${isFixed ? 'fixed' : ''}`}
                  >
                    <CheckCircle2 size={15} />
                    <span>{isFixed ? 'Đã sửa thành công' : 'Áp dụng sửa lỗi'}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
