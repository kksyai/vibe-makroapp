import { useState, useCallback, useEffect } from "react";

export function useModal(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [data, setData] = useState(null);

  const open = useCallback((modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  return { isOpen, open, close, toggle, data };
}
