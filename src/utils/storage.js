const STORAGE_KEY = "vibe_groceries_v2";

export function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearItems() {
  localStorage.removeItem(STORAGE_KEY);
}
