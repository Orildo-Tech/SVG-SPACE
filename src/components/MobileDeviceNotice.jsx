import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Sparkles,
  Layers
} from 'lucide-react';

export function MobileDeviceNotice() {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <aside
      className="sv-mobile-block-overlay"
      role="region"
      aria-label="Desktop and tablet view only notice"
    >
      <div className="sv-mobile-block-card glass-panel">
        <div className="sv-mobile-glow" />

        <div className="sv-mobile-brand">
          <div className="sv-mobile-logo-wrap">
            <img
              src="/assets/logo-dark.svg"
              alt="SVG.IO Logo"
              className="sv-mobile-logo-img"
            />
          </div>
          <span className="sv-mobile-brand-name">SVG.IO</span>
        </div>

        <div className="sv-mobile-devices-display">
          <div className="sv-device-status-box supported">
            <div className="sv-device-icon-wrap">
              <Monitor size={28} />
              <CheckCircle2 size={16} className="sv-status-badge check" />
            </div>
            <span className="sv-device-label">Desktop</span>
            <span className="sv-device-sub">Recommended</span>
          </div>

          <div className="sv-device-status-box supported">
            <div className="sv-device-icon-wrap">
              <Tablet size={26} />
              <CheckCircle2 size={16} className="sv-status-badge check" />
            </div>
            <span className="sv-device-label">Tablet</span>
            <span className="sv-device-sub">Supported</span>
          </div>

          <div className="sv-device-status-box not-supported">
            <div className="sv-device-icon-wrap">
              <Smartphone size={24} />
              <XCircle size={16} className="sv-status-badge cross" />
            </div>
            <span className="sv-device-label">Mobile</span>
            <span className="sv-device-sub">Not Available</span>
          </div>
        </div>

        <div className="sv-mobile-content">
          <h1 className="sv-mobile-title">
            Desktop & Tablet Required
          </h1>
          <p className="sv-mobile-desc">
            <strong>SVG.IO</strong> is an advanced vector engineering workbench with 6,500+ brand icons, live React/Vue code generation, and multi-resolution vector export.
          </p>
          <p className="sv-mobile-highlight">
            This site is not available for mobile devices. Please open on a <strong>Desktop</strong> or <strong>Tablet</strong> to access the full vector library.
          </p>
        </div>

        <div className="sv-mobile-actions">
          <button
            type="button"
            className="sv-mobile-copy-btn"
            onClick={handleCopyUrl}
            title="Copy link to open on your computer"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Link for Desktop'}</span>
          </button>
        </div>

        <div className="sv-mobile-features-strip">
          <div className="sv-feature-pill">
            <Layers size={13} />
            <span>6,517+ SVG Icons</span>
          </div>
          <div className="sv-feature-pill">
            <Sparkles size={13} />
            <span>React • Vue • Svelte</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default MobileDeviceNotice;
