import React, { useState } from 'react';
import { ServerCrash, RefreshCw, Activity, ArrowLeft, Home, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function ServerErrorPage({ onNavigate, onRetry }) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetryClick = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      if (onRetry) {
        onRetry();
      } else {
        window.location.reload();
      }
    }, 800);
  };

  const handleClearAndReload = () => {
    try {
      localStorage.removeItem('orildo_svg_cached_metadata');
      sessionStorage.clear();
    } catch (e) {}
    window.location.reload();
  };

  return (
    <div className="md-error-page-wrapper">
      <div className="md-error-card">
        <div className="md-error-glow error-glow-red" aria-hidden="true" />

        <div className="md-hero-pill-badge" style={{ marginBottom: 12, background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.25)' }}>
          <ShieldAlert size={13} />
          <span>Error 500 • Internal System Error</span>
        </div>

        <div className="md-error-code-graphic">
          <span className="md-error-num" style={{ color: '#EF4444' }}>5</span>
          <div className="md-error-compass-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <ServerCrash size={48} style={{ color: '#EF4444' }} />
          </div>
          <span className="md-error-num" style={{ color: '#EF4444' }}>0</span>
        </div>

        <h1 className="md-error-title">Unexpected System Error</h1>
        <p className="md-error-desc">
          Something went wrong while processing your request. Please try refreshing the page or clearing your browser cache.
        </p>

        {}
        <div className="md-status-checklist">
          <div className="md-status-item">
            <div className="md-status-dot-active" />
            <span className="md-status-text">Static Icon CDN:</span>
            <span className="md-status-val">Operational</span>
          </div>
          <div className="md-status-item">
            <div className="md-status-dot-active" />
            <span className="md-status-text">Client Application:</span>
            <span className="md-status-val">Operational</span>
          </div>
          <div className="md-status-item">
            <div className="md-status-dot-active" />
            <span className="md-status-text">Vector Engine:</span>
            <span className="md-status-val">Operational</span>
          </div>
        </div>

        {}
        <div className="md-error-actions-row">
          <button
            type="button"
            className="md-btn md-btn-primary"
            onClick={handleRetryClick}
            disabled={isRetrying}>
            
            <RefreshCw size={14} className={isRetrying ? 'spin-animation' : ''} />
            <span>{isRetrying ? 'Retrying Connection...' : 'Try Again'}</span>
          </button>

          <button
            type="button"
            className="md-btn md-btn-secondary"
            onClick={handleClearAndReload}>
            
            <span>Clear Cache & Reload</span>
          </button>

          <button
            type="button"
            className="md-btn md-btn-secondary"
            onClick={() => onNavigate?.('icons')}>
            
            <Home size={14} />
            <span>Go to Home</span>
          </button>
        </div>
      </div>
    </div>);

}

export default ServerErrorPage;