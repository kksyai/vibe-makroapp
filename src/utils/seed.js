import listContent from "../../list.md?raw";
import { generateId } from "./share";
import { normalizeName } from "./validation";

const DEFAULT_SHOP_CATEGORY = "Jars";
const DEFAULT_UNIT = "pcs";
const UNITS = new Set(["pcs", "kg", "g", "l", "pack"]);

function parseLine(line) {
  const parts = line.split("/").map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) return null;

  if (parts.length >= 3) {
    const unit = parts[parts.length - 2] || DEFAULT_UNIT;
    const shopCategory = parts[parts.length - 1] || DEFAULT_SHOP_CATEGORY;
    const name = parts.slice(0, -2).join("/").trim();
    return {
      name,
      unit,
      shopCategory
    };
  }

  if (parts.length === 2) {
    const potentialUnit = parts[1];
    if (UNITS.has(potentialUnit)) {
      return {
        name: parts[0],
        unit: potentialUnit || DEFAULT_UNIT,
        shopCategory: DEFAULT_SHOP_CATEGORY
      };
    }

    return {
      name: parts[0],
      unit: DEFAULT_UNIT,
      shopCategory: potentialUnit || DEFAULT_SHOP_CATEGORY
    };
  }

  return {
    name: parts[0],
    unit: DEFAULT_UNIT,
    shopCategory: DEFAULT_SHOP_CATEGORY
  };
}

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

    const parsed = parseLine(trimmed);
    if (!parsed) continue;
    const name = normalizeName(parsed.name);
    if (!name) continue;

    items.push({
      id: generateId(),
      name,
      quantity: 0,
      unit: parsed.unit || DEFAULT_UNIT,
      categoryEdit: currentCategory || "Uncategorized",
      categoryShop: parsed.shopCategory || DEFAULT_SHOP_CATEGORY,
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
