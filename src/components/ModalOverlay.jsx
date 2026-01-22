import { useEffect } from "react";
import "./ModalOverlay.css";

export default function ModalOverlay({ isOpen, onClose, children, isMobile }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-overlay ${isMobile ? "mobile" : "desktop"}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Modal dialog"
    >
      <div 
        className={`modal-content ${isMobile ? "bottom-sheet" : "centered"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
