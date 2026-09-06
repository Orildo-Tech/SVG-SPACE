# API Documentation

This document describes the API endpoints and usage for the SVG-SPACE platform.

## Base URL

- Production: `https://svgspace.sbs`
- Development: `http://localhost:3000`

## Authentication

Currently, most endpoints are publicly accessible. Future versions may include API key authentication for rate limiting and access control.

## Endpoints

### Icon Data

#### Get All Icons

```http
GET /icons.json
```

Returns metadata for all icons in the library.

**Response:**
```json
{
  "totalIcons": 6500,
  "categoryCount": 50,
  "categories": [
    {
      "name": "Software",
      "count": 1200
    }
  ],
  "icons": [
    {
      "id": "react",
      "slug": "react",
      "name": "React",
      "title": "React",
      "category": "Software",
      "categories": ["Software", "Frontend"],
      "hex": "#61DAFB",
      "hexes": ["#61DAFB", "#20232A"],
      "url": "https://react.dev",
      "license": "MIT",
      "path": "/icons/react/default.svg",
      "variants": ["default", "mono", "dark", "light"],
      "variantPaths": {
        "default": "/icons/react/default.svg",
        "mono": "/icons/react/mono.svg",
        "dark": "/icons/react/dark.svg",
        "light": "/icons/react/light.svg"
      },
      "variantCount": 4,
      "availableVariants": ["default", "mono", "dark", "light"],
      "dateAdded": "2026-09-05",
      "collection": "brands"
    }
  ]
}
```

#### Get Icon SVG

```http
GET /icons/{slug}/{variant}.svg
```

Returns the SVG content for a specific icon variant.

**Parameters:**
- `slug` (required): Icon identifier
- `variant` (required): Variant type (default, mono, dark, light, wordmark)

**Example:**
```http
GET /icons/react/default.svg
```

**Response:** SVG file content

### Icon Submission

#### Submit New Icon

```http
POST /api/submit-icon
```

Submits a new icon for processing and inclusion in the library.

**Request Body:**
```json
{
  "slug": "new-icon",
  "title": "New Icon",
  "aliases": ["alias1", "alias2"],
  "hex": "FF5F02",
  "hexes": ["FF5F02", "FFFFFF"],
  "categories": ["Software"],
  "license": "Apache-2.0",
  "url": "https://example.com",
  "variants": {
    "default": "<svg>...</svg>",
    "mono": "<svg>...</svg>",
    "dark": "<svg>...</svg>",
    "light": "<svg>...</svg>",
    "wordmark": "<svg>...</svg>"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Icon \"New Icon\" submitted! It will appear in the library after processing (usually within 7 minutes).",
  "submission_id": 123,
  "slug": "new-icon",
  "variants": ["default", "mono", "dark", "light", "wordmark"]
}
```

**Error Response:**
```json
{
  "error": "slug and title are required"
}
```

### Blog Posts

#### Get All Posts

```http
GET /posts.json
```

Returns all blog posts.

**Response:**
```json
[
  {
    "slug": "introducing-svgspace",
    "title": "Introducing SVGSpace",
    "excerpt": "Article excerpt",
    "date": "2026-09-05",
    "author": "Orildo Engineering Team",
    "tags": ["launch", "open-source"],
    "body": "Full article content..."
  }
]
```

### Site Map

#### Get Sitemap

```http
GET /sitemap.xml
```

Returns XML sitemap for SEO.

### RSS Feed

#### Get RSS Feed

```http
GET /feed.xml
```

Returns RSS feed of blog posts.

## CDN Usage

### Direct Icon Access

Icons can be accessed directly via CDN:

```
https://svgspace.sbs/icons/{slug}/{variant}.svg
```

**Example:**
```
https://svgspace.sbs/icons/react/default.svg
```

### Image Embedding

```html
<img src="https://svgspace.sbs/icons/react/default.svg" 
     alt="React Logo" 
     width="24" 
     height="24">
```

### CSS Background

```css
.icon {
  background-image: url('https://svgspace.sbs/icons/react/default.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

## NPM Package Usage

### Installation

```bash
npx @orildo/icons add <slug>
```

### React Component

```jsx
import { ReactIcon } from '@orildo/react';

<ReactIcon size={24} className="text-blue-500" />
```

### Vue Component

```vue
<template>
  <ReactIcon :size="24" class="text-blue-500" />
</template>

<script setup>
import { ReactIcon } from '@orildo/vue';
</script>
```

## Error Handling

### HTTP Status Codes

- `200 OK`: Successful request
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `405 Method Not Allowed`: Invalid HTTP method
- `500 Internal Server Error`: Server error

### Error Response Format

```json
{
  "error": "Error message description"
}
```

## Rate Limiting

Currently, there are no rate limits on public API endpoints. Future implementations may include:

- 100 requests per minute per IP
- 1000 requests per hour per IP
- API key authentication for higher limits

## CORS

The API supports CORS for cross-origin requests. Allowed origins include all domains for public endpoints.

## Caching

### Cache Headers

- Icon files: 1 hour cache
- JSON data: 15 minute cache
- HTML pages: No cache

### CDN Caching

- jsDelivr CDN for icon files
- Cloudflare CDN for static assets
- Geographic distribution for faster access

## Versioning

The API currently uses no versioning. Future versions will implement:

- `/api/v1/` for current version
- `/api/v2/` for breaking changes
- Backward compatibility for deprecated endpoints

## SDKs and Libraries

### Official Libraries

- `@orildo/react`: React components
- `@orildo/vue`: Vue components
- `@orildo/svelte`: Svelte components
- `@orildo/cli`: Command-line interface

### Third-Party Integrations

- Figma Plugin (planned)
- VS Code Extension (planned)
- Raycast Extension (planned)

## Webhooks

Webhooks are not currently implemented. Future plans include:

- Webhook notifications for new icon submissions
- Webhook notifications for icon updates
- Webhook notifications for category changes

## Support

For API issues or questions:

- GitHub Issues: https://github.com/Orildo-Tech/SVG-SPACE/issues
- GitHub Discussions: https://github.com/Orildo-Tech/SVG-SPACE/discussions

## Changelog

### Version 1.0 (Current)

- Initial API release
- Icon data endpoints
- Submission endpoints
- CDN access
- NPM package integration

### Future Plans

- API authentication
- Rate limiting
- Webhook support
- Advanced search endpoints
- Analytics endpoints