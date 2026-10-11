import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw } from 'lucide-react';

export default function QuizRunner({ quizzes = [] }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleSelectOption = (qIndex, optIndex) => {
    if (userAnswers[qIndex] !== undefined) return; // already answered
    const isCorrect = optIndex === quizzes[qIndex].correct_index;
    setUserAnswers(prev => ({ ...prev, [qIndex]: optIndex }));
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setScore(0);
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Quiz Header with Score */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '12px',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={20} style={{ color: 'var(--amber-400)' }} />
          <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>
            BỘ TRẮC NGHIỆM ĐÁNH GIÁ NĂNG LỰC 3 CẤP ĐỘ
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.85rem', 
            color: 'var(--emerald-400)',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid rgba(16, 185, 129, 0.25)'
          }}>
            ĐIỂM SỐ: {score} / {quizzes.length} (Đã làm {answeredCount}/{quizzes.length})
          </div>

          {answeredCount > 0 && (
            <button
              onClick={handleReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.78rem'
              }}
            >
              <RotateCcw size={14} />
              <span>Làm lại</span>
            </button>
          )}
        </div>
      </div>

      {/* Questions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {quizzes.map((quiz, qIdx) => {
          const selectedOption = userAnswers[qIdx];
          const hasAnswered = selectedOption !== undefined;

          return (
            <div
              key={quiz.id || qIdx}
              style={{
                padding: '20px',
                background: 'rgba(12, 18, 30, 0.75)',
                borderRadius: '14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {/* Question Header & Level Badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontWeight: '800', 
                    color: 'var(--cyan-400)',
                    fontSize: '1rem' 
                  }}>
                    #{qIdx + 1}
                  </span>
                  <span style={{ fontWeight: '600', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {quiz.question}
                  </span>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap',
                  background: quiz.level === 'Nhận biết' ? 'rgba(56, 189, 248, 0.15)' : quiz.level === 'Thông hiểu' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                  color: quiz.level === 'Nhận biết' ? 'var(--cyan-400)' : quiz.level === 'Thông hiểu' ? 'var(--amber-400)' : 'var(--rose-500)',
                  border: '1px solid currentColor'
                }}>
                  {quiz.level}
                </span>
              </div>

              {/* Options */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {quiz.options.map((opt, optIdx) => {
                  let optStyle = {
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: 'var(--text-main)',
                    cursor: hasAnswered ? 'default' : 'pointer',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  };

                  if (hasAnswered) {
                    if (optIdx === quiz.correct_index) {
                      optStyle.background = 'rgba(16, 185, 129, 0.2)';
                      optStyle.borderColor = 'var(--emerald-400)';
                      optStyle.color = '#fff';
                    } else if (optIdx === selectedOption) {
                      optStyle.background = 'rgba(239, 68, 68, 0.2)';
                      optStyle.borderColor = '#ef4444';
                      optStyle.color = '#fca5a5';
                    }
                  }

                  return (
                    <div
                      key={optIdx}
                      style={optStyle}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      onMouseEnter={(e) => {
                        if (!hasAnswered) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.borderColor = 'var(--cyan-400)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!hasAnswered) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        }
                      }}
                    >
                      <span>{opt}</span>
                      {hasAnswered && optIdx === quiz.correct_index && (
                        <CheckCircle2 size={16} style={{ color: 'var(--emerald-400)' }} />
                      )}
                      {hasAnswered && optIdx === selectedOption && optIdx !== quiz.correct_index && (
                        <XCircle size={16} style={{ color: '#ef4444' }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Instant Explanation Popup */}
              {hasAnswered && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: selectedOption === quiz.correct_index ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderLeft: `4px solid ${selectedOption === quiz.correct_index ? 'var(--emerald-400)' : '#ef4444'}`,
                  fontSize: '0.82rem',
                  lineHeight: '1.5',
                  color: 'var(--text-muted)'
                }}>
                  <strong style={{ color: selectedOption === quiz.correct_index ? 'var(--emerald-400)' : '#f87171' }}>
                    {selectedOption === quiz.correct_index ? 'Chính xác! ' : 'Chưa đúng! '}
                  </strong>
                  {quiz.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
