const DB_NAME = 'svgio_browser_cache_db';
const DB_VERSION = 2;

const STORES = {
  CATALOG: 'catalog_cache',
  FAVORITES: 'favorites_cache',
  SVG_TEXTS: 'svg_vectors_cache',
  USER_DATA: 'user_data_cache'
};

const CACHE_KEYS = {
  CATALOG: 'icons_metadata_v2',
  FAVORITES: 'orildo_svg_favorites',
  CUSTOM_CATS: 'svgio_custom_created_categories',
  SEARCH_HISTORY: 'orildo_svg_search_history',
  THEME: 'orildo_svg_theme'
};

let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        resolve(null);
        return;
      }
      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          Object.values(STORES).forEach((storeName) => {
            if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName);
            }
          });
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (err) {
        console.warn('IndexedDB init error:', err);
        resolve(null);
      }
    });
  }
  return dbPromise;
}

export async function getCachedCatalog() {
  try {
    const db = await getDB();
    if (db) {
      const dbResult = await new Promise((resolve) => {
        const tx = db.transaction(STORES.CATALOG, 'readonly');
        const store = tx.objectStore(STORES.CATALOG);
        const req = store.get(CACHE_KEYS.CATALOG);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });
      if (dbResult) return dbResult;
    }
  } catch (err) {
    console.warn('IDB getCatalog error:', err);
  }

  try {
    const raw = localStorage.getItem(CACHE_KEYS.CATALOG);
    if (raw) return JSON.parse(raw);
  } catch {}

  return null;
}

export async function setCachedCatalog(data) {
  if (!data) return;

  try {
    const db = await getDB();
    if (db) {
      const tx = db.transaction(STORES.CATALOG, 'readwrite');
      const store = tx.objectStore(STORES.CATALOG);
      store.put(data, CACHE_KEYS.CATALOG);
    }
  } catch (err) {
    console.warn('IDB setCatalog error:', err);
  }

  try {
    const lightSnapshot = {
      totalIcons: data.totalIcons,
      categoryCount: data.categoryCount,
      categories: data.categories,
      timestamp: Date.now()
    };
    localStorage.setItem('svgio_catalog_summary', JSON.stringify(lightSnapshot));
  } catch {}
}

export async function getCachedFavorites() {
  let list = [];

  try {
    const raw = localStorage.getItem(CACHE_KEYS.FAVORITES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) list = parsed;
    }
  } catch {}

  if (list.length > 0) return list;

  try {
    const db = await getDB();
    if (db) {
      const idbList = await new Promise((resolve) => {
        const tx = db.transaction(STORES.FAVORITES, 'readonly');
        const store = tx.objectStore(STORES.FAVORITES);
        const req = store.get(CACHE_KEYS.FAVORITES);
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
      if (Array.isArray(idbList) && idbList.length > 0) {
        try {
          localStorage.setItem(CACHE_KEYS.FAVORITES, JSON.stringify(idbList));
        } catch {}
        return idbList;
      }
    }
  } catch {}

  return list;
}

export async function setCachedFavorites(favorites = []) {
  if (!Array.isArray(favorites)) return;

  try {
    localStorage.setItem(CACHE_KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (err) {
    console.warn('LocalStorage favorites write error:', err);
  }

  try {
    const db = await getDB();
    if (db) {
      const tx = db.transaction(STORES.FAVORITES, 'readwrite');
      const store = tx.objectStore(STORES.FAVORITES);
      store.put(favorites, CACHE_KEYS.FAVORITES);
    }
  } catch (err) {
    console.warn('IDB favorites sync error:', err);
  }
}

export async function getCachedSvgVector(key) {
  if (!key) return null;
  try {
    const db = await getDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STORES.SVG_TEXTS, 'readonly');
      const store = tx.objectStore(STORES.SVG_TEXTS);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function setCachedSvgVector(key, svgContent) {
  if (!key || !svgContent) return;
  try {
    const db = await getDB();
    if (!db) return;
    const tx = db.transaction(STORES.SVG_TEXTS, 'readwrite');
    const store = tx.objectStore(STORES.SVG_TEXTS);
    store.put(svgContent, key);
  } catch {}
}

const preloadedUrls = new Set();

export function preloadIconBatch(icons = [], count = 48) {
  if (typeof window === 'undefined' || !Array.isArray(icons)) return;

  const batch = icons.slice(0, count);
  const schedulePreload = () => {
    batch.forEach((icon) => {
      const url = icon.path || `/icons/${icon.slug || icon.id}/default.svg`;
      if (!preloadedUrls.has(url)) {
        preloadedUrls.add(url);
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      }
    });
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(schedulePreload, { timeout: 1000 });
  } else {
    setTimeout(schedulePreload, 100);
  }
}
