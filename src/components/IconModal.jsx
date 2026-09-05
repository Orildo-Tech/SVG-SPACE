import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Download,
  Check,
  Heart,
  Image as ImageIcon,
  Archive } from
'lucide-react';
import {
  getSvgContent,
  convertSvgToReact,
  convertSvgToVue,
  convertSvgToSvelte,
  convertSvgToDataUri,
  downloadSvgFile,
  downloadPngFile,
  downloadBulkZip } from
'../utils/exportUtils';
import CustomSelect from './CustomSelect';

export function IconModal({
  icon,
  initialVariant = 'default',
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShowToast
}) {
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [svgContent, setSvgContent] = useState('');
  const [activeTab, setActiveTab] = useState('svg');
  const [copied, setCopied] = useState(false);
  const [previewBg, setPreviewBg] = useState('slate');
  const [iconSize, setIconSize] = useState(80);
  const [pngResolution, setPngResolution] = useState(512);

  const variantsList = useMemo(() => {
    return Array.isArray(icon?.variants) ? icon.variants : Object.keys(icon?.variants || {});
  }, [icon]);

  useEffect(() => {
    if (icon) {
      const v = variantsList.includes(initialVariant) ?
      initialVariant :
      variantsList.includes('color') ?
      'color' :
      variantsList[0] || 'default';
      setSelectedVariant(v);
    }
  }, [icon, initialVariant, variantsList]);

  useEffect(() => {
    if (!icon) return;
    let isMounted = true;

    async function loadSvg() {
      const text = await getSvgContent(icon.id, selectedVariant);
      if (isMounted && text) {
        setSvgContent(text);
      }
    }

    loadSvg();
    return () => {
      isMounted = false;
    };
  }, [icon, selectedVariant]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !icon) return null;

  const reactCode = convertSvgToReact(svgContent, icon.name);
  const vueCode = convertSvgToVue(svgContent);
  const svelteCode = convertSvgToSvelte(svgContent);
  const dataUri = convertSvgToDataUri(svgContent);
  const cdnUrl = `https://svgspace.sbs/icons/${icon.id}/${selectedVariant}.svg`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'react':
        return reactCode;
      case 'vue':
        return vueCode;
      case 'svelte':
        return svelteCode;
      case 'datauri':
        return dataUri.utf8;
      case 'cdn':
        return cdnUrl;
      case 'svg':
      default:
        return svgContent;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    onShowToast?.({
      type: 'success',
      title: 'Copied to Clipboard',
      message: `${activeTab.toUpperCase()} code copied.`
    });
  };

  const handleDownloadSvg = () => {
    if (svgContent) {
      downloadSvgFile(svgContent, `${icon.id}-${selectedVariant}.svg`);
      onShowToast?.({
        type: 'success',
        title: 'SVG Downloaded',
        message: `${icon.id}-${selectedVariant}.svg saved.`
      });
    }
  };

  const handleDownloadPng = () => {
    if (svgContent) {
      const bgMap = {
        dark: '#000000',
        slate: '#1E1F22',
        light: '#FFFFFF',
        checker: 'transparent'
      };
      downloadPngFile(
        svgContent,
        `${icon.id}-${selectedVariant}-${pngResolution}px.png`,
        pngResolution,
        bgMap[previewBg] || 'transparent'
      );
      onShowToast?.({
        type: 'success',
        title: 'PNG Exported',
        message: `${pngResolution}×${pngResolution} PNG downloaded.`
      });
    }
  };

  const handleDownloadAllZip = async () => {
    const list = icon.variants.map((v) => ({
      id: icon.id,
      name: icon.name,
      variant: v
    }));
    await downloadBulkZip(list, `${icon.id}-all-variants.zip`);
    onShowToast?.({
      type: 'success',
      title: 'ZIP Bundle Created',
      message: `All ${icon.variants.length} variants downloaded.`
    });
  };

  return (
    <div className="md-dialog-overlay" onClick={onClose}>
      <div className="md-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {}
        <div className="md-dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={`/icons/${icon.id}/${selectedVariant}.svg`} alt={icon.name} style={{ maxHeight: '100%', maxWidth: '100%' }} />
            </div>
            <div>
              <h2 className="md-dialog-title">{icon.name}</h2>
              <span className="md-badge">{icon.category}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              className={`md-icon-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(icon)}
              title={isFavorite ? 'Remove from favorites' : 'Add to collection'}>
              
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button className="md-icon-btn" onClick={onClose} aria-label="Close dialog">
              <X size={18} />
            </button>
          </div>
        </div>

        {}
        <div className="md-dialog-body">
          {}
          <div className="md-dialog-left">
            {}
            <div className={`md-preview-stage bg-${previewBg}`}>
              <img
                src={`/icons/${icon.id}/${selectedVariant}.svg`}
                alt={icon.name}
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }} />
              
            </div>

            {}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 8 }}>
                Canvas Background
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className={`md-chip ${previewBg === 'slate' ? 'active' : ''}`}
                  onClick={() => setPreviewBg('slate')}>
                  
                  Slate
                </button>
                <button
                  className={`md-chip ${previewBg === 'dark' ? 'active' : ''}`}
                  onClick={() => setPreviewBg('dark')}>
                  
                  Dark
                </button>
                <button
                  className={`md-chip ${previewBg === 'light' ? 'active' : ''}`}
                  onClick={() => setPreviewBg('light')}>
                  
                  Light
                </button>
                <button
                  className={`md-chip ${previewBg === 'checker' ? 'active' : ''}`}
                  onClick={() => setPreviewBg('checker')}>
                  
                  Grid
                </button>
              </div>
            </div>

            {}
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: 8 }}>
                Variant
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {variantsList.map((v) =>
                <button
                  key={v}
                  className={`md-chip ${selectedVariant === v ? 'active' : ''}`}
                  onClick={() => setSelectedVariant(v)}>
                  
                    {v}
                  </button>
                )}
              </div>
            </div>

            {}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                <span style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Preview Size</span>
                <span>{iconSize}px</span>
              </div>
              <input
                type="range"
                min="24"
                max="160"
                step="8"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
                className="md-slider" />
              
            </div>

            {}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
              <button className="md-btn md-btn-filled" onClick={handleDownloadSvg}>
                <Download size={15} />
                <span>Download SVG</span>
              </button>

              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <button className="md-btn md-btn-tonal" style={{ flex: 1 }} onClick={handleDownloadPng}>
                  <ImageIcon size={15} />
                  <span>PNG</span>
                </button>
                <CustomSelect
                  value={pngResolution}
                  onChange={(val) => setPngResolution(Number(val))}
                  options={[
                  { value: 256, label: '256px' },
                  { value: 512, label: '512px' },
                  { value: 1024, label: '1024px' },
                  { value: 2048, label: '2048px' }]
                  }
                  title="Select Resolution"
                  minWidth={95}
                  placement="top" />
                
              </div>

              {variantsList.length > 1 &&
              <button className="md-btn md-btn-outlined" onClick={handleDownloadAllZip}>
                  <Archive size={15} />
                  <span>Download All Variants (.ZIP)</span>
                </button>
              }
            </div>
          </div>

          {}
          <div className="md-dialog-right">
            <div className="md-code-tabs">
              <button
                className={`md-code-tab ${activeTab === 'svg' ? 'active' : ''}`}
                onClick={() => setActiveTab('svg')}>
                
                SVG XML
              </button>
              <button
                className={`md-code-tab ${activeTab === 'react' ? 'active' : ''}`}
                onClick={() => setActiveTab('react')}>
                
                React JSX
              </button>
              <button
                className={`md-code-tab ${activeTab === 'vue' ? 'active' : ''}`}
                onClick={() => setActiveTab('vue')}>
                
                Vue 3
              </button>
              <button
                className={`md-code-tab ${activeTab === 'svelte' ? 'active' : ''}`}
                onClick={() => setActiveTab('svelte')}>
                
                Svelte
              </button>
              <button
                className={`md-code-tab ${activeTab === 'datauri' ? 'active' : ''}`}
                onClick={() => setActiveTab('datauri')}>
                
                Data URI
              </button>
              <button
                className={`md-code-tab ${activeTab === 'cdn' ? 'active' : ''}`}
                onClick={() => setActiveTab('cdn')}>
                
                CDN
              </button>

              <button
                className="md-btn md-btn-filled"
                style={{ height: 32, padding: '0 14px', fontSize: 12, marginLeft: 'auto', marginRight: 12, alignSelf: 'center' }}
                onClick={handleCopyCode}>
                
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="md-code-area">
              <pre className="md-code-pre">
                <code>{getActiveCode()}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

export default IconModal;