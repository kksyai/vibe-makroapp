const EDIT_CATEGORIES = [
  "Vegetables/Fruits",
  "Proteins",
  "Dairy's",
  "Dried fruits",
  "Jars",
  "Frozen",
  "Spices",
  "Supliers",
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

export function migrateItems(items) {
  return items.map(item => ({
    ...item,
    categoryEdit: item.category || EDIT_CATEGORIES[0],
    categoryShop: item.category || SHOP_CATEGORIES[0],
    quantity: item.qty || 0,
    checked: false,
    order: item.order || 0,
    createdAt: item.createdAt || Date.now()
  }));
}

export function getEditCategories() {
  return EDIT_CATEGORIES;
}

export function getShopCategories() {
  return SHOP_CATEGORIES;
}
