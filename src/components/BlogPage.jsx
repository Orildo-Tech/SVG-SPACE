import React, { useState, useEffect, useMemo } from 'react';
import BrandLoader from './BrandLoader';
import {
  Rss,
  ArrowRight,
  ArrowUpRight,
  Star,
  Sparkles,
  Calendar,
  User,
  Share2,
  Copy,
  Check,
  Twitter,
  Linkedin,
  ExternalLink,
  ChevronLeft,
  MessageSquare } from
'lucide-react';

export function BlogPage({ onExploreAll, onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [selectedPostSlug, setSelectedPostSlug] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/posts.json');
        if (res.ok) {
          const data = await res.json();
          setPosts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);


  const sortedPosts = useMemo(() => {
    return [...posts].reverse();
  }, [posts]);


  const activePost = useMemo(() => {
    if (!selectedPostSlug) return null;
    return posts.find((p) => p.slug === selectedPostSlug) || null;
  }, [selectedPostSlug, posts]);

  const handleOpenPost = (slug) => {
    setSelectedPostSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setSelectedPostSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyShareLink = () => {
    const url = window.location.origin + window.location.pathname + '#blog-' + (activePost?.slug || '');
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };


  const getTagColorClass = (tag) => {
    switch (tag.toLowerCase()) {
      case 'release':
        return 'tag-blue';
      case 'milestone':
        return 'tag-amber';
      case 'roadmap':
        return 'tag-red';
      case 'launch':
      case 'open-source':
        return 'tag-emerald';
      case 'tutorial':
        return 'tag-cyan';
      case 'patterns':
      case 'design':
        return 'tag-purple';
      case 'aws':
      case 'cloud':
        return 'tag-orange';
      case 'azure':
      case 'gcp':
        return 'tag-indigo';
      default:
        return 'tag-neutral';
    }
  };


  const formatPostDate = (dateStr, index) => {
    if (index === 0) return '1 week ago';
    if (index === 1) return '2 weeks ago';
    if (index === 2) return '3 weeks ago';

    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };


  const renderMarkdownContent = (body) => {
    if (!body) return null;
    const blocks = body.split('\n\n');

    return blocks.map((block, idx) => {
      const trimmed = block.trim();


      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="sv-post-h2">
            {trimmed.replace(/^## /, '')}
          </h2>);

      }


      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="sv-post-h3">
            {trimmed.replace(/^### /, '')}
          </h3>);

      }


      if (trimmed.includes('|') && trimmed.includes('\n|') && trimmed.includes('---')) {
        const rows = trimmed.split('\n').filter((r) => r.trim().startsWith('|'));
        if (rows.length >= 2) {
          const headerRow = rows[0].split('|').slice(1, -1).map((c) => c.trim());
          const dataRows = rows.slice(2).map((r) => r.split('|').slice(1, -1).map((c) => c.trim()));

          return (
            <div key={idx} className="sv-post-table-wrap">
              <table className="sv-post-table">
                <thead>
                  <tr>
                    {headerRow.map((head, hIdx) =>
                    <th key={hIdx}>{head}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rIdx) =>
                  <tr key={rIdx} className={row[0]?.includes('Total') ? 'sv-table-total-row' : ''}>
                      {row.map((cell, cIdx) =>
                    <td key={cIdx}>
                          {cell.startsWith('**') && cell.endsWith('**') ?
                      <strong>{cell.slice(2, -2)}</strong> :

                      cell
                      }
                        </td>
                    )}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>);

        }
      }


      if (trimmed.startsWith('```')) {
        const codeLines = trimmed.split('\n');
        const code = codeLines.slice(1, -1).join('\n');
        return (
          <pre key={idx} className="sv-post-code-block">
            <code>{code}</code>
          </pre>);

      }


      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={idx} className="sv-post-bullet-list">
            {items.map((item, iIdx) => {
              const text = item.replace(/^[-*]\s+/, '');

              const boldMatch = text.match(/^\*\*(.*?)\*\*(.*)/);
              if (boldMatch) {
                return (
                  <li key={iIdx}>
                    <strong>{boldMatch[1]}</strong>
                    <span>{boldMatch[2]}</span>
                  </li>);

              }
              return <li key={iIdx}>{text}</li>;
            })}
          </ul>);

      }


      return (
        <p key={idx} className="sv-post-paragraph">
          {trimmed.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
            }
            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
              return (
                <a key={pIdx} href={linkMatch[2]} className="sv-post-inline-link">
                  {linkMatch[1]}
                </a>);

            }
            return part;
          })}
        </p>);

    });
  };

  if (isLoading) {
    return (
      <div className="sv-blog-loading">
        <BrandLoader size={48} />
        <span>Loading SVG.IO Blog...</span>
      </div>);

  }




  if (activePost) {
    return (
      <div className="sv-blog-page-container">
        <div className="sv-article-reader-layout">
          {}
          <div className="sv-article-main-col">
            {}
            <button className="sv-back-to-blog-btn" onClick={handleBackToBlog}>
              <ChevronLeft size={15} />
              <span>Back to blog</span>
            </button>

            {}
            <div className="sv-article-meta-header">
              <span className="sv-article-date-author">
                <Calendar size={13} className="sv-meta-icon" />
                {new Date(activePost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                <span className="sv-meta-sep">•</span>
                {activePost.author || 'SvgIo Core Team'}
              </span>
            </div>

            {}
            <h1 className="sv-article-main-title">{activePost.title}</h1>

            {}
            <div className="sv-article-tags-row">
              {activePost.tags?.map((tag, tIdx) =>
              <span key={tIdx} className={`sv-tag-pill ${getTagColorClass(tag)}`}>
                  <span className="sv-tag-dot" />
                  {tag}
                </span>
              )}
            </div>

            {}
            <div className="sv-article-body-content">
              {renderMarkdownContent(activePost.body)}
            </div>

            {}
            <div className="sv-article-bottom-actions">
              <button className="sv-back-to-blog-btn" onClick={handleBackToBlog}>
                <ChevronLeft size={15} />
                <span>All posts</span>
              </button>
            </div>
          </div>

          {}
          <aside className="sv-share-sidebar" aria-label="Share article">
            <div className="sv-share-rail-sticky">
              <span className="sv-share-label">SHARE</span>
              <div className="sv-share-buttons-stack">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activePost.title)}&url=${encodeURIComponent('https://svgspace.sbs')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sv-share-icon-btn"
                  title="Share on X (Twitter)">
                  
                  <span style={{ fontSize: '13px', fontWeight: 800 }}>X</span>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://svgspace.sbs')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sv-share-icon-btn"
                  title="Share on LinkedIn">
                  
                  <Linkedin size={14} />
                </a>

                <a
                  href={`https://reddit.com/submit?title=${encodeURIComponent(activePost.title)}&url=${encodeURIComponent('https://svgspace.sbs')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sv-share-icon-btn"
                  title="Share on Reddit">
                  
                  <MessageSquare size={14} />
                </a>

                <a
                  href={`https://news.ycombinator.com/submitlink?t=${encodeURIComponent(activePost.title)}&u=${encodeURIComponent('https://svgspace.sbs')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sv-share-icon-btn"
                  title="Share on Hacker News">
                  
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#FF6600' }}>Y</span>
                </a>

                <button
                  className={`sv-share-icon-btn ${copiedLink ? 'copied' : ''}`}
                  onClick={handleCopyShareLink}
                  title="Copy link">
                  
                  {copiedLink ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {}
        <div className="sv-blog-loop-card glass-panel">
          <h3 className="sv-loop-title">Stay in the loop</h3>
          <p className="sv-loop-sub">Follow our RSS feed or star us on GitHub for updates</p>
          <div className="sv-loop-actions">
            <a
              href="/feed.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="sv-loop-btn">
              
              <Rss size={13} />
              <span>RSS Feed</span>
            </a>
            <a
              href="https://github.com/Orildo-Tech/SVG-SPACE"
              target="_blank"
              rel="noopener noreferrer"
              className="sv-loop-btn-primary">
              <Star size={13} />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>);

  }




  const featuredPost = sortedPosts[0];
  const timelinePosts = sortedPosts.slice(1);

  return (
    <div className="sv-blog-page-container">
      {}
      <div className="sv-blog-index-header">
        <div className="sv-blog-title-row">
          <div className="sv-blog-headings">
            <h1 className="sv-blog-main-title">Blog</h1>
            <p className="sv-blog-main-sub">
              What we shipped, what we learned, and what is next
            </p>
          </div>

          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="sv-blog-rss-header-btn">
            
            <Rss size={13} />
            <span>RSS</span>
          </a>
        </div>
      </div>

      {}
      {featuredPost &&
      <div
        className="sv-blog-featured-card glass-panel"
        onClick={() => handleOpenPost(featuredPost.slug)}>
        
          <div className="sv-featured-card-top">
            <span className="sv-featured-pill-badge">
              <span className="sv-featured-badge-dot" />
              LATEST
            </span>
          </div>

          <h2 className="sv-featured-card-title">{featuredPost.title}</h2>
          <p className="sv-featured-card-desc">{featuredPost.excerpt}</p>

          <div className="sv-featured-card-footer">
            <div className="sv-featured-footer-left">
              <span className="sv-featured-date">
                {formatPostDate(featuredPost.date, 0)}
              </span>
              <div className="sv-featured-tags-group">
                {featuredPost.tags?.map((tag, tIdx) =>
              <span key={tIdx} className={`sv-tag-pill ${getTagColorClass(tag)}`}>
                    <span className="sv-tag-dot" />
                    {tag}
                  </span>
              )}
              </div>
            </div>

            <span className="sv-featured-read-btn">
              <span>Read</span>
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      }

      {}
      <div className="sv-blog-timeline-list">
        {timelinePosts.map((post, idx) => {

          const numberVal = timelinePosts.length - idx;
          const displayNum = numberVal < 10 ? `0${numberVal}` : `${numberVal}`;
          const isFirstItem = numberVal === 1;

          return (
            <article
              key={post.slug}
              className={`sv-timeline-item ${isFirstItem ? 'is-highlighted-post' : ''}`}
              onClick={() => handleOpenPost(post.slug)}>
              
              {}
              <div className={`sv-timeline-num-badge ${isFirstItem ? 'highlight-num' : ''}`}>
                <span>{displayNum}</span>
              </div>

              {}
              <div className="sv-timeline-content-col">
                <div className="sv-timeline-meta-row">
                  <span className="sv-timeline-date">
                    {formatPostDate(post.date, idx + 1)}
                  </span>
                  <div className="sv-timeline-tags-group">
                    {post.tags?.map((tag, tIdx) =>
                    <span key={tIdx} className={`sv-tag-pill ${getTagColorClass(tag)}`}>
                        <span className="sv-tag-dot" />
                        {tag}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={`sv-timeline-title ${isFirstItem ? 'highlight-title' : ''}`}>
                  {post.title}
                </h3>

                <p className="sv-timeline-excerpt">{post.excerpt}</p>

                {isFirstItem &&
                <div className="sv-timeline-first-action">
                    <span className="sv-read-post-link">
                      <span>Read post</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                }
              </div>
            </article>);

        })}
      </div>

      {}
      <div className="sv-blog-loop-card glass-panel">
        <h3 className="sv-loop-title">Stay in the loop</h3>
        <p className="sv-loop-sub">Follow our RSS feed or star us on GitHub for updates</p>
        <div className="sv-loop-actions">
          <a
            href="/feed.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="sv-loop-btn">
            
            <Rss size={13} />
            <span>RSS Feed</span>
          </a>
          <a
            href="https://github.com/Orildo-Tech/SVG-SPACE"
            target="_blank"
            rel="noopener noreferrer"
            className="sv-loop-btn-primary">
            <Star size={13} />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </div>);

}

export default BlogPage;