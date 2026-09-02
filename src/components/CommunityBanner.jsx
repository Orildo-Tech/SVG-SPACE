import React from 'react';
import { Sparkles, Star, Plus, Layers, Package, FolderHeart } from 'lucide-react';

export function CommunityBanner({
  totalIcons = 6514,
  totalVariants = 12374,
  totalCollections = 6,
  onSubmitIconClick
}) {
  return (
    <section className="md-community-banner glass-panel">
      <div className="md-community-content">
        <h2 className="md-community-title">
          Open source. Community driven.
        </h2>
        <p className="md-community-subtitle">
          Free brand SVGs for developers, designers, and teams. Use them in any project, no attribution required.
        </p>

        <div className="md-community-btn-row">
          <button
            className="md-community-btn-white"
            onClick={() => onSubmitIconClick?.()}>
            
            Submit an Icon
          </button>
          <a
            href="https://github.com/Orildo-Tech/SVG-IO"
            target="_blank"
            rel="noopener noreferrer"
            className="md-community-btn-dark">
            <Star size={14} />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>

      {}
      <div className="md-community-stats-grid">
        <div className="md-community-stat-card">
          <div className="md-stat-icon-box">
            <Layers size={16} />
          </div>
          <div className="md-stat-info">
            <span className="md-stat-number">{totalIcons.toLocaleString()}</span>
            <span className="md-stat-label">Brand Icons</span>
          </div>
        </div>

        <div className="md-community-stat-card">
          <div className="md-stat-icon-box">
            <Package size={16} />
          </div>
          <div className="md-stat-info">
            <span className="md-stat-number">{totalVariants.toLocaleString()}</span>
            <span className="md-stat-label">SVG Variants</span>
          </div>
        </div>

        <div className="md-community-stat-card">
          <div className="md-stat-icon-box">
            <FolderHeart size={16} />
          </div>
          <div className="md-stat-info">
            <span className="md-stat-number">{totalCollections}</span>
            <span className="md-stat-label">Collections</span>
          </div>
        </div>
      </div>
    </section>);

}

export default CommunityBanner;