import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
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
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--slate-200)',
        boxShadow: 'var(--shadow-card)',
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
          borderBottom: '1px solid var(--slate-200)',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '6px',
              background: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--amber-700)'
            }}>
              <Sparkles size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--slate-900)', fontFamily: 'var(--font-mono)' }}>
                3 CẤP ĐỘ VẤN ĐÁP SOCRATIC (AI GUIDED TUTOR)
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--slate-500)' }}>
                Hệ thống đặt câu hỏi gợi mở thay vì giải hộ, kích hoạt tư duy giải thuật sâu
              </div>
            </div>
          </div>

          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: '700',
            color: 'var(--emerald-700)',
            background: 'var(--emerald-50)',
            padding: '3px 9px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--emerald-100)'
          }}>
            Tự học 100%
          </span>
        </div>

        {/* 3 Steps Progression Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {questions.map((q, idx) => {
            const isHintOpen = openHintIndex === idx;
            const levelConfig = q.level === 'Quan sát' 
              ? { bg: '#f0f9ff', text: 'var(--sky-700)', border: '#bae6fd' }
              : q.level === 'Tư duy bản chất' 
              ? { bg: '#eef2ff', text: 'var(--indigo-600)', border: '#c7d2fe' }
              : { bg: 'var(--emerald-50)', text: 'var(--emerald-700)', border: 'var(--emerald-100)' };

            return (
              <div
                key={idx}
                style={{
                  padding: '14px 16px',
                  background: '#f8fafc',
                  border: '1px solid var(--slate-200)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'border-color 0.15s ease'
                }}
              >
                {/* Level Title & Hint Trigger */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      color: levelConfig.text,
                      fontFamily: 'var(--font-mono)',
                      background: levelConfig.bg,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: `1px solid ${levelConfig.border}`
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
                        color: 'var(--amber-700)',
                        fontSize: '0.74rem',
                        fontWeight: '700',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Lightbulb size={13} style={{ color: 'var(--amber-600)' }} />
                      <span>{isHintOpen ? 'Thu gọn gợi ý' : 'Mở gợi ý tư duy'}</span>
                      {isHintOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  )}
                </div>

                {/* Question Body */}
                <div style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--slate-800)', lineHeight: '1.5' }}>
                  {q.question}
                </div>

                {/* Student's Reflection Input Box */}
                {idx < 2 && (
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '2px'
                  }}>
                    <input
                      type="text"
                      placeholder="Gõ suy luận của bạn vào đây..."
                      value={userAnswers[idx] || ''}
                      onChange={(e) => handleUserAnswerChange(idx, e.target.value)}
                      style={{
                        flex: 1,
                        background: '#ffffff',
                        border: '1px solid var(--slate-300)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '7px 12px',
                        color: 'var(--slate-900)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-sans)',
                        outline: 'none',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    />
                    <button
                      onClick={() => handleToggleHint(idx)}
                      title="Kiểm tra suy luận với AI"
                      style={{
                        padding: '7px 12px',
                        background: '#ffffff',
                        border: '1px solid #bfdbfe',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--cobalt-600)',
                        fontSize: '0.74rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: 'var(--shadow-sm)'
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
                    background: '#fffbeb',
                    borderLeft: '3px solid var(--amber-500)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: '#92400e',
                    lineHeight: '1.5',
                    border: '1px solid #fef3c7',
                    borderLeftWidth: '3px'
                  }}>
                    <strong>💡 Gợi ý suy luận:</strong> {q.hint}
                  </div>
                )}

                {/* Level 3: Self-Fix Challenge Button */}
                {q.solution_preview && (
                  <div style={{
                    marginTop: '4px',
                    padding: '12px 14px',
                    background: '#ecfdf5',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--emerald-100)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--emerald-700)', fontWeight: '700' }}>
                      ⚡ Sau khi đã nắm vững bản chất, hãy thử áp dụng bản vá vào code:
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        onClick={onApplyFix}
                        disabled={isFixed}
                        style={{
                          background: isFixed 
                            ? '#d1fae5' 
                            : 'var(--emerald-600)',
                          color: isFixed ? 'var(--emerald-800)' : '#ffffff',
                          border: isFixed ? '1px solid var(--emerald-200)' : 'none',
                          padding: '9px 16px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.82rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-mono)',
                          cursor: isFixed ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: isFixed ? 'none' : 'var(--shadow-emerald)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <CheckCircle2 size={15} />
                        <span>{isFixed ? 'ĐÃ SỬA XONG VÀ VƯỢT QUA TEST CASE' : 'Thử áp dụng giải pháp tự sửa'}</span>
                      </button>

                      <span style={{ fontSize: '0.74rem', color: 'var(--slate-600)', fontFamily: 'var(--font-mono)' }}>
                        Vá: <code style={{ color: 'var(--emerald-700)', fontWeight: '700', background: '#ffffff', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--emerald-200)' }}>{q.solution_preview}</code>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ChatGPT Warning Card */}
      <div style={{
        background: '#fff1f2',
        border: '1px solid #fecdd3',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: '#ffe4e6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--crimson-600)',
          flexShrink: 0
        }}>
          <ShieldAlert size={18} />
        </div>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--crimson-700)', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
            LỜI KHUYÊN CHO SINH VIÊN CNTT SGU
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9f1239', lineHeight: '1.5' }}>
            {chatgptBadHabit}
          </div>
        </div>
      </div>
    </div>
  );
}
