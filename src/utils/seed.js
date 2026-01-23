import listContent from "../../list.md?raw";
import { generateId } from "./share";
import { normalizeName } from "./validation";

const DEFAULT_SHOP_CATEGORY = "Jars";

function parseSeedList(raw) {
  if (!raw) return [];

  const lines = raw.split(/\r?\n/);
  const items = [];
  let currentCategory = "";
  let order = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("##")) {
      currentCategory = trimmed.replace(/^#+\s*/, "").trim();
      continue;
    }

    const name = normalizeName(trimmed);
    if (!name) continue;

    items.push({
      id: generateId(),
      name,
      quantity: 0,
      unit: "pcs",
      categoryEdit: currentCategory || "Uncategorized",
      categoryShop: DEFAULT_SHOP_CATEGORY,
      checked: false,
      order: order,
      createdAt: Date.now()
    });

    order += 1;
  }

  return items;
}

export function getSeedItems() {
  return parseSeedList(listContent);
}
