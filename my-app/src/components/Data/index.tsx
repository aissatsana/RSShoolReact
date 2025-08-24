import type { FC } from "react";
import type { formData } from "../../types";
import styles from "./Data.module.css";
import { Row } from "../Row";

type DataProps = {
  data: formData;
};

export const Data: FC<DataProps> = ({ data }) => {
  return (
    <div className={styles.data}>
      <img className={styles.image} src={data.file} alt="uploaded" />

      <Row name="Name" value={data.name} />
      <Row name="Email" value={data.email} />
      <Row name="Age" value={String(data.age)} />
      <Row name="Gender" value={data.gender} />
      <Row name="Country" value={data.country} />
      <Row name="Agreement" value="Accepted" />
    </div>
  );
};
