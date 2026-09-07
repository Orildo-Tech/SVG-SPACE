/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  SVGSpace — Enterprise SEO Engine (svgspace.sbs)            ║
 * ║  Dynamic title, description, keywords, OpenGraph,            ║
 * ║  Twitter Card, canonical URLs, hreflang, and Schema.org      ║
 * ║  JSON-LD rich results for SVG Hosting, Publishing & NPM.     ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

const BASE_URL = 'https://svgspace.sbs';

const BRAND_KEYWORDS_BASE =
  'svgspace, svg space, svgspace.sbs, svg hosting, svg publishing, vector hosting platform, icon distribution, free svg icons, free svg logos, brand icon download, svg icon library, open source icons, vector assets, download svg, tech logos, developer icons, npm svg icons, react svg icons, vue svg icons, svelte svg icons, liquid glass icons, flaticon alternative, iconscout alternative';

const TECH_ICON_KEYWORDS =
  'react svg, react native svg, nextjs svg, vue svg, angular svg, svelte svg, nodejs svg, python svg, typescript svg, javascript svg, docker svg, kubernetes svg, aws svg, gcp svg, azure svg, github svg, gitlab svg, figma svg, vercel svg, netlify svg, cloudflare svg, tailwind svg, postgresql svg, mongodb svg, redis svg, stripe svg, supabase svg, openai svg, tensorflow svg, linux svg, ubuntu svg';

/**
 * Generates a rich, prioritized keyword string for a given icon.
 */
function buildIconKeywords(icon) {
  const name = icon.name || icon.title || icon.slug || '';
  const slug = icon.slug || icon.id || '';
  const cats = Array.isArray(icon.categories) && icon.categories.length > 0
    ? icon.categories : (icon.category ? [icon.category] : []);
  const catKeywords = cats.map(c => `${name} ${c} icon`).join(', ');

  return [
    `${name} svg`,
    `${name} svg icon`,
    `${name} logo svg`,
    `${name} logo download`,
    `${name} icon free`,
    `${name} vector`,
    `${name} vector icon`,
    `${name} brand logo`,
    `${name} transparent png`,
    `${name} svg xml`,
    `${name} react icon`,
    `${name} react jsx`,
    `${name} react native icon`,
    `${name} nextjs icon`,
    `${name} vue icon`,
    `${name} vue 3 component`,
    `${name} angular icon`,
    `${name} svelte icon`,
    `${name} html icon`,
    `npx @svgspace/icons add ${slug}`,
    `npm ${name} icon`,
    `${name} cdn link`,
    `${name} icon download free`,
    `download ${name} svg`,
    `${slug} icon`,
    `${slug} svg`,
    catKeywords,
    BRAND_KEYWORDS_BASE
  ].filter(Boolean).join(', ');
}

/**
 * Generates comprehensive Schema.org JSON-LD for an icon.
 */
function buildIconSchema(icon, iconUrl, finalDesc, canonicalUrl) {
  const name = icon.name || icon.title || icon.slug || '';
  const slug = icon.slug || icon.id;
  const cats = Array.isArray(icon.categories) && icon.categories.length > 0
    ? icon.categories : (icon.category ? [icon.category] : []);
  const today = new Date().toISOString().split('T')[0];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ImageObject', 'DigitalDocument'],
        '@id': `${BASE_URL}/icon/${slug}#imageobject`,
        name: `${name} SVG Vector Icon & Logo`,
        alternateName: [
          `${name} icon`,
          `${name} logo`,
          `${name} svg`,
          `${name} vector`,
          `free ${name} svg`,
          `${name} brand icon`
        ],
        description: finalDesc,
        contentUrl: iconUrl,
        thumbnailUrl: iconUrl,
        url: canonicalUrl,
        encodingFormat: 'image/svg+xml',
        fileFormat: 'image/svg+xml',
        dateModified: icon.dateAdded || today,
        license: 'https://www.apache.org/licenses/LICENSE-2.0',
        acquireLicensePage: `${BASE_URL}/?view=terms`,
        creditText: 'SVGSpace via SVGSpace',
        copyrightNotice: 'Apache 2.0 — Free to use commercially',
        keywords: [...cats, name, 'svg', 'vector', 'icon', 'npm package', 'cdn'].join(', '),
        creator: {
          '@type': 'Organization',
          name: 'SVGSpace',
          url: BASE_URL
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/icon/${slug}#webpage`,
        url: canonicalUrl,
        name: `${name} SVG Icon & Logo — Free Hosting, NPM Package, React JSX, Vue 3, CDN | SVGSpace`,
        description: finalDesc,
        inLanguage: 'en-US',
        dateModified: icon.dateAdded || today,
        isPartOf: { '@id': `${BASE_URL}/#website` },
        primaryImageOfPage: { '@id': `${BASE_URL}/icon/${slug}#imageobject` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Icons', item: `${BASE_URL}/` },
            ...cats.slice(0, 1).map((c, i) => ({
              '@type': 'ListItem',
              position: 3 + i,
              name: c,
              item: `${BASE_URL}/category/${encodeURIComponent(c)}`
            })),
            { '@type': 'ListItem', position: cats.length > 0 ? 4 : 3, name: `${name} Icon`, item: canonicalUrl }
          ]
        }
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${BASE_URL}/icon/${slug}#sourcecode`,
        name: `${name} React, Vue & NPM Component`,
        description: `Install via NPM (npx @svgspace/icons add ${slug}) or copy ready-to-use React JSX, React Native, Next.js, Vue 3, Svelte, Angular, and raw HTML SVG component code for ${name}.`,
        programmingLanguage: ['React JSX', 'React Native', 'Next.js', 'Vue 3', 'Svelte', 'Angular', 'HTML SVG', 'TypeScript', 'JavaScript'],
        codeRepository: 'https://github.com/SVGSpace/SVG-IO',
        license: 'https://www.apache.org/licenses/LICENSE-2.0',
        runtimePlatform: 'Browser, Node.js, Webpack, Vite, Next.js'
      }
    ]
  };
}

/**
 * Generates comprehensive Schema.org JSON-LD for a category page.
 */
function buildCategorySchema(category, finalDesc, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#collectionpage`,
        url: canonicalUrl,
        name: `${category} SVG Icons & Vector Logos — Free Hosting & Download | SVGSpace`,
        description: finalDesc,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Categories', item: `${BASE_URL}/?view=categories` },
            { '@type': 'ListItem', position: 3, name: category, item: canonicalUrl }
          ]
        }
      }
    ]
  };
}

/**
 * Generates Schema.org JSON-LD for About/Info page.
 */
function buildAboutSchema(finalDesc, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${canonicalUrl}#aboutpage`,
        url: canonicalUrl,
        name: 'About SVGSpace — Free Open-Source SVG Hosting, Publishing & Distribution Platform',
        description: finalDesc,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#organization` }
      }
    ]
  };
}

/**
 * Generates Schema.org JSON-LD for Submit/Publish page.
 */
function buildSubmitSchema(finalDesc, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#submitpage`,
        url: canonicalUrl,
        name: 'Publish & Host SVG Icons — Open Vector Publishing Platform | SVGSpace',
        description: finalDesc,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${BASE_URL}/#website` }
      },
      {
        '@type': 'HowTo',
        '@id': `${canonicalUrl}#howto`,
        name: 'How to Publish and Host SVG Icons on SVGSpace',
        description: 'Upload your single vector or multi-variant icon pack. Our 7-minute ingestion pipeline validates, optimizes, packages, and provisions live shareable pages and CDN links.',
        totalTime: 'PT7M',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload Vector Assets',
            text: 'Provide icon name, slug, brand colors, and upload your SVG files for default, mono, dark, light, and wordmark variants.'
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: '7-Minute Ingestion Pipeline',
            text: 'Processing engine optimizes paths, removes unnecessary metadata, detects hex swatches, and hosts the asset.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Share and Integrate',
            text: 'Access your live shareable preview URL, install via NPM (npx @svgspace/icons add <slug>), or copy React/Vue/Svelte code.'
          }
        ]
      }
    ]
  };
}

/**
 * Generates Schema.org JSON-LD for Blog page.
 */
function buildBlogSchema(finalDesc, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${canonicalUrl}#blog`,
        url: canonicalUrl,
        name: 'SVG Engineering Blog — Design Systems, Vector Optimization & Dev Guides | SVGSpace',
        description: finalDesc,
        inLanguage: 'en-US',
        publisher: { '@id': `${BASE_URL}/#organization` },
        isPartOf: { '@id': `${BASE_URL}/#website` }
      }
    ]
  };
}

/**
 * Generates Schema.org JSON-LD for Status page.
 */
function buildStatusSchema(finalDesc, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#statuspage`,
        url: canonicalUrl,
        name: 'SVGSpace Platform Status — Global CDN & Vector Ingestion Health',
        description: finalDesc,
        inLanguage: 'en-US',
        isPartOf: { '@id': `${BASE_URL}/#website` }
      }
    ]
  };
}

/**
 * Main SEO update function — call on every view or icon change.
 */
export function updatePageSeo({
  title,
  description,
  icon = null,
  category = null,
  view = 'icons'
}) {
  if (typeof document === 'undefined') return;

  // ── Default (Homepage) ─────────────────────────────────────────
  let finalTitle = 'SVGSpace — Free Open-Source SVG Hosting, Publishing & Distribution Platform | 6,500+ Vectors';
  let finalDesc =
    'SVGSpace is the free, open-source SVG hosting, publishing, and distribution platform. Upload individual icons or complete multi-variant icon packs. Ingestion pipeline validates, optimizes, packages, and hosts them with live shareable preview pages, NPM package distribution, global CDN delivery, and ready-to-use React, React Native, Next.js, Vue, Svelte, and HTML code.';
  let finalKeywords = `${BRAND_KEYWORDS_BASE}, ${TECH_ICON_KEYWORDS}, svg hosting, svg publishing, vector distribution platform, react jsx icons, vue component icons, svelte icons, angular icons, liquid glass icons, brand logos svg, npm svg icons`;
  let canonicalUrl = BASE_URL + '/';
  let schema = null;

  // ── Icon Detail Page ───────────────────────────────────────────
  if (icon) {
    const iconName = icon.name || icon.title || icon.slug || 'Brand';
    const slug = icon.slug || icon.id;
    const cats = Array.isArray(icon.categories) && icon.categories.length > 0
      ? icon.categories : (icon.category ? [icon.category] : ['Developer Assets']);
    const catsStr = cats.join(', ');
    const iconUrl = `${BASE_URL}/icons/${slug}/${slug}.svg`;

    finalTitle = `${iconName} SVG Icon & Logo — Free Hosting, NPM Package, React JSX, Vue 3, CDN | SVGSpace`;
    finalDesc = `Download, host, and embed the free ${iconName} SVG vector icon and brand logo on SVGSpace. Dedicated live preview page, NPM package (npx @svgspace/icons add ${slug}), CDN endpoint, and instant React JSX, React Native, Next.js, Vue 3, Svelte, or raw SVG code. Category: ${catsStr}. License: ${icon.license || 'Public Domain'}.`;
    finalKeywords = buildIconKeywords(icon);
    canonicalUrl = `${BASE_URL}/icon/${slug}`;
    schema = buildIconSchema(icon, iconUrl, finalDesc, canonicalUrl);
  }

  // ── Category Page ──────────────────────────────────────────────
  else if (category && category !== 'all') {
    finalTitle = `${category} SVG Icons & Packs — Free Hosting, NPM & Download | SVGSpace`;
    finalDesc = `Browse, host, and download free ${category} SVG icons and brand packs on SVGSpace. Dedicated live shareable pages, NPM package installation, instant React JSX, Vue 3, Angular, Svelte, and PNG high-res export. Public Domain (CC0 1.0) dedicated.`;
    finalKeywords = [
      `${category} svg icons`,
      `${category} svg logo`,
      `${category} vector icons`,
      `${category} logos download`,
      `${category} icons free`,
      `${category} brand svg`,
      `${category} developer icons`,
      BRAND_KEYWORDS_BASE
    ].join(', ');
    canonicalUrl = `${BASE_URL}/category/${encodeURIComponent(category)}`;
    schema = buildCategorySchema(category, finalDesc, canonicalUrl);
  }

  // ── About / Info Page ──────────────────────────────────────────
  else if (view === 'about' || view === 'info') {
    finalTitle = 'About SVGSpace — Free Open-Source SVG Hosting, Publishing & Distribution Platform';
    finalDesc = 'Learn about SVGSpace — the free open-source vector hosting platform. Upload single icons or packs, fast 7-min ingestion pipeline, live shareable preview pages, NPM package distribution, global CDN delivery, and zero-telemetry browser caching.';
    finalKeywords = 'about svg.io, svg hosting, svg publishing platform, vector distribution, open source icon library, vector platform specs, shareable icon pages, npm svg icons';
    canonicalUrl = `${BASE_URL}/?view=about`;
    schema = buildAboutSchema(finalDesc, canonicalUrl);
  }

  // ── Categories Page ────────────────────────────────────────────
  else if (view === 'categories') {
    finalTitle = 'All SVG Icon Categories & Collections — 6,500+ Vectors | SVGSpace';
    finalDesc = 'Browse all 6,500+ hosted vector brand icons organized across Software, AI, Cloud, Frameworks, Liquid Glass, Pakistani Brands, DevOps, and 50+ developer tool categories on SVGSpace.';
    finalKeywords = 'svg icon categories, brand logo categories, software icons, ai icons, cloud icons, framework icons, devops icons, liquid glass icons, developer tool icons, svg io categories, browse svg icons';
    canonicalUrl = `${BASE_URL}/?view=categories`;
  }

  // ── Submit / Contribute Page ───────────────────────────────────
  else if (view === 'submit') {
    finalTitle = 'Publish & Host SVG Icons — Open Vector Publishing Platform | SVGSpace';
    finalDesc = 'Publish and host your SVG icons and multi-variant packs on SVGSpace. 7-minute ingestion pipeline validates viewBoxes, optimizes paths, creates dedicated shareable live web pages, generates NPM package support, and delivers fast CDN links under Public Domain (CC0 1.0).';
    finalKeywords = 'publish svg, host svg icons, upload icon pack, open source vector hosting, svg distribution, svg ingestion pipeline, developer icon publishing, npm icon publishing';
    canonicalUrl = `${BASE_URL}/?view=submit`;
    schema = buildSubmitSchema(finalDesc, canonicalUrl);
  }

  // ── Blog Page ──────────────────────────────────────────────────
  else if (view === 'blog') {
    finalTitle = 'SVG Engineering Blog — Design Systems, Vector Optimization & Dev Guides | SVGSpace';
    finalDesc = 'Read in-depth engineering guides, SVG vector optimization best practices, React and Vue component tutorials, design system articles, and NPM package distribution guides from the SVGSpace team.';
    finalKeywords = 'svg blog, svg engineering, vector optimization, react svg tutorial, design systems guide, svg component, svg io blog, developer design guide, frontend engineering';
    canonicalUrl = `${BASE_URL}/?view=blog`;
    schema = buildBlogSchema(finalDesc, canonicalUrl);
  }

  // ── Favorites Page ─────────────────────────────────────────────
  else if (view === 'favorites') {
    finalTitle = 'Your Saved SVG Icons Collection — SVGSpace';
    finalDesc = 'View, organize, and batch export your personal saved SVG icon collection on SVGSpace. Download favorites in multi-variant ZIP bundles, React JSX components, Vue, PNG, or raw SVG format.';
    finalKeywords = 'saved svg icons, svg favorites, personal icon collection, svg io bookmarks, batch svg export';
    canonicalUrl = `${BASE_URL}/?view=favorites`;
  }

  // ── Status Page ────────────────────────────────────────────────
  else if (view === 'status') {
    finalTitle = 'Platform Status & CDN Health — SVGSpace';
    finalDesc = 'Real-time service health, edge network latency, and uptime monitoring across the global SVGSpace vector delivery infrastructure and ingestion pipeline.';
    finalKeywords = 'svg io status, platform health, edge cdn uptime, vector ingestion pipeline status, svg.io monitoring';
    canonicalUrl = `${BASE_URL}/?view=status`;
    schema = buildStatusSchema(finalDesc, canonicalUrl);
  }

  // ── Privacy Page ───────────────────────────────────────────────
  else if (view === 'privacy') {
    finalTitle = 'Privacy Policy — Zero Tracking, Local-First Storage | SVGSpace';
    finalDesc = 'SVGSpace collects no user data, has zero telemetry, and stores all preferences locally in your browser via IndexedDB and localStorage. Read our full privacy policy.';
    finalKeywords = 'svg io privacy policy, zero tracking, local first, no telemetry, browser storage, svg.io privacy';
    canonicalUrl = `${BASE_URL}/?view=privacy`;
  }

  // ── Terms Page ─────────────────────────────────────────────────
  else if (view === 'terms' || view === 'trademark' || view === 'legal') {
    finalTitle = 'Terms of Use & Public Domain Licensing — SVGSpace';
    finalDesc = 'All SVGSpace vector icons are published under Creative Commons CC0 1.0 Universal Public Domain Dedication. Read our terms of service and trademark policies.';
    finalKeywords = 'svg io terms, public domain, cc0 license, creative commons, free to use svg, commercial use svg, svg io legal, trademark policy';
    canonicalUrl = `${BASE_URL}/?view=terms`;
  }

  // ── Official License Page ──────────────────────────────────────
  else if (view === 'license' || view === 'cc0') {
    finalTitle = 'Creative Commons Legal Code (CC0 1.0 Universal) — SVGSpace';
    finalDesc = 'Read the official verbatim Creative Commons CC0 1.0 Universal Public Domain Dedication legal text for all vector assets hosted on SVGSpace.';
    finalKeywords = 'cc0 1.0 universal, creative commons legal code, public domain dedication, cc0 text, open source vectors, svg space license';
    canonicalUrl = `${BASE_URL}/?view=license`;
  }

  // ── 404 Not Found Page ─────────────────────────────────────────
  else if (view === '404') {
    finalTitle = 'Page or Asset Not Found (404) — SVGSpace';
    finalDesc = 'The page or vector icon collection you requested could not be found on SVGSpace. Search 6,500+ free brand logos and developer tools.';
    finalKeywords = BRAND_KEYWORDS_BASE;
    canonicalUrl = `${BASE_URL}/?view=404`;
  }

  // ── 500 Server Error Page ──────────────────────────────────────
  else if (view === '500') {
    finalTitle = 'Service Temporarily Unavailable (500) — SVGSpace';
    finalDesc = 'An unexpected server issue occurred on SVGSpace. Our systems are working to restore service.';
    finalKeywords = BRAND_KEYWORDS_BASE;
    canonicalUrl = `${BASE_URL}/?view=500`;
  }

  // ── Override with manual props ─────────────────────────────────
  if (title) finalTitle = title;
  if (description) finalDesc = description;

  // ── Apply Title ────────────────────────────────────────────────
  document.title = finalTitle;

  // ── Meta tag helper ────────────────────────────────────────────
  const setMeta = (attr, key, content) => {
    if (!content) return;
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  const removeMeta = (attr, key) => {
    const el = document.querySelector(`meta[${attr}="${key}"]`);
    if (el) el.remove();
  };

  // ── Icon-specific image & article signals ──────────────────────
  const ogImage = icon
    ? `${BASE_URL}/icons/${icon.slug || icon.id}/${icon.slug || icon.id}.svg`
    : `${BASE_URL}/assets/og-image.png`;
  const todayISO = new Date().toISOString();

  // ── Standard Meta ──────────────────────────────────────────────
  setMeta('name', 'description', finalDesc);
  setMeta('name', 'keywords', finalKeywords);
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  setMeta('name', 'googlebot', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // ── Open Graph ─────────────────────────────────────────────────
  setMeta('property', 'og:title', finalTitle);
  setMeta('property', 'og:description', finalDesc);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:type', icon ? 'article' : 'website');
  setMeta('property', 'og:site_name', 'SVGSpace');
  setMeta('property', 'og:locale', 'en_US');
  setMeta('property', 'og:image', ogImage);
  setMeta('property', 'og:image:secure_url', ogImage);
  setMeta('property', 'og:image:alt', icon
    ? `${icon.name || icon.title} SVG vector icon and brand logo — free hosting on SVGSpace`
    : 'SVGSpace — Free Open-Source SVG Hosting & Publishing Platform with 6,500+ vectors'
  );
  setMeta('property', 'og:image:width', icon ? '512' : '1200');
  setMeta('property', 'og:image:height', icon ? '512' : '630');
  setMeta('property', 'og:image:type', icon ? 'image/svg+xml' : 'image/png');

  // ── Article tags (for icon pages, helps search engines & discover) ─
  if (icon) {
    setMeta('property', 'article:published_time', icon.dateAdded ? `${icon.dateAdded}T00:00:00Z` : todayISO);
    setMeta('property', 'article:modified_time', todayISO);
    setMeta('property', 'article:author', 'https://github.com/SVGSpace');
    setMeta('property', 'article:section', (Array.isArray(icon.categories) && icon.categories[0]) || icon.category || 'Developer Icons');
    setMeta('property', 'article:tag', icon.name || icon.title || '');
  } else {
    // Purge article tags when not on icon page
    removeMeta('property', 'article:published_time');
    removeMeta('property', 'article:modified_time');
    removeMeta('property', 'article:author');
    removeMeta('property', 'article:section');
    removeMeta('property', 'article:tag');
  }

  // ── Twitter / X Card ──────────────────────────────────────────
  setMeta('name', 'twitter:title', finalTitle);
  setMeta('name', 'twitter:description', finalDesc);
  setMeta('name', 'twitter:url', canonicalUrl);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:image', ogImage);
  setMeta('name', 'twitter:image:alt', icon
    ? `${icon.name || icon.title} SVG Vector Icon — SVGSpace`
    : 'SVGSpace Free SVG Hosting & Icon Library'
  );
  if (icon) {
    const slug = icon.slug || icon.id || '';
    setMeta('name', 'twitter:label1', 'NPM Install');
    setMeta('name', 'twitter:data1', `npx @svgspace/icons add ${slug}`);
    setMeta('name', 'twitter:label2', 'License');
    setMeta('name', 'twitter:data2', icon.license || 'Public Domain — CC0 1.0');
  } else {
    setMeta('name', 'twitter:label1', 'Platform');
    setMeta('name', 'twitter:data1', 'SVG Hosting & Publishing');
    setMeta('name', 'twitter:label2', 'License');
    setMeta('name', 'twitter:data2', 'Public Domain (CC0 1.0 Universal)');
  }

  // ── Canonical ─────────────────────────────────────────────────
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // ── Dynamic JSON-LD Structured Data ──────────────────────────
  let jsonLdEl = document.getElementById('sv-dynamic-jsonld');
  if (schema) {
    if (!jsonLdEl) {
      jsonLdEl = document.createElement('script');
      jsonLdEl.id = 'sv-dynamic-jsonld';
      jsonLdEl.type = 'application/ld+json';
      document.head.appendChild(jsonLdEl);
    }
    jsonLdEl.textContent = JSON.stringify(schema);
  } else if (jsonLdEl) {
    jsonLdEl.remove();
  }
}

