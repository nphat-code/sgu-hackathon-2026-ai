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
      }, 1300);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

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
    <div className="clean-panel memory-view-panel">
      {/* 1. Header with Compact Stepper */}
      <div className="panel-header">
        <div className="panel-title-group">
          <Cpu size={16} className="text-cobalt" />
          <span className="panel-title">Mô hình bộ nhớ & Biến chạy (Mental Model)</span>
        </div>

        {/* Stepper Controls */}
        <div className="stepper-controls">
          <span className="step-counter">
            Bước {currentStepIndex + 1} / {totalSteps}
          </span>

          <button 
            className="step-btn"
            onClick={handleReset} 
            title="Quay lại đầu"
          >
            <RotateCcw size={12} />
          </button>

          <button 
            className="step-btn"
            onClick={handlePrev} 
            disabled={currentStepIndex === 0}
            title="Lùi 1 bước"
          >
            <SkipBack size={12} />
          </button>

          <button 
            className={`step-btn step-play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Tạm dừng" : "Tự động chạy"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'Dừng' : 'Chạy'}</span>
          </button>

          <button 
            className="step-btn"
            onClick={handleNext} 
            disabled={currentStepIndex >= totalSteps - 1}
            title="Tiến 1 bước"
          >
            <SkipForward size={12} />
          </button>
        </div>
      </div>

      {/* 2. Visual Memory Blocks Grid */}
      <div className="memory-blocks-wrapper">
        <div className="memory-status-line">
          <span className="status-label">Trạng thái tại Bước #{currentStepIndex + 1}:</span>
          {activeStep?.vars && Object.keys(activeStep.vars).length > 0 && (
            <span className="active-vars-tag">
              {Object.entries(activeStep.vars).map(([k, v]) => `${k} = ${v}`).join('  |  ')}
            </span>
          )}
        </div>

        <div className="memory-blocks-row">
          {memoryBlocks.map((block, idx) => {
            const isErrorBlock = block.active;
            const isCurrentActive = isErrorBlock && currentStepIndex >= 2;

            return (
              <div
                key={idx}
                className={`mem-cell ${isCurrentActive ? 'error-cell' : ''}`}
              >
                {/* Pointer Tag */}
                {block.pointer && (
                  <div className={`pointer-badge ${isCurrentActive ? 'error-pointer' : ''}`}>
                    ▼ {block.pointer}
                  </div>
                )}

                <span className="cell-name">{block.name}</span>
                <span className="cell-val">{block.val}</span>
                <span className="cell-addr">0x{((idx * 4) + 0x7ffd00).toString(16).slice(-4)}</span>
              </div>
            );
          })}
        </div>

        {/* Step Action Summary */}
        {activeStep?.action && (
          <div className={`step-action-note ${activeStep.action.includes('⚠️') ? 'warn' : ''}`}>
            <strong>Hành động:</strong> {activeStep.action}
          </div>
        )}
      </div>

      {/* 3. Compact Step History Table */}
      <div className="step-table-container">
        <table className="step-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Bước</th>
              <th style={{ width: '150px' }}>Giá trị biến</th>
              <th>Diễn biến thực thi</th>
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
                  className={`${isSelected ? 'selected-row' : ''} ${isStuck ? 'stuck-row' : ''}`}
                >
                  <td className="step-col">
                    {isSelected && <span className="active-indicator" />}
                    #{step.step}
                  </td>
                  <td className="vars-col">
                    {Object.entries(step.vars).map(([k, v]) => `${k}=${v}`).join(', ')}
                  </td>
                  <td className="desc-col">
                    {step.action}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
