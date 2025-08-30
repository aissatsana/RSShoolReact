import type { EXTRA_COLUMN_LABELS } from "./constants";

export type CountryBlockRaw = {
  country?: unknown;
  iso_code?: unknown;
  data?: unknown;
};

export type YearRowRaw = {
  year?: unknown;
  population?: unknown;
  cement_co2?: unknown;
  cement_co2_per_capita?: unknown;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
};

export const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

export const isCountryBlockRaw = (v: unknown): v is CountryBlockRaw => isObject(v);

export const isYearRowRaw = (v: unknown): v is YearRowRaw => isObject(v);

export const isFiniteNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

export const toNumber = (v: unknown): number | undefined => (isFiniteNumber(v) ? v : undefined);

export const SORT_MODES = ["population", "name-asc", "name-desc"] as const;
export type SortMode = (typeof SORT_MODES)[number];
export const isSortMode = (v: string): v is SortMode => v === "population" || v === "name-asc" || v === "name-desc";

export type ExtraColumnKey = keyof typeof EXTRA_COLUMN_LABELS;
