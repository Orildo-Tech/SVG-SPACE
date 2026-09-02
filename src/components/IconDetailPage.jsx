import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Home,
  ChevronRight,
  Copy,
  Download,
  Check,
  Heart,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Github,
  GitPullRequest,
  Globe,
  Code2,
  FileCode,
  Layers,
  ArrowUpRight,
  Sliders,
  X,
  FileImage,
  CheckCircle2,
  Share2,
  Link2,
  ArrowLeft } from
'lucide-react';
import {
  getSvgContent,
  convertSvgToReact,
  convertSvgToReactNative,
  convertSvgToVue,
  convertSvgToSvelte,
  convertSvgToAngular,
  convertSvgToDataUri,
  renderSvgToCanvas,
  downloadSvgFile,
  downloadPngFile,
  downloadJpgFile,
  downloadWebpFile,
  downloadAvifFile,
  downloadIcoFile,
  downloadAllFormatsZip,
  downloadBulkZip } from
'../utils/exportUtils';
import { saveAs } from 'file-saver';
import IconCard from './IconCard';

export function IconDetailPage({
  icon,
  initialVariant = 'default',
  allIcons = [],
  onBack,
  onNavigateHome,
  onNavigateLibrary,
  onSelectCategory,
  onSelectIcon,
  isFavorite,
  onToggleFavorite,
  onShowToast
}) {
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  const [svgContent, setSvgContent] = useState('');
  const [activeTab, setActiveTab] = useState('react');
  const [copied, setCopied] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedCdn, setCopiedCdn] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [copyFormat, setCopyFormat] = useState('png');
  const [copySize, setCopySize] = useState(256);
  const [customSizeInput, setCustomSizeInput] = useState('256');

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('svg');
  const [downloadSize, setDownloadSize] = useState(512);
  const [customDownloadSizeInput, setCustomDownloadSizeInput] = useState('512');

  const copyModalRef = useRef(null);
  const downloadModalRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (copyModalRef.current && !copyModalRef.current.contains(e.target)) {
        setIsCopyModalOpen(false);
      }
      if (downloadModalRef.current && !downloadModalRef.current.contains(e.target)) {
        setIsDownloadModalOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const variantsList = useMemo(() => {
    const raw = Array.isArray(icon?.variants) ? icon.variants : Object.keys(icon?.variants || {});

    const order = ['default', 'mono', 'light', 'dark', 'wordmark', 'wordmark-light', 'wordmark-dark', 'color'];
    const sorted = [...raw].sort((a, b) => {
      const idxA = order.indexOf(a);
      const idxB = order.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
    return sorted.length ? sorted : ['default'];
  }, [icon]);

  useEffect(() => {
    if (icon) {
      const v = variantsList.includes(initialVariant) ?
      initialVariant :
      variantsList.includes('dark') ?
      'dark' :
      variantsList[0] || 'default';
      setSelectedVariant(v);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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


  const dominantColor = useMemo(() => {
    if (!svgContent) return '#61DAFB';
    const matches = svgContent.matchAll(/(?:fill|stroke)="(#[0-9a-fA-F]{3,8})"/g);
    for (const match of matches) {
      const hex = match[1].toLowerCase();
      if (!['#fff', '#ffffff', '#000', '#000000', '#none'].includes(hex)) {
        return match[1].toUpperCase();
      }
    }
    return '#FF5F02';
  }, [svgContent]);


  const cliCommand = `npx @orildo/icons add ${icon?.id || ''}`;
  const cdnUrl = `svg.io.orildo.tech/icons/${icon?.id || ''}/${selectedVariant}.svg`;


  const getActiveCode = () => {
    if (!svgContent || !icon) return '';

    switch (activeTab) {
      case 'react':
      case 'jsx':
        return convertSvgToReact(svgContent, icon.name);
      case 'react-native':
      case 'reactnative':
        return convertSvgToReactNative(svgContent, icon.name);
      case 'vue':
        return convertSvgToVue(svgContent);
      case 'svelte':
        return convertSvgToSvelte(svgContent);
      case 'angular':
        return convertSvgToAngular(svgContent, icon.name);
      case 'html':
      case 'svg':
        return svgContent.trim();
      case 'nextjs':
        return `import Image from 'next/image';\n\nexport function ${icon.name.replace(/[^a-zA-Z0-9]/g, '')}Logo() {\n  return (\n    <Image\n      src="https://${cdnUrl}"\n      alt="${icon.name} Icon"\n      width={24}\n      height={24}\n      priority\n    />\n  );\n}`;
      case 'css':
        return `.icon-${icon.id} {\n  width: 24px;\n  height: 24px;\n  display: inline-block;\n  background: url('https://${cdnUrl}') no-repeat center / contain;\n}`;
      case 'cdn':
        return `<img src="https://${cdnUrl}" alt="${icon.name}" width="24" height="24" />`;
      case 'uri':
        return convertSvgToDataUri(svgContent).utf8;
      default:
        return svgContent.trim();
    }
  };

  const handleCopySvg = () => {
    if (svgContent) {
      navigator.clipboard.writeText(svgContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
      onShowToast?.({
        type: 'success',
        title: 'Copied to Clipboard',
        message: 'SVG vector markup copied.'
      });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
    onShowToast?.({
      type: 'success',
      title: 'Copied to Clipboard',
      message: `${activeTab.toUpperCase()} code copied.`
    });
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 1600);
    onShowToast?.({
      type: 'success',
      title: 'CLI Command Copied',
      message: cliCommand
    });
  };

  const handleCopyCdn = () => {
    navigator.clipboard.writeText(`https://${cdnUrl}`);
    setCopiedCdn(true);
    setTimeout(() => setCopiedCdn(false), 1600);
    onShowToast?.({
      type: 'success',
      title: 'CDN URL Copied',
      message: `https://${cdnUrl}`
    });
  };

  const handleShare = async () => {
    const slug = icon.id || icon.slug;
    const shareUrl = `https://svg.io.orildo.tech/icon/${slug}`;
    const iconName = icon.name || icon.title || slug;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${iconName} SVG Icon — SVG.IO`,
          text: `Download the free ${iconName} SVG vector icon on SVG.IO — React JSX, Vue, Svelte & PNG export.`,
          url: shareUrl
        });
        return;
      } catch (e) {}
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
      onShowToast?.({
        type: 'success',
        title: '🔗 Link Copied!',
        message: `svg.io.orildo.tech/icon/${slug}`
      });
    } catch (e) {}
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

  const handleDownloadAllZip = async () => {
    if (!svgContent) return;
    await downloadAllFormatsZip(
      svgContent,
      icon.id,
      selectedVariant,
      icon.name,
      'transparent'
    );
    onShowToast?.({
      type: 'success',
      title: 'All Formats Package',
      message: 'SVG, PNG, JPG, WebP, AVIF & ICO packaged into ZIP.'
    });
  };

  const handleCopyFormattedAsset = async (format, size) => {
    if (!svgContent) return;
    const finalSize = parseInt(size, 10) || 256;
    try {
      if (format === 'svg') {
        await navigator.clipboard.writeText(svgContent);
        onShowToast?.({
          type: 'success',
          title: 'Copied SVG Vector',
          message: `${icon.name} raw SVG markup copied to clipboard.`
        });
      } else {

        const isJpg = format === 'jpg';
        const canvas = await renderSvgToCanvas(
          svgContent,
          finalSize,
          isJpg ? '#FFFFFF' : 'transparent'
        );

        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              if (navigator.clipboard && window.ClipboardItem) {
                await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })]
                );
                onShowToast?.({
                  type: 'success',
                  title: `Copied ${format.toUpperCase()} Image!`,
                  message: `${icon.name} (${finalSize}×${finalSize}px) copied to clipboard. Ready to paste anywhere.`
                });
              } else {
                const dataUrl = canvas.toDataURL(isJpg ? 'image/jpeg' : 'image/png');
                await navigator.clipboard.writeText(dataUrl);
                onShowToast?.({
                  type: 'success',
                  title: `Copied ${format.toUpperCase()} Data`,
                  message: 'Image data URL copied to clipboard.'
                });
              }
            } catch (err) {
              const dataUrl = canvas.toDataURL(isJpg ? 'image/jpeg' : 'image/png');
              await navigator.clipboard.writeText(dataUrl);
              onShowToast?.({
                type: 'success',
                title: `Copied ${format.toUpperCase()} Data`,
                message: 'Image data URL copied to clipboard.'
              });
            }
          }
        }, 'image/png');
      }
      setIsCopyModalOpen(false);
    } catch (e) {
      console.error('Copy asset error:', e);
      onShowToast?.({
        type: 'error',
        title: 'Copy Failed',
        message: e.message
      });
    }
  };

  const handleDownloadFormattedAsset = async (format, size) => {
    if (!svgContent) return;
    const finalSize = parseInt(size, 10) || 512;
    try {
      if (format === 'svg') {
        downloadSvgFile(svgContent, `${icon.id}-${selectedVariant}.svg`);
        onShowToast?.({
          type: 'success',
          title: 'SVG Downloaded',
          message: `${icon.id}-${selectedVariant}.svg saved.`
        });
      } else if (format === 'png') {
        await downloadPngFile(svgContent, `${icon.id}-${selectedVariant}-${finalSize}px.png`, finalSize);
        onShowToast?.({
          type: 'success',
          title: `PNG ${finalSize}px Downloaded`,
          message: `${icon.name} PNG image saved.`
        });
      } else if (format === 'jpg') {
        await downloadJpgFile(svgContent, `${icon.id}-${selectedVariant}-${finalSize}px.jpg`, finalSize);
        onShowToast?.({
          type: 'success',
          title: `JPG ${finalSize}px Downloaded`,
          message: `${icon.name} JPG image saved.`
        });
      } else if (format === 'webp') {
        await downloadWebpFile(svgContent, `${icon.id}-${selectedVariant}-${finalSize}px.webp`, finalSize);
        onShowToast?.({
          type: 'success',
          title: `WebP ${finalSize}px Downloaded`,
          message: `${icon.name} WebP image saved.`
        });
      } else if (format === 'avif') {
        await downloadAvifFile(svgContent, `${icon.id}-${selectedVariant}-${finalSize}px.avif`, finalSize);
        onShowToast?.({
          type: 'success',
          title: `AVIF ${finalSize}px Downloaded`,
          message: `${icon.name} AVIF image saved.`
        });
      } else if (format === 'ico') {
        await downloadIcoFile(svgContent, `${icon.id}-${selectedVariant}.ico`);
        onShowToast?.({
          type: 'success',
          title: 'ICO Favicon Downloaded',
          message: `${icon.id} multi-resolution ICO saved.`
        });
      } else if (format === 'zip') {
        await downloadAllFormatsZip(svgContent, icon.id, selectedVariant, icon.name);
        onShowToast?.({
          type: 'success',
          title: 'Complete ZIP Package Downloaded',
          message: 'SVG, PNG, JPG, WebP, AVIF & ICO bundle saved.'
        });
      }
      setIsDownloadModalOpen(false);
    } catch (e) {
      console.error('Download asset error:', e);
      onShowToast?.({
        type: 'error',
        title: 'Download Failed',
        message: e.message
      });
    }
  };


  const activeCode = getActiveCode();
  const highlightedCodeHtml = useMemo(() => {
    if (!activeCode) return '';

    let escaped = activeCode.
    replace(/&/g, '&amp;').
    replace(/</g, '&lt;').
    replace(/>/g, '&gt;');


    escaped = escaped.replace(/(["'])(?:(?=(\\?))\2[\s\S])*?\1/g, '<span class="tok-string">$&</span>');


    escaped = escaped.replace(/\b(import|export|function|default|const|let|var|return|from|template|script|setup)\b/g, '<span class="tok-keyword">$1</span>');


    escaped = escaped.replace(/(&lt;\/?[a-zA-Z0-9_-]+)/g, '<span class="tok-tag">$1</span>');
    escaped = escaped.replace(/(&gt;|\/&gt;)/g, '<span class="tok-tag">$1</span>');


    escaped = escaped.replace(/\b([a-zA-Z0-9_:-]+)(?=\=)/g, '<span class="tok-attr">$1</span>');

    return escaped;
  }, [activeCode]);


  const primaryCategory = useMemo(() => {
    if (icon?.category && typeof icon.category === 'string') return icon.category;
    if (Array.isArray(icon?.categories) && icon.categories.length > 0) return icon.categories[0];
    return 'Software';
  }, [icon]);


  const relatedIcons = useMemo(() => {
    if (!icon || !allIcons.length) return [];

    const iconCats = (Array.isArray(icon.categories) && icon.categories.length > 0 ?
    icon.categories :
    [icon.category || 'Software']).
    map((c) => String(c).toLowerCase().trim());


    const matched = allIcons.filter((i) => {
      if (i.id === icon.id) return false;
      const iCats = (Array.isArray(i.categories) && i.categories.length > 0 ?
      i.categories :
      [i.category || 'Software']).
      map((c) => String(c).toLowerCase().trim());

      return iCats.some((c) => iconCats.includes(c));
    });

    if (matched.length > 0) {
      return matched.slice(0, 18);
    }


    return allIcons.filter((i) => i.id !== icon.id).slice(0, 18);
  }, [icon, allIcons]);

  if (!icon) return null;

  const formatVariantLabel = (v) => {
    switch (v) {
      case 'default':
        return 'Default';
      case 'mono':
        return 'Mono';
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'wordmark':
        return 'Wordmark';
      case 'wordmark-light':
        return 'WM Light';
      case 'wordmark-dark':
        return 'WM Dark';
      case 'color':
        return 'Color';
      default:
        return v.charAt(0).toUpperCase() + v.slice(1);
    }
  };

  return (
    <div className="thesvg-view-page">
      <div className="thesvg-top-nav-bar">
        <nav className="thesvg-breadcrumb" aria-label="Breadcrumb">
          <a
            href="/"
            className="thesvg-breadcrumb-btn"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
                else onBack?.();
              }
            }}
            title="Go to Home Catalog"
          >
            <Home size={14} className="thesvg-bc-icon" />
            <span>Home</span>
          </a>

          <span className="thesvg-bc-sep">/</span>

          <a
            href="/?view=categories"
            className="thesvg-breadcrumb-btn"
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                e.preventDefault();
                if (onNavigateLibrary) onNavigateLibrary();
                else onBack?.();
              }
            }}
            title="Browse Full Vector Library"
          >
            <span>Library</span>
          </a>

          {primaryCategory && (
            <>
              <span className="thesvg-bc-sep">/</span>
              <a
                href={`/category/${encodeURIComponent(primaryCategory)}`}
                className="thesvg-breadcrumb-btn category-pill-link"
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onSelectCategory?.(primaryCategory);
                  }
                }}
                title={`View ${primaryCategory} category`}
              >
                <span>{primaryCategory}</span>
              </a>
            </>
          )}

          <span className="thesvg-bc-sep">/</span>
          <span className="thesvg-bc-active">{icon.name}</span>
        </nav>

        <button
          type="button"
          className="thesvg-back-btn"
          onClick={() => {
            if (onNavigateLibrary) onNavigateLibrary();
            else onBack?.();
          }}
          title="Return to Library"
        >
          <ArrowLeft size={14} />
          <span>Back to Library</span>
        </button>
      </div>

      {}
      <div className="thesvg-main-grid">
        {}
        <div className="thesvg-left-col">
          {}
          <div className="thesvg-preview-card glass-panel">
            {}
            <div className="thesvg-card-top-row">
              <button
                className={`thesvg-fav-toggle-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(icon)}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                aria-label="Favorite">
                
                <Heart size={16} fill={isFavorite ? '#EF4444' : 'none'} color={isFavorite ? '#EF4444' : 'currentColor'} />
              </button>

              <div className="thesvg-hex-badge">
                <span className="thesvg-hex-dot" style={{ backgroundColor: dominantColor }} />
                <span className="thesvg-hex-text">{dominantColor}</span>
              </div>
            </div>

            {}
            <div className="thesvg-card-center-icon">
              {svgContent ?
              <div
                className="thesvg-svg-wrapper"
                dangerouslySetInnerHTML={{ __html: svgContent }} /> :


              <img
                src={`/icons/${icon.id}/${selectedVariant}.svg`}
                alt={icon.name}
                className="thesvg-preview-img" />

              }
            </div>
          </div>

          {}
          <div className="thesvg-meta-card glass-panel">
            {}
            <div className="thesvg-meta-row">
              <span className="thesvg-meta-label">LICENSE</span>
              <span className="thesvg-meta-val">{icon.license || 'CC0-1.0'}</span>
            </div>

            <div className="thesvg-meta-row">
              <span className="thesvg-meta-label">VARIANTS</span>
              <span className="thesvg-meta-val">{variantsList.length}</span>
            </div>

            <div className="thesvg-meta-row">
              <span className="thesvg-meta-label">CATEGORY</span>
              <span className="thesvg-meta-val highlight">{primaryCategory}</span>
            </div>

            <div className="thesvg-meta-divider" />

            <div className="thesvg-categories-group">
              <span className="thesvg-meta-label">CATEGORIES</span>
              <div className="thesvg-cat-tags">
                {(Array.isArray(icon.categories) && icon.categories.length > 0 ? icon.categories : [primaryCategory]).map((c, i) =>
                  <a
                    key={i}
                    href={`/category/${encodeURIComponent(c)}`}
                    className="thesvg-cat-chip"
                    onClick={(e) => {
                      if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        onSelectCategory?.(c);
                      }
                    }}
                    title={`Browse all ${c} SVG icons`}
                  >
                    {c}
                  </a>
                )}
              </div>
            </div>

            {}
            <a
              href={icon.url || `https://${icon.id}.dev`}
              target="_blank"
              rel="noopener noreferrer"
              className="thesvg-website-btn">
              
              <Globe size={13} />
              <span>{icon.url ? icon.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : `${icon.id}.dev`}</span>
              <ArrowUpRight size={13} className="thesvg-arrow-ext" />
            </a>

            <div className="thesvg-meta-divider" />

            {}
            <div className="thesvg-missing-section">
              <span className="thesvg-missing-title">Missing a variant?</span>
              <div className="thesvg-missing-buttons">
                <a
                  href="https://github.com/Orildo-Tech/SVG-IO/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thesvg-action-outline-btn">
                  <Github size={13} />
                  <span>Request via Issue</span>
                </a>

                <a
                  href="https://github.com/Orildo-Tech/SVG-IO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thesvg-action-outline-btn">
                  <GitPullRequest size={14} />
                  <span>Suggest Edit</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="thesvg-right-col">
          {}
          <div className="thesvg-header-row">
            <div className="thesvg-title-group">
              <h1 className="thesvg-icon-h1">{icon.name}</h1>
              <span className="thesvg-icon-slug">{icon.id}</span>
            </div>

            <div className="thesvg-header-actions">
              {}
              <div className="thesvg-dropdown-wrap" ref={copyModalRef}>
                <button
                  className="thesvg-action-btn thesvg-copy-popup-trigger"
                  onClick={() => setIsCopyModalOpen(!isCopyModalOpen)}
                  title="Copy formatted asset or image">
                  
                  <Copy size={14} />
                  <span>Copy</span>
                  <ChevronDown size={14} />
                </button>

                {}
                {isCopyModalOpen &&
                <div className="thesvg-copy-dialog-popover glass-panel">
                    <div className="sv-copy-dialog-header">
                      <div className="sv-copy-dialog-title-group">
                        <span className="sv-copy-dialog-title">Copy & Export Asset</span>
                        <span className="sv-copy-dialog-sub">Select target format & frame resolution</span>
                      </div>
                      <button
                      type="button"
                      className="sv-copy-dialog-close"
                      onClick={() => setIsCopyModalOpen(false)}>
                      
                        <X size={14} />
                      </button>
                    </div>

                    {}
                    <div className="sv-copy-dialog-section">
                      <span className="sv-copy-section-label">Select Format</span>
                      <div className="sv-copy-formats-grid">
                        <button
                        type="button"
                        className={`sv-copy-format-chip ${copyFormat === 'svg' ? 'active' : ''}`}
                        onClick={() => setCopyFormat('svg')}>
                        
                          <span className="fmt-name">SVG</span>
                          <span className="fmt-desc">Vector XML</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${copyFormat === 'png' ? 'active' : ''}`}
                        onClick={() => setCopyFormat('png')}>
                        
                          <span className="fmt-name">PNG</span>
                          <span className="fmt-desc">Transparent</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${copyFormat === 'jpg' ? 'active' : ''}`}
                        onClick={() => setCopyFormat('jpg')}>
                        
                          <span className="fmt-name">JPG</span>
                          <span className="fmt-desc">JPEG Image</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${copyFormat === 'webp' ? 'active' : ''}`}
                        onClick={() => setCopyFormat('webp')}>
                        
                          <span className="fmt-name">WebP</span>
                          <span className="fmt-desc">Modern Web</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${copyFormat === 'avif' ? 'active' : ''}`}
                        onClick={() => setCopyFormat('avif')}>
                        
                          <span className="fmt-name">AVIF</span>
                          <span className="fmt-desc">Next-Gen</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${copyFormat === 'ico' ? 'active' : ''}`}
                        onClick={() => setCopyFormat('ico')}>
                        
                          <span className="fmt-name">ICO</span>
                          <span className="fmt-desc">Favicon</span>
                        </button>
                      </div>
                    </div>

                    {}
                    {['png', 'jpg', 'webp', 'avif'].includes(copyFormat) &&
                  <div className="sv-copy-dialog-section">
                        <div className="sv-copy-section-header-row">
                          <span className="sv-copy-section-label">Frame Dimension / Resolution</span>
                          <span className="sv-copy-size-display">{copySize} × {copySize} px</span>
                        </div>

                        <div className="sv-copy-sizes-grid">
                          {[24, 32, 48, 64, 128, 256, 512, 1024].map((sz) =>
                      <button
                        key={sz}
                        type="button"
                        className={`sv-copy-size-chip ${copySize === sz ? 'active' : ''}`}
                        onClick={() => {
                          setCopySize(sz);
                          setCustomSizeInput(String(sz));
                        }}>
                        
                              {sz}px
                            </button>
                      )}
                        </div>

                        <div className="sv-custom-size-row">
                          <span className="sv-custom-label">Custom PX:</span>
                          <input
                        type="number"
                        className="sv-custom-size-input"
                        value={customSizeInput}
                        min="16"
                        max="4096"
                        onChange={(e) => {
                          setCustomSizeInput(e.target.value);
                          const parsed = parseInt(e.target.value, 10);
                          if (parsed && parsed > 0) setCopySize(parsed);
                        }} />
                      
                          <span className="sv-custom-unit">px</span>
                        </div>
                      </div>
                  }

                    {}
                    <div className="sv-copy-dialog-actions">
                      <button
                      type="button"
                      className="sv-copy-dialog-submit-btn"
                      onClick={() => handleCopyFormattedAsset(copyFormat, copySize)}>
                      
                        <Copy size={14} />
                        <span>Copy {copyFormat.toUpperCase()}</span>
                      </button>
                    </div>
                  </div>
                }
              </div>

              {}
              <div className="thesvg-dropdown-wrap" ref={downloadModalRef}>
                <button
                  className="thesvg-primary-download-btn"
                  onClick={() => setIsDownloadModalOpen(!isDownloadModalOpen)}
                  title="Download formatted asset or image">
                  
                  <Download size={15} />
                  <span>Download</span>
                  <ChevronDown size={14} />
                </button>

                {}
                {isDownloadModalOpen &&
                <div className="thesvg-copy-dialog-popover glass-panel">
                    <div className="sv-copy-dialog-header">
                      <div className="sv-copy-dialog-title-group">
                        <span className="sv-copy-dialog-title">Download Asset</span>
                        <span className="sv-copy-dialog-sub">Select file format & export resolution</span>
                      </div>
                      <button
                      type="button"
                      className="sv-copy-dialog-close"
                      onClick={() => setIsDownloadModalOpen(false)}>
                      
                        <X size={14} />
                      </button>
                    </div>

                    {}
                    <div className="sv-copy-dialog-section">
                      <span className="sv-copy-section-label">Select Format</span>
                      <div className="sv-copy-formats-grid">
                        <button
                        type="button"
                        className={`sv-copy-format-chip ${downloadFormat === 'svg' ? 'active' : ''}`}
                        onClick={() => setDownloadFormat('svg')}>
                        
                          <span className="fmt-name">SVG</span>
                          <span className="fmt-desc">Vector XML</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${downloadFormat === 'png' ? 'active' : ''}`}
                        onClick={() => setDownloadFormat('png')}>
                        
                          <span className="fmt-name">PNG</span>
                          <span className="fmt-desc">Transparent</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${downloadFormat === 'jpg' ? 'active' : ''}`}
                        onClick={() => setDownloadFormat('jpg')}>
                        
                          <span className="fmt-name">JPG</span>
                          <span className="fmt-desc">JPEG Image</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${downloadFormat === 'webp' ? 'active' : ''}`}
                        onClick={() => setDownloadFormat('webp')}>
                        
                          <span className="fmt-name">WebP</span>
                          <span className="fmt-desc">Modern Web</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${downloadFormat === 'avif' ? 'active' : ''}`}
                        onClick={() => setDownloadFormat('avif')}>
                        
                          <span className="fmt-name">AVIF</span>
                          <span className="fmt-desc">Next-Gen</span>
                        </button>

                        <button
                        type="button"
                        className={`sv-copy-format-chip ${downloadFormat === 'ico' ? 'active' : ''}`}
                        onClick={() => setDownloadFormat('ico')}>
                        
                          <span className="fmt-name">ICO</span>
                          <span className="fmt-desc">Favicon</span>
                        </button>
                      </div>
                    </div>

                    {}
                    {['png', 'jpg', 'webp', 'avif'].includes(downloadFormat) &&
                  <div className="sv-copy-dialog-section">
                        <div className="sv-copy-section-header-row">
                          <span className="sv-copy-section-label">Frame Dimension / Resolution</span>
                          <span className="sv-copy-size-display">{downloadSize} × {downloadSize} px</span>
                        </div>

                        <div className="sv-copy-sizes-grid">
                          {[24, 32, 48, 64, 128, 256, 512, 1024].map((sz) =>
                      <button
                        key={sz}
                        type="button"
                        className={`sv-copy-size-chip ${downloadSize === sz ? 'active' : ''}`}
                        onClick={() => {
                          setDownloadSize(sz);
                          setCustomDownloadSizeInput(String(sz));
                        }}>
                        
                              {sz}px
                            </button>
                      )}
                        </div>

                        <div className="sv-custom-size-row">
                          <span className="sv-custom-label">Custom PX:</span>
                          <input
                        type="number"
                        className="sv-custom-size-input"
                        value={customDownloadSizeInput}
                        min="16"
                        max="4096"
                        onChange={(e) => {
                          setCustomDownloadSizeInput(e.target.value);
                          const parsed = parseInt(e.target.value, 10);
                          if (parsed && parsed > 0) setDownloadSize(parsed);
                        }} />
                      
                          <span className="sv-custom-unit">px</span>
                        </div>
                      </div>
                  }

                    {}
                    <div className="sv-copy-dialog-actions">
                      <button
                      type="button"
                      className="sv-copy-dialog-submit-btn"
                      onClick={() => handleDownloadFormattedAsset(downloadFormat, downloadSize)}>
                      
                        <Download size={14} />
                        <span>Download {downloadFormat.toUpperCase()}</span>
                      </button>

                      <button
                      type="button"
                      className="sv-copy-dialog-download-btn"
                      onClick={() => handleDownloadAllZip()}
                      title="Download complete ZIP package with all formats">
                      
                        <Layers size={13} />
                        <span>All (ZIP)</span>
                      </button>
                    </div>
                  </div>
                }
              </div>

              <button
                type="button"
                className={`thesvg-action-btn thesvg-share-btn ${copiedShare ? 'copied' : ''}`}
                onClick={handleShare}
                title={copiedShare ? 'Link Copied!' : `Share link: svg.io.orildo.tech/icon/${icon.id || icon.slug}`}
                aria-label="Share icon link">
                {copiedShare ? <Check size={16} /> : <Share2 size={16} />}
              </button>
            </div>
          </div>

          {}
          <div className="thesvg-variants-section">
            <span className="thesvg-section-label">VARIANTS</span>
            <div className="thesvg-variants-grid">
              {variantsList.map((v) => {
                const isSelected = selectedVariant === v;
                const isLight = v === 'light' || v === 'wordmark-light';
                const isDark = v === 'dark' || v === 'wordmark-dark';

                return (
                  <button
                    key={v}
                    className={`thesvg-variant-card ${isSelected ? 'selected' : ''} ${isLight ? 'is-light-bg' : ''} ${isDark ? 'is-dark-bg' : ''}`}
                    onClick={() => setSelectedVariant(v)}
                    title={`Select ${formatVariantLabel(v)} variant`}>
                    
                    <div className="thesvg-variant-thumb">
                      <img
                        src={`/icons/${icon.id}/${v}.svg`}
                        alt={v}
                        className="thesvg-mini-svg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }} />
                      
                    </div>
                    <span className="thesvg-variant-label">{formatVariantLabel(v)}</span>
                  </button>);

              })}
            </div>
          </div>

          {}
          <div className="thesvg-command-rows">
            {}
            <div className="thesvg-command-box" onClick={handleCopyCli}>
              <div className="thesvg-command-left">
                <span className="thesvg-command-tag">CLI</span>
                <span className="thesvg-command-code">{cliCommand}</span>
              </div>
              <button className="thesvg-command-copy-btn" aria-label="Copy CLI Command">
                {copiedCli ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
              </button>
            </div>

            {}
            <div className="thesvg-command-box" onClick={handleCopyCdn}>
              <div className="thesvg-command-left">
                <span className="thesvg-command-tag">CDN</span>
                <span className="thesvg-command-code">{cdnUrl}</span>
              </div>
              <button className="thesvg-command-copy-btn" aria-label="Copy CDN URL">
                {copiedCdn ? <Check size={13} color="#10B981" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {}
          <div className="thesvg-code-box-container glass-panel">
            {}
            <div className="thesvg-code-tabs-bar">
              {}
              <div className="thesvg-code-left-tabs">
                <button
                  className={`thesvg-tab-btn ${activeTab === 'react' ? 'active' : ''}`}
                  onClick={() => setActiveTab('react')}>
                  <span>React</span>
                </button>
                <button
                  className={`thesvg-tab-btn ${activeTab === 'react-native' ? 'active' : ''}`}
                  onClick={() => setActiveTab('react-native')}>
                  <span>React Native</span>
                </button>
                <button
                  className={`thesvg-tab-btn ${activeTab === 'nextjs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('nextjs')}>
                  <span>Next.js</span>
                </button>
                <button
                  className={`thesvg-tab-btn ${activeTab === 'vue' ? 'active' : ''}`}
                  onClick={() => setActiveTab('vue')}>
                  <span>Vue</span>
                </button>
                <button
                  className={`thesvg-tab-btn ${activeTab === 'svelte' ? 'active' : ''}`}
                  onClick={() => setActiveTab('svelte')}>
                  <span>Svelte</span>
                </button>
                <button
                  className={`thesvg-tab-btn ${activeTab === 'angular' ? 'active' : ''}`}
                  onClick={() => setActiveTab('angular')}>
                  <span>Angular</span>
                </button>
                <button
                  className={`thesvg-tab-btn ${activeTab === 'html' ? 'active' : ''}`}
                  onClick={() => setActiveTab('html')}>
                  <span>HTML</span>
                </button>
                <button
                  className={`thesvg-tab-btn ${activeTab === 'css' ? 'active' : ''}`}
                  onClick={() => setActiveTab('css')}>
                  <span>CSS</span>
                </button>
              </div>

              {}
              <div className="thesvg-code-right-group">
                <div className="thesvg-format-pills">
                  <button
                    className={`thesvg-pill-tab ${activeTab === 'svg' ? 'active' : ''}`}
                    onClick={() => setActiveTab('svg')}>
                    
                    SVG
                  </button>
                  <button
                    className={`thesvg-pill-tab ${activeTab === 'jsx' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jsx')}>
                    
                    JSX
                  </button>
                  <button
                    className={`thesvg-pill-tab ${activeTab === 'cdn' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cdn')}>
                    
                    CDN
                  </button>
                  <button
                    className={`thesvg-pill-tab ${activeTab === 'uri' ? 'active' : ''}`}
                    onClick={() => setActiveTab('uri')}>
                    
                    URI
                  </button>
                </div>

                <button
                  className="thesvg-code-copy-btn"
                  onClick={handleCopyCode}
                  title="Copy formatted code to clipboard">
                  
                  {copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {}
            <div className="thesvg-code-viewport">
              <pre className="thesvg-code-pre">
                <code dangerouslySetInnerHTML={{ __html: highlightedCodeHtml }} />
              </pre>
            </div>
          </div>

          {}
          <div className="thesvg-export-png-section">
            <div className="thesvg-export-png-header">
              <Download size={14} className="thesvg-export-icon" />
              <span className="thesvg-section-label">EXPORT PNG</span>
            </div>

            <div className="thesvg-png-sizes-grid">
              {[32, 64, 128, 256, 512].map((size) =>
              <button
                key={size}
                className="thesvg-png-card glass-panel"
                onClick={() => handleDownloadPngSize(size)}
                title={`Download ${size}×${size} PNG`}>
                
                  <div className="thesvg-png-preview-wrap">
                    <img
                    src={`/icons/${icon.id}/${selectedVariant}.svg`}
                    alt={`${size}px preview`}
                    style={{
                      width: Math.min(size, 48),
                      height: Math.min(size, 48),
                      objectFit: 'contain'
                    }} />
                  
                  </div>
                  <div className="thesvg-png-card-bottom">
                    <Download size={11} className="thesvg-png-dl-icon" />
                    <span>{size}px</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {}
      {relatedIcons.length > 0 &&
      <div className="thesvg-related-section">
          <div className="thesvg-related-header">
            <h3 className="thesvg-related-title">
              More from <span className="text-orange">{primaryCategory}</span>
            </h3>
            <span className="thesvg-related-count">{relatedIcons.length} icons</span>
          </div>

          <div className="md-icons-grid layout-comfortable">
            {relatedIcons.map((relIcon) =>
          <IconCard
            key={relIcon.id}
            icon={relIcon}
            onSelect={(i, v) => {
              onSelectIcon(i, v || 'default');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isFavorite={false}
            onToggleFavorite={onToggleFavorite}
            onShowToast={onShowToast} />

          )}
          </div>
        </div>
      }
    </div>);

}

export default IconDetailPage;