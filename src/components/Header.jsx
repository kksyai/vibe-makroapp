import "./Header.css";
export default function Header({ mode, onToggleMode, totalCount, checkedCount, onShare, copied }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Vibe Groceries</h1>
        <div className="meta-count">
          <span className="meta-count-item">Total: {totalCount}</span>
          <span className="meta-count-item">Bought: {checkedCount}</span>
        </div>
      </div>
      <div className="header-right">
        <button
          className="share-button"
          onClick={onShare}
          aria-label="Share list"
          disabled={copied}
        >
          Share
          {copied && <span className="copied-badge">Copied!</span>}
        </button>
        <div className="mode-switch">
          <button
            type="button"
            className={`switch-option ${mode === "edit" ? "switch-option--active" : ""}`}
            onClick={() => onToggleMode("edit")}
            aria-label="Edit mode"
          >
            Edit
          </button>
          <button
            type="button"
            className={`switch-option ${mode === "shop" ? "switch-option--active" : ""}`}
            onClick={() => onToggleMode("shop")}
            aria-label="Shop mode"
          >
            Shop
          </button>
        </div>
      </div>
    </header>
  );
}