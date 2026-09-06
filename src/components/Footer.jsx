import React from 'react';
import { Sparkles, Flame, Star, ExternalLink, ArrowUp, Github, Code2, HeartHandshake, ArrowUpRight } from 'lucide-react';

export function Footer({
  theme = 'dark',
  totalIcons = 6514,
  onSelectCategory,
  onSubmitIconClick,
  onNavigate
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoSrc = theme === 'light' ? '/assets/logo-light.svg' : '/assets/logo-dark.svg';
  const wordmarkSrc = theme === 'light' ? '/assets/wordmark-light.svg' : '/assets/wordmark-dark.svg';
  const orildoIconSrc = theme === 'light' ? '/assets/orildo-light.svg' : '/assets/orildo-dark.svg';

  return (
    <footer className="md-main-footer-card glass-panel" role="contentinfo">
      {}
      <div className="md-footer-top-grid">
        {}
        <div className="md-footer-brand-col">
          <a
            href="https://svgspace.sbs"
            className="md-footer-logo-row"
            title="Visit SVGSpace">
            
            <img
              src={wordmarkSrc}
              alt="SvgIo Logo"
              height="26"
              style={{ display: 'block', height: '26px', width: 'auto', objectFit: 'contain' }} />
            
          </a>

          <p className="md-footer-brand-desc">
            The Free, Open-Source SVG Hosting & Publishing Platform. Upload icons or packs, get dedicated preview pages, instant CDN delivery, and ready-to-use framework code.
          </p>

          <span className="md-footer-project-tag">
            Powered by <a href="https://orildo.tech" target="_blank" rel="noopener noreferrer" style={{ color: '#FF5F02', fontWeight: 700 }}>Orildo</a>
          </span>

          <div className="md-footer-eco-badges">
            <a href="https://github.com/Orildo-Tech/SVG-SPACE" target="_blank" rel="noopener noreferrer" className="md-eco-badge" title="GitHub">
              <Github size={14} />
            </a>
            <a href="https://orildo.tech" target="_blank" rel="noopener noreferrer" className="md-eco-badge" title="Orildo Official">
              <img src={orildoIconSrc} alt="Orildo" width="14" height="14" style={{ objectFit: 'contain' }} />
            </a>
          </div>

          <a
            href="https://github.com/Orildo-Tech"
            target="_blank"
            rel="noopener noreferrer"
            className="md-footer-gh-org-card"
            title="Visit Orildo-Tech on GitHub">
            <div className="md-gh-card-icon-wrap">
              <Github size={15} />
            </div>
            <div className="md-gh-card-info">
              <span className="md-gh-card-label">OPEN SOURCE ON</span>
              <span className="md-gh-card-title">GitHub Organization</span>
            </div>
            <ArrowUpRight size={13} className="md-gh-card-arrow" />
          </a>
        </div>

        <div className="md-footer-nav-col">
          <h4 className="md-footer-col-title">PRODUCT</h4>
          <ul className="md-footer-links">
            <li><button onClick={() => onNavigate?.('icons')}>Browse Icons</button></li>
            <li><button onClick={() => onNavigate?.('categories')}>Categories</button></li>
            <li><button onClick={() => onSubmitIconClick ? onSubmitIconClick() : onNavigate?.('submit')}>Publish & Host SVGs</button></li>
            <li><button onClick={() => onNavigate?.('blog')}>Blog & Guides</button></li>
          </ul>
        </div>

        <div className="md-footer-nav-col">
          <h4 className="md-footer-col-title">RESOURCES</h4>
          <ul className="md-footer-links">
            <li><button onClick={() => onNavigate?.('info')}>About Platform</button></li>
            <li><button onClick={() => onNavigate?.('status')}>System Status</button></li>
            <li><button onClick={() => onNavigate?.('404')}>404 Preview</button></li>
            <li><a href="https://github.com/Orildo-Tech/SVG-SPACE/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contribution Specs</a></li>
            <li><button onClick={() => onNavigate?.('terms')}>Vector Licensing</button></li>
          </ul>
        </div>

        <div className="md-footer-nav-col">
          <h4 className="md-footer-col-title">COMMUNITY</h4>
          <ul className="md-footer-links">
            <li><a href="https://github.com/Orildo-Tech/SVG-SPACE" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://github.com/Orildo-Tech/SVG-SPACE/issues" target="_blank" rel="noopener noreferrer">Issues</a></li>
            <li><a href="https://github.com/Orildo-Tech/SVG-SPACE/discussions" target="_blank" rel="noopener noreferrer">Discussions</a></li>
            <li><a href="https://github.com/Orildo-Tech/SVG-SPACE/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing</a></li>
          </ul>
        </div>

        {}
        <div className="md-footer-nav-col">
          <h4 className="md-footer-col-title">LEGAL</h4>
          <ul className="md-footer-links">
            <li><button onClick={() => onNavigate?.('privacy')}>Privacy Policy</button></li>
            <li><button onClick={() => onNavigate?.('terms')}>Terms of Service</button></li>
            <li><button onClick={() => onNavigate?.('trademark')}>Trademark Policy</button></li>
            <li><button onClick={() => onNavigate?.('status')}>Uptime & Health</button></li>
          </ul>
        </div>
      </div>

      {}
      <div className="md-footer-divider-line" />

      {}
      <div className="md-footer-split-credits">
        {}
        <div className="md-credits-section">
          <span className="md-credits-label">POWERED BY</span>
          <a
            href="https://orildo.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="md-credits-chip"
            title="Visit Orildo">
            
            <div className="md-credits-icon-wrap">
              <img src={orildoIconSrc} alt="Orildo" width="22" height="22" style={{ objectFit: 'contain' }} />
            </div>
            <div className="md-credits-info">
              <span className="md-credits-title">Orildo</span>
              <span className="md-credits-sub">orildo.tech</span>
            </div>
          </a>
        </div>

        {}
        <div className="md-credits-center-divider" />

        {}
        <div className="md-credits-section">
          <span className="md-credits-label">DEVELOPED BY</span>
          <a
            href="https://sameer.orildo.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="md-credits-chip"
            title="Visit Syed Sameer Ul Hassan's Portfolio">
            
            <div className="md-credits-icon-wrap">
              <img src={orildoIconSrc} alt="Syed Sameer Ul Hassan" width="22" height="22" style={{ objectFit: 'contain' }} />
            </div>
            <div className="md-credits-info">
              <span className="md-credits-title">Syed Sameer Ul Hassan</span>
              <span className="md-credits-sub">sameer.orildo.dev</span>
            </div>
          </a>
        </div>
      </div>

      {}
      <div className="md-footer-bottom-row">
        <span className="md-footer-copy-text">
          © {new Date().getFullYear()} <a href="https://orildo.tech" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 600 }}>Orildo</a>. All rights reserved. Developed by <a href="https://sameer.orildo.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#FF5F02', fontWeight: 600 }}>Syed Sameer Ul Hassan</a>.
        </span>

        <div className="md-footer-disclaimer">
          <span>All brand logos and trademarks belong to their respective owners.</span> 
          <span>|</span>
          <a href="#trademark" className="md-footer-sub-link">Trademark Policy</a>
         
        </div>
      </div>
    </footer>);

}

export default Footer;