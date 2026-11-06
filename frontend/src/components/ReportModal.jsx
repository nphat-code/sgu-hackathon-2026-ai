import React from 'react';
import { FileText, X, Copy, Send } from 'lucide-react';

export default function ReportModal({
  isOpen,
  onClose,
  reportTab,
  setReportTab,
  reportData,
  activeNode,
  depthValue,
  framesInRam,
  payloadBytes,
  payloadJson,
  onCopyText,
  onSendTelegram,
  firstIncident
}) {
  if (!isOpen) return null;

  const defaultInstant = `🚨 [CẢNH BÁO SỰ CỐ NGÕ HẺM]\n- Vị trí: ${activeNode.name}\n- Loại sự cố: Ngập nước sâu (${depthValue} cm - Vượt nửa bánh xe máy 50cm)\n- Tình trạng: Nước ngập qua ống xả và lọc gió, xe máy đi vào rất dễ chết máy.\n- Đề xuất: Đề nghị dân quân đặt biển cảnh báo và hướng dẫn bà con đi đường vòng.`;

  const defaultShift = `📊 BẢN TIN TỔNG HỢP AN TOÀN KHU PHỐ\n1. TÌNH HÌNH NGẬP NƯỚC: 2 điểm ngập vượt 20cm.\n2. SỰ CỐ TRƯỢT NGÃ: 0 vụ bất động quá 5 giây.\n3. BẢO MẬT ĐỜI TƯ: Xử lý ${framesInRam} khung hình trên RAM, 0 file video lưu ổ cứng.`;

  const activeText = reportTab === 'instant'
    ? (reportData?.instant_report || defaultInstant)
    : (reportData?.shift_report || defaultShift);

  const proofByteSize = reportData?.payload_proof?.byte_size || payloadBytes;
  const proofJson = reportData?.payload_proof?.compact_json || payloadJson;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="report-modal" onClick={e => e.stopPropagation()}>
        <div className="report-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} style={{ color: '#0284c7' }} />
            <h3>BÁO CÁO VĂN BẢN MỘC MẠC (TEXT REPORT) & GÓI TIN &lt; 150 BYTES</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
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
          <pre className="report-text-box">{activeText}</pre>

          <div className="payload-proof-card">
            <div className="payload-proof-header">
              <span>MINIMAL API JSON PAYLOAD (CHỈ GỬI MẨU TIN KHI CÓ SỰ CỐ):</span>
              <span className="byte-pill">
                {proofByteSize} Bytes / 150 Bytes (Tiết kiệm 99.98% băng thông)
              </span>
            </div>
            <code className="payload-code">{proofJson}</code>
          </div>
        </div>

        <div className="report-modal-footer">
          <button
            className="action-btn secondary"
            onClick={() => onCopyText(activeText)}
          >
            <Copy size={14} />
            <span>Sao chép văn bản</span>
          </button>
          <button
            className="action-btn primary"
            onClick={() => {
              onSendTelegram(firstIncident);
              onClose();
            }}
          >
            <Send size={14} />
            <span>Gửi ngay qua Telegram Bot</span>
          </button>
        </div>
      </div>
    </div>
  );
}

