# Architecture Documentation

This document describes the system architecture, technical decisions, and design patterns used in SVG-SPACE.

## System Overview

SVG-SPACE is a modern web application built with a focus on performance, scalability, and developer experience. The architecture follows a client-server model with edge computing capabilities.

## Technology Stack

### Frontend

- **React 18.3.1**: Component-based UI framework
- **Vite 6.1.0**: Fast build tool and development server
- **Tailwind CSS 4.3.3**: Utility-first CSS framework
- **Hummingbird UI**: Pre-built component library
- **Lucide React**: Icon set for UI elements
- **Fuse.js**: Fuzzy search implementation
- **JSZip**: ZIP file generation for bulk downloads
- **file-saver**: Client-side file saving

### Backend

- **Cloudflare Workers**: Edge computing for API endpoints
- **Supabase**: Backend-as-a-Service for database and storage
- **Cloudflare Pages**: Static site hosting with edge caching

### Build Tools

- **Vite**: Build system and development server
- **@vitejs/plugin-react**: React support for Vite
- **Wrangler**: Cloudflare Workers deployment tool

## Project Structure

```
SVG-SPACE/
├── docs/                      # Documentation
├── public/                    # Static assets
│   ├── icons/                # SVG icon files
│   ├── icons.json            # Icon metadata registry
│   ├── posts.json            # Blog post content
│   ├── sitemap.xml           # SEO sitemap
│   └── feed.xml              # RSS feed
├── src/
│   ├── components/           # React components
│   ├── styles/              # CSS styles
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Entry point
├── functions/               # Cloudflare Workers
├── scripts/                 # Build and processing scripts
├── supabase/               # Supabase edge functions
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── wrangler.toml           # Cloudflare Workers config
```

## Component Architecture

### Core Components

#### App Component
The main application component that manages:
- Global state (icons, favorites, theme, search)
- Routing and navigation
- SEO metadata updates
- Keyboard shortcuts

#### Header Component
Navigation header with:
- Logo and branding
- Search functionality with fuzzy search
- Theme toggle (dark/light mode)
- Favorites counter
- GitHub link

#### Sidebar Component
Category navigation with:
- Category list with counts
- Search within categories
- Active category highlighting
- Submit icon button

#### IconGrid Component
Displays icons in a responsive grid with:
- Lazy loading
- Variant indicators
- Favorite toggles
- Click-to-view functionality

#### IconDetailPage Component
Individual icon page featuring:
- Live SVG preview
- Variant selector
- Code export (React, Vue, Svelte, etc.)
- Download options (PNG, JPG, WebP, ICO)
- CDN URL generation
- Social sharing

## Data Flow

### Icon Loading

1. **Initial Load**: Check IndexedDB cache for existing catalog
2. **Fallback**: Fetch from `/icons.json` if cache miss
3. **Normalization**: Convert raw data to standardized format
4. **Caching**: Store normalized data in IndexedDB
5. **Display**: Render icon grid with preloaded images

### Search Flow

1. **Input**: User types in search bar
2. **Fuzzy Search**: Fuse.js searches across icon metadata
3. **Filtering**: Results filtered by selected category
4. **Display**: Update grid with filtered results
5. **History**: Save search to local storage

### Icon Submission

1. **Upload**: User submits icon via form
2. **Validation**: Client-side validation of SVG files
3. **API Call**: Send to Cloudflare Workers endpoint
4. **Processing**: Supabase edge function processes submission
5. **Storage**: SVG files stored in Supabase storage
6. **Database**: Metadata stored in Supabase database
7. **GitHub Dispatch**: Trigger GitHub Actions for processing
8. **Ingestion**: Process script updates icons.json and creates files

## Caching Strategy

### IndexedDB

Used for:
- Icon catalog metadata
- Individual SVG content
- User favorites
- Search history

Benefits:
- Fast access (<10ms after initial load)
- Offline capability
- Reduced API calls

### Local Storage

Used for:
- Theme preference
- Simple flags and counters

### CDN Caching

- jsDelivr for icon files
- Cloudflare CDN for static assets
- Browser cache headers for static content

## Performance Optimizations

### Code Splitting

- Dynamic imports for heavy components
- Route-based code splitting
- Lazy loading of icon images

### Build Optimizations

- Tree shaking to remove unused code
- Minification of JavaScript and CSS
- Image optimization for static assets
- Gzip compression for production builds

### Runtime Optimizations

- Debounced search input
- Virtual scrolling for large lists
- Memoization of expensive computations
- RequestAnimationFrame for animations

## Security Considerations

### Input Validation

- SVG content sanitization
- File type validation
- Size limits for uploads
- XSS prevention

### API Security

- CORS configuration
- Rate limiting on submission endpoints
- Environment variable protection
- Supabase RLS policies

### Content Security

- Content Security Policy headers
- Subresource integrity for external scripts
- HTTPS enforcement in production

## Scalability Considerations

### Horizontal Scaling

- Cloudflare Workers automatically scale
- Supabase handles database scaling
- CDN distributes static assets globally

### Database Design

- Indexed queries for common searches
- Efficient data types for storage
- Proper indexing on frequently accessed fields

### Asset Management

- Separate storage for SVG files
- CDN distribution for static assets
- Optimized image generation for exports

## Monitoring and Maintenance

### Error Handling

- React Error Boundary for UI errors
- Try-catch blocks for async operations
- Graceful degradation for missing assets

### Logging

- Console logging for development
- Error tracking integration (optional)
- Performance monitoring

### Updates

- Automated build pipeline
- Database migration strategy
- Version compatibility checks

## Design Decisions

### Technology Choices

**React over Vue/Angular**: 
- Larger ecosystem and community
- Better performance for large applications
- Familiar to most developers

**Vite over Webpack**:
- Faster development server
- Simpler configuration
- Better HMR performance

**Supabase over Custom Backend**:
- Reduced development time
- Built-in authentication
- Real-time capabilities
- Easier maintenance

**Cloudflare Workers over Traditional Server**:
- Edge computing benefits
- Automatic scaling
- Lower latency
- Cost efficiency

### Architectural Patterns

**Component Composition**: Reusable, focused components with clear responsibilities

**State Management**: React hooks for local state, no global state management library needed

**API Design**: RESTful API with JSON responses, following REST conventions

**Data Normalization**: Consistent data structure across application layers

## Documentation Standards

This architecture document follows professional documentation standards:

- Clear section organization
- Technical depth appropriate for developers
- Code examples for complex concepts
- Cross-references to related documentation
- Regular updates to match system changes