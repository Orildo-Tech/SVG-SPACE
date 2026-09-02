import React from 'react';
import { Scale, FileText, CheckCircle2, ShieldAlert, Award, ArrowLeft, ExternalLink } from 'lucide-react';

export function TermsPage({ onNavigate }) {
  return (
    <div className="md-legal-page-wrapper">
      <div className="md-legal-header-card">
        <div className="md-hero-pill-badge badge-subtle-primary" style={{ marginBottom: 12 }}>
          <Scale size={13} />
          <span>Terms & Licensing</span>
        </div>
        <h1 className="md-legal-title">Terms of Service & Trademark Policy</h1>
        <p className="md-legal-subtitle">
          Open-source guidelines, Apache-2.0 / MIT licensing, and brand trademark usage policies.
        </p>
      </div>

      <div className="md-legal-content-card">
        <div className="md-privacy-highlights-grid">
          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <Award size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Free For Commercial Use</h3>
            <p className="md-privacy-hl-desc">
              All vector icons are freely available for your web apps, personal projects, commercial designs, and mobile apps.
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <FileText size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Open Source Code</h3>
            <p className="md-privacy-hl-desc">
              The website codebase, React components, and CLI tools are licensed under permissive open-source licenses (Apache-2.0 / MIT).
            </p>
          </div>

          <div className="md-privacy-highlight-item">
            <div className="md-privacy-icon-box">
              <ShieldAlert size={18} />
            </div>
            <h3 className="md-privacy-hl-title">Brand Trademarks</h3>
            <p className="md-privacy-hl-desc">
              Brand logos remain the property of their respective trademark holders and are curated for identification purposes.
            </p>
          </div>
        </div>

        <section className="md-legal-section">
          <h2>1. Permitted Use</h2>
          <p>
            You are permitted to download, copy, embed, and convert SVG assets from SVG.IO for:
          </p>
          <ul>
            <li>Software applications, dashboards, landing pages, and documentation.</li>
            <li>Mobile and desktop applications (React, React Native, Vue, Flutter, SwiftUI, HTML).</li>
            <li>Design systems, Figma component libraries, and mockups.</li>
            <li>Editorial identification of tools, technologies, and companies.</li>
          </ul>
        </section>

        <section className="md-legal-section">
          <h2>2. Trademark Notice & Disclaimer</h2>
          <p>
            The logos, brand names, and service marks made available through SVG.IO are the registered trademarks of their respective owners. SVG.IO does not claim ownership or endorsement of these third-party brands.
          </p>
          <p>
            When utilizing brand logos in your products, you are responsible for adhering to each respective brand owner's official trademark and branding guidelines (e.g. minimum padding, original colors, aspect ratios).
          </p>
        </section>

        <section className="md-legal-section">
          <h2>3. Disclaimer of Warranties</h2>
          <p>
            SVG.IO AND ALL VECTOR ASSETS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY.
          </p>
        </section>

        <section className="md-legal-section">
          <h2>4. Takedown Requests (DMCA / Trademark)</h2>
          <p>
            If you are a trademark or copyright holder and wish to update, modify, or remove an icon associated with your organization, please submit a request via GitHub issues or email us directly at <strong>legal@orildo.tech</strong>. We respond promptly within 24–48 hours.
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

export default TermsPage;