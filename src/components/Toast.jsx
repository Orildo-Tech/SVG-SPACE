import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon success" style={{ color: '#10B981' }} />,
    error: <AlertCircle size={18} className="toast-icon error" style={{ color: '#EF4444' }} />,
    info: <Info size={18} className="toast-icon info" style={{ color: '#6366F1' }} />
  };

  return (
    <div className="toast-container animate-fade-in">
      <div className={`toast-card ${toast.type || 'info'}`}>
        <div className="toast-content">
          {icons[toast.type] || icons.info}
          <div className="toast-message">
            <p className="toast-title">{toast.title}</p>
            {toast.message && <p className="toast-desc">{toast.message}</p>}
          </div>
        </div>
        <button className="toast-close" onClick={onClose} aria-label="Close alert">
          <X size={14} />
        </button>
      </div>
    </div>);

}

export default Toast;