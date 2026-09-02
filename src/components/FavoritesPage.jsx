import React, { useState, useMemo } from 'react';
import {
  Heart,
  Download,
  Trash2,
  Copy,
  Check,
  ArrowRight,
  Search,
  LayoutGrid,
  Grid3X3,
  List,
  Archive,
  Code2,
  X } from
'lucide-react';
import IconCard from './IconCard';
import { downloadFavoritesFullZip, getSvgContent, convertSvgToReact } from '../utils/exportUtils';

export function FavoritesPage({
  favorites = [],
  onSelectIcon,
  favoritesSet,
  onToggleFavorite,
  onClearFavorites,
  onExploreAll,
  onShowToast,
  searchQuery = '',
  setSearchQuery
}) {
  const [layoutMode, setLayoutMode] = useState('comfortable');
  const [isZipping, setIsZipping] = useState(false);
  const [isCopyingAllJsx, setIsCopyingAllJsx] = useState(false);

  const getVariants = (fav) => Array.isArray(fav?.variants) ? fav.variants : Object.keys(fav?.variants || {});


  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favorites;
    const q = searchQuery.toLowerCase().trim();
    return favorites.filter(
      (icon) =>
      icon.name?.toLowerCase().includes(q) ||
      icon.id?.toLowerCase().includes(q) ||
      icon.slug?.toLowerCase().includes(q) ||
      icon.category?.toLowerCase().includes(q) ||
      (Array.isArray(icon.categories) && icon.categories.some((c) => c.toLowerCase().includes(q)))
    );
  }, [favorites, searchQuery]);


  const handleDownloadAllZip = async () => {
    if (favorites.length === 0) return;
    setIsZipping(true);
    try {
      await downloadFavoritesFullZip(favorites, `svgio-favorites-${favorites.length}-icons-all-assets.zip`);
      onShowToast?.({
        type: 'success',
        title: 'All Asset Variants Exported',
        message: `Exported all variants (Mono, Default, Dark, Light, Wordmark) for ${favorites.length} saved icons.`
      });
    } catch (err) {
      console.error(err);
      onShowToast?.({
        type: 'error',
        title: 'Export Failed',
        message: 'Could not create ZIP bundle.'
      });
    } finally {
      setIsZipping(false);
    }
  };


  const handleCopyAllJsx = async () => {
    if (favorites.length === 0) return;
    setIsCopyingAllJsx(true);
    try {
      const parts = [];
      for (const fav of favorites) {
        const vList = getVariants(fav);
        const variant = vList.includes('color') ? 'color' : vList[0] || 'default';
        const rawSvg = await getSvgContent(fav.id, variant);
        if (rawSvg) {
          const jsx = convertSvgToReact(rawSvg, fav.name);
          parts.push(`// --- ${fav.name} (${variant}) ---\n${jsx}`);
        }
      }
      const fullBundle = parts.join('\n\n');
      await navigator.clipboard.writeText(fullBundle);
      onShowToast?.({
        type: 'success',
        title: 'JSX Components Copied',
        message: `${favorites.length} React components copied to clipboard.`
      });
    } catch (err) {
      console.error(err);
      onShowToast?.({
        type: 'error',
        title: 'Copy Failed',
        message: 'Could not generate JSX bundle.'
      });
    } finally {
      setTimeout(() => setIsCopyingAllJsx(false), 1500);
    }
  };

  return (
    <div className="md-favorites-page">
      {}
      <div className="md-page-header-banner glass-panel">
        <div className="md-page-header-text">
          <h1 className="md-page-header-title">
            Your Personal <span className="text-orange">Vector Collection</span>
          </h1>

          <p className="md-page-header-desc">
            Manage, inspect, and bulk export all your saved brand logos and vector assets.
          </p>
        </div>

        {}
        {favorites.length > 0 &&
        <div className="md-fav-actions-row">
            <button
            className="md-fav-btn primary"
            onClick={handleDownloadAllZip}
            disabled={isZipping}>
            
              <Archive size={14} />
              <span>{isZipping ? 'Bundling All Assets...' : `Download ${favorites.length} Icons (All Assets .ZIP)`}</span>
            </button>

            <button
            className="md-fav-btn secondary"
            onClick={handleCopyAllJsx}
            disabled={isCopyingAllJsx}>
            
              {isCopyingAllJsx ? <Check size={14} color="#10B981" /> : <Code2 size={14} />}
              <span>{isCopyingAllJsx ? 'Copied Bundle!' : 'Copy All JSX'}</span>
            </button>

            <button
            className="md-fav-btn danger"
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove all ${favorites.length} saved icons?`)) {
                onClearFavorites?.();
              }
            }}>
            
              <Trash2 size={14} />
              <span>Clear All</span>
            </button>
          </div>
        }
      </div>

      {}
      {favorites.length === 0 ?
      <div className="md-fav-empty-card glass-panel">
          <div className="md-fav-empty-icon-wrap">
            <Heart size={44} className="md-fav-empty-heart" />
          </div>
          <h3 className="md-fav-empty-title">Your Collection is Empty</h3>
          <p className="md-fav-empty-desc">
            Browse through over 7,700+ verified brand vectors and developer icons. Click the heart icon on any vector card to save it here for quick 1-click batch exports.
          </p>
          <button
          className="md-fav-explore-btn"
          onClick={() => onExploreAll?.()}>
          
            <span>Explore All Icons</span>
            <ArrowRight size={14} />
          </button>
        </div> :

      <>
          <div className="md-toolbar">
            <div className="md-toolbar-stats">
              Showing <strong>{filteredFavorites.length}</strong> of {favorites.length} saved vectors
            </div>

            <div className="md-toolbar-actions">
              {searchQuery && (
                <div className="md-cat-active-search-chip" style={{ marginRight: 6 }}>
                  <Search size={12} className="text-orange" />
                  <span>Filtering: <strong>"{searchQuery}"</strong></span>
                  <button
                    type="button"
                    className="md-cat-active-clear"
                    onClick={() => setSearchQuery?.('')}
                    title="Clear filter"
                    aria-label="Clear filter"
                  >
                    <X size={11} />
                  </button>
                </div>
              )}

              <div className="md-segmented-btn-group">
                <button
                className={`md-segment-btn ${layoutMode === 'comfortable' ? 'active' : ''}`}
                onClick={() => setLayoutMode('comfortable')}
                title="Comfortable Grid"
                aria-label="Comfortable Grid">
                
                  <LayoutGrid size={15} />
                </button>
                <button
                className={`md-segment-btn ${layoutMode === 'compact' ? 'active' : ''}`}
                onClick={() => setLayoutMode('compact')}
                title="Compact Grid"
                aria-label="Compact Grid">
                
                  <Grid3X3 size={15} />
                </button>
                <button
                className={`md-segment-btn ${layoutMode === 'list' ? 'active' : ''}`}
                onClick={() => setLayoutMode('list')}
                title="List View"
                aria-label="List View">
                
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {filteredFavorites.length > 0 ? (
            <div className={`md-icons-grid layout-${layoutMode}`}>
              {filteredFavorites.map((icon) => (
                <IconCard
                  key={icon.id}
                  icon={icon}
                  onSelect={(ic, variant) => onSelectIcon?.(ic, variant)}
                  isFavorite={favoritesSet?.has(icon.id)}
                  onToggleFavorite={onToggleFavorite}
                  onShowToast={onShowToast}
                />
              ))}
            </div>
          ) : (
            <div className="md-cat-no-results glass-panel" style={{ marginTop: 24 }}>
              <div className="md-cat-no-results-icon">
                <Search size={32} />
              </div>
              <h3 className="md-cat-no-results-title">No matching saved icons</h3>
              <p className="md-cat-no-results-desc">
                No saved icons match "{searchQuery}". Try searching for another keyword or clear the search filter.
              </p>
              <button
                type="button"
                className="md-btn md-btn-primary"
                onClick={() => setSearchQuery?.('')}
              >
                Clear Filter
              </button>
            </div>
          )}
        </>
      }
    </div>);

}

export default FavoritesPage;