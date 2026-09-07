import React, { useState, memo } from 'react';
import { Copy, Code2, Download, Heart, Check } from 'lucide-react';
import { getSvgContent, convertSvgToReact, downloadSvgFile } from '../utils/exportUtils';

export const IconCard = memo(function IconCard({
  icon,
  priority = false,
  onSelect,
  isFavorite,
  onToggleFavorite,
  onShowToast
}) {
  const variantsList = Array.isArray(icon?.variants) ?
  icon.variants :
  Object.keys(icon?.variants || {});

  const categoryName = icon?.category || Array.isArray(icon?.categories) && icon.categories[0] || 'Software';

  const [selectedVariant, setSelectedVariant] = useState(() => {
    if (variantsList.includes('color')) return 'color';
    if (variantsList.includes('default')) return 'default';
    return variantsList[0] || 'default';
  });

  const [copiedType, setCopiedType] = useState(null);

  const iconUrl =
    icon?.variantPaths?.[selectedVariant] ||
    (icon?.variants && typeof icon.variants === 'object' && !Array.isArray(icon.variants) && icon.variants[selectedVariant]) ||
    `/icons/${icon.id || icon.slug}/${selectedVariant}.svg`;

  const brandColor = icon?.hex ? icon.hex.startsWith('#') ? icon.hex : `#${icon.hex}` : '#FF5F02';

  const handleQuickCopySvg = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const svgText = await getSvgContent(icon, selectedVariant);
    if (svgText) {
      navigator.clipboard.writeText(svgText);
      setCopiedType('svg');
      setTimeout(() => setCopiedType(null), 1500);
      onShowToast?.({
        type: 'success',
        title: 'Copied SVG to Clipboard',
        message: `${icon.name} (${selectedVariant}) XML copied.`
      });
    }
  };

  const handleQuickCopyReact = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const svgText = await getSvgContent(icon, selectedVariant);
    if (svgText) {
      const reactCode = convertSvgToReact(svgText, icon.name);
      navigator.clipboard.writeText(reactCode);
      setCopiedType('react');
      setTimeout(() => setCopiedType(null), 1500);
      onShowToast?.({
        type: 'success',
        title: 'Copied React JSX',
        message: `<${icon.name.replace(/[^a-zA-Z0-9]/g, '')}Icon /> copied.`
      });
    }
  };

  const handleQuickDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const svgText = await getSvgContent(icon, selectedVariant);
    if (svgText) {
      downloadSvgFile(svgText, `${icon.id}-${selectedVariant}.svg`);
      onShowToast?.({
        type: 'success',
        title: 'SVG Downloaded',
        message: `${icon.id}-${selectedVariant}.svg saved.`
      });
    }
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(icon);
  };

  const iconSlug = icon.slug || icon.id;

  return (
    <a
      href={`/icon/${iconSlug}`}
      className="md-card"
      onClick={(e) => {
        // If click originated on a button or action toolbar, do NOT navigate
        if (e.target.closest('button') || e.target.closest('.md-card-top-bar') || e.target.closest('.md-card-hover-toolbar')) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          onSelect(icon, selectedVariant);
        }
      }}
      aria-label={`View ${icon.name} SVG vector icon`}
      onKeyDown={(e) => {
        if (e.target.closest('button')) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(icon, selectedVariant);
        }
      }}>
      
      {/* Top Tag & Favorite */}
      <div
        className="md-card-top-bar"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        <span className="md-card-single-tag">{categoryName}</span>

        <button
          type="button"
          className={`md-card-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Remove from favorites' : 'Add to collection'}
          aria-label={`Add ${icon.name} to favorites`}>
          
          <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Icon Graphic Container */}
      <div className="md-card-icon-frame">
        <img
          src={iconUrl}
          alt={`${icon.name} SVG vector icon`}
          width="40"
          height="40"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className="md-card-icon-img"
          onError={() => {
            if (selectedVariant !== 'default' && variantsList.includes('default')) {
              setSelectedVariant('default');
            }
          }} />
        
      </div>

      {/* Title & Metadata */}
      <div className="md-card-meta">
        <div className="md-card-title" title={icon.name}>
          {icon.name}
        </div>
        <div className="md-card-subtitle">
          {categoryName}
        </div>
      </div>

      {/* Hover Actions */}
      <div
        className="md-card-hover-toolbar"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        <button
          type="button"
          className={`md-card-action-pill ${copiedType === 'svg' ? 'copied' : ''}`}
          onClick={handleQuickCopySvg}
          title="Copy SVG XML"
          aria-label={`Copy ${icon.name} SVG XML`}>
          
          {copiedType === 'svg' ? <Check size={13} /> : <Copy size={13} />}
          <span>{copiedType === 'svg' ? 'Copied' : 'SVG'}</span>
        </button>

        <button
          type="button"
          className={`md-card-action-pill ${copiedType === 'react' ? 'copied' : ''}`}
          onClick={handleQuickCopyReact}
          title="Copy React JSX"
          aria-label={`Copy ${icon.name} React JSX`}>
          
          {copiedType === 'react' ? <Check size={13} /> : <Code2 size={13} />}
          <span>{copiedType === 'react' ? 'Copied' : 'JSX'}</span>
        </button>

        <button
          type="button"
          className="md-card-action-icon"
          onClick={handleQuickDownload}
          title="Download .SVG"
          aria-label={`Download ${icon.name} SVG`}>
          
          <Download size={14} />
        </button>
      </div>
    </a>);

});

export default IconCard;