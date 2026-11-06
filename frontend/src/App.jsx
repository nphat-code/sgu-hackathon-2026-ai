import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import Header from './components/Header';
import StationTabs from './components/StationTabs';
import TelemetryBar from './components/TelemetryBar';
import VideoMonitor from './components/VideoMonitor';
import MapViewer from './components/MapViewer';
import IncidentFeed from './components/IncidentFeed';
import ReportModal from './components/ReportModal';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000'
    : window.location.origin
);

const INITIAL_NODES = [
  {
    id: "node-sgu-01",
    name: "Trạm 01 - Đường Trần Xuân Soạn (Bờ kè Kênh Tẻ)",
    street_segment: "Tuyến Trần Xuân Soạn - Hẻm 793, Phường Tân Hưng, Quận 7",
    lat: 10.7545,
    lng: 106.7115,
    line_coords: [
      [106.7085, 10.7540],
      [106.7098, 10.7542],
      [106.7115, 10.7545],
      [106.7135, 10.7548],
      [106.7155, 10.7551],
      [106.7180, 10.7555]
    ],
    type: "Camera Khu Phố #01",
    scenario: "real_flood_1",
    status: "alert",
    device: "PC văn phòng + Camera USB"
  },
  {
    id: "node-sgu-02",
    name: "Trạm 02 - Tuyến Huỳnh Tấn Phát (Đoạn trũng Phú Thuận)",
    street_segment: "Tuyến Huỳnh Tấn Phát - Hẻm 860, Phường Phú Thuận, Quận 7",
    lat: 10.7335,
    lng: 106.7320,
    line_coords: [
      [106.7305, 10.7350],
      [106.7312, 10.7342],
      [106.7320, 10.7335],
      [106.7328, 10.7327],
      [106.7335, 10.7320],
      [106.7342, 10.7312]
    ],
    type: "Camera Khu Phố #02",
    scenario: "real_flood_2",
    status: "warning",
    device: "Máy tính khu phố Core i3"
  },
  {
    id: "node-sgu-03",
    name: "Trạm 03 - Tuyến Lê Văn Lương (Khu ngập triều Rạch Đỉa)",
    street_segment: "Tuyến Lê Văn Lương - Hẻm 482, Phường Tân Phong, Quận 7",
    lat: 10.7420,
    lng: 106.7055,
    line_coords: [
      [106.7048, 10.7440],
      [106.7051, 10.7430],
      [106.7055, 10.7420],
      [106.7059, 10.7410],
      [106.7063, 10.7400]
    ],
    type: "Camera Tổ Dân Phố #03",
    scenario: "real_flood_3",
    status: "warning",
    device: "Webcam USB tiêu chuẩn"
  },
  {
    id: "node-sgu-04",
    name: "Trạm 04 - Hẻm 803 Huỳnh Tấn Phát (Khu dân cư ven rạch)",
    street_segment: "Tuyến Huỳnh Tấn Phát - Hẻm 803, Phường Tân Phú, Quận 7",
    lat: 10.7360,
    lng: 106.7285,
    line_coords: [
      [106.7275, 10.7355],
      [106.7280, 10.7358],
      [106.7285, 10.7360],
      [106.7290, 10.7362],
      [106.7295, 10.7365]
    ],
    type: "Camera Dân Sinh #04",
    scenario: "real_flood_4",
    status: "warning",
    device: "Camera IP hẻm dân cư"
  },
  {
    id: "node-sgu-05",
    name: "Trạm 05 - Dốc Cầu Kênh Tẻ (Đoạn dốc trơn trượt)",
    street_segment: "Tuyến Dạ Cầu Kênh Tẻ - Đường số 10, Phường Tân Hưng, Quận 7",
    lat: 10.7565,
    lng: 106.7035,
    line_coords: [
      [106.7025, 10.7558],
      [106.7030, 10.7561],
      [106.7035, 10.7565],
      [106.7040, 10.7568],
      [106.7045, 10.7572]
    ],
    type: "Camera Giám Sát Sự Cố #05",
    scenario: "real_accident_1",
    status: "alert",
    device: "Máy tính mini Edge AI"
  }
];

export default function App() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState("node-sgu-01");
  const [mobileTab, setMobileTab] = useState("camera"); // 'camera' | 'map'
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
      node_name: "Trạm 01 - Đường Trần Xuân Soạn",
      type: "FLOOD",
      level: "DANGER",
      payload_bytes: 82,
      message: "Nước ngập sâu 22.4cm vượt nửa bánh xe máy, nguy cơ chết máy cao",
      timestamp: "10:15:30",
      gps: "10.7545, 106.7115"
    },
    {
      id: "inc-002",
      node_id: "node-sgu-02",
      node_name: "Trạm 02 - Tuyến Huỳnh Tấn Phát",
      type: "FLOOD",
      level: "WARNING",
      payload_bytes: 82,
      message: "Ngập úng 18.2cm sau mưa lớn, phương tiện bắt đầu khó đi",
      timestamp: "10:17:45",
      gps: "10.7335, 106.7320"
    },
    {
      id: "inc-003",
      node_id: "node-sgu-03",
      node_name: "Trạm 03 - Tuyến Lê Văn Lương",
      type: "FLOOD",
      level: "WARNING",
      payload_bytes: 84,
      message: "Nước ngập triều 13.0cm mép pô xe máy, các phương tiện giảm tốc độ",
      timestamp: "10:18:12",
      gps: "10.7420, 106.7055"
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

        const incRes = await fetch(`${API_BASE}/api/incidents`);
        if (incRes.ok) {
          const incData = await incRes.json();
          if (Array.isArray(incData) && incData.length > 0) {
            setIncidents(incData);
          }
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

  // Select node from tabs or directly from Map marker click
  const handleSelectNode = (nodeId) => {
    setActiveNodeId(nodeId);
    setStreamError(false);
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
  const depthValue = metrics.flood?.detected ? metrics.flood.depth_cm : 0;
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

      {/* Text Report Modal */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportTab={reportTab}
        setReportTab={setReportTab}
        reportData={reportData}
        activeNode={activeNode}
        depthValue={depthValue}
        framesInRam={framesInRam}
        payloadBytes={payloadBytes}
        payloadJson={metrics.payload_json}
        onCopyText={handleCopyText}
        onSendTelegram={handleSendTelegram}
        firstIncident={incidents[0]}
      />

      {/* Top Header */}
      <Header
        backendConnected={backendConnected}
        onOpenTextReport={handleOpenTextReport}
        mobileTab={mobileTab}
        onSelectMobileTab={setMobileTab}
      />

      {/* Main Command Center Grid */}
      <div className={`dashboard-grid ${mobileTab === 'map' ? 'show-map-only' : 'show-camera-only'}`}>
        {/* Left Column: Video Surveillance & Calibrated Gauge */}
        <section className="video-column glass-panel">
          <StationTabs
            nodes={nodes}
            activeNodeId={activeNodeId}
            onSelectNode={handleSelectNode}
            activeNode={activeNode}
          />

          <VideoMonitor
            activeNode={activeNode}
            backendConnected={backendConnected}
            streamError={streamError}
            setStreamError={setStreamError}
            apiBase={API_BASE}
            metrics={metrics}
          />
        </section>

        {/* Right Column: Live Map & Emergency Incidents Feed */}
        <section className="right-column">
          <div className="glass-panel map-card-wrapper">
            <MapViewer
              nodes={nodes}
              activeNodeId={activeNodeId}
              onSelectNode={handleSelectNode}
            />
          </div>

          <IncidentFeed
            incidents={incidents}
            onSendTelegram={handleSendTelegram}
          />
        </section>
      </div>
    </div>
  );
}
