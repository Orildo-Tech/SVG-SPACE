import React, { useState } from 'react';
import {
  LayoutGrid,
  FolderTree,
  Heart,
  Puzzle,
  Eye,
  FileText,
  Plus,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Flame,
  Search,
  Grid,
  Code2,
  Terminal,
  Cpu,
  Server,
  Database,
  Palette,
  TrendingUp,
  Shield,
  ShoppingBag,
  Coins,
  Gamepad2,
  Smartphone,
  Megaphone,
  DollarSign,
  Film,
  GraduationCap,
  Share2,
  Layers
} from 'lucide-react';

const getCategoryIcon = (name = '') => {
  const n = name.toLowerCase();
  if (n.includes('liquid') || n.includes('glass')) return Sparkles;
  if (n === 'ai' || n.includes('machine') || n.includes('neural')) return Sparkles;
  if (n.includes('cloud') || n.includes('hosting') || n.includes('server')) return Server;
  if (n.includes('devops') || n.includes('infra') || n.includes('cpu')) return Cpu;
  if (n.includes('developer') || n.includes('terminal') || n.includes('cli')) return Terminal;
  if (n.includes('framework') || n.includes('code') || n.includes('software')) return Code2;
  if (n.includes('database') || n.includes('data') || n.includes('storage')) return Database;
  if (n.includes('design') || n.includes('creative') || n.includes('art')) return Palette;
  if (n.includes('analytic') || n.includes('metric') || n.includes('chart')) return TrendingUp;
  if (n.includes('security') || n.includes('auth') || n.includes('shield')) return Shield;
  if (n.includes('commerce') || n.includes('shop') || n.includes('store')) return ShoppingBag;
  if (n.includes('crypto') || n.includes('blockchain') || n.includes('bitcoin')) return Coins;
  if (n.includes('game') || n.includes('gaming')) return Gamepad2;
  if (n.includes('mobile') || n.includes('app') || n.includes('ios') || n.includes('android')) return Smartphone;
  if (n.includes('market') || n.includes('ad') || n.includes('brand')) return Megaphone;
  if (n.includes('finance') || n.includes('money') || n.includes('bank') || n.includes('pay')) return DollarSign;
  if (n.includes('media') || n.includes('video') || n.includes('audio') || n.includes('music')) return Film;
  if (n.includes('education') || n.includes('school') || n.includes('learn')) return GraduationCap;
  if (n.includes('social') || n.includes('community') || n.includes('share')) return Share2;
  return Layers;
};

export function Sidebar({
  theme = 'dark',
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  currentView = 'icons',
  onNavigate,
  favoritesCount = 0,
  onOpenFavorites,
  onSubmitIconClick,
  onOpenViewer,
  totalIcons = 0
}) {
  const [isFeaturedOpen, setIsFeaturedOpen] = useState(true);
  const [categorySearch, setCategorySearch] = useState('');

  const filteredCategories = categories.filter((cat) =>
  cat.name.toLowerCase().includes(categorySearch.toLowerCase().trim())
  );

  return (
    <aside className="md-side-menu glass-panel">
      <div className="md-side-nav-group">
        <a
          href="/"
          className={`md-side-nav-item ${currentView === 'icons' && selectedCategory === 'all' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
              e.preventDefault();
              onNavigate?.('icons');
              onSelectCategory('all');
            }
          }}>
          
          <LayoutGrid size={16} className="md-side-nav-icon" />
          <span className="md-side-nav-label">All Icons</span>
        </a>

        <a
          href="/?view=categories"
          className={`md-side-nav-item ${currentView === 'categories' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
              e.preventDefault();
              onNavigate?.('categories');
            }
          }}>
          
          <FolderTree size={16} className="md-side-nav-icon" />
          <span className="md-side-nav-label">Categories</span>
        </a>

        <a
          href="/?view=favorites"
          className={`md-side-nav-item ${currentView === 'favorites' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
              e.preventDefault();
              onNavigate?.('favorites');
            }
          }}
          title={favoritesCount > 0 ? `${favoritesCount} Saved Icons` : 'Favorites'}>
          
          <div className="md-side-nav-left">
            <Heart size={16} className="md-side-nav-icon" />
            <span className="md-side-nav-label">Favorites</span>
          </div>
          {favoritesCount > 0 &&
          <span className="md-side-fav-dot" aria-label={`${favoritesCount} favorites`} />
          }
        </a>

        <button
          type="button"
          className="md-side-nav-item"
          onClick={() => onOpenViewer?.()}>
          
          <Eye size={16} className="md-side-nav-icon" />
          <span className="md-side-nav-label">Viewer</span>
        </button>

        <a
          href="/?view=blog"
          className={`md-side-nav-item ${currentView === 'blog' ? 'active' : ''}`}
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
              e.preventDefault();
              onNavigate?.('blog');
            }
          }}>
          
          <FileText size={16} className="md-side-nav-icon" />
          <span className="md-side-nav-label">Blog</span>
        </a>
      </div>

      <button
        type="button"
        className="md-side-submit-btn"
        onClick={() => onSubmitIconClick?.()}>
        
        <Plus size={15} />
        <span>Submit Icon</span>
      </button>

      <div className="md-side-section">
        <button
          type="button"
          className="md-side-section-header"
          onClick={() => setIsFeaturedOpen(!isFeaturedOpen)}>
          
          <span>FEATURED</span>
          <ChevronDown
            size={12}
            className={`md-side-collapse-chevron ${isFeaturedOpen ? 'open' : ''}`} />
          
        </button>

        {isFeaturedOpen &&
        <div className="md-side-featured-list">
            <a
            href="/category/Orildo"
            className={`md-side-featured-item ${selectedCategory === 'Orildo' ? 'active' : ''}`}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onSelectCategory('Orildo');
              }
            }}>
            
              <div className="md-side-featured-left">
                <img
                src={theme === 'light' ? '/assets/orildo-light.svg' : '/assets/orildo-dark.svg'}
                alt="Orildo"
                width="14"
                height="14"
                style={{ objectFit: 'contain' }} />
              
                <span>Orildo </span>
              </div>
            </a>
          </div>
        }
      </div>

      <div className="md-side-section md-side-categories-section">
        <div className="md-side-section-header no-toggle">
          <span>CATEGORIES</span>
          <a
            href="/?view=categories"
            className="md-side-view-all-link"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onNavigate?.('categories');
              }
            }}
            title="Open Full Categories Directory">
            
            <span>View All ({categories.length})</span>
            <ChevronRight size={11} />
          </a>
        </div>

        <div className="md-side-cat-search-box">
          <Search size={12} className="md-side-cat-search-icon" />
          <input
            type="text"
            placeholder="Filter categories..."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="md-side-cat-search-input"
            aria-label="Filter sidebar categories" />
          
          {categorySearch &&
          <button
            type="button"
            className="md-side-cat-search-clear"
            onClick={() => setCategorySearch('')}
            title="Clear filter">
            
              ×
            </button>
          }
        </div>

        <div className="md-side-category-scroll">
          <a
            href="/"
            className={`md-side-cat-item ${currentView === 'icons' && selectedCategory === 'all' ? 'active' : ''}`}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                onNavigate?.('icons');
                onSelectCategory('all');
              }
            }}>
            <div className="md-side-cat-left">
              <Grid size={14} className="md-side-cat-icon" />
              <span className="md-side-cat-name">All Icons</span>
            </div>
            <span className="md-side-cat-count">
              {totalIcons || categories.reduce((sum, c) => sum + (c.count || 0), 0)}
            </span>
          </a>

          {filteredCategories.map((cat) => {
            const isSelected = currentView === 'icons' && selectedCategory === cat.name;
            const CatIcon = getCategoryIcon(cat.name);
            return (
              <a
                key={cat.name}
                href={`/category/${encodeURIComponent(cat.name)}`}
                className={`md-side-cat-item ${isSelected ? 'active' : ''}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onNavigate?.('icons');
                    onSelectCategory(cat.name);
                  }
                }}
                title={`${cat.name} (${cat.count || 0} icons)`}>
                <div className="md-side-cat-left">
                  <CatIcon size={14} className="md-side-cat-icon" />
                  <span className="md-side-cat-name">{cat.name}</span>
                </div>
                <span className={`md-side-cat-count ${isSelected ? 'active' : ''}`}>
                  {cat.count || 0}
                </span>
              </a>
            );
          })}

          {filteredCategories.length === 0 && (
            <div className="md-side-empty-cat">
              <span>No categories matching "{categorySearch}"</span>
            </div>
          )}
        </div>
      </div>
    </aside>);

}

export default Sidebar;