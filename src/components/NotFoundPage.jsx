import React, { useState } from 'react';
import { Compass, ArrowLeft, Search, Sparkles, Home, Layers, Terminal } from 'lucide-react';

export function NotFoundPage({ onNavigate, onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      onNavigate?.('icons');
    }
  };

  const handleQuickTerm = (term) => {
    onSearch?.(term);
    onNavigate?.('icons');
  };

  return (
    <div className="md-error-page-wrapper">
      <div className="md-error-card">
        <div className="md-error-glow" aria-hidden="true" />

        <div className="md-hero-pill-badge badge-subtle-primary" style={{ marginBottom: 12 }}>
          <Compass size={13} />
          <span>Error 404</span>
        </div>

        <div className="md-error-code-graphic">
          <span className="md-error-num">4</span>
          <div className="md-error-compass-box">
            <Compass size={48} className="md-error-spinner-icon" />
          </div>
          <span className="md-error-num">4</span>
        </div>

        <h1 className="md-error-title">Page or Asset Not Found</h1>
        <p className="md-error-desc">
          We couldn't find the page or icon collection you were looking for. It might have been moved, renamed, or never existed.
        </p>

        {}
        <form onSubmit={handleSearchSubmit} className="md-error-search-form">
          <Search size={15} className="md-error-search-icon" />
          <input
            type="text"
            placeholder="Search for an icon or brand (e.g. 'React', 'GitHub')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="md-error-search-input" />
          
          <button type="submit" className="md-error-search-btn">
            Search
          </button>
        </form>

        {}
        <div className="md-error-quick-tags">
          <span className="md-error-quick-lbl">Popular searches:</span>
          {['React', 'GitHub', 'Next.js', 'Docker', 'Tailwind', 'Python', 'Supabase'].map((tag) =>
          <button
            key={tag}
            type="button"
            className="md-error-quick-pill"
            onClick={() => handleQuickTerm(tag)}>
            
              {tag}
            </button>
          )}
        </div>

        {}
        <div className="md-error-actions-row">
          <button
            type="button"
            className="md-btn md-btn-primary"
            onClick={() => onNavigate?.('icons')}>
            
            <Home size={14} />
            <span>Return to Catalog</span>
          </button>
          <button
            type="button"
            className="md-btn md-btn-secondary"
            onClick={() => onNavigate?.('categories')}>
            
            <Layers size={14} />
            <span>Browse Categories</span>
          </button>
        </div>
      </div>
    </div>);

}

export default NotFoundPage;