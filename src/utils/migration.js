const EDIT_CATEGORIES = [
  "Vegetables/Fruits",
  "Proteins",
  "Dairy's",
  "Dried fruits",
  "Jars",
  "Frozen",
  "Spices",
  "Suppliers",
  "Oils",
  "Bread"
];

const SHOP_CATEGORIES = [
  "Fruits & Vegetables",
  "Dairy",
  "Meat & Fish",
  "Nuts",
  "Canned Goods",
  "Frozen Foods",
  "Baking",
  "Spices & Herbs",
  "Pasta & Grains",
  "Alcohol",
  "Drinks",
  "Household"
];

function normalizeCategory(category, fallback) {
  const trimmed = (category ?? "").trim();
  if (!trimmed) return fallback;
  if (trimmed === "Supliers") return "Suppliers";
  return trimmed;
}

export function migrateItems(items) {
  return items.map((item) => {
    const categoryEdit = normalizeCategory(
      item.categoryEdit ?? item.category,
      EDIT_CATEGORIES[0]
    );
    const categoryShop = normalizeCategory(
      item.categoryShop ?? item.category,
      SHOP_CATEGORIES[0]
    );

    return {
      ...item,
      categoryEdit,
      categoryShop,
      quantity: item.quantity ?? item.qty ?? 0,
      checked: item.checked ?? false,
      order: item.order ?? 0,
      createdAt: item.createdAt ?? Date.now()
    };
  });
}

export function getEditCategories() {
  return EDIT_CATEGORIES;
}

export function getShopCategories() {
  return SHOP_CATEGORIES;
}
