import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldAlert,
  Send
} from 'lucide-react';

export default function SocraticAssistantView({ 
  questions = [], 
  chatgptBadHabit = '',
  onApplyFix,
  isFixed = false
}) {
  const [openHintIndex, setOpenHintIndex] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const handleToggleHint = (idx) => {
    setOpenHintIndex(openHintIndex === idx ? null : idx);
  };

  const handleUserAnswerChange = (idx, text) => {
    setUserAnswers(prev => ({ ...prev, [idx]: text }));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Socratic Dialogue Card */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.85)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-md)',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--color-border-subtle)',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(251, 191, 36, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--amber-400)'
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                3 CẤP ĐỘ VẤN ĐÁP SOCRATIC (AI GUIDED TUTOR)
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--slate-400)' }}>
                Hệ thống đặt câu hỏi gợi mở thay vì giải hộ, kích hoạt tư duy giải thuật sâu
              </div>
            </div>
          </div>

          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--emerald-400)',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(16, 185, 129, 0.25)'
          }}>
            Tự học 100%
          </span>
        </div>

        {/* 3 Steps Progression Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {questions.map((q, idx) => {
            const isHintOpen = openHintIndex === idx;
            const levelColor = q.level === 'Quan sát' 
              ? 'var(--cyan-400)' 
              : q.level === 'Tư duy bản chất' 
              ? 'var(--indigo-400)' 
              : 'var(--emerald-400)';

            return (
              <div
                key={idx}
                style={{
                  padding: '14px 16px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'border-color 0.2s ease'
                }}
              >
                {/* Level Title & Hint Trigger */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      color: levelColor,
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${levelColor}40`
                    }}>
                      Cấp độ {idx + 1}: {q.level}
                    </span>
                  </div>

                  {q.hint && (
                    <button
                      onClick={() => handleToggleHint(idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--amber-400)',
                        fontSize: '0.74rem',
                        fontWeight: '600',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Lightbulb size={13} />
                      <span>{isHintOpen ? 'Thu gọn gợi ý' : 'Mở gợi ý tư duy'}</span>
                      {isHintOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  )}
                </div>

                {/* Question Body */}
                <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#f1f5f9', lineHeight: '1.5' }}>
                  {q.question}
                </div>

                {/* Student's Reflection Input Box */}
                {idx < 2 && (
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '4px'
                  }}>
                    <input
                      type="text"
                      placeholder="Gõ suy luận của bạn vào đây..."
                      value={userAnswers[idx] || ''}
                      onChange={(e) => handleUserAnswerChange(idx, e.target.value)}
                      style={{
                        flex: 1,
                        background: 'rgba(0, 0, 0, 0.35)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 12px',
                        color: '#fff',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-sans)',
                        outline: 'none'
                      }}
                    />
                    <button
                      onClick={() => handleToggleHint(idx)}
                      title="Kiểm tra suy luận với AI"
                      style={{
                        padding: '6px 10px',
                        background: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--cyan-400)',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Send size={11} />
                      <span>Đối chiếu</span>
                    </button>
                  </div>
                )}

                {/* Expandable Hint Box */}
                {isHintOpen && q.hint && (
                  <div style={{
                    padding: '10px 14px',
                    background: 'rgba(245, 158, 11, 0.08)',
                    borderLeft: '3px solid var(--amber-400)',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    color: '#fef08a',
                    lineHeight: '1.5'
                  }}>
                    <strong>💡 Gợi ý suy luận:</strong> {q.hint}
                  </div>
                )}

                {/* Level 3: Self-Fix Challenge Button */}
                {q.solution_preview && (
                  <div style={{
                    marginTop: '4px',
                    padding: '12px',
                    background: 'rgba(16, 185, 129, 0.06)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--emerald-400)', fontWeight: '600' }}>
                      ⚡ Sau khi đã nắm vững bản chất, hãy thử áp dụng bản vá vào code:
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        onClick={onApplyFix}
                        disabled={isFixed}
                        style={{
                          background: isFixed 
                            ? 'rgba(16, 185, 129, 0.2)' 
                            : 'linear-gradient(135deg, #10b981, #059669)',
                          color: '#fff',
                          border: isFixed ? '1px solid rgba(16, 185, 129, 0.4)' : 'none',
                          padding: '9px 16px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-mono)',
                          cursor: isFixed ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: isFixed ? 'none' : 'var(--glow-emerald)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <CheckCircle2 size={15} />
                        <span>{isFixed ? 'ĐÃ SỬA XONG VÀ VƯỢT QUA TEST CASE' : 'Thử áp dụng giải pháp tự sửa'}</span>
                      </button>

                      <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)', fontFamily: 'var(--font-mono)' }}>
                        Vá: <code style={{ color: 'var(--emerald-400)' }}>{q.solution_preview}</code>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ChatGPT Warning Card (Anti-Wrapper Defense) */}
      <div style={{
        background: 'rgba(244, 63, 94, 0.07)',
        border: '1px solid rgba(244, 63, 94, 0.25)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'rgba(244, 63, 94, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--rose-400)',
          flexShrink: 0
        }}>
          <ShieldAlert size={18} />
        </div>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--rose-400)', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
            LỜI KHUYÊN CHO SINH VIÊN CNTT SGU
          </div>
          <div style={{ fontSize: '0.78rem', color: '#fca5a5', lineHeight: '1.5' }}>
            {chatgptBadHabit}
          </div>
        </div>
      </div>
    </div>
  );
}
