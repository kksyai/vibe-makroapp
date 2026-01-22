import { useState, useEffect } from "react";
import "./AddProductModal.css";
import { getEditCategories, getShopCategories } from "../utils/migration";
import { validateItem, normalizeName, roundQuantity, getStepForUnit } from "../utils/validation";

export default function AddProductModal({ isOpen, onClose, onCreate, lastCategory }) {
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
    if (isOpen) {
      setTimeout(() => {
        setForm({
          name: "",
          quantity:0,
          unit: "pcs",
          categoryEdit: lastCategory?.categoryEdit || editCategories[0],
          categoryShop: lastCategory?.categoryShop || shopCategories[0]
        });
        setErrors({});
      }, 0);
    }
  }, [isOpen, lastCategory, editCategories[0], shopCategories[0]]); // eslint-disable-line react-hooks/exhaustive-deps

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

    onCreate({
      name: newItem.name,
      quantity: roundQuantity(newItem.quantity, newItem.unit),
      unit: newItem.unit,
      categoryEdit: newItem.categoryEdit,
      categoryShop: newItem.categoryShop
    });
    onClose();
  }

  return (
    <div className="add-product-modal">
      <h2 className="modal-title">Add New Product</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="add-name">Name *</label>
          <input
            id="add-name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Apple"
            autoFocus
            className={errors.name ? "error" : ""}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "add-name-error" : undefined}
          />
          {errors.name && <span id="add-name-error" className="error-message">{errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="add-quantity">Quantity</label>
            <input
              id="add-quantity"
              type="text"
              inputMode={form.unit === "kg" ? "decimal" : "numeric"}
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              step={getStepForUnit(form.unit)}
              className={errors.quantity ? "error" : ""}
              aria-invalid={!!errors.quantity}
              aria-describedby={errors.quantity ? "add-quantity-error" : undefined}
            />
            {errors.quantity && <span id="add-quantity-error" className="error-message">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="add-unit">Unit</label>
            <select
              id="add-unit"
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
          <label htmlFor="add-category-edit">Category (Edit) *</label>
          <select
            id="add-category-edit"
            value={form.categoryEdit}
            onChange={(e) => handleChange("categoryEdit", e.target.value)}
            className={errors.categoryEdit ? "error" : ""}
            aria-invalid={!!errors.categoryEdit}
            aria-describedby={errors.categoryEdit ? "add-category-edit-error" : undefined}
          >
            {editCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoryEdit && <span id="add-category-edit-error" className="error-message">{errors.categoryEdit}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="add-category-shop">Category (Shopping) *</label>
          <select
            id="add-category-shop"
            value={form.categoryShop}
            onChange={(e) => handleChange("categoryShop", e.target.value)}
            className={errors.categoryShop ? "error" : ""}
            aria-invalid={!!errors.categoryShop}
            aria-describedby={errors.categoryShop ? "add-category-shop-error" : undefined}
          >
            {shopCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.categoryShop && <span id="add-category-shop-error" className="error-message">{errors.categoryShop}</span>}
        </div>

        <div className="modal-actions">
          <button type="button" className="button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
