import type { ExtraColumnKey } from "./types";

export const DEBOUNCE_TIME = 200;
export const EXTRA_COLUMN_LABELS = {
  methane: "Methane",
  oil_co2: "Oil CO2",
  temperature_change_from_co2: "Temp Change from CO2",
} as const;

export const EXTRA_KEYS: ExtraColumnKey[] = ["methane", "oil_co2", "temperature_change_from_co2"];
