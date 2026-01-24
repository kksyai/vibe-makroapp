import "./Item.css";
import { useEffect, useState } from "react";

export default function Item({ item, mode, onEdit, onToggleChecked, onQuantityChange, onUnitChange }) {
  const isShopMode = mode === "shop";
  const isChecked = item.checked;
  const [qtyInput, setQtyInput] = useState(() => (item.quantity ?? "").toString());

  useEffect(() => {
    setQtyInput((item.quantity ?? "").toString());
  }, [item.quantity]);

  function handleQuantityBlur() {
    onQuantityChange(item.id, qtyInput);
  }

  return (
    <li
      className={`item ${isChecked ? "checked" : ""} ${isShopMode ? "shop-mode" : "edit-mode"}`}
      role="listitem"
    >
      {isShopMode ? (
        <label className="item-check">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggleChecked(item.id)}
            aria-label={`Mark ${item.name} as ${isChecked ? "not purchased" : "purchased"}`}
            className="item-checkbox"
          />
          <span className={`item-name ${isChecked ? "strikethrough" : ""}`}>
            {item.name}
          </span>
        </label>
      ) : (
        <button
          className="item-name-button"
          onClick={() => onEdit(item)}
          aria-label={`Edit ${item.name}`}
        >
          {item.name}
        </button>
      )}

      <span className="item-qty">
        {isShopMode ? (
          <span>{item.quantity} {item.unit}</span>
         ) : (
           <>
              <input
                type="text"
                inputMode={item.unit === "kg" ? "decimal" : "numeric"}
                value={qtyInput}
                onChange={(e) => setQtyInput(e.target.value)}
                onBlur={handleQuantityBlur}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }
                }}
                aria-label={`Quantity for ${item.name}`}
                className="item-qty-input"
              />
             <select
               value={item.unit}
               onChange={(e) => onUnitChange(item.id, e.target.value)}
               className="item-unit-select"
               aria-label={`Unit for ${item.name}`}
             >
               <option value="pcs">pcs</option>
               <option value="kg">kg</option>
               <option value="g">g</option>
               <option value="l">l</option>
               <option value="pack">pack</option>
             </select>
           </>
         )}
      </span>
    </li>
  );
}
