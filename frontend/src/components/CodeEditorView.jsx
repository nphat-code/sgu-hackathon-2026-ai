import React, { useState } from 'react';
import { 
  Code2, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  FileText
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
      background: '#ffffff',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--slate-200)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden'
    }}>
      {/* Editor Top Navigation & File Tabs Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 14px',
        background: '#f1f5f9',
        borderBottom: '1px solid var(--slate-200)',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* File Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setActiveTab('solution.cpp')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: activeTab === 'solution.cpp' ? '#ffffff' : 'transparent',
              border: activeTab === 'solution.cpp' ? '1px solid var(--slate-200)' : '1px solid transparent',
              borderBottom: activeTab === 'solution.cpp' ? '2px solid var(--cobalt-600)' : '1px solid transparent',
              borderRadius: '6px',
              color: activeTab === 'solution.cpp' ? 'var(--slate-900)' : 'var(--slate-600)',
              fontSize: '0.8rem',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              boxShadow: activeTab === 'solution.cpp' ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Code2 size={14} style={{ color: 'var(--cobalt-600)' }} />
            <span>solution.cpp</span>
            <span style={{ fontSize: '0.65rem', background: '#e0f2fe', color: 'var(--sky-700)', padding: '1px 5px', borderRadius: '4px', fontWeight: '700' }}>C++ 20</span>
          </button>

          <button
            onClick={() => setActiveTab('test_input.txt')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: activeTab === 'test_input.txt' ? '#ffffff' : 'transparent',
              border: activeTab === 'test_input.txt' ? '1px solid var(--slate-200)' : '1px solid transparent',
              borderRadius: '6px',
              color: activeTab === 'test_input.txt' ? 'var(--slate-900)' : 'var(--slate-600)',
              fontSize: '0.8rem',
              fontWeight: '600',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            <FileText size={14} style={{ color: 'var(--slate-400)' }} />
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
              color: 'var(--emerald-700)',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              background: 'var(--emerald-50)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--emerald-100)',
              boxShadow: '0 1px 3px rgba(5, 150, 105, 0.15)'
            }}>
              <CheckCircle2 size={13} style={{ color: 'var(--emerald-600)' }} />
              <span>ĐÃ TỰ VÁ LỖI THÀNH CÔNG</span>
            </div>
          ) : bugLine ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: 'var(--crimson-700)',
              fontWeight: '700',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              background: 'var(--crimson-50)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--crimson-100)'
            }}>
              <AlertCircle size={13} style={{ color: 'var(--crimson-600)' }} />
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
              padding: '4px 9px',
              background: '#ffffff',
              border: '1px solid var(--slate-300)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--slate-700)',
              fontSize: '0.74rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {copied ? <Check size={12} style={{ color: 'var(--emerald-600)' }} /> : <Copy size={12} />}
            <span>{copied ? 'Đã chép' : 'Chép'}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {activeTab === 'solution.cpp' ? (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.86rem',
          lineHeight: '1.68',
          padding: '14px 0',
          overflowX: 'auto',
          maxHeight: '380px',
          background: '#ffffff'
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
                    ? '#fef2f2' 
                    : isFixedLine 
                    ? '#ecfdf5' 
                    : 'transparent',
                  borderLeft: isBuggy 
                    ? '4px solid var(--crimson-600)' 
                    : isFixedLine 
                    ? '4px solid var(--emerald-600)' 
                    : '4px solid transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                {/* Line Number */}
                <span style={{
                  width: '36px',
                  textAlign: 'right',
                  marginRight: '18px',
                  color: isBuggy ? 'var(--crimson-600)' : isFixedLine ? 'var(--emerald-600)' : 'var(--slate-400)',
                  userSelect: 'none',
                  fontWeight: (isBuggy || isFixedLine) ? '800' : '500'
                }}>
                  {lineNum}
                </span>

                {/* Code Content */}
                <span style={{ 
                  color: isBuggy ? '#991b1b' : isFixedLine ? '#065f46' : 'var(--slate-900)',
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
          padding: '18px 24px',
          color: 'var(--slate-700)',
          background: '#ffffff',
          minHeight: '200px'
        }}>
          <div style={{ color: 'var(--cobalt-600)', fontWeight: '700', marginBottom: '8px' }}>// Input Test Case 1:</div>
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
        background: '#f8fafc',
        borderTop: '1px solid var(--slate-200)',
        fontSize: '0.74rem',
        color: 'var(--slate-500)',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>UTF-8</span>
          <span>•</span>
          <span>C++ 20 (GCC 13.2)</span>
          <span>•</span>
          <span>{lines.length} dòng</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Terminal size={12} style={{ color: 'var(--cobalt-600)' }} />
          <span style={{ fontWeight: '600' }}>AST Parser: Hợp lệ (0 cảnh báo)</span>
        </div>
      </div>
    </div>
  );
}
