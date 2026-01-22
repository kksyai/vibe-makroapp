import { useState, useEffect } from "react";
import "./ItemEditModal.css";
import { getEditCategories, getShopCategories } from "../utils/migration";
import { validateItem, normalizeName, roundQuantity, getStepForUnit } from "../utils/validation";

export default function ItemEditModal({ item, isOpen, onClose, onSave, onDelete }) {
  const editCategories = getEditCategories();
  const shopCategories = getShopCategories();
  const units = ["pcs", "kg", "g", "l", "pack"];

  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    unit: "pcs",
    categoryEdit: "",
    categoryShop: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setTimeout(() => {
        setForm({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          categoryEdit: item.categoryEdit,
          categoryShop: item.categoryShop
        });
        setErrors({});
      }, 0);
    }
  }, [item, isOpen]);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      name: normalizeName(form.name),
      quantity: form.quantity,
      unit: form.unit,
      categoryEdit: form.categoryEdit,
      categoryShop: form.categoryShop
    };

    const validation = validateItem(newItem);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave({
      ...item,
      ...newItem,
      quantity: roundQuantity(newItem.quantity, newItem.unit)
    });
    onClose();
  }

  return (
    <div className="item-edit-modal">
      <h2 className="modal-title">Edit Product</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit-name">Name *</label>
          <input
            id="edit-name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Apple"
            className={errors.name ? "error" : ""}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "edit-name-error" : undefined}
          />
          {errors.name && <span id="edit-name-error" className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="edit-quantity">Quantity</label>
            <input
              id="edit-quantity"
              type="text"
              inputMode={form.unit === "kg" ? "decimal" : "numeric"}
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              step={getStepForUnit(form.unit)}
              className={errors.quantity ? "error" : ""}
              aria-invalid={!!errors.quantity}
              aria-describedby={errors.quantity ? "edit-quantity-error" : undefined}
            />
            {errors.quantity && <span id="edit-quantity-error" className="error-message">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="edit-unit">Unit</label>
            <select
              id="edit-unit"
              value={form.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
            >
              {units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="edit-category-edit">Category (Edit) *</label>
          <select
            id="edit-category-edit"
            value={form.categoryEdit}
            onChange={(e) => handleChange("categoryEdit", e.target.value)}
            className={errors.categoryEdit ? "error" : ""}
            aria-invalid={!!errors.categoryEdit}
            aria-describedby={errors.categoryEdit ? "edit-category-edit-error" : undefined}
          >
            {editCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoryEdit && <span id="edit-category-edit-error" className="error-message">{errors.categoryEdit}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="edit-category-shop">Category (Shopping) *</label>
          <select
            id="edit-category-shop"
            value={form.categoryShop}
            onChange={(e) => handleChange("categoryShop", e.target.value)}
            className={errors.categoryShop ? "error" : ""}
            aria-invalid={!!errors.categoryShop}
            aria-describedby={errors.categoryShop ? "edit-category-shop-error" : undefined}
          >
            {shopCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoryShop && <span id="edit-category-shop-error" className="error-message">{errors.categoryShop}</span>}
        </div>

        <div className="modal-actions">
          <button type="button" className="button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="button-danger"
            onClick={() => {
              if (confirm(`Delete "${form.name}"?`)) {
                onDelete(item.id);
                onClose();
              }
            }}
          >
            Delete
          </button>
          <button type="submit" className="button-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
