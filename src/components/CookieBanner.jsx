import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, X, ArrowRight, Sparkles, Database, Lock } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'orildo_svg_cookie_consent';

export function CookieBanner({ onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      document.cookie = `svgio_consent=accepted; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`;
    } catch (e) {}
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'essential_only');
      document.cookie = `svgio_consent=essential; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`;
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="sv-cookie-container" role="region" aria-label="Privacy & Cookie Preferences">
      <div className="sv-cookie-card glass-panel">
        <div className="sv-cookie-header">
          <h4 className="sv-cookie-title">Zero-Tracking. Pure Performance.</h4>

          <button
            type="button"
            className="sv-cookie-dismiss-btn"
            onClick={handleReject}
            title="Dismiss & keep essential storage only"
            aria-label="Close banner">
            <X size={14} />
          </button>
        </div>

        <div className="sv-cookie-body">
          <p className="sv-cookie-desc">
            SVG.IO uses local browser storage and IndexedDB memory caching to remember your favorites, recent searches, and custom theme. We never sell your data or inject third-party ad trackers.
          </p>

          <div className="sv-cookie-pills-row">
            <span className="sv-cookie-pill">
              <Lock size={11} className="text-emerald" />
              <span>Zero Telemetry</span>
            </span>
            <span className="sv-cookie-pill">
              <Database size={11} className="text-orange" />
              <span>Offline IndexedDB Cache</span>
            </span>
          </div>
        </div>

        <div className="sv-cookie-footer">
          <button
            type="button"
            className="sv-cookie-policy-btn"
            onClick={() => onNavigate?.('privacy')}>
            <span>Privacy Specs</span>
            <ArrowRight size={11} />
          </button>

          <div className="sv-cookie-btn-group">
            <button
              type="button"
              className="sv-cookie-btn-ghost"
              onClick={handleReject}>
              Essential Only
            </button>

            <button
              type="button"
              className="sv-cookie-btn-primary"
              onClick={handleAccept}>
              <Check size={13} />
              <span>Accept &amp; Continue</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default CookieBanner;