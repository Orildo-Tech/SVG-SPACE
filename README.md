# SVG-SPACE

<!-- Preview Image Placeholder -->
<div align="center">
  <img src="assets/logo.png" alt="SVG-SPACE Preview" width="800">
</div>

A free, open-source SVG hosting, publishing, and distribution platform. Upload individual icons or complete multi-variant icon packs with automated processing, live preview pages, NPM package distribution, and global CDN delivery.

## Features

- 6,500+ free SVG icons across 50+ categories
- Multi-variant support (default, mono, dark, light, wordmark)
- Live preview pages for every hosted icon
- NPM package installation via command line
- Global CDN delivery for fast access
- Code export for React, Vue, Svelte, Angular, and HTML
- High-resolution export (PNG, WebP, JPG, ICO, Data URI)
- Zero tracking with local-first storage
- Apache 2.0 license for free commercial use

## Live Site

- Website: https://svgspace.sbs
- GitHub: https://github.com/Orildo-Tech/SVG-SPACE

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Orildo-Tech/SVG-SPACE.git
cd SVG-SPACE

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at http://localhost:3000

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

### Browse Icons

Visit https://svgspace.sbs to browse the icon library, search by name or category, and view detailed icon pages.

### Submit Icons

Use the submission form on the website to upload new icons. The automated processing pipeline validates, optimizes, and hosts icons within 7 minutes.

### Use Icons in Projects

#### NPM Installation

```bash
npx @orildo/icons add <slug>
```

#### React Component

```jsx
import { IconName } from '@orildo/react';

<IconName size={24} className="text-blue-500" />
```

#### CDN Embedding

```html
<img src="https://svgspace.sbs/icons/<slug>/default.svg" 
     alt="Icon Name" 
     width="24" 
     height="24">
```

## Tech Stack

### Frontend
- React 18.3.1 - UI framework
- Vite 6.1.0 - Build tool and dev server
- Tailwind CSS 4.3.3 - Styling
- Hummingbird UI - Component library
- Fuse.js - Fuzzy search

### Backend
- Cloudflare Workers - Edge computing
- Supabase - Database and storage
- Cloudflare Pages - Static hosting

## Contributing

We welcome contributions. Guidelines for contributing:

- Icon submissions: Use the submission form on the website
- Bug reports: Open an issue on GitHub
- Feature requests: Open an issue with the "enhancement" label
- Code contributions: Fork the repository and submit a pull request
- Documentation improvements: Submit pull requests with documentation updates

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

- GitHub Issues: https://github.com/Orildo-Tech/SVG-SPACE/issues
- GitHub Discussions: https://github.com/Orildo-Tech/SVG-SPACE/discussions

## Acknowledgments

- Simple Icons - Original icon collection
- svgl - Color icon variants
- lobe-icons - Additional icon sources
- Orildo-Tech - Platform development and maintenance