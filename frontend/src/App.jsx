import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Video, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Droplets, 
  Radio, 
  Waves, 
  CloudRain 
} from 'lucide-react';
import MapViewer from './components/MapViewer';
import './App.css';

const API_BASE = 'http://127.0.0.1:8000';

const INITIAL_NODES = [
  {
    id: "node-sgu-01",
    name: "Trạm 01 - Hẻm 184 Huỳnh Tấn Phát (Triều Cường)",
    lat: 10.7599,
    lng: 106.6823,
    type: "Camera Dân Sinh #01",
    scenario: "real_flood_1",
    status: "alert",
    device: "PC văn phòng + Camera USB"
  },
  {
    id: "node-sgu-02",
    name: "Trạm 02 - Hẻm 254 Bến Vân Đồn (Ngập Sâu Cứu Hộ)",
    lat: 10.7552,
    lng: 106.6855,
    type: "Camera Dân Sinh #02",
    scenario: "real_flood_3",
    status: "alert",
    device: "Thiết bị nhúng thông dụng"
  },
  {
    id: "node-sgu-03",
    name: "Trạm 03 - Hẻm 98 Trần Xuân Soạn (Mưa Bão Trơn Trượt)",
    lat: 10.7585,
    lng: 106.6790,
    type: "Camera Tổ Dân Phố #03",
    scenario: "real_accident_1",
    status: "warning",
    device: "Webcam USB tiêu chuẩn"
  }
];

export default function App() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState("node-sgu-01");
  const [metrics, setMetrics] = useState({ 
    fps: 26.5, 
    infer_time_ms: 38.0, 
    detections_count: 5,
    flood: { detected: true, depth_cm: 22.4, level: "DANGER" },
    accident: { detected: false, reason: "", motionless_sec: 0.0 }
  });
  const [incidents, setIncidents] = useState([
    {
      id: "inc-001",
      node_id: "node-sgu-01",
      node_name: "Trạm 01 - Hẻm 184 Huỳnh Tấn Phát (Triều Cường)",
      type: "FLOOD",
      level: "DANGER",
      message: "Nước ngập sâu 22.4cm vượt nửa bánh xe máy (50cm), nguy cơ chết máy cao",
      timestamp: "10:15:30",
      gps: "10.7599, 106.6823"
    },
    {
      id: "inc-002",
      node_id: "node-sgu-02",
      node_name: "Trạm 02 - Hẻm 254 Bến Vân Đồn (Ngập Sâu Cứu Hộ)",
      type: "FLOOD",
      level: "DANGER",
      message: "Ngập sâu diện rộng trên 30cm, khuyến cáo chuyển hướng lưu thông",
      timestamp: "10:17:45",
      gps: "10.7552, 106.6855"
    },
    {
      id: "inc-003",
      node_id: "node-sgu-03",
      node_name: "Trạm 03 - Hẻm 98 Trần Xuân Soạn (Mưa Bão Trơn Trượt)",
      type: "WEATHER",
      level: "WARNING",
      message: "Mưa to mặt đường ngập trơn trượt, các phương tiện giảm tốc độ",
      timestamp: "10:18:12",
      gps: "10.7585, 106.6790"
    }
  ]);
  const [backendConnected, setBackendConnected] = useState(false);
  const [telegramToast, setTelegramToast] = useState(null);
  const [streamError, setStreamError] = useState(false);

  // Sync with backend API
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/nodes`);
        if (res.ok) {
          const data = await res.json();
          setNodes(data);
          setBackendConnected(true);
        }
      } catch (e) {
        setBackendConnected(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  // Sync metrics for selected node
  useEffect(() => {
    if (!backendConnected) return;
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/nodes/${activeNodeId}/metrics`);
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (e) {}
    };
    const interval = setInterval(fetchMetrics, 1200);
    return () => clearInterval(interval);
  }, [activeNodeId, backendConnected]);

  // Handle switching scenario between real videos
  const handleScenarioChange = async (scenario) => {
    // Optimistic UI update
    setNodes(prev => prev.map(n => n.id === activeNodeId ? { ...n, scenario } : n));
    
    // Add local incident if alert
    const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];
    const isFlood = scenario.includes('flood');
    let incMsg = 'Phát hiện ngập lụt tại cung đường';
    if (scenario === 'real_flood_1') incMsg = 'Phát hiện ngập triều cường 22.4cm vượt nửa bánh xe máy';
    else if (scenario === 'real_flood_2') incMsg = 'Nước ngập 19.5cm mấp mé ống xả phương tiện';
    else if (scenario === 'real_flood_3') incMsg = 'Ngập sâu diện rộng trên 30cm, khuyến cáo cứu hộ';
    else if (scenario === 'real_flood_4') incMsg = 'Ngõ hẻm ngập nước mưa 18.0cm, người dân lội bộ';
    else if (scenario === 'real_accident_1') incMsg = 'CẢNH BÁO: Mưa to mặt đường ngập trơn trượt lưu thông chậm';

    const newInc = {
      id: `inc-${Date.now()}`,
      node_id: activeNode.id,
      node_name: activeNode.name,
      type: isFlood ? 'FLOOD' : 'WEATHER',
      level: scenario === 'real_flood_3' || scenario === 'real_flood_1' ? 'DANGER' : 'WARNING',
      message: incMsg,
      timestamp: new Date().toLocaleTimeString('vi-VN'),
      gps: `${activeNode.lat}, ${activeNode.lng}`
    };
    setIncidents(prev => [newInc, ...prev]);

    try {
      await fetch(`${API_BASE}/api/nodes/${activeNodeId}/scenario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario })
      });
    } catch (e) {}
  };

  // Trigger Telegram Alert
  const handleSendTelegram = async (incident) => {
    setTelegramToast(`🔔 Đã gửi cảnh báo khẩn cấp [${incident.type}] về kênh Telegram @UrbanShield_Emergency và Đội SOS SGU!`);
    setTimeout(() => setTelegramToast(null), 4000);

    try {
      await fetch(`${API_BASE}/api/alerts/telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incident_id: incident.id })
      });
    } catch (e) {}
  };

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {telegramToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: 'rgba(14, 165, 233, 0.95)',
          color: '#fff',
          padding: '14px 20px',
          borderRadius: '10px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          zIndex: 9999,
          fontWeight: '600',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          border: '1px solid #7dd3fc'
        }}>
          <Send size={18} />
          {telegramToast}
        </div>
      )}

      {/* Top Header */}
      <header className="app-header glass-panel">
        <div className="logo-group">
          <div className="shield-icon-badge">
            <Shield size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="brand-title">UrbanShield Lite</h1>
              <span className="team-badge">ĐỘI SINGLENODE</span>
            </div>
            <div className="brand-subtitle">
              <span>Hệ Thống Giám Sát Ngập Nước & Sự Cố Ngõ Hẻm Bằng Edge AI</span>
              <span>•</span>
              <span style={{ color: 'var(--cyan-400)' }}>100% Video Ghi Hình Thực Tế</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="header-status-pill">
            <Radio size={14} className="radar-dot" style={{ color: backendConnected ? 'var(--emerald-400)' : 'var(--amber-400)' }} />
            <span>{backendConnected ? 'EDGE AI CONNECTED (CPU 25+ FPS)' : 'SIMULATION MODE (OFFLINE)'}</span>
          </div>
        </div>
      </header>

      {/* Main Command Center Grid */}
      <div className="dashboard-grid">
        {/* Left: Video Surveillance & Edge AI Live Feed */}
        <section className="video-column glass-panel">
          <div className="panel-header">
            <div className="panel-title">
              <Video size={18} style={{ color: 'var(--cyan-400)' }} />
              <span>LUỒNG PHÂN TÍCH THỜI GIAN THỰC (EDGE VISION ENGINE)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                fontSize: '0.78rem', 
                color: 'var(--cyan-400)', 
                fontFamily: 'var(--font-mono)',
                background: 'rgba(56, 189, 248, 0.1)',
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                fontWeight: '600'
              }}>
                MÔ HÌNH: YOLOv8n (CPU Inference)
              </div>
            </div>
          </div>

          {/* Camera Node Selector Tabs */}
          <div className="node-selector-tabs">
            {nodes.map(node => (
              <button
                key={node.id}
                className={`node-tab-btn ${node.id === activeNodeId ? 'active' : ''}`}
                onClick={() => {
                  setActiveNodeId(node.id);
                  setStreamError(false);
                }}
              >
                <MapPin size={14} />
                <span>{node.name.split('(')[0]}</span>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: (node.scenario?.includes('accident')) ? 'var(--rose-500)' : 'var(--amber-400)'
                }} />
              </button>
            ))}
          </div>

          {/* Video Stream Container */}
          <div className="video-feed-wrapper">
            {backendConnected && !streamError ? (
              <img
                src={`${API_BASE}/api/video_feed/${activeNode.id}`}
                alt="Live Camera Feed"
                className="video-stream-img"
                onError={() => setStreamError(true)}
              />
            ) : (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #090e18, #05080e)',
                padding: '24px',
                textAlign: 'center'
              }}>
                <Cpu size={48} style={{ color: 'var(--cyan-400)', marginBottom: '14px', animation: 'pulseGlow 2s infinite' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>
                  {activeNode.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '420px' }}>
                  Đang phân tích qua thiết bị biên: <strong>{activeNode.device}</strong>
                </p>
                <div style={{ 
                  marginTop: '16px', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  background: activeNode.scenario?.includes('accident') ? 'rgba(244,63,94,0.15)' : 'rgba(245,158,11,0.15)',
                  color: activeNode.scenario?.includes('accident') ? 'var(--rose-500)' : 'var(--amber-400)',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  border: '1px solid currentColor'
                }}>
                  {activeNode.scenario?.includes('accident') ? '⚠️ TRẠNG THÁI: CẢNH BÁO MƯA BÃO TRƠN TRƯỢT' : '⚠️ TRẠNG THÁI: CẢNH BÁO NGẬP NƯỚC'}
                </div>
              </div>
            )}

            {/* HUD Overlay */}
            <div className="hud-overlay">
              <div className="live-badge">
                <div className="live-indicator" />
                <span>LIVE FEED • {activeNode.device}</span>
              </div>

              <div className="hud-metrics">
                <div className="hud-metric-chip">
                  FPS: {metrics.fps || 25.0}
                </div>
                <div className="hud-metric-chip">
                  ĐỘ TRỄ: {metrics.infer_time_ms || 38.0}ms
                </div>
                {metrics.flood?.detected && (
                  <div className="hud-metric-chip" style={{ 
                    background: 'rgba(239, 68, 68, 0.25)', 
                    color: '#fca5a5', 
                    border: '1px solid #ef4444' 
                  }}>
                    MỰC NƯỚC: {metrics.flood.depth_cm}cm
                  </div>
                )}
                {metrics.accident?.detected && (
                  <div className="hud-metric-chip" style={{ 
                    background: 'rgba(244, 63, 94, 0.3)', 
                    color: '#fda4af', 
                    border: '1px solid #f43f5e' 
                  }}>
                    SOS: NGÃ BẤT ĐỘNG
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scenario Switching Simulator Controls */}
          <div className="scenario-controls-bar">
            <div className="scenario-label">
              CHỌN VIDEO THỰC TẾ ĐỂ ĐÁNH GIÁ THUẬT TOÁN:
            </div>
            <div className="scenario-buttons-grid">
              <button
                className={`scenario-btn flood ${activeNode.scenario === 'real_flood_1' ? 'active' : ''}`}
                onClick={() => handleScenarioChange('real_flood_1')}
              >
                <Droplets size={16} />
                <span>1. Triều cường xe máy (22-26cm)</span>
              </button>

              <button
                className={`scenario-btn flood ${activeNode.scenario === 'real_flood_2' ? 'active' : ''}`}
                onClick={() => handleScenarioChange('real_flood_2')}
              >
                <CheckCircle2 size={16} />
                <span>2. Đoạn trũng ngập (18-22cm)</span>
              </button>

              <button
                className={`scenario-btn flood ${activeNode.scenario === 'real_flood_3' ? 'active' : ''}`}
                onClick={() => handleScenarioChange('real_flood_3')}
              >
                <Waves size={16} />
                <span>3. Ngập sâu cứu hộ (&gt;30cm)</span>
              </button>

              <button
                className={`scenario-btn flood ${activeNode.scenario === 'real_flood_4' ? 'active' : ''}`}
                onClick={() => handleScenarioChange('real_flood_4')}
              >
                <Droplets size={16} />
                <span>4. Hẻm ngập nước (15-20cm)</span>
              </button>

              <button
                className={`scenario-btn accident ${activeNode.scenario === 'real_accident_1' ? 'active' : ''}`}
                onClick={() => handleScenarioChange('real_accident_1')}
              >
                <CloudRain size={16} />
                <span>5. Mưa bão trơn trượt</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Live Map & Incident Stream */}
        <section className="right-column">
          {/* Map Section */}
          <div className="glass-panel map-card-wrapper">
            <MapViewer 
              nodes={nodes} 
              activeNodeId={activeNodeId} 
              onSelectNode={setActiveNodeId} 
            />
          </div>

          {/* Real-time Incidents Feed */}
          <div className="glass-panel incidents-panel">
            <div className="panel-header">
              <div className="panel-title">
                <Activity size={18} style={{ color: 'var(--rose-500)' }} />
                <span>NHẬT KÝ SỰ CỐ & CẢNH BÁO TỨC THỜI</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
                {incidents.length} SỰ CỐ GHI NHẬN
              </span>
            </div>

            <div className="incidents-list">
              {incidents.map(inc => (
                <div 
                  key={inc.id} 
                  className={`incident-item ${inc.level === 'DANGER' ? 'danger' : 'sos'}`}
                >
                  <span className={`inc-badge ${inc.level === 'DANGER' ? 'danger' : 'sos'}`}>
                    {inc.level}
                  </span>
                  <div className="inc-info">
                    <div className="inc-title">
                      <span>{inc.node_name}</span>
                      <span className="inc-time">{inc.timestamp}</span>
                    </div>
                    <div className="inc-desc">
                      {inc.message}
                    </div>
                  </div>
                  <button 
                    className="telegram-btn"
                    onClick={() => handleSendTelegram(inc)}
                    title="Gửi cảnh báo đến nhóm Telegram"
                  >
                    <Send size={12} />
                    <span>Telegram</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Cost-Saving Comparison Banner */}
      <footer className="glass-panel comparison-banner">
        <div className="comp-metric-box">
          <span className="comp-label">Mô hình triển khai</span>
          <span className="comp-value" style={{ color: 'var(--emerald-400)' }}>Phần cứng phổ thông</span>
          <span className="comp-sub">Sử dụng webcam hoặc camera sẵn có</span>
        </div>

        <div className="comp-metric-box">
          <span className="comp-label">Xử lý hình ảnh</span>
          <span className="comp-value" style={{ color: 'var(--emerald-400)' }}>Tính toán tại biên</span>
          <span className="comp-sub">Chạy trên CPU, không yêu cầu GPU rời</span>
        </div>

        <div className="comp-metric-box">
          <span className="comp-label">Truyền dữ liệu</span>
          <span className="comp-value" style={{ color: 'var(--cyan-400)' }}>Theo sự kiện</span>
          <span className="comp-sub">Chỉ gửi dữ liệu khi có ngập hoặc sự cố</span>
        </div>

        <div className="comp-metric-box">
          <span className="comp-label">Kênh thông báo</span>
          <span className="comp-value" style={{ color: 'var(--cyan-400)' }}>Telegram Bot</span>
          <span className="comp-sub">Gửi mẩu tin và tọa độ vị trí</span>
        </div>
      </footer>
    </div>
  );
}
