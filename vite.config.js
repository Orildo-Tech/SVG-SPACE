import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-icons-dir-and-submit-api',
      configureServer(server) {
        server.middlewares.use('/api/submit-icon', (req, res, next) => {
          if (req.method !== 'POST') return next();

          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });

          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              const {
                slug,
                title,
                aliases = [],
                hex = 'FF5F02',
                categories = ['Software'],
                variants = {},
                license = 'Apache-2.0',
                url = `https://${slug}.dev`
              } = payload;

              if (!slug || !title) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Slug and title are required' }));
              }

              const rootDir = process.cwd();
              const publicIconDir = path.join(rootDir, 'public', 'icons', slug);

              if (!fs.existsSync(publicIconDir)) {
                fs.mkdirSync(publicIconDir, { recursive: true });
              }

              const variantPaths = {};
              const variantKeys = Object.keys(variants);

              if (variantKeys.length === 0) {
                const defaultSvg = payload.svg || '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
                fs.writeFileSync(path.join(publicIconDir, 'default.svg'), defaultSvg, 'utf8');
                variantPaths.default = `/icons/${slug}/default.svg`;
              } else {
                variantKeys.forEach((vKey) => {
                  const svgContent = variants[vKey];
                  const fileName = `${vKey}.svg`;
                  fs.writeFileSync(path.join(publicIconDir, fileName), svgContent, 'utf8');
                  variantPaths[vKey] = `/icons/${slug}/${fileName}`;
                });
              }

              const iconsJsonPath = path.join(rootDir, 'public', 'icons.json');
              let iconsList = [];
              if (fs.existsSync(iconsJsonPath)) {
                try {
                  iconsList = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf8'));
                } catch (e) {
                  iconsList = [];
                }
              }

              const cleanHex = hex.replace(/^#/, '');
              const newEntry = {
                slug,
                title,
                aliases: Array.isArray(aliases) ? aliases : [],
                hex: cleanHex,
                categories: Array.isArray(categories) && categories.length > 0 ? categories : ['Software'],
                variants: variantPaths,
                license,
                url,
                dateAdded: new Date().toISOString().split('T')[0],
                collection: 'community'
              };

              const existingIdx = iconsList.findIndex((i) => (i.slug || i.id) === slug);
              if (existingIdx >= 0) {
                iconsList[existingIdx] = newEntry;
              } else {
                iconsList.unshift(newEntry);
              }

              fs.writeFileSync(iconsJsonPath, JSON.stringify(iconsList, null, 2), 'utf8');

              const metadataPath = path.join(rootDir, 'public', 'icons-metadata.json');
              const pathsJsonPath = path.join(rootDir, 'public', 'icons-paths.json');

              const normalizedIcons = iconsList.map((icon) => {
                const id = icon.slug || icon.id;
                const name = icon.title || icon.name || id;
                const category = (Array.isArray(icon.categories) && icon.categories[0]) || icon.category || 'Software';
                const iHex = icon.hex ? (icon.hex.startsWith('#') ? icon.hex : `#${icon.hex}`) : '#FF5F02';
                const iUrl = icon.url || `https://${id}.dev`;
                const iLicense = icon.license || 'CC0-1.0';

                let iconVariants = [];
                let iVariantPaths = {};

                if (icon.variants && typeof icon.variants === 'object' && !Array.isArray(icon.variants)) {
                  iconVariants = Object.keys(icon.variants);
                  iVariantPaths = icon.variants;
                } else if (Array.isArray(icon.variants)) {
                  iconVariants = icon.variants;
                  iconVariants.forEach((v) => {
                    iVariantPaths[v] = `/icons/${id}/${v}.svg`;
                  });
                } else {
                  iconVariants = ['default'];
                  iVariantPaths = { default: `/icons/${id}/default.svg` };
                }

                const defaultPath = iVariantPaths.default || iVariantPaths[iconVariants[0]] || `/icons/${id}/default.svg`;

                return {
                  id,
                  slug: id,
                  name,
                  title: name,
                  category,
                  categories: Array.isArray(icon.categories) ? icon.categories : [category],
                  hex: iHex,
                  url: iUrl,
                  license: iLicense,
                  path: defaultPath,
                  variants: iconVariants,
                  variantPaths: iVariantPaths,
                  variantCount: iconVariants.length,
                  availableVariants: iconVariants,
                  dateAdded: icon.dateAdded || '2026-03-07',
                  collection: icon.collection || 'brands'
                };
              });

              normalizedIcons.sort((a, b) => {
                if (a.id === 'orildo') return -1;
                if (b.id === 'orildo') return 1;
                return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
              });

              const categoryCounts = {};
              normalizedIcons.forEach((icon) => {
                if (Array.isArray(icon.categories)) {
                  icon.categories.forEach((cat) => {
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
                  });
                } else if (icon.category) {
                  categoryCounts[icon.category] = (categoryCounts[icon.category] || 0) + 1;
                }
              });

              const categoriesArray = Object.keys(categoryCounts)
                .map((name) => ({
                  name,
                  count: categoryCounts[name]
                }))
                .sort((a, b) => a.name.localeCompare(b.name));

              const newMetadata = {
                generatedAt: new Date().toISOString(),
                totalIcons: normalizedIcons.length,
                categoryCount: categoriesArray.length,
                categories: categoriesArray,
                icons: normalizedIcons
              };

              const iconPaths = {};
              normalizedIcons.forEach((icon) => {
                iconPaths[icon.id] = icon.path;
              });

              fs.writeFileSync(metadataPath, JSON.stringify(newMetadata, null, 2));
              fs.writeFileSync(pathsJsonPath, JSON.stringify(iconPaths, null, 2));

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, icon: newEntry, totalIcons: normalizedIcons.length }));
            } catch (err) {
              console.error('Error submitting icon:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: err.message }));
            }
          });
        });

        server.middlewares.use('/icons', (req, res, next) => {
          const iconPath = path.join(process.cwd(), 'public', 'icons', decodeURIComponent(req.url || ''));
          if (fs.existsSync(iconPath) && fs.statSync(iconPath).isFile()) {
            res.setHeader('Content-Type', 'image/svg+xml');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            return fs.createReadStream(iconPath).pipe(res);
          }
          next();
        });
      }
    }
  ],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  server: {
    port: 3000,
    open: false,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000
  }
});
