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
      const catCompare = (a[categoryKey] || "").localeCompare(b[categoryKey] || "", "");

      if (catCompare !== 0) return catCompare;
      if (a.checked !== b.checked) return a.checked ? -1 : 1;
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

    const sortedMap = new Map();

    map.forEach((items, key) => {
      sortedMap.set(key, [...items].sort((a, b) => {
        const aChecked = a.checked ? 1 : 0;
        const bChecked = b.checked ? 1 : 0;

        if (aChecked !== bChecked) return aChecked ? -1 : 1;

        const aOrder = a.order || 0;
        const bOrder = b.order || 0;

        return (aOrder || 0) - (bOrder || 0);
      }));
    });

    return sortedMap;
  }, [visibleItems, mode]);

  const totalCount = items.length;
  const checkedCount = items.filter(i => i.checked).length;

  function handleToggleItemChecked(id) {
    setItems(prev =>
      prev.map((item) => ({
        ...item,
        checked: item.id === id ? !item.checked : item.checked,
      }))
    );
  }

  function handleQuantityChange(id, value) {
    setItems(prev =>
      prev.map((item) => {
        if (item.id === id) {
          const parsed = parseQuantity(value, item.unit);
          return {
            ...item,
            quantity: roundQuantity(parsed, item.unit)
          };
        }
        return item;
      })
    );
  }

  function handleUnitChange(id, newUnit) {
    setItems(prev =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, unit: newUnit };
        }
        return item;
      })
    );
  }

  function handleIncrement(id) {
    setItems(prev =>
      prev.map((item) => {
        if (item.id === id) {
          const step = getStepForUnit(item.unit);
          const newValue = (item.quantity || 0) + step;
          return {
            ...item,
            quantity: roundQuantity(newValue, item.unit)
          };
        }
        return item;
      })
    );
  }

  function handleDecrement(id) {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;

      const step = getStepForUnit(item.unit);
      const newValue = Math.max(0, (item.quantity || 0) - step);

      setItems(prev =>
        prev.map((i) => i.id === id ? { ...i, quantity: roundQuantity(newValue, i.unit) } : i)
      );
    });
  }

  function handleEditItem(item) {
    editModal.open(item);
  }

  function handleSaveItem(updatedItem) {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    editModal.close();
  }

  function handleDeleteItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCreateItem(newItem) {
    setItems((prev) => [
      ...prev,
      {
        id: generateId(),
        name: newItem.name,
        quantity: "0",
        unit: "pcs",
        checked: false,
        order: Date.now(),
        createdAt: Date.now()
      }
    ]);
    addModal.close();
  }

  function handleClearChecked() {
    if (confirm("Clear all bought items?")) {
      setItems((prev) =>
        prev.map((item) => ({ ...item, checked: false }))
      );
    }
  }

  function handleClearAll() {
    if (confirm("Clear all items?")) {
      setItems([]);
    }
  }

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

      <main className="list">
        {Array.from(groupedItems.entries()).map(([category, categoryItems]) => (
          <CategorySection
            key={category}
            category={category}
          >
            {categoryItems.map((item) => (
              <Item
                key={item.id}
                item={item}
                mode={mode}
                onEdit={handleEditItem}
                onToggleChecked={handleToggleChecked}
                onQuantityChange={handleQuantityChange}
                onUnitChange={handleUnitChange}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))}
          </CategorySection>
        ))}

        {groupedItems.size === 0 || visibleItems.length === 0 && (
          <div className="empty-state">
            <p className="empty-text">
              {mode === "edit"
                ? "No items yet. Create your first product! 🛒"
                : "No items to buy yet. Add items in Edit mode."}
            </p>
          </div>
        )}
      </main>

      {/* Skip to main content - Accessibility */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <FloatingButton
        onClick={() => addModal.open()}
        aria-label="Add new product"
      >
        <span style={{ fontSize: "24px", lineHeight: "1" }}>+</span>
      </FloatingButton>

      {/* Edit Mode Modal */}
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

      {/* Add Product Modal */}
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
          lastCategory={groupedItems.size > 0 ? groupedItems[groupedItems.size - 1]?.[0] : null}
        />
      </ModalOverlay>

      {/* Share Modal */}
      <ModalOverlay
        isOpen={copied}
        onClose={() => {}}
        isMobile={isMobile}
      >
        <div style={{ padding: "32px", textAlign: "center" }}>
          <p className="copied-badge">List copied!</p>
        </div>
      </ModalOverlay>
    </div>
  );
}
