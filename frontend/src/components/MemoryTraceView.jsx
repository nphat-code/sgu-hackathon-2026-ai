import React from 'react';
import { Cpu, Layers, PlayCircle } from 'lucide-react';

export default function MemoryTraceView({ memoryBlocks = [], traceSteps = [] }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      background: 'rgba(12, 17, 29, 0.7)',
      borderRadius: '12px',
      border: '1px solid var(--border-subtle)',
      padding: '18px'
    }}>
      {/* 1. Visual Memory & Pointers Inspector */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
          fontSize: '0.82rem',
          fontWeight: '700',
          color: 'var(--cyan-400)',
          fontFamily: 'var(--font-mono)'
        }}>
          <Cpu size={16} />
          <span>TRỰC QUAN HÓA BỘ NHỚ & CON TRỎ (VISUAL MEMORY BLOCKS)</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '14px',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {memoryBlocks.map((block, idx) => {
            const isError = block.active;

            return (
              <div
                key={idx}
                style={{
                  minWidth: '78px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: isError ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1.5px solid ${isError ? 'var(--rose-500)' : 'var(--border-subtle)'}`,
                  borderRadius: '8px',
                  padding: '8px 10px',
                  position: 'relative',
                  boxShadow: isError ? '0 0 12px rgba(244, 63, 94, 0.3)' : 'none'
                }}
              >
                {/* Pointer Tag above block */}
                {block.pointer && (
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    color: isError ? '#f87171' : 'var(--cyan-400)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap'
                  }}>
                    ▼ {block.pointer}
                  </div>
                )}

                <span style={{ fontSize: '0.7rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                  {block.name}
                </span>

                <span style={{
                  fontSize: '1rem',
                  fontWeight: '800',
                  color: isError ? '#f87171' : '#fff',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '4px'
                }}>
                  {block.val}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Step-by-Step Execution Trace Table */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px',
          fontSize: '0.82rem',
          fontWeight: '700',
          color: 'var(--indigo-400)',
          fontFamily: 'var(--font-mono)'
        }}>
          <PlayCircle size={16} />
          <span>BẢNG THEO DÕI BIẾN CHẠY TỪNG BƯỚC (TRACE TABLE)</span>
        </div>

        <div style={{
          overflowX: 'auto',
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>Bước</th>
                <th style={{ padding: '8px 12px' }}>Giá trị biến</th>
                <th style={{ padding: '8px 12px' }}>Diễn giải thao tác máy tính</th>
              </tr>
            </thead>
            <tbody>
              {traceSteps.map((step) => {
                const isStuck = step.action.includes('⚠️');

                return (
                  <tr 
                    key={step.step}
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      background: isStuck ? 'rgba(244, 63, 94, 0.12)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '8px 12px', fontWeight: '700', color: isStuck ? 'var(--rose-500)' : 'var(--cyan-400)' }}>
                      #{step.step}
                    </td>
                    <td style={{ padding: '8px 12px', color: '#fff' }}>
                      {Object.entries(step.vars).map(([k, v]) => `${k}=${v}`).join(', ')}
                    </td>
                    <td style={{ padding: '8px 12px', color: isStuck ? '#fca5a5' : 'var(--text-muted)' }}>
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
