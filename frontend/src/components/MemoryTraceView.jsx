import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw
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
      background: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--slate-200)',
      boxShadow: 'var(--shadow-card)',
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
        borderBottom: '1px solid var(--slate-200)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '6px',
            background: '#e0f2fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--sky-700)'
          }}>
            <Cpu size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--slate-900)', fontFamily: 'var(--font-mono)' }}>
              VISUAL MEMORY & POINTER TRACER
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--slate-500)' }}>
              Trực quan hóa vùng nhớ Stack/Heap và dịch chuyển con trỏ thuật toán
            </div>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: '700',
            color: 'var(--cobalt-700)',
            background: '#eff6ff',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #bfdbfe',
            marginRight: '4px'
          }}>
            Bước {currentStepIndex + 1} / {totalSteps}
          </span>

          <button
            onClick={handleReset}
            title="Quay lại bước đầu"
            style={{
              padding: '6px 8px',
              background: '#ffffff',
              border: '1px solid var(--slate-300)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--slate-700)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
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
              background: '#ffffff',
              border: '1px solid var(--slate-300)',
              borderRadius: 'var(--radius-sm)',
              color: currentStepIndex === 0 ? 'var(--slate-300)' : 'var(--slate-700)',
              cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
              boxShadow: 'var(--shadow-sm)'
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
              background: isPlaying ? 'var(--crimson-600)' : 'var(--cobalt-600)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              boxShadow: isPlaying ? '0 2px 8px rgba(220, 38, 38, 0.25)' : 'var(--shadow-blue)'
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
              background: '#ffffff',
              border: '1px solid var(--slate-300)',
              borderRadius: 'var(--radius-sm)',
              color: currentStepIndex >= totalSteps - 1 ? 'var(--slate-300)' : 'var(--slate-700)',
              cursor: currentStepIndex >= totalSteps - 1 ? 'not-allowed' : 'pointer',
              boxShadow: 'var(--shadow-sm)'
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
          <span style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--slate-600)', fontFamily: 'var(--font-mono)' }}>
            TRẠNG THÁI Ô NHỚ TẠI BƯỚC #{currentStepIndex + 1}:
          </span>
          {activeStep?.vars && Object.keys(activeStep.vars).length > 0 && (
            <span style={{ fontSize: '0.74rem', color: 'var(--cobalt-600)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
              Biến: {Object.entries(activeStep.vars).map(([k, v]) => `${k} = ${v}`).join(' | ')}
            </span>
          )}
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          background: '#f8fafc',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--slate-200)',
          minHeight: '85px',
          alignItems: 'center'
        }}>
          {memoryBlocks.map((block, idx) => {
            const isErrorBlock = block.active;
            const isCurrentActive = isErrorBlock && currentStepIndex >= 2;

            return (
              <div
                key={idx}
                style={{
                  minWidth: '88px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: isCurrentActive 
                    ? '#fef2f2' 
                    : '#ffffff',
                  border: isCurrentActive 
                    ? '1.5px solid var(--crimson-600)' 
                    : '1px solid var(--slate-300)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  position: 'relative',
                  boxShadow: isCurrentActive ? '0 2px 10px rgba(220, 38, 38, 0.15)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Pointer Tag */}
                {block.pointer && (
                  <div style={{
                    position: 'absolute',
                    top: '-22px',
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    color: isCurrentActive ? 'var(--crimson-600)' : 'var(--cobalt-600)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap',
                    background: '#ffffff',
                    padding: '1px 8px',
                    borderRadius: '4px',
                    border: `1px solid ${isCurrentActive ? '#fecdd3' : '#bfdbfe'}`,
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    ▼ {block.pointer}
                  </div>
                )}

                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)', fontWeight: '600' }}>
                  {block.name}
                </span>

                <span style={{
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  color: isCurrentActive ? '#991b1b' : 'var(--slate-900)',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '4px'
                }}>
                  {block.val}
                </span>

                <span style={{ fontSize: '0.62rem', color: 'var(--slate-400)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
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
          <span style={{ fontSize: '0.74rem', fontWeight: '700', color: 'var(--slate-600)', fontFamily: 'var(--font-mono)' }}>
            NHẬT KÝ THEO DÕI THỰC THI (CLICK VÀO DÒNG ĐỂ NHẢY TỚI BƯỚC ĐÓ):
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--slate-400)' }}>
            Độ trễ máy ảo: ~0.4ms
          </span>
        </div>

        <div style={{
          overflowX: 'auto',
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--slate-200)',
          maxHeight: '185px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: 'var(--slate-600)', textAlign: 'left', borderBottom: '1px solid var(--slate-200)' }}>
                <th style={{ padding: '8px 12px', width: '75px' }}>Bước</th>
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
                      borderTop: '1px solid var(--slate-200)',
                      background: isSelected 
                        ? '#eff6ff' 
                        : isStuck 
                        ? '#fef2f2' 
                        : (idx % 2 === 0 ? '#ffffff' : '#f8fafc'),
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <td style={{ 
                      padding: '8px 12px', 
                      fontWeight: '800', 
                      color: isSelected ? 'var(--cobalt-600)' : isStuck ? 'var(--crimson-600)' : 'var(--slate-500)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {isSelected && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cobalt-600)' }} />}
                      #{step.step}
                    </td>
                    <td style={{ padding: '8px 12px', color: 'var(--slate-900)', fontWeight: '600' }}>
                      {Object.entries(step.vars).map(([k, v]) => `${k}=${v}`).join(', ')}
                    </td>
                    <td style={{ padding: '8px 12px', color: isStuck ? '#991b1b' : 'var(--slate-700)' }}>
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
