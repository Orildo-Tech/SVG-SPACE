import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, Database, Globe, ArrowLeft, GitBranch, Archive, ExternalLink } from 'lucide-react';

export function PrivacyPage({ onNavigate }) {
  return (
    <div className="md-legal-page-wrapper">
      <div className="md-legal-header-card">
        <div className="md-hero-pill-badge badge-subtle-primary" style={{ marginBottom: 12 }}>
          <ShieldCheck size={13} />
          <span>Privacy & Data Architecture</span>
        </div>
        <h1 className="md-legal-title">Privacy Policy</h1>
        <p className="md-legal-subtitle">
          Transparent data practices, client-side preferences, and Public Domain repository guarantees.
        </p>
      </div>

      <div className="md-legal-content-card">
        <div className="md-privacy-highlights-grid">
          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <EyeOff size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Zero Personal Tracking</h3>
            <p className="md-privacy-hl-desc">
              We do not track your personal identity, harvest email addresses, or run third-party surveillance scripts.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Lock size={18} />
            </div>
            <h3 className="md-privacy-hl-title">100% Client-Side Storage</h3>
            <p className="md-privacy-hl-desc">
              Your favorites, recents, active pipeline timers, and theme preferences reside locally in your browser's localStorage.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Archive size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Public Domain Catalog</h3>
            <p className="md-privacy-hl-desc">
              Submitted vector assets become part of the immutable public domain archive and cannot be purged upon account closure.
            </p>
          </div>
        </div>

        <section className="md-legal-section">
          <h2>1. Information We Collect and Retain</h2>
          <p>
            SVG SPACE is engineered to minimize data retention to the absolute bare minimum required for high-speed open-source distribution:
          </p>
          <ul>
            <li><strong>Local Preferences:</strong> Your saved favorites list, custom categories, and UI preferences (such as dark/light mode) are stored strictly inside your browser's IndexedDB / localStorage. This data never leaves your device unless you explicitly export it.</li>
            <li><strong>Public Vector Submissions:</strong> When you submit a vector icon, we collect the vector XML code, icon title, aliases, chosen categories, and license metadata. This information is processed, sanitized, and permanently committed to the public open-source catalog.</li>
            <li><strong>Edge Server Logs:</strong> Standard anonymous HTTP server logs (IP address, user-agent, referer, and requested static file path) are processed transiently by edge networks exclusively for DDoS mitigation, caching, and rate limiting.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>2. Contributor Submissions & Account Deletion Policy</h2>
          <p>
            In accordance with our Terms of Service and Creative Commons CC0 1.0 Universal Dedication:
          </p>
          <ul>
            <li><strong>Immutability of the Open Catalog:</strong> When you submit an icon, it is placed into the Public Domain and replicated to our public GitHub repository. Because open-source software packages and thousands of developers worldwide link to these assets directly in production, <strong>submitted vector icons cannot be deleted or retracted</strong> if you subsequently delete, abandon, or lose access to your account or session.</li>
            <li><strong>Personal Data Deletion:</strong> If you clear your browser data or request removal of personal account identifiers, all locally stored tokens, preferences, and personal references are permanently wiped. However, published public-domain SVG vectors remain in the public catalog and GitHub repository.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>3. Third-Party Edge & Infrastructure Partners</h2>
          <p>
            To deliver sub-10ms cached vector assets globally with 99.9% uptime, we employ reputable open-source cloud infrastructure:
          </p>
          <ul>
            <li><strong>Global Edge CDN:</strong> High-performance edge cache nodes delivering raw SVGs without tracking cookies.</li>
            <li><strong>GitHub:</strong> Public version control repository hosting the open catalog, source code, and issues archive at <a href="https://github.com/Orildo-Tech/SVG-SPACE" target="_blank" rel="noopener noreferrer" style={{ color: '#FF5F02', textDecoration: 'underline' }}>github.com/Orildo-Tech/SVG-SPACE</a>.</li>
            <li><strong>Serverless Validation Workers:</strong> Automated pipelines validating SVG sanitization and generating responsive raster formats.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>4. Inquiries & Legal Contact</h2>
          <p>
            For privacy inquiries, technical audits, or repository governance questions, contact us via GitHub Discussions or email our legal team at <strong>legal@orildo.tech</strong> or <strong>legal@orildo.dev</strong>.
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
          <a
            href="https://github.com/Orildo-Tech/SVG-SPACE"
            target="_blank"
            rel="noopener noreferrer"
            className="md-btn md-btn-secondary"
            style={{ marginLeft: 'auto' }}>
            <ExternalLink size={14} />
            <span>View GitHub Repository</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;