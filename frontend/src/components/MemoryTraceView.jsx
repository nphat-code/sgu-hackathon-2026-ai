import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Layers, 
  Eye, 
  ArrowRight
} from 'lucide-react';

export default function MemoryTraceView({ memoryBlocks = [], traceSteps = [] }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = traceSteps.length || 1;
  const activeStep = traceSteps[currentStepIndex] || traceSteps[0] || { step: 1, vars: {}, action: '' };

  // Auto-play stepper
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  // Reset to first step if scenario changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [traceSteps]);

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIndex(prev => Math.min(totalSteps - 1, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: 'rgba(15, 23, 42, 0.85)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border-subtle)',
      boxShadow: 'var(--shadow-md)',
      padding: '18px'
    }}>
      {/* 1. Header & Stepper Control Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        paddingBottom: '14px',
        borderBottom: '1px solid var(--color-border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'rgba(56, 189, 248, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--cyan-400)'
          }}>
            <Cpu size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-mono)' }}>
              VISUAL MEMORY & POINTER TRACER
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--slate-400)' }}>
              Trực quan hóa cấu trúc bộ nhớ Stack / Heap và bước nhảy biến lặp
            </div>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--cyan-400)',
            background: 'rgba(56, 189, 248, 0.1)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            marginRight: '4px'
          }}>
            Bước {currentStepIndex + 1} / {totalSteps}
          </span>

          <button
            onClick={handleReset}
            title="Quay lại bước đầu"
            style={{
              padding: '6px 8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--slate-300)',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={13} />
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            title="Bước trước"
            style={{
              padding: '6px 10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: currentStepIndex === 0 ? 'var(--slate-600)' : 'var(--slate-200)',
              cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <SkipBack size={13} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Tạm dừng" : "Tự động chạy qua các bước"}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 12px',
              background: isPlaying ? 'rgba(244, 63, 94, 0.2)' : 'linear-gradient(135deg, #0284c7, #2563eb)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Dừng' : 'Chạy'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Bước kế tiếp"
            style={{
              padding: '6px 10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: currentStepIndex >= totalSteps - 1 ? 'var(--slate-600)' : 'var(--slate-200)',
              cursor: currentStepIndex >= totalSteps - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <SkipForward size={13} />
          </button>
        </div>
      </div>

      {/* 2. Visual Memory Blocks Grid */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--slate-400)', fontFamily: 'var(--font-mono)' }}>
            TRẠNG THÁI Ô NHỚ TẠI BƯỚC #{currentStepIndex + 1}:
          </span>
          {activeStep?.vars && Object.keys(activeStep.vars).length > 0 && (
            <span style={{ fontSize: '0.72rem', color: 'var(--cyan-400)', fontFamily: 'var(--font-mono)' }}>
              Biến: {Object.entries(activeStep.vars).map(([k, v]) => `${k} = ${v}`).join(' | ')}
            </span>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          background: 'rgba(7, 11, 20, 0.7)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
          minHeight: '80px',
          alignItems: 'center'
        }}>
          {memoryBlocks.map((block, idx) => {
            const isErrorBlock = block.active;
            // Simulated highlight based on current step
            const isCurrentActive = isErrorBlock && currentStepIndex >= 2;

            return (
              <div
                key={idx}
                style={{
                  minWidth: '85px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: isCurrentActive 
                    ? 'rgba(244, 63, 94, 0.16)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: isCurrentActive 
                    ? '1.5px solid var(--rose-500)' 
                    : '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  position: 'relative',
                  boxShadow: isCurrentActive ? 'var(--glow-rose)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Pointer Indicator Tag */}
                {block.pointer && (
                  <div style={{
                    position: 'absolute',
                    top: '-22px',
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    color: isCurrentActive ? '#fca5a5' : 'var(--cyan-400)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap',
                    background: 'rgba(15, 23, 42, 0.9)',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    border: `1px solid ${isCurrentActive ? 'rgba(244, 63, 94, 0.5)' : 'rgba(56, 189, 248, 0.3)'}`
                  }}>
                    ▼ {block.pointer}
                  </div>
                )}

                <span style={{ fontSize: '0.68rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>
                  {block.name}
                </span>

                <span style={{
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  color: isCurrentActive ? '#fca5a5' : '#f1f5f9',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '4px'
                }}>
                  {block.val}
                </span>

                <span style={{ fontSize: '0.6rem', color: 'var(--slate-600)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                  0x{((idx * 4) + 0x7ffd00).toString(16).slice(-4)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Step-by-Step Execution Trace Table */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--slate-400)', fontFamily: 'var(--font-mono)' }}>
            NHẬT KÝ THEO DÕI THỰC THI (CLICK ĐỂ NHẢY TỚI BƯỚC ĐÓ):
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>
            Độ trễ máy ảo: ~0.4ms
          </span>
        </div>

        <div style={{
          overflowX: 'auto',
          background: 'rgba(7, 11, 20, 0.6)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
          maxHeight: '180px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.03)', color: 'var(--slate-400)', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px', width: '70px' }}>Bước</th>
                <th style={{ padding: '8px 12px', width: '160px' }}>Biến chạy</th>
                <th style={{ padding: '8px 12px' }}>Hành vi bộ nhớ / Thuật toán</th>
              </tr>
            </thead>
            <tbody>
              {traceSteps.map((step, idx) => {
                const isSelected = idx === currentStepIndex;
                const isStuck = step.action.includes('⚠️');

                return (
                  <tr 
                    key={step.step}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIndex(idx);
                    }}
                    style={{
                      borderTop: '1px solid var(--color-border-subtle)',
                      background: isSelected 
                        ? 'rgba(56, 189, 248, 0.12)' 
                        : isStuck 
                        ? 'rgba(244, 63, 94, 0.08)' 
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <td style={{ 
                      padding: '8px 12px', 
                      fontWeight: '800', 
                      color: isSelected ? 'var(--cyan-400)' : isStuck ? 'var(--rose-400)' : 'var(--slate-400)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {isSelected && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan-400)' }} />}
                      #{step.step}
                    </td>
                    <td style={{ padding: '8px 12px', color: '#f1f5f9' }}>
                      {Object.entries(step.vars).map(([k, v]) => `${k}=${v}`).join(', ')}
                    </td>
                    <td style={{ padding: '8px 12px', color: isStuck ? '#fca5a5' : 'var(--slate-300)' }}>
                      {step.action}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
