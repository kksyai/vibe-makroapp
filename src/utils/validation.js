export function validateItem(item) {
  const errors = {};

  if (!item.name || item.name.trim().length === 0) {
    errors.name = "Product name is required";
  }

  if (!item.categoryEdit) {
    errors.categoryEdit = "Edit category is required";
  }

  if (!item.categoryShop) {
    errors.categoryShop = "Shop category is required";
  }

  if (item.quantity !== undefined && item.quantity < 0) {
    errors.quantity = "Quantity must be 0 or greater";
  }

  const hasErrors = Object.keys(errors).length > 0;
  return { isValid: !hasErrors, errors };
}

export function normalizeName(name) {
  const trimmed = (name ?? "").trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function normalizeCategory(category) {
  return (category ?? "").trim() || null;
}

export function getStepForUnit(unit) {
  return unit === "kg" ? 0.1 : 1;
}

export function parseQuantity(value, unit) {
  if (unit === "kg" || unit === "g" || unit === "l") {
    return parseFloat(value) || 0;
  }
  return parseInt(value, 10) || 0;
}

export function roundQuantity(value, unit) {
  if (unit === "kg") {
    return Math.max(0, Math.round(value * 10) / 10);
  }
  return Math.max(0, Math.round(value));
}
