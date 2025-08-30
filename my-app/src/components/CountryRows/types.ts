import type { CountryView } from "../../types";
import type { ExtraColumnKey } from "../DataViewer/types";
import type { FIELDS } from "./constants";

export type CountryRowsProps = {
  country: CountryView;
  displayYear?: number;
  extraColumns: ExtraColumnKey[];
};

export type Field = (typeof FIELDS)[number];
