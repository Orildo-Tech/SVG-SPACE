import React, { useState } from 'react';
import { X, Trash2, Download, Heart, Archive } from 'lucide-react';
import { downloadFavoritesFullZip } from '../utils/exportUtils';

export function FavoritesDrawer({
  isOpen,
  onClose,
  favorites = [],
  onRemoveFavorite,
  onClearFavorites,
  onSelectIcon,
  onShowToast
}) {
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

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
        title: 'Download Failed',
        message: 'Could not create archive.'
      });
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <>
      <div className="md-sheet-overlay" onClick={onClose} />
      <div className="md-sheet" role="dialog" aria-modal="true">
        <div className="md-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Heart size={18} fill="var(--md-sys-color-primary)" color="var(--md-sys-color-primary)" />
            <h3 style={{ fontSize: 16, fontWeight: 600 }}>Your Collection ({favorites.length})</h3>
          </div>
          <button className="md-icon-btn" onClick={onClose} aria-label="Close sheet">
            <X size={18} />
          </button>
        </div>

        <div className="md-sheet-body">
          {favorites.length === 0 ?
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--md-sys-color-on-surface-variant)' }}>
              <Heart size={36} style={{ opacity: 0.3, marginBottom: 12 }} />
              <h4 style={{ fontSize: 15, marginBottom: 4 }}>Collection is empty</h4>
              <p style={{ fontSize: 13 }}>Click the heart icon on any SVG card to build your bundle.</p>
            </div> :

          favorites.map((icon) => {
            const vList = getVariants(icon);
            const variant = vList.includes('color') ? 'color' : vList[0] || 'default';
            return (
              <div
                key={icon.id}
                className="md-sheet-item"
                onClick={() => {
                  onSelectIcon(icon, variant);
                  onClose();
                }}>
                
                  <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`/icons/${icon.id}/${variant}.svg`} alt={icon.name} loading="lazy" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {icon.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--md-sys-color-on-surface-variant)' }}>
                      {icon.category}
                    </div>
                  </div>
                  <button
                  className="md-icon-btn"
                  style={{ width: 30, height: 30 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(icon.id);
                  }}
                  title="Remove">
                  
                    <Trash2 size={14} />
                  </button>
                </div>);

          })
          }
        </div>

        {favorites.length > 0 &&
        <div className="md-sheet-footer">
            <button
            className="md-btn md-btn-filled"
            onClick={handleDownloadAllZip}
            disabled={isZipping}>
            
              <Archive size={16} />
              <span>{isZipping ? 'Bundling All Assets...' : `Download ${favorites.length} Icons (All Assets .ZIP)`}</span>
            </button>
            <button className="md-btn md-btn-text" onClick={onClearFavorites}>
              <Trash2 size={14} />
              <span>Clear Collection</span>
            </button>
          </div>
        }
      </div>
    </>);

}

export default FavoritesDrawer;