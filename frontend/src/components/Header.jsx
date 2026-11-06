import React from 'react';
import { Shield, FileText, Radio, Video, Map } from 'lucide-react';

export default function Header({
  backendConnected,
  onOpenTextReport,
  mobileTab,
  onSelectMobileTab
}) {
  return (
    <header className="app-header glass-panel">
      <div className="logo-group">
        <div className="shield-icon-badge">
          <Shield size={20} />
        </div>
        <div>
          <h1 className="brand-title">UrbanShield Lite</h1>
          <div className="brand-subtitle">
            Giám sát ngập nước & sự cố ngõ hẻm bằng Edge AI trên CPU
          </div>
        </div>
      </div>

      <div className="header-actions">
        {/* Mobile View Switcher */}
        <div className="mobile-view-tabs">
          <button
            className={`mobile-tab-btn ${mobileTab === 'camera' ? 'active' : ''}`}
            onClick={() => onSelectMobileTab('camera')}
          >
            <Video size={13} />
            <span>Camera AI</span>
          </button>
          <button
            className={`mobile-tab-btn ${mobileTab === 'map' ? 'active' : ''}`}
            onClick={() => onSelectMobileTab('map')}
          >
            <Map size={13} />
            <span>Bản đồ WebGIS</span>
          </button>
        </div>

        {/* Plain-Text Report Button */}
        <button
          className="header-btn report-btn"
          onClick={onOpenTextReport}
          title="Xem báo cáo tin nhắn văn bản và gói tin < 150 Bytes"
        >
          <FileText size={14} />
          <span>Báo cáo tin nhắn</span>
        </button>

        {/* Backend Heartbeat Status Pill */}
        <div className="header-status-pill">
          <Radio
            size={12}
            className="radar-dot"
            style={{ color: backendConnected ? '#10b981' : '#f59e0b' }}
          />
          <span>{backendConnected ? 'Đang hoạt động' : 'Ngoại tuyến'}</span>
        </div>
      </div>
    </header>
  );
}

