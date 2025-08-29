import type { CountryView, YearRow } from "../../types";
import { isCountryBlockRaw, isYearRowRaw, toNumber } from "./types";

export const buildCountries = (raw: Record<string, unknown>): CountryView[] => {
  const out: CountryView[] = [];
  for (const [key, block] of Object.entries(raw)) {
    if (!isCountryBlockRaw(block)) continue;

    const name = typeof block.country === "string" ? block.country : key;
    const iso = typeof block.code === "string" ? block.code : undefined;

    const dataArr = Array.isArray(block.data) ? block.data : [];

    const rows: YearRow[] = [];
    for (const row of dataArr) {
      if (!isYearRowRaw(row)) continue;

      const year = toNumber(row.year);
      if (year === undefined) continue;

      rows.push({
        year,
        population: toNumber(row.population),
        co2: toNumber(row.co2),
        co2_per_capita: toNumber(row.co2_per_capita),
      });
    }

    rows.sort((a, b) => a.year - b.year);

    let latestPopulation: number | undefined;
    for (let i = rows.length - 1; i >= 0; i--) {
      const v = rows[i].population;
      if (v !== undefined) {
        latestPopulation = v;
        break;
      }
    }

    out.push({ key, name, iso, latestPopulation, rows });
  }
  return out;
};
