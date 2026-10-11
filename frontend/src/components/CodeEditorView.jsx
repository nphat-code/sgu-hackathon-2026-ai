import React from 'react';
import { AlertCircle, Code, CheckCircle } from 'lucide-react';

export default function CodeEditorView({ 
  code = '', 
  bugLine = null, 
  bugType = '',
  onChangeCode,
  isFixed = false 
}) {
  const lines = code.split('\n');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#090d16',
      borderRadius: '12px',
      border: '1px solid var(--border-subtle)',
      overflow: 'hidden'
    }}>
      {/* Editor Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid var(--border-subtle)',
        fontSize: '0.8rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={16} style={{ color: 'var(--cyan-400)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#fff' }}>
            solution.cpp
          </span>
        </div>

        {isFixed ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: 'var(--emerald-400)',
            fontWeight: '700',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <CheckCircle size={14} />
            <span>ĐÃ SỬA BUG THÀNH CÔNG!</span>
          </div>
        ) : bugLine ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: 'var(--rose-500)',
            fontWeight: '700',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            background: 'rgba(244, 63, 94, 0.12)',
            padding: '3px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(244, 63, 94, 0.3)'
          }}>
            <AlertCircle size={14} />
            <span>NGHI VẤN BUG: DÒNG {bugLine} ({bugType})</span>
          </div>
        ) : null}
      </div>

      {/* Editor Code Lines Display */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        padding: '12px 0',
        overflowX: 'auto',
        maxHeight: '360px'
      }}>
        {lines.map((lineContent, idx) => {
          const lineNum = idx + 1;
          const isBuggy = !isFixed && lineNum === bugLine;

          return (
            <div
              key={lineNum}
              style={{
                display: 'flex',
                padding: '1px 16px',
                background: isBuggy ? 'rgba(244, 63, 94, 0.15)' : 'transparent',
                borderLeft: isBuggy ? '4px solid var(--rose-500)' : '4px solid transparent',
                transition: 'background 0.2s ease'
              }}
            >
              {/* Line Number */}
              <span style={{
                width: '32px',
                textAlign: 'right',
                marginRight: '16px',
                color: isBuggy ? 'var(--rose-500)' : 'var(--text-faint)',
                userSelect: 'none',
                fontWeight: isBuggy ? '800' : '500'
              }}>
                {lineNum}
              </span>

              {/* Code Line Content */}
              <span style={{ 
                color: isBuggy ? '#fecdd3' : '#f1f5f9',
                fontWeight: isBuggy ? '700' : '400',
                whiteSpace: 'pre'
              }}>
                {lineContent}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
