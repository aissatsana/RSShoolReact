export type YearRow = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
};

export type CountryView = {
  key: string;
  name: string;
  iso?: string;
  latestPopulation?: number;
  rows: YearRow[];
};
export const NA = "N/A" as const;
