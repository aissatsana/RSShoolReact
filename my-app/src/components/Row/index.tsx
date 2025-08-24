import type { FC } from "react";
import styles from "./Row.module.css";

type RowProps = {
  name: string;
  value: string;
};

export const Row: FC<RowProps> = ({ name, value }) => {
  return (
    <div className={styles.row}>
      <span>{name}</span> <span>{value}</span>
    </div>
  );
};
