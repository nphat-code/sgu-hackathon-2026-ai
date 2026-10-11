import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Sparkles, BookOpen, Layers } from 'lucide-react';

function MindmapNode({ node, level = 0 }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const levelColors = [
    { border: 'var(--cyan-400)', bg: 'rgba(14, 165, 233, 0.15)', text: '#38bdf8' }, // Root
    { border: 'var(--indigo-400)', bg: 'rgba(99, 102, 241, 0.12)', text: '#818cf8' }, // Level 1
    { border: 'var(--emerald-400)', bg: 'rgba(16, 185, 129, 0.12)', text: '#34d399' }, // Level 2
    { border: 'rgba(255, 255, 255, 0.2)', bg: 'rgba(255, 255, 255, 0.05)', text: '#e2e8f0' } // Level 3+
  ];

  const currentTheme = levelColors[Math.min(level, levelColors.length - 1)];

  return (
    <div style={{ marginLeft: level === 0 ? 0 : '24px', marginTop: '10px', position: 'relative' }}>
      {level > 0 && (
        <div style={{
          position: 'absolute',
          left: '-16px',
          top: '16px',
          width: '14px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.15)'
        }} />
      )}

      <div 
        onClick={() => hasChildren && setExpanded(!expanded)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: level === 0 ? '12px 20px' : '8px 16px',
          background: currentTheme.bg,
          border: `1.5px solid ${currentTheme.border}`,
          borderRadius: level === 0 ? '14px' : '10px',
          cursor: hasChildren ? 'pointer' : 'default',
          boxShadow: level === 0 ? '0 0 20px rgba(56, 189, 248, 0.25)' : 'none',
          transition: 'all 0.2s ease',
          userSelect: 'none'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        {hasChildren && (
          <span style={{ color: currentTheme.text, display: 'flex', alignItems: 'center' }}>
            {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}

        {level === 0 && <Sparkles size={18} style={{ color: 'var(--cyan-400)' }} />}
        {level === 1 && <Layers size={16} style={{ color: 'var(--indigo-400)' }} />}
        {level > 1 && <BookOpen size={14} style={{ color: 'var(--emerald-400)' }} />}

        <div>
          <div style={{ 
            fontSize: level === 0 ? '1.05rem' : '0.9rem', 
            fontWeight: level === 0 ? '800' : '600',
            color: level === 0 ? '#ffffff' : currentTheme.text
          }}>
            {node.label}
          </div>
          {node.desc && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {node.desc}
            </div>
          )}
        </div>

        {hasChildren && (
          <span style={{
            fontSize: '0.7rem',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '2px 6px',
            borderRadius: '10px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}>
            {node.children.length}
          </span>
        )}
      </div>

      {hasChildren && expanded && (
        <div style={{
          borderLeft: '2px dashed rgba(255, 255, 255, 0.12)',
          marginLeft: '12px',
          paddingLeft: '4px'
        }}>
          {node.children.map(child => (
            <MindmapNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MindmapViewer({ mindmap }) {
  if (!mindmap) return null;

  return (
    <div style={{
      padding: '24px',
      background: 'rgba(10, 15, 26, 0.7)',
      borderRadius: '16px',
      border: '1px solid var(--border-subtle)',
      minHeight: '420px',
      overflowX: 'auto'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '20px',
        paddingBottom: '14px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} style={{ color: 'var(--cyan-400)' }} />
          <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>
            SƠ ĐỒ TƯ DUY PHÂN CẤP TRI THỨC (INTERACTIVE MINDMAP)
          </span>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Nhấp vào từng nhánh để mở rộng / thu gọn
        </span>
      </div>

      <div style={{ padding: '8px' }}>
        <MindmapNode node={mindmap} level={0} />
      </div>
    </div>
  );
}
