import "./FloatingButton.css";

export default function FloatingButton({ onClick, ariaLabel, icon = "+" }) {
  return (
    <button 
      className="floating-button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}
