export function compressItems(items) {
  const compressed = items.map(item => ({
    n: item.name,
    q: item.quantity,
    u: item.unit,
    e: item.categoryEdit,
    s: item.categoryShop,
    c: item.checked,
    o: item.order,
    a: item.createdAt
  }));
  return btoa(JSON.stringify(compressed));
}

export function decompressItems(str) {
  try {
    if (!str) return null;
    const parsed = JSON.parse(atob(str));
    return parsed.map(item => ({
      id: generateId(),
      name: item.n,
      quantity: item.q,
      unit: item.u,
      categoryEdit: item.e,
      categoryShop: item.s,
      checked: item.c || false,
      order: item.o,
      createdAt: item.a || Date.now()
    }));
  } catch {
    return null;
  }
}

export function generateId() {
  return (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).toString();
}

export function getShareUrl(items) {
  const encoded = compressItems(items || []);
  if (!encoded) return null;
  const url = new URL(window.location.href);
  url.searchParams.set("shared", encoded);
  return url.toString();
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
