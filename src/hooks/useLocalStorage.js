import { useState, useEffect } from "react";
import { saveItems, loadItems } from "../utils/storage";
import { decompressItems } from "../utils/share";
import { migrateItems } from "../utils/migration";

export function useLocalStorage() {
  const [items, setItems] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const shared = params.get("shared");
      const parsed = decompressItems(shared);
      if (Array.isArray(parsed) && parsed.length >= 0) {
        return parsed;
      }
    } catch (err) {
      console.error("Failed to parse shared items:", err);
    }

    const loaded = loadItems();
    if (loaded.length > 0) {
      return migrateItems(loaded);
    }
    return [];
  });

  useEffect(() => {
    saveItems(items);
  }, [items]);

  return { items, setItems };
}
