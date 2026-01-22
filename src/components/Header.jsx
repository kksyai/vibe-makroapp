import "./Header.css";

export default function Header({ mode, onToggleMode, totalCount, checkedCount, onShare, copied }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Shopping List</h1>
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
        >
          Share
          {copied && <span className="copied-badge">Copied!</span>}
        </button>

        <div className="mode-switch-container">
          <span className="switch-label">{mode === "edit" ? "SHOP" : "EDIT"}</span>
          <label className="mode-switch">
            <input
              type="checkbox"
              role="switch"
              aria-checked={mode === "shop"}
              aria-label={`Switch to ${mode === "edit" ? "shopping" : "edit"} mode`}
              checked={mode === "shop"}
              onChange={(e) => onToggleMode(e.target.checked ? "shop" : "edit")}
            />
            <span className="switch-slider"></span>
          </label>
        </div>
      </div>
    </header>
  );
}
