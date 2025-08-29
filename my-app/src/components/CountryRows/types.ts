import type { CountryView } from "../../types";
import type { FIELDS } from "./constants";

export type CountryRowsProps = {
  country: CountryView;
  displayYear?: number;
};

export type Field = (typeof FIELDS)[number];
