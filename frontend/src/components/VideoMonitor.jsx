import React from 'react';
import { Cpu, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function VideoMonitor({
  activeNode,
  backendConnected,
  streamError,
  setStreamError,
  apiBase,
  metrics
}) {
  const vehiclesCount = metrics?.vehicles_count ?? (metrics?.flood?.has_reference ? 1 : 0);
  const hasRefObject = Boolean(vehiclesCount > 0 && metrics?.flood?.has_reference === true);
  const depthValue = (hasRefObject && metrics?.flood?.detected) ? metrics.flood.depth_cm : 0;
  const lastRefDepth = metrics?.flood?.last_ref_depth_cm || 0;
  const depthPercent = Math.min(100, Math.max(0, (depthValue / 50) * 100));
  const isAccident = Boolean(metrics?.accident?.detected);
  const motionlessSec = metrics?.accident?.motionless_sec || 0;

  // Determine dynamic gradient color for the gauge fill
  let gaugeGradient = 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'; // Green (Safe <10cm)
  if (depthValue >= 20.0) {
    gaugeGradient = 'linear-gradient(90deg, #10b981 0%, #f59e0b 35%, #ef4444 80%)'; // Red (Danger >=20cm)
  } else if (depthValue >= 10.0) {
    gaugeGradient = 'linear-gradient(90deg, #10b981 0%, #f59e0b 100%)'; // Amber (Warning 10-20cm)
  }

  return (
    <div className="video-monitor-container">
      {/* Video Feed Screen */}
      <div className="video-feed-wrapper">
        {backendConnected && !streamError ? (
          <img
            key={`${activeNode.id}-${activeNode.scenario}`}
            src={`${apiBase}/api/video_feed/${activeNode.id}`}
            alt="Live Camera Feed"
            className="video-stream-img"
            onError={() => setStreamError(true)}
          />
        ) : (
          <div className="video-placeholder">
            <Cpu size={40} className="placeholder-icon" />
            <h3>{activeNode.name}</h3>
            <p>Đang kết nối luồng hình ảnh AI...</p>
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
            <span className={`gauge-status-text ${isAccident || (hasRefObject && metrics?.flood?.level === 'DANGER') ? 'text-danger' : 'text-warning'}`}>
              {isAccident ? (
                <>🚨 CẢNH BÁO NGÃ XE: Nằm bất động quá 5s — Đã gửi tin báo động</>
              ) : motionlessSec >= 1.5 ? (
                <>⏱️ Đang đếm bất động chống báo giả: {motionlessSec.toFixed(1)}s / 5.0s</>
              ) : (hasRefObject && metrics?.flood?.detected) ? (
                <>
                  {metrics.flood.level === 'DANGER'
                    ? '⚠️ Ngập nguy hiểm (Vượt nửa bánh xe máy 50cm)'
                    : '⚡ Ngập chú ý (Mấp mé ống xả xe máy)'}
                </>
              ) : !hasRefObject && metrics?.flood?.water_surface_present ? (
                <>💧 Phát hiện mặt nước ngập — Chờ xe máy đi qua để đo{lastRefDepth > 0 ? ` (Lần đo trước: ${lastRefDepth}cm)` : ''}</>
              ) : (
                <>✅ Mặt đường thông thoáng, các phương tiện di chuyển an toàn</>
              )}
            </span>

            <span className="gauge-val">
              {isAccident ? (
                <strong style={{ color: '#ef4444' }}>Sự cố ngã xe: {motionlessSec || 5.0}s</strong>
              ) : motionlessSec >= 1.5 ? (
                <span>Bất động: {motionlessSec.toFixed(1)}s / 5.0s</span>
              ) : hasRefObject ? (
                <>Mực nước: <strong>{depthValue.toFixed(1)} cm</strong> / 50 cm</>
              ) : metrics?.flood?.water_surface_present ? (
                <>Chờ phương tiện tham chiếu</>
              ) : (
                <span>Mặt đường khô ráo</span>
              )}
            </span>
          </div>

          {/* Progress Bar with 3 Visual Danger Zones */}
          <div className="gauge-track">
            {isAccident ? (
              <div
                className="gauge-fill danger"
                style={{ width: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }}
              />
            ) : motionlessSec >= 1.5 && depthValue === 0 ? (
              <div
                className="gauge-fill warning"
                style={{
                  width: `${Math.min(100, (motionlessSec / 5.0) * 100)}%`,
                  background: 'linear-gradient(90deg, #3b82f6, #f59e0b)'
                }}
              />
            ) : (
              <>
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
                  className="gauge-fill"
                  style={{
                    width: `${depthPercent}%`,
                    background: gaugeGradient,
                    boxShadow: depthValue >= 20 ? '0 0 10px rgba(239, 68, 68, 0.5)' : 'none'
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

