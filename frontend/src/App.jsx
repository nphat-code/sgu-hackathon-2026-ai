import React, { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  Activity,
  Cpu,
  Send,
  CheckCircle2,
  MapPin,
  Droplets,
  Radio,
  Waves,
  CloudRain,
  Gauge,
  Lock,
  Wifi,
  FileText,
  Timer,
  RotateCcw,
  Copy,
  X
} from 'lucide-react';
import MapViewer from './components/MapViewer';
import './App.css';

const API_BASE = 'http://127.0.0.1:8000';

const INITIAL_NODES = [
  {
    id: "node-sgu-01",
    name: "Trạm 01 - Hẻm 273 An Dương Vương (Khu vực ĐH Sài Gòn)",
    lat: 10.760567,
    lng: 106.681823,
    line_coords: [
      [106.680131, 10.759887],
      [106.681404, 10.760398],
      [106.681547, 10.760456],
      [106.681823, 10.760567],
      [106.681927, 10.760608],
      [106.682336, 10.760773],
      [106.682586, 10.760874],
      [106.682977, 10.761031]
    ],
    type: "Camera Khu Phố #01",
    scenario: "real_flood_1",
    status: "alert",
    device: "PC văn phòng + Camera USB"
  },
  {
    id: "node-sgu-02",
    name: "Trạm 02 - Hẻm 21 Nguyễn Văn Cừ (Ngã tư Trần Hưng Đạo)",
    lat: 10.756229,
    lng: 106.684653,
    line_coords: [
      [106.683692, 10.755956],
      [106.683854, 10.756002],
      [106.684653, 10.756229],
      [106.684844, 10.756283],
      [106.685075, 10.756349],
      [106.685180, 10.756372],
      [106.685444, 10.755850],
      [106.685628, 10.755584]
    ],
    type: "Camera Khu Phố #02",
    scenario: "real_flood_3",
    status: "alert",
    device: "Máy tính khu phố Core i3"
  },
  {
    id: "node-sgu-03",
    name: "Trạm 03 - Hẻm 57 Trần Bình Trọng - Cao Đạt (Chợ Quán)",
    lat: 10.754270,
    lng: 106.682694,
    line_coords: [
      [106.681486, 10.754022],
      [106.681817, 10.754089],
      [106.682060, 10.754129],
      [106.682339, 10.754189],
      [106.682694, 10.754270],
      [106.682974, 10.754333],
      [106.683226, 10.754392],
      [106.683574, 10.754468],
      [106.684140, 10.754628]
    ],
    type: "Camera Tổ Dân Phố #03",
    scenario: "real_accident_1",
    status: "warning",
    device: "Webcam USB tiêu chuẩn"
  }
];

const SCENARIOS = [
  { id: 'real_flood_1', title: '1. Tuyến đường chính', desc: 'Đường ngập triều cường', icon: Droplets, type: 'flood' },
  { id: 'real_flood_2', title: '2. Đoạn đường trũng', desc: 'Phương tiện qua vùng ngập', icon: CheckCircle2, type: 'flood' },
  { id: 'real_flood_3', title: '3. Điểm ngập sâu', desc: 'Khu vực ngập sâu xe ô tô', icon: Waves, type: 'flood' },
  { id: 'real_flood_4', title: '4. Ngõ hẻm dân cư', desc: 'Ngõ nhỏ ngập nước mưa', icon: Droplets, type: 'flood' },
  { id: 'real_accident_1', title: '5. Mưa bão trơn trượt', desc: 'Mặt đường trơn & té ngã', icon: CloudRain, type: 'accident' },
];

export default function App() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState("node-sgu-01");
  const [metrics, setMetrics] = useState({
    fps: 28.5,
    infer_time_ms: 32.0,
    clahe_active: false,
    detections_count: 5,
    payload_bytes: 82,
    payload_json: '{"node_id":"node-sgu-01","type":"FLOOD","val":22.4,"unit":"cm","time":1729145700}',
    privacy: { ram_only: true, frames_processed_in_ram: 240, disk_writes: 0 },
    flood: { detected: true, depth_cm: 22.4, level: "DANGER" },
    accident: { detected: false, reason: "", motionless_sec: 0.0 }
  });
  const [incidents, setIncidents] = useState([
    {
      id: "inc-001",
      node_id: "node-sgu-01",
      node_name: "Trạm 01 - Hẻm 273 An Dương Vương",
      type: "FLOOD",
      level: "DANGER",
      payload_bytes: 82,
      message: "Nước ngập sâu vượt nửa bánh xe máy, nguy cơ chết máy cao",
      timestamp: "10:15:30",
      gps: "10.760567, 106.681823"
    },
    {
      id: "inc-002",
      node_id: "node-sgu-02",
      node_name: "Trạm 02 - Hẻm 360D Bến Vân Đồn",
      type: "FLOOD",
      level: "DANGER",
      payload_bytes: 82,
      message: "Ngập sâu diện rộng trên lòng đường, khuyến cáo chuyển hướng lưu thông",
      timestamp: "10:17:45",
      gps: "10.757274, 106.691990"
    },
    {
      id: "inc-003",
      node_id: "node-sgu-03",
      node_name: "Trạm 03 - Hẻm 57 Trần Bình Trọng - Cao Đạt",
      type: "WEATHER",
      level: "WARNING",
      payload_bytes: 84,
      message: "Mưa to mặt đường ngập trơn trượt, các phương tiện giảm tốc độ",
      timestamp: "10:18:12",
      gps: "10.754270, 106.682694"
    }
  ]);
  const [backendConnected, setBackendConnected] = useState(false);
  const [telegramToast, setTelegramToast] = useState(null);
  const [streamError, setStreamError] = useState(false);

  // Text Report Modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTab, setReportTab] = useState('instant'); // 'instant' | 'shift'
  const [reportData, setReportData] = useState(null);

  // Auto-recover stream if momentarily interrupted
  useEffect(() => {
    if (streamError) {
      const timer = setTimeout(() => {
        setStreamError(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [streamError]);

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

  // Sync metrics for selected node (fast 600ms poll for responsive 5s fall countdown)
  useEffect(() => {
    if (!backendConnected) return;
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/nodes/${activeNodeId}/metrics`);
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (e) { }
    };
    const interval = setInterval(fetchMetrics, 600);
    return () => clearInterval(interval);
  }, [activeNodeId, backendConnected]);

  // Handle switching scenario between real videos
  const handleScenarioChange = async (scenario) => {
    setStreamError(false);
    setNodes(prev => prev.map(n => n.id === activeNodeId ? { ...n, scenario } : n));

    const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];
    const isFlood = scenario.includes('flood');
    let incMsg = 'Phát hiện ngập lụt tại cung đường';
    if (scenario === 'real_flood_1') incMsg = 'Phát hiện ngập triều cường vượt nửa bánh xe máy, nguy cơ chết máy cao';
    else if (scenario === 'real_flood_2') incMsg = 'Nước ngập mấp mé ống xả, phương tiện di chuyển chậm';
    else if (scenario === 'real_flood_3') incMsg = 'Ngập sâu diện rộng trên lòng đường, khuyến cáo chuyển hướng cứu hộ';
    else if (scenario === 'real_flood_4') incMsg = 'Ngõ hẻm ngập nước mưa, người dân lưu thông khó khăn';
    else if (scenario === 'real_accident_1') incMsg = 'CẢNH BÁO: Mưa to mặt đường ngập trơn trượt lưu thông chậm';

    const cleanNodeName = activeNode.name.split('(')[0].trim();
    setIncidents(prev => {
      const filtered = prev.filter(item => item.node_id !== activeNode.id);
      const newInc = {
        id: `inc-${activeNode.id}-${Date.now()}`,
        node_id: activeNode.id,
        node_name: cleanNodeName,
        type: isFlood ? 'FLOOD' : 'WEATHER',
        level: scenario === 'real_flood_3' || scenario === 'real_flood_1' ? 'DANGER' : 'WARNING',
        payload_bytes: 82,
        message: incMsg,
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        gps: `${activeNode.lat}, ${activeNode.lng}`
      };
      return [newInc, ...filtered].slice(0, 5);
    });

    try {
      await fetch(`${API_BASE}/api/nodes/${activeNodeId}/scenario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario })
      });
    } catch (e) { }
  };

  // Trigger or Cancel 5s Fall Detection Counter
  const handleFallTest = async (action = 'start') => {
    try {
      await fetch(`${API_BASE}/api/nodes/${activeNodeId}/fall_test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      if (action === 'cancel') {
        setTelegramToast('✅ Người dân đã tự đứng dậy trước 5 giây — Tự động đặt lại bộ đếm về 0s, không báo giả!');
        setTimeout(() => setTelegramToast(null), 3200);
      } else {
        setTelegramToast('⏱️ Đang kiểm thử Bộ đếm bất động 5 giây (W/H > 1.15)... Hãy bấm "Đứng dậy (<5s)" nếu muốn thử chống báo giả!');
        setTimeout(() => setTelegramToast(null), 3500);
      }
    } catch (e) { }
  };

  // Open Text Report Modal & Fetch Summary from Minimal API
  const handleOpenTextReport = async () => {
    setReportModalOpen(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/reports/summary?type=${reportTab}&node_id=${activeNodeId}`);
      if (res.ok) {
        const data = await res.json();
        setReportData(data);
      }
    } catch (e) { }
  };

  // Trigger Telegram Alert
  const handleSendTelegram = async (incident) => {
    setTelegramToast(`🔔 Đã gửi mẩu tin cảnh báo (${incident?.payload_bytes || 82} Bytes < 150B) về Telegram @UrbanShield_SGU_Emergency!`);
    setTimeout(() => setTelegramToast(null), 3500);

    try {
      await fetch(`${API_BASE}/api/alerts/telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incident_id: incident?.id || 'inc-001', node_id: activeNodeId })
      });
    } catch (e) { }
  };

  const handleCopyText = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setTelegramToast('📋 Đã sao chép nội dung Text Report vào bộ nhớ tạm!');
    setTimeout(() => setTelegramToast(null), 2500);
  };

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];
  const vehiclesCount = metrics.vehicles_count ?? (metrics.flood?.has_reference ? 1 : 0);
  const hasRefObject = Boolean(vehiclesCount > 0 && metrics.flood?.has_reference === true);
  const depthValue = (hasRefObject && metrics.flood?.detected) ? metrics.flood.depth_cm : 0;
  const lastRefDepth = metrics.flood?.last_ref_depth_cm || 0;
  const depthPercent = Math.min(100, Math.max(0, (depthValue / 50) * 100));
  const motionlessSec = metrics.accident?.motionless_sec || 0;
  const framesInRam = metrics.privacy?.frames_processed_in_ram || 240;
  const payloadBytes = metrics.payload_bytes || 82;

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {telegramToast && (
        <div className="telegram-toast">
          <Send size={16} />
          <span>{telegramToast}</span>
        </div>
      )}

      {/* Text Report Modal (Mẫu A & Mẫu B + <150 Bytes Proof) */}
      {reportModalOpen && (
        <div className="modal-backdrop" onClick={() => setReportModalOpen(false)}>
          <div className="report-modal" onClick={e => e.stopPropagation()}>
            <div className="report-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: '#0284c7' }} />
                <h3>BÁO CÁO VĂN BẢN MỘC MẠC (TEXT REPORT) & GÓI TIN &lt; 150 BYTES</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setReportModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="report-tabs-bar">
              <button
                className={`report-tab-btn ${reportTab === 'instant' ? 'active' : ''}`}
                onClick={() => setReportTab('instant')}
              >
                Mẫu A: Cảnh Báo Tức Thời (Gửi Dân Quân / Tổ Dân Phố)
              </button>
              <button
                className={`report-tab-btn ${reportTab === 'shift' ? 'active' : ''}`}
                onClick={() => setReportTab('shift')}
              >
                Mẫu B: Bản Tin Tổng Hợp Ca Trực
              </button>
            </div>

            <div className="report-modal-body">
              <pre className="report-text-box">
                {reportTab === 'instant'
                  ? (reportData?.instant_report || `🚨 [CẢNH BÁO SỰ CỐ NGÕ HẺM]\n- Vị trí: ${activeNode.name}\n- Loại sự cố: Ngập nước sâu (${depthValue} cm - Vượt nửa bánh xe máy 50cm)\n- Tình trạng: Nước ngập qua ống xả và lọc gió, xe máy đi vào rất dễ chết máy.\n- Đề xuất: Đề nghị dân quân đặt biển cảnh báo và hướng dẫn bà con đi đường vòng.`)
                  : (reportData?.shift_report || `📊 BẢN TIN TỔNG HỢP AN TOÀN KHU PHỐ\n1. TÌNH HÌNH NGẬP NƯỚC: 2 điểm ngập vượt 20cm.\n2. SỰ CỐ TRƯỢT NGÃ: 0 vụ bất động quá 5 giây.\n3. BẢO MẬT ĐỜI TƯ: Xử lý ${framesInRam} khung hình trên RAM, 0 file video lưu ổ cứng.`)}
              </pre>

              <div className="payload-proof-card">
                <div className="payload-proof-header">
                  <span>MINIMAL API JSON PAYLOAD (CHỈ GỬI MẨU TIN KHI CÓ SỰ CỐ):</span>
                  <span className="byte-pill">
                    {reportData?.payload_proof?.byte_size || payloadBytes} Bytes / 150 Bytes (Tiết kiệm 99.98% băng thông)
                  </span>
                </div>
                <code className="payload-code">
                  {reportData?.payload_proof?.compact_json || metrics.payload_json}
                </code>
              </div>
            </div>

            <div className="report-modal-footer">
              <button
                className="action-btn secondary"
                onClick={() => handleCopyText(reportTab === 'instant' ? reportData?.instant_report : reportData?.shift_report)}
              >
                <Copy size={14} />
                <span>Sao chép văn bản</span>
              </button>
              <button
                className="action-btn primary"
                onClick={() => {
                  handleSendTelegram(incidents[0]);
                  setReportModalOpen(false);
                }}
              >
                <Send size={14} />
                <span>Gửi ngay qua Telegram Bot</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header - Clean & Minimal */}
      <header className="app-header glass-panel">
        <div className="logo-group">
          <div className="shield-icon-badge">
            <Shield size={20} />
          </div>
          <div>
            <h1 className="brand-title">UrbanShield Lite</h1>
            <div className="brand-subtitle">
              Giám sát ngập nước & sự cố ngõ hẻm
            </div>
          </div>
        </div>

        <div className="header-actions">
          {/* Interactive 5s Fall Detection Test Button */}
          {motionlessSec > 0 ? (
            <button
              className="header-btn warning-btn"
              onClick={() => handleFallTest('cancel')}
              title="Mô phỏng người dân tự đứng dậy trước 5 giây"
            >
              <RotateCcw size={14} />
              <span>Đứng dậy ({motionlessSec}s)</span>
            </button>
          ) : (
            <button
              className="header-btn test-fall-btn"
              onClick={() => handleFallTest('start')}
              title="Kiểm thử bộ đếm bất động 5 giây"
            >
              <Timer size={14} />
              <span>Mô phỏng ngã 5s</span>
            </button>
          )}

          {/* Open Plain-Text Report Button */}
          <button
            className="header-btn report-btn"
            onClick={handleOpenTextReport}
            title="Xem báo cáo tin nhắn văn bản"
          >
            <FileText size={14} />
            <span>Báo cáo tin nhắn</span>
          </button>

          <div className="header-status-pill">
            <Radio size={12} className="radar-dot" style={{ color: backendConnected ? '#10b981' : '#f59e0b' }} />
            <span>{backendConnected ? 'Đang hoạt động' : 'Ngoại tuyến'}</span>
          </div>
        </div>
      </header>

      {/* Main Command Center Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Video Surveillance & Calibrated Gauge */}
        <section className="video-column glass-panel">
          {/* Top Camera Node Selector Bar */}
          <div className="camera-toolbar">
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
                  <MapPin size={13} />
                  <span>{node.name.split('-')[0].trim()}</span>
                  <span className={`tab-dot ${(node.scenario === 'real_flood_1' || node.scenario === 'real_flood_3' || node.scenario?.includes('accident')) ? 'red' : 'amber'}`} />
                </button>
              ))}
            </div>

            {/* Test Source Selector */}
            <div className="source-chips">
              {SCENARIOS.map(s => (
                <button
                  key={s.id}
                  className={`source-chip ${activeNode.scenario === s.id ? 'active' : ''}`}
                  onClick={() => handleScenarioChange(s.id)}
                  title={s.desc}
                >
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Video Feed Screen - Unobstructed */}
          <div className="video-feed-wrapper">
            {backendConnected && !streamError ? (
              <img
                key={`${activeNode.id}-${activeNode.scenario}`}
                src={`${API_BASE}/api/video_feed/${activeNode.id}`}
                alt="Live Camera Feed"
                className="video-stream-img"
                onError={() => setStreamError(true)}
              />
            ) : (
              <div className="video-placeholder">
                <Cpu size={40} className="placeholder-icon" />
                <h3>{activeNode.name}</h3>
                <p>Đang kết nối luồng hình ảnh...</p>
              </div>
            )}

            <div className="hud-overlay">
              <div className="live-badge">
                <div className="live-indicator" />
                <span>{activeNode.name}</span>
              </div>
            </div>
          </div>

          {/* Unified Flood & Incident Status Bar */}
          <div className="telemetry-gauge-card">
            <div className="gauge-calibrator">
              <div className="gauge-header">
                <span className={`gauge-status-text ${metrics.accident?.detected || (hasRefObject && metrics.flood?.level === 'DANGER') ? 'text-danger' : 'text-warning'}`}>
                  {metrics.accident?.detected ? (
                    <>CẢNH BÁO NGÃ XE: Bất động quá 5 giây — Đã gửi tin nhắn hỗ trợ</>
                  ) : metrics.accident?.motionless_sec > 0 ? (
                    <>Đang kiểm tra bất động: {metrics.accident.motionless_sec}s / 5.0s</>
                  ) : (hasRefObject && metrics.flood?.detected) ? (
                    <>
                      {metrics.flood.level === 'DANGER'
                        ? 'Ngập nguy hiểm (Vượt nửa bánh xe máy 50cm)'
                        : 'Ngập chú ý (Mấp mé ống xả xe máy)'}
                    </>
                  ) : !hasRefObject && metrics.flood?.water_surface_present ? (
                    <>Phát hiện mặt nước ngập — Đang chờ xe đi qua để đo{lastRefDepth > 0 ? ` (Đo gần nhất: ${lastRefDepth}cm)` : ''}</>
                  ) : (
                    <>Mặt đường thông thoáng, di chuyển an toàn</>
                  )}
                </span>

                <span className="gauge-val">
                  {hasRefObject ? (
                    <>Mực nước: <strong>{depthValue} cm</strong> / 50 cm</>
                  ) : (
                    <>Chờ xe đi qua vùng đo</>
                  )}
                </span>
              </div>

              {/* Progress Bar with 3 Visual Danger Zones */}
              <div className="gauge-track">
                <div className="track-marker safe-mark" style={{ left: '20%' }}>
                  <span className="mark-label">10cm (Ống xả)</span>
                </div>
                <div className="track-marker danger-mark" style={{ left: '50%' }}>
                  <span className="mark-label">25cm (Nửa bánh xe)</span>
                </div>
                <div className="track-marker full-mark" style={{ left: '100%' }}>
                  <span className="mark-label">50cm</span>
                </div>

                <div
                  className={`gauge-fill ${metrics.flood?.level === 'DANGER' ? 'danger' : 'warning'}`}
                  style={{ width: `${depthPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Live Map & Emergency Incidents Feed */}
        <section className="right-column">
          {/* Live Map Panel */}
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
                <Activity size={16} style={{ color: '#dc2626' }} />
                <span>CẢNH BÁO GẦN ĐÂY</span>
              </div>
              <span className="inc-counter-badge">
                {incidents.length} điểm
              </span>
            </div>

            <div className="incidents-list">
              {incidents.map(inc => (
                <div
                  key={inc.id}
                  className={`incident-item ${inc.level === 'DANGER' ? 'danger' : 'warning'}`}
                >
                  <span className={`inc-badge ${inc.level === 'DANGER' ? 'danger' : 'warning'}`}>
                    {inc.level === 'DANGER' ? 'NGUY HIỂM' : 'CHÚ Ý'}
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
                    title="Gửi tin nhắn cảnh báo qua Telegram"
                  >
                    <Send size={11} />
                    <span>Gửi tin</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
