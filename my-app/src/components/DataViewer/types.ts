export type CountryBlockRaw = {
  country?: unknown;
  code?: unknown;
  data?: unknown;
};

export type YearRowRaw = {
  year?: unknown;
  population?: unknown;
  co2?: unknown;
  co2_per_capita?: unknown;
};

export const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

export const isCountryBlockRaw = (v: unknown): v is CountryBlockRaw => isObject(v);

export const isYearRowRaw = (v: unknown): v is YearRowRaw => isObject(v);

export const isFiniteNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

export const toNumber = (v: unknown): number | undefined => (isFiniteNumber(v) ? v : undefined);

export const SORT_MODES = ["population", "name-asc", "name-desc"] as const;
export type SortMode = (typeof SORT_MODES)[number];
export const isSortMode = (v: string): v is SortMode => v === "population" || v === "name-asc" || v === "name-desc";
