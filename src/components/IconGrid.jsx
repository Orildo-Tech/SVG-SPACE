import React, { useState, useMemo, useEffect } from 'react';
import { LayoutGrid, Grid3X3, List, RotateCcw, ChevronDown } from 'lucide-react';
import IconCard from './IconCard';
import CustomSelect from './CustomSelect';

const BUNCH_SIZE = 48;

export function IconGrid({
  icons = [],
  searchQuery = '',
  onSelectIcon,
  favoritesSet = new Set(),
  onToggleFavorite,
  onShowToast,
  selectedCategory,
  onResetFilters
}) {
  const isSearching = Boolean(searchQuery && searchQuery.trim());
  const [layoutMode, setLayoutMode] = useState('comfortable');
  const [variantFilter, setVariantFilter] = useState('all');
  const [sortBy, setSortBy] = useState(() => (isSearching ? 'relevance' : 'az'));
  const [visibleCount, setVisibleCount] = useState(BUNCH_SIZE);

  useEffect(() => {
    if (isSearching) {
      setSortBy('relevance');
    } else if (sortBy === 'relevance') {
      setSortBy('az');
    }
  }, [isSearching]);

  useEffect(() => {
    setVisibleCount(BUNCH_SIZE);
  }, [icons, variantFilter, sortBy, searchQuery]);

  const processedIcons = useMemo(() => {
    let list = [...icons];

    if (variantFilter !== 'all') {
      list = list.filter((i) => {
        const v = Array.isArray(i.variants) ? i.variants : Object.keys(i.variants || {});
        return v.includes(variantFilter);
      });
    }

    if (sortBy === 'az') {
      list.sort((a, b) => (a.title || a.name || a.slug || a.id).localeCompare(b.title || b.name || b.slug || b.id, undefined, { numeric: true, sensitivity: 'base' }));
    } else if (sortBy === 'za') {
      list.sort((a, b) => (b.title || b.name || b.slug || b.id).localeCompare(a.title || a.name || a.slug || a.id, undefined, { numeric: true, sensitivity: 'base' }));
    } else if (sortBy === 'variants') {
      list.sort((a, b) => {
        const lenB = Array.isArray(b.variants) ? b.variants.length : Object.keys(b.variants || {}).length;
        const lenA = Array.isArray(a.variants) ? a.variants.length : Object.keys(a.variants || {}).length;
        return lenB - lenA || (a.title || a.name || a.slug || a.id).localeCompare(b.title || b.name || b.slug || b.id);
      });
    }

    return list;
  }, [icons, variantFilter, sortBy]);

  const visibleIcons = processedIcons.slice(0, visibleCount);
  const hasMore = visibleCount < processedIcons.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BUNCH_SIZE, processedIcons.length));
  };

  const sortOptions = useMemo(() => {
    if (isSearching) {
      return [
        { value: 'relevance', label: 'Sort: Relevance' },
        { value: 'az', label: 'Sort: A to Z' },
        { value: 'za', label: 'Sort: Z to A' },
        { value: 'variants', label: 'Sort: Most Variants' }
      ];
    }
    return [
      { value: 'az', label: 'Sort: A to Z' },
      { value: 'za', label: 'Sort: Z to A' },
      { value: 'variants', label: 'Sort: Most Variants' }
    ];
  }, [isSearching]);

  return (
    <div>
      <div className="md-toolbar">
        <div className="md-toolbar-stats">
          Showing <strong>{Math.min(visibleCount, processedIcons.length).toLocaleString()}</strong> of{' '}
          <strong>{processedIcons.length.toLocaleString()}</strong> icons
        </div>

        <div className="md-toolbar-actions">
          <CustomSelect
            value={variantFilter}
            onChange={(val) => setVariantFilter(val)}
            options={[
              { value: 'all', label: 'All Variants' },
              { value: 'color', label: 'Color' },
              { value: 'mono', label: 'Monochrome' },
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' },
              { value: 'default', label: 'Default' }
            ]}
            title="Filter by variant"
            minWidth={130}
            placement="bottom" />

          <CustomSelect
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            options={sortOptions}
            title="Sort icons"
            minWidth={160}
            placement="bottom" />
          

          {}
          <div className="md-segmented-btn-group">
            <button
              className={`md-segment-btn ${layoutMode === 'comfortable' ? 'active' : ''}`}
              onClick={() => setLayoutMode('comfortable')}
              title="Comfortable Grid">
              
              <LayoutGrid size={15} />
            </button>
            <button
              className={`md-segment-btn ${layoutMode === 'compact' ? 'active' : ''}`}
              onClick={() => setLayoutMode('compact')}
              title="Compact Grid">
              
              <Grid3X3 size={15} />
            </button>
            <button
              className={`md-segment-btn ${layoutMode === 'list' ? 'active' : ''}`}
              onClick={() => setLayoutMode('list')}
              title="List View">
              
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {}
      {processedIcons.length === 0 ?
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h3 style={{ fontSize: 18, marginBottom: 8 }}>No matching icons</h3>
          <p style={{ color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 16 }}>
            Try searching for a different keyword or reset filters.
          </p>
          <button className="md-btn md-btn-filled" onClick={onResetFilters}>
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div> :

      <>
          {}
          <div className={`md-icons-grid layout-${layoutMode}`}>
            {visibleIcons.map((icon, index) =>
          <IconCard
            key={icon.id}
            icon={icon}
            priority={index < 24}
            onSelect={onSelectIcon}
            isFavorite={favoritesSet.has(icon.id)}
            onToggleFavorite={onToggleFavorite}
            onShowToast={onShowToast} />

          )}
          </div>

          {}
          {hasMore &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 40, marginBottom: 24 }}>
              <button
            className="md-load-more-btn"
            onClick={handleLoadMore}>
            
                <span>Load More (+{Math.min(BUNCH_SIZE, processedIcons.length - visibleCount)} Icons)</span>
                <ChevronDown size={16} />
                <span className="md-load-more-count">
                  {Math.min(visibleCount, processedIcons.length).toLocaleString()} / {processedIcons.length.toLocaleString()}
                </span>
              </button>
              <span style={{ fontSize: 12, color: 'var(--md-sys-color-on-surface-variant)', opacity: 0.8 }}>
                Showing {Math.min(visibleCount, processedIcons.length).toLocaleString()} of {processedIcons.length.toLocaleString()} icons
              </span>
            </div>
        }
        </>
      }
    </div>);

}

export default IconGrid;