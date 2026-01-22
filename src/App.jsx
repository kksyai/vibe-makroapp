import { useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useShareUrl } from "./hooks/useShareUrl";
import { useModal } from "./hooks/useModal";
import { useMobileDetect } from "./hooks/useMobileDetect";
import { generateId } from "./utils/share";
import { roundQuantity, getStepForUnit, parseQuantity } from "./utils/validation";
import Header from "./components/Header";
import Item from "./components/Item";
import CategorySection from "./components/CategorySection";
import FloatingButton from "./components/FloatingButton";
import ModalOverlay from "./components/ModalOverlay";
import ItemEditModal from "./components/ItemEditModal";
import AddProductModal from "./components/AddProductModal";
import "./App.css";

export default function App() {
  const { items, setItems } = useLocalStorage();
  const { shareList, copied } = useShareUrl(items);
  const editModal = useModal();
  const addModal = useModal();
  const { isMobile } = useMobileDetect();

  const [mode, setMode] = useState("edit");

  const visibleItems = useMemo(() => {
    let arr = [...items];

    if (mode === "shop") {
      arr = arr.filter((i) => i.quantity > 0);
    }

    arr.sort((a, b) => {
      const categoryKey = mode === "edit" ? "categoryEdit" : "categoryShop";
      const catCompare = (a[categoryKey] || "").localeCompare(b[categoryKey] || "", "en");
      if (catCompare !== 0) return catCompare;

      const aChecked = a.checked ? 1 : 0;
      const bChecked = b.checked ? 1 : 0;
      if (aChecked !== bChecked) return aChecked - bChecked;

      return (a.order || 0) - (b.order || 0);
    });

    return arr;
  }, [items, mode]);

  const groupedItems = useMemo(() => {
    const categoryKey = mode === "edit" ? "categoryEdit" : "categoryShop";
    const map = new Map();

    for (const item of visibleItems) {
      const key = item[categoryKey] || "Uncategorized";
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(item);
    }

    return map;
  }, [visibleItems, mode]);

  const totalCount = items.length;
  const checkedCount = items.filter((i) => i.checked).length;

  function handleToggleItemChecked(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleQuantityChange(id, value) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const parsed = parseQuantity(value, item.unit);
        return {
          ...item,
          quantity: roundQuantity(parsed, item.unit)
        };
      })
    );
  }

  function handleUnitChange(id, newUnit) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unit: newUnit } : item))
    );
  }

  function handleIncrement(id) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const step = getStepForUnit(item.unit);
        const newValue = (item.quantity || 0) + step;
        return {
          ...item,
          quantity: roundQuantity(newValue, item.unit)
        };
      })
    );
  }

  function handleDecrement(id) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const step = getStepForUnit(item.unit);
        const newValue = Math.max(0, (item.quantity || 0) - step);
        return {
          ...item,
          quantity: roundQuantity(newValue, item.unit)
        };
      })
    );
  }

  function handleEditItem(item) {
    editModal.open(item);
  }

  function handleSaveItem(updatedItem) {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  function handleDeleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCreateItem(newItem) {
    setItems((prev) => [
      ...prev,
      {
        id: generateId(),
        ...newItem,
        checked: false,
        order: Date.now(),
        createdAt: Date.now()
      }
    ]);
  }

  function handleClearChecked() {
    if (confirm("Clear all bought items?")) {
      setItems((prev) => prev.map((item) => ({ ...item, checked: false })));
    }
  }

  function handleClearAll() {
    if (confirm("Clear all items?")) {
      setItems([]);
    }
  }

  const lastItem = items[items.length - 1];

  return (
    <div className="app">
      <Header
        mode={mode}
        onToggleMode={setMode}
        totalCount={totalCount}
        checkedCount={checkedCount}
        onShare={shareList}
        copied={copied}
      />

      {mode === "edit" && (
        <section className="controls">
          <button
            className="control-button"
            onClick={handleClearChecked}
            disabled={checkedCount === 0}
          >
            Clear Bought
          </button>
          <button
            className="control-button danger"
            onClick={handleClearAll}
            disabled={items.length === 0}
          >
            Clear All
          </button>
        </section>
      )}

      <main className="list">
        {groupedItems.size === 0 || visibleItems.length === 0 ? (
          <div className="empty-state">
            <p className="empty-text">
              {mode === "edit"
                ? "No items yet. Create your first product! 🛒"
                : "No items to buy yet. Add items in Edit mode."}
            </p>
          </div>
        ) : (
          Array.from(groupedItems.entries()).map(([category, categoryItems]) => (
            <CategorySection key={category} category={category}>
              {categoryItems.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  mode={mode}
                  onEdit={handleEditItem}
                  onToggleChecked={handleToggleItemChecked}
                  onQuantityChange={handleQuantityChange}
                  onUnitChange={handleUnitChange}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              ))}
            </CategorySection>
          ))
        )}
      </main>

      {mode === "edit" && (
        <FloatingButton
          onClick={() => addModal.open()}
          ariaLabel="Add new product"
        />
      )}

      <ModalOverlay
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        isMobile={isMobile}
      >
        <ItemEditModal
          item={editModal.data}
          isOpen={editModal.isOpen}
          onClose={editModal.close}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
          isMobile={isMobile}
        />
      </ModalOverlay>

      <ModalOverlay
        isOpen={addModal.isOpen}
        onClose={addModal.close}
        isMobile={isMobile}
      >
        <AddProductModal
          isOpen={addModal.isOpen}
          onClose={addModal.close}
          onCreate={handleCreateItem}
          isMobile={isMobile}
          lastCategory={lastItem}
        />
      </ModalOverlay>
    </div>
  );
}

