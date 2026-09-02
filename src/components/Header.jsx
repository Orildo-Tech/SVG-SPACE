import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Sun, Moon, History, TrendingUp, Trash2, ArrowUpRight, Sparkles, Plus, Info } from 'lucide-react';

import {
  getSearchHistory,
  saveSearchHistoryItem,
  removeSearchHistoryItem,
  clearSearchHistory
} from '../utils/historyUtils';
import Fuse from 'fuse.js';

const POPULAR_SUGGESTIONS = [
'React', 'GitHub', 'Next.js', 'Tailwind', 'Python', 'TypeScript',
'Docker', 'AWS', 'Google', 'Figma', 'JavaScript', 'Node.js',
'OpenAI', 'PostgreSQL', 'Supabase', 'VS Code', 'Apple', 'Linux'];


export function Header({
  theme,
  toggleTheme,
  favoritesCount,
  openFavorites,
  searchQuery,
  setSearchQuery,
  totalIcons = 6518,
  allIcons = [],
  searchInputRef,
  onNavigate,
  onSubmitIconClick,
  currentView = 'icons'
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() => getSearchHistory());
  const searchContainerRef = useRef(null);


  const handleFocus = () => {
    setSearchHistory(getSearchHistory());
    setIsFocused(true);
  };

  const handleSelectQuery = (query) => {
    setSearchQuery(query);
    const updated = saveSearchHistoryItem(query);
    setSearchHistory(updated);
    setIsFocused(false);
  };

  const handleRemoveHistoryItem = (e, item) => {
    e.stopPropagation();
    const updated = removeSearchHistoryItem(item);
    setSearchHistory(updated);
  };

  const handleClearHistory = (e) => {
    e.stopPropagation();
    clearSearchHistory();
    setSearchHistory([]);
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const headerFuse = useMemo(() => {
    if (!allIcons || allIcons.length === 0) return null;
    return new Fuse(allIcons, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'name', weight: 0.4 },
        { name: 'slug', weight: 0.3 },
        { name: 'id', weight: 0.3 },
        { name: 'aliases', weight: 0.2 }
      ],
      threshold: 0.35,
      distance: 100,
      minMatchCharLength: 1,
      ignoreLocation: true,
      shouldSort: true
    });
  }, [allIcons]);

  const liveSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      return POPULAR_SUGGESTIONS;
    }
    if (headerFuse) {
      const results = headerFuse.search(searchQuery.trim(), { limit: 12 });
      const suggestions = results.map((r) => r.item.title || r.item.name || r.item.slug);
      if (suggestions.length > 0) {
        return Array.from(new Set(suggestions));
      }
    }
    const q = searchQuery.toLowerCase().trim();
    return POPULAR_SUGGESTIONS.filter((s) => s.toLowerCase().includes(q));
  }, [searchQuery, headerFuse]);

  return (
    <div className="md-header-wrapper">
      <header className="md-header">
        <a
          href="/"
          className="md-logo"
          aria-label="SVG.IO Home"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
              e.preventDefault();
              onNavigate?.('icons');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img
            src={theme === 'light' ? '/assets/wordmark-light.svg' : '/assets/wordmark-dark.svg'}
            alt="SVG.IO Logo"
            height="28"
            style={{ display: 'block', height: '28px', width: 'auto', objectFit: 'contain' }} />
        </a>

        <div className={`md-search-bar ${isFocused ? 'focused' : ''}`} ref={searchContainerRef}>
          <Search size={17} className="md-search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            className="md-search-input"
            placeholder={
              currentView === 'categories'
                ? "Search all categories & tech domains (e.g. AI, Pakistani Brands, DevTools)..."
                : currentView === 'favorites'
                ? "Filter your saved favorite icons..."
                : currentView === 'blog'
                ? "Search blog articles & guides..."
                : `Search ${totalIcons ? totalIcons.toLocaleString() : '6,500+'}+ vector icons by name or brand (e.g., 'React', 'Vercel', 'Next')...`
            }
            value={searchQuery || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            aria-label="Search icons" />
          

          {searchQuery &&
          <button
            className="md-search-clear"
            onClick={() => {
              setSearchQuery('');
              searchInputRef?.current?.focus();
            }}
            title="Clear search"
            aria-label="Clear search">
            
              <X size={15} />
            </button>
          }

          <div className="md-search-shortcut">
            <span className="md-kbd">/</span>
          </div>

          {}
          {isFocused && !searchQuery &&
          <div className="md-search-popover" role="dialog" aria-label="Search suggestions">
              {}
              {searchHistory.length > 0 && !searchQuery &&
            <div className="md-popover-section">
                  <div className="md-popover-header">
                    <div className="md-popover-title">
                      <History size={13} className="text-orange" />
                      <span>Recent Searches</span>
                    </div>
                    <button
                  type="button"
                  className="md-popover-clear-btn"
                  onClick={handleClearHistory}>
                  
                      <Trash2 size={11} />
                      <span>Clear all</span>
                    </button>
                  </div>
                  <div className="md-history-chips">
                    {searchHistory.map((item) =>
                <div
                  key={item}
                  className="md-history-chip"
                  onClick={() => handleSelectQuery(item)}>
                  
                        <span className="md-history-text">{item}</span>
                        <button
                    type="button"
                    className="md-history-remove"
                    onClick={(e) => handleRemoveHistoryItem(e, item)}
                    title="Remove search"
                    aria-label={`Remove search ${item}`}>
                    
                          <X size={11} />
                        </button>
                      </div>
                )}
                  </div>
                </div>
            }

              {}
              {liveSuggestions.length > 0 &&
            <div className="md-popover-section">
                  <div className="md-popover-header">
                    <div className="md-popover-title">
                      {searchQuery ? <Sparkles size={13} className="text-orange" /> : <TrendingUp size={13} className="text-orange" />}
                      <span>{searchQuery ? 'Top Suggestions' : 'Trending Terms'}</span>
                    </div>
                  </div>
                  <div className="md-suggestion-pills">
                    {liveSuggestions.slice(0, 12).map((s) =>
                <button
                  key={s}
                  type="button"
                  className="md-suggestion-pill"
                  onClick={() => handleSelectQuery(s)}>
                  
                        <span>{s}</span>
                        <ArrowUpRight size={11} className="md-suggestion-arrow" />
                      </button>
                )}
                  </div>
                </div>
            }

              {}
              <div className="md-popover-footer">
                <div className="md-popover-hint">
                  <span className="md-kbd">Enter</span>
                  <span>to search</span>
                </div>
                <div className="md-popover-hint">
                  <span className="md-kbd">ESC</span>
                  <span>to dismiss</span>
                </div>
              </div>
            </div>
          }
        </div>

        {}
        <div className="md-header-actions">
          {onSubmitIconClick &&
          <button
            type="button"
            className="md-header-submit-btn"
            onClick={onSubmitIconClick}
            title="Publish & Host SVG Icons or Packs">
            
              <Plus size={13} />
              <span>Publish SVG</span>
            </button>
          }

          {}
          <a
            href="https://github.com/Orildo-Tech/SVG-IO"
            target="_blank"
            rel="noopener noreferrer"
            className="md-icon-btn github-btn"
            title="GitHub Repository"
            aria-label="GitHub Repository">
            
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              style={{ display: 'block' }}>
              
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              
            </svg>
          </a>

          <button
            type="button"
            className="md-icon-btn"
            onClick={() => onNavigate?.('info')}
            title="About Platform & Specifications"
            aria-label="About Platform">
            <Info size={16} />
          </button>

          <button
            type="button"
            className="md-icon-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
            aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;