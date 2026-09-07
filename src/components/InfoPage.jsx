import React from 'react';
import {
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  Code2,
  Package,
  Heart,
  ExternalLink,
  Github,
  CheckCircle2,
  FileCode,
  UploadCloud,
  Share2,
  Download
} from 'lucide-react';

export function InfoPage({
  onNavigate,
  totalIcons = 6500
}) {
  return (
    <div className="sv-info-page-wrapper">
      {/* Hero Header */}
      <div className="sv-info-hero glass-panel">
        <h1 className="sv-info-hero-title">
          About <span className="text-orange">SVG SPACE</span>
        </h1>

        <p className="sv-info-hero-desc">
          SVG SPACE is the modern, 100% free and open-source <strong>SVG hosting, publishing, and distribution platform</strong>. Upload individual vector icons or entire icon packs, and our processing engine validates, optimizes, packages, and hosts them with dedicated shareable web pages and instant CDN delivery.
        </p>

        {/* Stats Row */}
        <div className="sv-info-stats-grid">
          <div className="sv-info-stat-card glass-panel">
            <span className="sv-info-stat-num">{totalIcons.toLocaleString()}+</span>
            <span className="sv-info-stat-label">Hosted Vector Icons</span>
          </div>

          <div className="sv-info-stat-card glass-panel">
            <span className="sv-info-stat-num">100%</span>
            <span className="sv-info-stat-label">Free &amp; Open Source</span>
          </div>

          <div className="sv-info-stat-card glass-panel">
            <span className="sv-info-stat-num">7 Min</span>
            <span className="sv-info-stat-label">Ingestion Pipeline</span>
          </div>

          <div className="sv-info-stat-card glass-panel">
            <span className="sv-info-stat-num">&lt; 10ms</span>
            <span className="sv-info-stat-label">Cached Load Speed</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="sv-info-sections-grid">
        {/* Section 1: Hosting & Publishing */}
        <section className="sv-info-card glass-panel">
          <div className="sv-info-card-header">
            <div className="sv-info-icon-box">
              <UploadCloud size={18} />
            </div>
            <div>
              <h2 className="sv-info-section-title">Upload, Host &amp; Distribute</h2>
              <span className="sv-info-section-sub">Zero-friction vector publishing for designers &amp; developers</span>
            </div>
          </div>

          <p className="sv-info-text">
            Anyone can upload individual SVG brand assets or complete icon sets. SVG SPACE acts as your free vector cloud host, packaging every icon into an organized distribution network.
          </p>

          <p className="sv-info-text">
            Each uploaded asset receives its own <strong>live, permanent interactive page</strong> with interactive color customization, custom sizing, and instant format conversions.
          </p>

          <div className="sv-info-highlights">
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Upload single vector icons or complete multi-variant icon sets</span>
            </div>
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Dedicated shareable URL for every hosted icon with live preview</span>
            </div>
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>High-speed global edge CDN distribution with zero bandwidth fees</span>
            </div>
          </div>
        </section>

        {/* Section 2: Ingestion Pipeline */}
        <section className="sv-info-card glass-panel">
          <div className="sv-info-card-header">
            <div className="sv-info-icon-box">
              <Zap size={18} />
            </div>
            <div>
              <h2 className="sv-info-section-title">7-Minute Ingestion Pipeline</h2>
              <span className="sv-info-section-sub">Subpixel precision &amp; path sanitization</span>
            </div>
          </div>

          <p className="sv-info-text">
            Our ingestion pipeline processes submissions in real time. Vector markup is validated, sanitized of unnecessary editor metadata, and calibrated for crisp subpixel rendering.
          </p>

          <p className="sv-info-text">
            Brand colors are parsed into responsive hex palettes, and production-ready components are generated for seamless integration into modern applications.
          </p>

          <div className="sv-info-highlights">
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Standardized viewBox scaling &amp; high-DPI display calibration</span>
            </div>
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Brand palette detection and hex swatch generation</span>
            </div>
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Strict sanitization removing inline scripts &amp; unnecessary tags</span>
            </div>
          </div>
        </section>

        {/* Section 3: Universal Integration */}
        <section className="sv-info-card glass-panel">
          <div className="sv-info-card-header">
            <div className="sv-info-icon-box">
              <Code2 size={18} />
            </div>
            <div>
              <h2 className="sv-info-section-title">Universal Framework Integration</h2>
              <span className="sv-info-section-sub">Ready-to-use snippets for modern frontend stacks</span>
            </div>
          </div>

          <p className="sv-info-text">
            Every hosted vector on SVG SPACE includes 1-click copyable integration code tailored for <strong>React, React Native, Next.js, Vue, Svelte, HTML, and Data URIs</strong>.
          </p>

          <p className="sv-info-text">
            Designers can also export assets in multiple formats including raw <strong>SVG, PNG (16px to 2048px), WebP, AVIF, ICO</strong>, or complete all-in-one ZIP packages.
          </p>

          <div className="sv-info-highlights">
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Instant React, React Native, Next.js, Vue, and Svelte component code</span>
            </div>
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Export as SVG, PNG, JPG, WebP, AVIF, or multi-resolution ICO favicons</span>
            </div>
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Direct raw SVG markup copying &amp; encoded Data URI strings</span>
            </div>
          </div>
        </section>

        {/* Section 4: Public Domain & Permanent Repository Resilience */}
        <section className="sv-info-card glass-panel">
          <div className="sv-info-card-header">
            <div className="sv-info-icon-box">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 className="sv-info-section-title">Public Domain (CC0 1.0) &amp; GitHub Failover</h2>
              <span className="sv-info-section-sub">Immutable archive, zero link rot &amp; 100% open source</span>
            </div>
          </div>

          <p className="sv-info-text">
            All hosted vectors and community additions are dedicated to the <strong>Public Domain under Creative Commons CC0 1.0 Universal</strong>. Anyone can freely use, modify, embed, and commercialize these assets without copyright restrictions or licensing fees.
          </p>

          <p className="sv-info-text">
            <strong>Permanent GitHub Failover Resilience:</strong> Every icon, raw SVG, and metadata record is continuously mirrored to our public GitHub repository (<a href="https://github.com/Orildo-Tech/SVG-SPACE" target="_blank" rel="noopener noreferrer" style={{ color: '#FF5F02', textDecoration: 'underline' }}>github.com/Orildo-Tech/SVG-SPACE</a>). If the website or CDN ever goes down, the entire library remains permanently available and versioned. Once cataloged, submissions are permanent and irrevocable to prevent link rot across the web.
          </p>

          <div className="sv-info-highlights">
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Dedicated to the Public Domain (CC0 1.0) for commercial and private software</span>
            </div>
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Permanent GitHub failover mirror ensuring assets remain accessible forever</span>
            </div>
            <div className="sv-info-highlight-item">
              <CheckCircle2 size={15} className="text-emerald" />
              <span>Immutable catalog with zero link rot (submissions cannot be deleted on account closure)</span>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom CTA Card */}
      <div className="sv-info-cta-card glass-panel">
        <div className="sv-info-cta-content">
          <h3 className="sv-info-cta-title">Publish Your Vectors or Explore {totalIcons.toLocaleString()}+ Icons</h3>
          <p className="sv-info-cta-desc">
            Host your own icon sets, customize colors, copy React/Vue snippets, or download multi-format vector assets.
          </p>
        </div>

        <div className="sv-info-cta-actions">
          <button
            type="button"
            className="sv-info-btn-primary"
            onClick={() => onNavigate?.('submit')}>
            <UploadCloud size={15} />
            <span>Publish &amp; Host SVGs</span>
          </button>

          <button
            type="button"
            className="sv-info-btn-outline"
            onClick={() => onNavigate?.('icons')}>
            <Package size={15} />
            <span>Explore Hosted Library</span>
          </button>

          <a
            href="https://github.com/Orildo-Tech/SVG-SPACE"
            target="_blank"
            rel="noopener noreferrer"
            className="sv-info-btn-ghost">
            <Github size={15} />
            <span>Star on GitHub</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
