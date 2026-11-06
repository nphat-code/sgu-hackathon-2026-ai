import React from 'react';
import { Activity, Send } from 'lucide-react';

export default function IncidentFeed({ incidents, onSendTelegram }) {
  return (
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
        {incidents.map(inc => {
          const isDanger = inc.level === 'DANGER';
          let formattedTime = inc.timestamp || inc.time || new Date().toLocaleTimeString('vi-VN');
          if (typeof inc.timestamp === 'number') {
            formattedTime = new Date(inc.timestamp * (inc.timestamp > 10000000000 ? 1 : 1000)).toLocaleTimeString('vi-VN');
          }

          return (
            <div
              key={inc.id}
              className={`incident-item ${isDanger ? 'danger' : 'warning'}`}
            >
              <span className={`inc-badge ${isDanger ? 'danger' : 'warning'}`}>
                {isDanger ? 'NGUY HIỂM' : 'CHÚ Ý'}
              </span>
              <div className="inc-info">
                <div className="inc-title">
                  <span>{inc.node_name}</span>
                  <span className="inc-time">{formattedTime}</span>
                </div>
                <div className="inc-desc">
                  {inc.message}
                </div>
              </div>
              <button
                className="telegram-btn"
                onClick={() => onSendTelegram(inc)}
                title="Gửi tin nhắn cảnh báo qua Telegram"
              >
                <Send size={11} />
                <span>Gửi tin</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

