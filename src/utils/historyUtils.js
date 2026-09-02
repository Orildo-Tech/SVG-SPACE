const SEARCH_HISTORY_KEY = 'orildo_search_history';

export function getSearchHistory() {
  try {
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
    return saved ? JSON.parse(saved) : ['user', 'arrow', 'settings', 'download'];
  } catch {
    return ['user', 'arrow', 'settings', 'download'];
  }
}

export function saveSearchHistoryItem(query) {
  const trimmed = typeof query === 'string' ? query.trim() : '';
  if (!trimmed || trimmed.length < 2) return getSearchHistory();

  try {
    const prev = getSearchHistory();
    const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, 10);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn(e);
    return [];
  }
}

export function removeSearchHistoryItem(itemToRemove) {
  try {
    const prev = getSearchHistory();
    const updated = prev.filter((item) => item !== itemToRemove);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearSearchHistory() {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    return [];
  } catch {
    return [];
  }
}