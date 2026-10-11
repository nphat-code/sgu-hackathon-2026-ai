import React, { useState } from 'react';
import { HelpCircle, Lightbulb, Sparkles, AlertOctagon, CheckCircle2, ChevronRight, ChevronDown } from 'lucide-react';

export default function SocraticAssistantView({ 
  questions = [], 
  chatgptBadHabit = '',
  onApplyFix,
  isFixed = false
}) {
  const [openHintIndex, setOpenHintIndex] = useState(null);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {/* Socratic Questions Panel */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.85)',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <Sparkles size={20} style={{ color: 'var(--amber-400)' }} />
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#fff' }}>
              3 CÂU HỎI VẤN ĐÁP GỢI MỞ (SOCRATIC DIALOGUE)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              AI không giải hộ code mà dẫn dắt bạn tự suy luận bản chất của bug
            </div>
          </div>
        </div>

        {/* Questions list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {questions.map((q, idx) => {
            const isHintOpen = openHintIndex === idx;

            return (
              <div
                key={idx}
                style={{
                  padding: '14px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    color: q.level === 'Quan sát' ? 'var(--cyan-400)' : q.level === 'Tư duy bản chất' ? 'var(--indigo-400)' : 'var(--emerald-400)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    Bước {idx + 1}: {q.level}
                  </span>

                  {q.hint && (
                    <button
                      onClick={() => setOpenHintIndex(isHintOpen ? null : idx)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--amber-400)',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Lightbulb size={13} />
                      <span>{isHintOpen ? 'Đóng gợi ý' : 'Gợi ý tư duy'}</span>
                    </button>
                  )}
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#f1f5f9', lineHeight: '1.5' }}>
                  {q.question}
                </div>

                {/* Hint expansion */}
                {isHintOpen && q.hint && (
                  <div style={{
                    marginTop: '6px',
                    padding: '8px 12px',
                    background: 'rgba(245, 158, 11, 0.1)',
                    borderLeft: '3px solid var(--amber-400)',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    color: '#fef08a',
                    lineHeight: '1.4'
                  }}>
                    💡 <strong>Gợi ý:</strong> {q.hint}
                  </div>
                )}

                {/* Self-fix CTA if step 3 */}
                {q.solution_preview && (
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={onApplyFix}
                      disabled={isFixed}
                      style={{
                        background: isFixed ? 'rgba(16, 185, 129, 0.2)' : 'linear-gradient(135deg, #10b981, #059669)',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                        cursor: isFixed ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: isFixed ? 'none' : '0 2px 10px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>{isFixed ? 'Đã tự sửa code thành công!' : 'Thử áp dụng giải pháp tự sửa'}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison: Why ChatGPT copy-paste hurts students */}
      <div style={{
        background: 'rgba(244, 63, 94, 0.08)',
        border: '1px solid rgba(244, 63, 94, 0.25)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <AlertOctagon size={20} style={{ color: 'var(--rose-500)', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--rose-500)', marginBottom: '4px' }}>
            TẠI SAO KHÔNG NÊN DÙNG CHATGPT ĐỂ COPY CODE?
          </div>
          <div style={{ fontSize: '0.78rem', color: '#fca5a5', lineHeight: '1.5' }}>
            {chatgptBadHabit}
          </div>
        </div>
      </div>
    </div>
  );
}
