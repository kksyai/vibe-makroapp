import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const STORAGE_KEY = "vibe_groceries_v1";

const DEFAULT_CATEGORIES = [
  "Fruits & Vegetables",
  "Dairy",
  "Meat & Fish",
  "Nuts",
  "Canned Goods",
  "Frozen Foods",
  "Baking",
  "Spices & Herbs",
  "Pasta & Grains",
  "Alcogol",
  "Drinks",
  "Household",
];

function uid() {
  return (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).toString();
}

function normalize(s) {
  return (s ?? "").trim();
}

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function serializeForUrl(data) {
  try {
    const json = JSON.stringify(data);
    const bytes = new TextEncoder().encode(json);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary);
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch {
    return null;
  }
}

function deserializeFromUrl(s) {
  try {
    if (!s) return null;
    let b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4;
    if (pad) b64 += "=".repeat(4 - pad);
    const bin = atob(b64);
    const bytes = new Uint8Array([...bin].map((c) => c.charCodeAt(0)));
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function App() {
  function initItems() {
    try {
      const params = new URLSearchParams(window.location.search);
      const shared = params.get("shared");
      const parsed = deserializeFromUrl(shared);
      if (Array.isArray(parsed) && parsed.length >= 0) {
        return parsed;
      }
    } catch {
      // ignore and fallback
    }
    return loadItems();
  }

  const [items, setItems] = useState(() => initItems());
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState("edit"); // edit | shop
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [sortBy, setSortBy] = useState("category"); // category | name | created
  const [categoryFilter, setCategoryFilter] = useState("All");

  // form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState("kg");
  const nameRef = useRef(null);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  function shareList() {
    try {
      const encoded = serializeForUrl(items || []);
      if (!encoded) return;
      const url = new URL(window.location.href);
      url.searchParams.set("shared", encoded);
      const shareUrl = url.toString();
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          // ignore clipboard error silently
        });
    } catch (err) {
      // ignore
    }
  }

  const allCategories = useMemo(() => {
    const dynamic = new Set(items.map((i) => i.category).filter(Boolean));
    DEFAULT_CATEGORIES.forEach((c) => dynamic.add(c));
    return ["All", ...Array.from(dynamic)];
  }, [items]);

  const visibleItems = useMemo(() => {
    let arr = [...items];

    if (categoryFilter !== "All") {
      arr = arr.filter((i) => i.category === categoryFilter);
    }

    // In shopping mode hide items with zero or non-positive quantity
    if (mode === "shop") {
      arr = arr.filter((i) => Number(i.qty || 0) > 0);
    }

    // base sort
    arr.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name, "en");
      if (sortBy === "created") return (a.createdAt ?? 0) - (b.createdAt ?? 0);

      // category
      const c = (a.category || "").localeCompare(b.category || "", "en");
      if (c !== 0) return c;
      return a.name.localeCompare(b.name, "en");
    });

    return arr;
  }, [items, sortBy, categoryFilter, mode]);

  const grouped = useMemo(() => {
    if (!groupByCategory) return { "": visibleItems };

    const map = new Map();
    for (const it of visibleItems) {
      const key = it.category || "Uncategorized";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(it);
    }

    // inside each category: unchecked first, checked last
    const obj = {};
    for (const [cat, list] of map.entries()) {
      const copy = [...list].sort((a, b) => Number(a.checked) - Number(b.checked));
      obj[cat] = copy;
    }

    // categories sorted
    const sortedCats = Object.keys(obj).sort((a, b) => a.localeCompare(b, "en"));
    const out = {};
    for (const c of sortedCats) out[c] = obj[c];
    return out;
  }, [visibleItems, groupByCategory]);

  function addItem(e) {
    e.preventDefault();
    const n = normalize(name);
    if (!n) return;

    const c = normalize(category) || "Other";
    const qRaw = qty;
    const qNum = Number(qRaw);
    const q = qRaw === "" || !Number.isFinite(qNum) ? undefined : qNum;
    const u = normalize(unit) || "kg";

    // If same product in same category + unit exists: increase quantity
    const existingIndex = items.findIndex(
      (i) => i.name.toLowerCase() === n.toLowerCase() && i.category === c && i.unit === u
    );

    if (existingIndex >= 0) {
      const next = [...items];
      next[existingIndex] = {
        ...next[existingIndex],
        qty:
          Number(next[existingIndex].qty || 0) + (q === undefined ? 1 : Number.isFinite(q) && q >= 0 ? q : 1),
        checked: false,
      };
      setItems(next);
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: uid(),
          name: n,
          category: c,
          qty: q === undefined ? 1 : Number.isFinite(q) && q >= 0 ? q : 1,
          unit: u,
          checked: false,
          createdAt: Date.now(),
        },
      ]);
    }

    setName("");
    setQty(1);
    setUnit("kg");
    nameRef.current?.focus();
  }

  function toggleChecked(id) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearChecked() {
    setItems((prev) => prev.map((i) => (i.checked ? { ...i, checked: false } : i)));
  }

  function clearAll() {
    setItems([]);
  }

  function incQty(id) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Number(i.qty || 0) + 1 } : i)));
  }

  function decQty(id) {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const next = Math.max(0, Number(i.qty || 0) - 1);
        return { ...i, qty: next };
      })
    );
  }

  function changeUnit(id, newUnit) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, unit: newUnit } : i)));
  }

  const totalCount = items.length;
  const checkedCount = items.filter((i) => i.checked).length;

  return (
    <div className={`wrap ${mode === "shop" ? "shop-mode" : ""}`}>
      <header className="header">
          <div className="header-left">
            <div className="header-title">
              <h1>Shopping List</h1>
            </div>
            <div className="meta">
              <div className="meta-count">
                <span>Total: {totalCount}</span>
                <span>Bought: {checkedCount}</span>
              </div>
            </div>
          </div>

          <div className="header-right">
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <button
                className="chip share-button"
                onClick={shareList}
                aria-label="Share list"
              >
                Share
              </button>
              {copied && <span className="copied-badge">Link copied</span>}
            </div>

            <div className="mode-switch-container">
              <span className="switch-label">{mode === "edit" ? "shopping" : "edit"}</span>
              <label className="mode-switch">
                <input
                  type="checkbox"
                  checked={mode === "shop"}
                  onChange={(e) => setMode(e.target.checked ? "shop" : "edit")}
                />
                <span className="switch-slider"></span>
              </label>
            </div>
          </div>
        </header>

      {mode === "edit" && (
      <section className="panel">
        <form className="form" onSubmit={addItem}>
          <div className="row">
            <label>
              Product
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Milk"
              />
            </label>

            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {DEFAULT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="row">
            <label>
              Quantity
              <input
                type="number"
                min="0"
                step={unit === "kg" ? "0,1" : "1"}
                inputMode={unit === "kg" ? "decimal" : "numeric"}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </label>

            <label>
              Unit
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                <option value="pcs">pcs</option>
                <option value="kg">kg</option>
                <option value="grm">grm</option>
                <option value="l">l</option>
                <option value="pack">pack</option>
              </select>
            </label>

            <button className="primary" type="submit">
              Add
            </button>
          </div>
            
          
            {/* <label className="chip checkbox">
            <input
              type="checkbox"
              checked={groupByCategory}
              onChange={(e) => setGroupByCategory(e.target.checked)}
            />
            Group by category
            </label> */}
            
          
        </form>

        <div className="controls">
          {/*// <label className="chip">
            Mode:
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="edit">Edit</option>
              <option value="shop">In store</option>
            </select>
          </label> */}

          <label className="chip">
            Filter:
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <div>
            {/*   <label className="chip">
            Sort by:
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
               <option value="category">Category</option>
               <option value="name">Name</option>
               <option value="created">Date added</option>
             </select>
            </label> */}

            { /* <div className="spacer" /> */}

           <button className="chip" onClick={clearChecked} disabled={checkedCount === 0}>
              Clear bought
            </button>
            <button className="chip" onClick={clearAll} disabled={items.length === 0}>
             Clear all
            </button>
          </div>

          </div>
      </section>
      )}

      <main className="list">
        {Object.keys(grouped).length === 0 || visibleItems.length === 0 ? (
          <div className="empty">No items yet. Add products above 🙂</div>
        ) : (
          Object.entries(grouped).map(([cat, list]) => (
            <section key={cat || "all"} className="category">
              {groupByCategory && <h2>{cat}</h2>}

              <ul>
                {list.map((it) => (
                  <li key={it.id} className={`item ${it.checked ? "checked" : ""}`}>
                    {mode === "shop" ? (
                      <label className="check">
                        <input
                          type="checkbox"
                          checked={!!it.checked}
                          onChange={() => toggleChecked(it.id)}
                        />
                        <span className="name">{it.name}</span>
                      </label>
                    ) : (
                      <span className="name">{it.name}</span>
                    )}

                    {mode === "edit" ? (
                      <span className="qty">
                        {it.qty}{" "}
                        <select
                          value={it.unit}
                          onChange={(e) => changeUnit(it.id, e.target.value)}
                          className="unit-select"
                        >
                          <option value="pcs">pcs</option>
                          <option value="kg">kg</option>
                          <option value="grams">grams</option>
                          <option value="l">l</option>
                          <option value="pack">pack</option>
                        </select>
                      </span>
                    ) : (
                      <span className="qty">
                        {it.qty} {it.unit}
                      </span>
                    )}

                    {mode === "edit" ? (
                      <div className="actions">
                        <button className="small" onClick={() => incQty(it.id)} title="Increase">
                          +
                        </button>
                        <button className="small" onClick={() => decQty(it.id)} title="Decrease">
                          −
                        </button>
                        <button className="small danger" onClick={() => removeItem(it.id)} title="Remove">
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button className="small ghost" onClick={() => toggleChecked(it.id)}>
                        {it.checked ? "Undo" : "Bought"}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </main>

      <footer className="footer">
        <small>Data is saved locally in your browser (localStorage).</small>
      </footer>
    </div>
  );
}
