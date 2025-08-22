import { useEffect, useRef, type FC, type ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}
export const Modal: FC<ModalProps> = ({ onClose, children }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const getTabbables = (container: HTMLDivElement) => {
    const selector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll<HTMLElement>(selector));
  };

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      lastActiveRef.current = document.activeElement;
    }
    requestAnimationFrame(() => {
      if (!dialogRef.current) return;
      const tabbables = getTabbables(dialogRef.current);
      if (tabbables.length === 0) {
        dialogRef.current.focus();
        return;
      }

      tabbables[0].focus();
    });

    return () => {
      lastActiveRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "Tab") return;
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }

      const container = dialogRef.current;
      if (!container) return;

      const tabbables = getTabbables(container);
      if (tabbables.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }

      const firstEl = tabbables[0];
      const lastEl = tabbables[tabbables.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && activeEl === firstEl) {
        e.preventDefault();
        lastEl.focus();
        return;
      }

      if (!e.shiftKey && activeEl === lastEl) {
        e.preventDefault();
        firstEl.focus();
        return;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className={styles.overlay}
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog} ref={dialogRef} tabIndex={-1} role="dialog">
        <div>
          <button className={styles.close} type="button" onClick={() => onClose()} aria-label="Close"></button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};
