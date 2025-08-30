import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import styles from "./ColumnsModal.module.css";
import type { ColumnsModalProps } from "./types";

export const ColumnsModal = <T extends string>({ selected, options, onApply, onClose }: ColumnsModalProps<T>) => {
  const [localSelected, setLocalSelected] = useState<T[]>(selected);
  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const toggle = (value: T) => {
    setLocalSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <h2>Select additional columns</h2>

        <div className={styles.list}>
          {options.map((opt) => (
            <label key={opt.value}>
              <input type="checkbox" checked={localSelected.includes(opt.value)} onChange={() => toggle(opt.value)} />
              {opt.label}
            </label>
          ))}
        </div>

        <div>
          <button type="button" onClick={() => onApply(localSelected)}>
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
};
