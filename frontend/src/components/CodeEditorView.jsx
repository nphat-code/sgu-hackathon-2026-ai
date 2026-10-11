import React, { useState } from 'react';
import { 
  Code2, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  FileText,
  RotateCcw
} from 'lucide-react';

export default function CodeEditorView({ 
  code = '', 
  bugLine = null, 
  bugType = '',
  onResetCode,
  isFixed = false 
}) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('solution.cpp');

  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#070c18',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border-subtle)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden'
    }}>
      {/* Editor Top Navigation & Tabs Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 14px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid var(--color-border-subtle)',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('solution.cpp')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: activeTab === 'solution.cpp' ? '#141e34' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'solution.cpp' ? '2px solid var(--cyan-400)' : '2px solid transparent',
              borderRadius: '4px 4px 0 0',
              color: activeTab === 'solution.cpp' ? '#fff' : 'var(--slate-400)',
              fontSize: '0.8rem',
              fontWeight: '600',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <Code2 size={14} style={{ color: 'var(--cyan-400)' }} />
            <span>solution.cpp</span>
            <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--cyan-400)', padding: '1px 5px', borderRadius: '4px' }}>C++</span>
          </button>

          <button
            onClick={() => setActiveTab('test_input.txt')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: activeTab === 'test_input.txt' ? '#141e34' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'test_input.txt' ? '2px solid var(--cyan-400)' : '2px solid transparent',
              borderRadius: '4px 4px 0 0',
              color: activeTab === 'test_input.txt' ? '#fff' : 'var(--slate-400)',
              fontSize: '0.8rem',
              fontWeight: '600',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            <FileText size={14} />
            <span>test_input.txt</span>
          </button>
        </div>

        {/* Right Status / Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isFixed ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: 'var(--emerald-400)',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              background: 'rgba(16, 185, 129, 0.12)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              boxShadow: 'var(--glow-emerald)'
            }}>
              <CheckCircle2 size={13} />
              <span>ĐÃ TỰ VÁ LỖI THÀNH CÔNG</span>
            </div>
          ) : bugLine ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: 'var(--rose-400)',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              background: 'rgba(244, 63, 94, 0.12)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              boxShadow: 'var(--glow-rose)'
            }}>
              <AlertCircle size={13} />
              <span>BUG TẠI DÒNG {bugLine}: {bugType}</span>
            </div>
          ) : null}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            title="Sao chép mã nguồn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--slate-300)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            {copied ? <Check size={12} style={{ color: 'var(--emerald-400)' }} /> : <Copy size={12} />}
            <span>{copied ? 'Đã chép' : 'Chép'}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {activeTab === 'solution.cpp' ? (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.86rem',
          lineHeight: '1.65',
          padding: '14px 0',
          overflowX: 'auto',
          maxHeight: '380px',
          background: 'radial-gradient(ellipse at 10% 0%, rgba(14, 165, 233, 0.04) 0%, transparent 60%)'
        }}>
          {lines.map((lineContent, idx) => {
            const lineNum = idx + 1;
            const isBuggy = !isFixed && lineNum === bugLine;
            const isFixedLine = isFixed && (lineContent.includes('// ĐÃ TỰ SỬA') || lineNum === bugLine);

            return (
              <div
                key={lineNum}
                style={{
                  display: 'flex',
                  padding: '2px 18px',
                  background: isBuggy 
                    ? 'rgba(244, 63, 94, 0.16)' 
                    : isFixedLine 
                    ? 'rgba(16, 185, 129, 0.14)' 
                    : 'transparent',
                  borderLeft: isBuggy 
                    ? '4px solid var(--rose-500)' 
                    : isFixedLine 
                    ? '4px solid var(--emerald-400)' 
                    : '4px solid transparent',
                  transition: 'background 0.2s ease'
                }}
              >
                {/* Line Number */}
                <span style={{
                  width: '36px',
                  textAlign: 'right',
                  marginRight: '18px',
                  color: isBuggy ? 'var(--rose-400)' : isFixedLine ? 'var(--emerald-400)' : 'var(--slate-600)',
                  userSelect: 'none',
                  fontWeight: (isBuggy || isFixedLine) ? '800' : '500'
                }}>
                  {lineNum}
                </span>

                {/* Code Content */}
                <span style={{ 
                  color: isBuggy ? '#fecdd3' : isFixedLine ? '#a7f3d0' : '#f1f5f9',
                  fontWeight: (isBuggy || isFixedLine) ? '700' : '400',
                  whiteSpace: 'pre'
                }}>
                  {lineContent}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          padding: '16px 20px',
          color: 'var(--slate-400)',
          background: '#070c18',
          minHeight: '200px'
        }}>
          <div style={{ color: 'var(--cyan-400)', marginBottom: '8px' }}>// Input Test Case 1:</div>
          <div>arr = [1, 3, 5, 9, 12]</div>
          <div>n = 5</div>
          <div>target = 7</div>
          <div style={{ marginTop: '16px', color: 'var(--slate-500)' }}>
            // Kết quả mong đợi: -1 (không tìm thấy trong mảng, thuật toán dừng sau 3 bước)
          </div>
        </div>
      )}

      {/* Editor Bottom Status Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 14px',
        background: 'rgba(15, 23, 42, 0.8)',
        borderTop: '1px solid var(--color-border-subtle)',
        fontSize: '0.72rem',
        color: 'var(--slate-400)',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>UTF-8</span>
          <span>•</span>
          <span>C++ 20 (g++ 13.2)</span>
          <span>•</span>
          <span>{lines.length} dòng</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Terminal size={12} style={{ color: 'var(--cyan-400)' }} />
          <span>AST ASTParser: OK (0 warnings)</span>
        </div>
      </div>
    </div>
  );
}
