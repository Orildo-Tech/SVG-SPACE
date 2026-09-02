import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, Database, Globe, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function PrivacyPage({ onNavigate }) {
  return (
    <div className="md-legal-page-wrapper">
      <div className="md-legal-header-card">
        <div className="md-hero-pill-badge badge-subtle-primary" style={{ marginBottom: 12 }}>
          <ShieldCheck size={13} />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="md-legal-title">Privacy Policy</h1>
        <p className="md-legal-subtitle">
          Last updated: August 2026 • Effective immediately across all SVG.IO services and API endpoints.
        </p>
      </div>

      <div className="md-legal-content-card">
        {}
        <div className="md-privacy-highlights-grid">
          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <EyeOff size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Zero User Tracking</h3>
            <p className="md-privacy-hl-desc">
              We do not track your personal identity, sell your data, or inject advertising cookies into your browser.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Lock size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Client-Side Storage</h3>
            <p className="md-privacy-hl-desc">
              Favorites, search history, and theme preferences are saved locally on your device via standard localStorage.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Server size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Open Static CDN</h3>
            <p className="md-privacy-hl-desc">
              Icons are served as public immutable static assets without collecting personally identifiable information.
            </p>
          </div>
        </div>

        <section className="md-legal-section">
          <h2>1. Information We Collect</h2>
          <p>
            SVG.IO is engineered to minimize data retention to the utmost standard. When you interact with our platform:
          </p>
          <ul>
            <li><strong>Browser Storage:</strong> Your icon favorites and recent search history are stored exclusively in your browser's local storage and never transmitted to our remote servers.</li>
            <li><strong>Submissions:</strong> When you submit a community icon, we process the vector SVG XML, icon title, and brand metadata through our vector validation and packaging pipeline.</li>
            <li><strong>Server Logs:</strong> Standard HTTP server access logs (such as IP address, user-agent, and requested file path) may be temporarily processed by edge networks for DDoS prevention and caching optimization.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>2. How We Use Information</h2>
          <p>
            Any technical log data is utilized solely to:
          </p>
          <ul>
            <li>Maintain fast, uninterrupted global vector asset delivery.</li>
            <li>Process vector quality checks, normalization, and optimization.</li>
            <li>Protect our infrastructure from spam and malicious abuse.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>3. Third-Party Services</h2>
          <p>
            SVG.IO utilizes trusted infrastructure partners to provide high-performance delivery:
          </p>
          <ul>
            <li><strong>Global Edge CDN:</strong> High-performance edge network caching and HTTPS delivery.</li>
            <li><strong>Build Engine:</strong> Vector asset validation and continuous deployment.</li>
            <li><strong>Secure Cloud Staging:</strong> High-availability storage and buffer for incoming community submissions.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding this Privacy Policy or vector asset licensing, feel free to open a discussion on our official repository or contact our team at <strong>legal@orildo.dev</strong>.
          </p>
        </section>

        <div className="md-legal-footer-row">
          <button
            type="button"
            className="md-btn md-btn-primary"
            onClick={() => onNavigate?.('icons')}>
            
            <ArrowLeft size={14} />
            <span>Back to Icon Catalog</span>
          </button>
        </div>
      </div>
    </div>);

}

export default PrivacyPage;