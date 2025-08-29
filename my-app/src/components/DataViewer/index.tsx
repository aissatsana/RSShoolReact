import { useEffect, useMemo, useState } from "react";
import { dataResource } from "../../dataResource";
import { CountryRows } from "../CountryRows";
import { buildCountries, getPopulationForYear } from "./utils";
import styles from "./DataViewer.module.css";
import { isSortMode, type SortMode } from "./types";

const DEBOUNCE_TIME = 200;

export const DataViewer = () => {
  const raw = dataResource.read();
  const countries = useMemo(() => buildCountries(raw), [raw]);

  const years = useMemo(() => {
    const set = new Set<number>();
    for (const country of countries) for (const row of country.rows) set.add(row.year);
    return Array.from(set).sort((a, b) => a - b);
  }, [countries]);
  const [year, setYear] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (!year && years.length) setYear(years[years.length - 1]);
  }, [years, year]);

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(query.trim().toLowerCase()), DEBOUNCE_TIME);
    return () => clearTimeout(timeout);
  }, [query]);

  const filtered = useMemo(() => {
    if (!debounced) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(debounced));
  }, [countries, debounced]);

  const [sortMode, setSortMode] = useState<SortMode>("population");
  const sorted = useMemo(() => {
    const result = [...filtered];

    result.sort((countryA, countryB) => {
      // сортировка по имени (возрастание или убывание)
      if (sortMode === "name-asc" || sortMode === "name-desc") {
        const nameComparison = countryA.name.localeCompare(countryB.name);
        if (sortMode === "name-asc") {
          return nameComparison;
        } else {
          return -nameComparison;
        }
      }

      // sortMode === "year" → сортировка по населению выбранного года
      const populationA = getPopulationForYear(countryA, year);
      const populationB = getPopulationForYear(countryB, year);

      const isMissingA = populationA == null;
      const isMissingB = populationB == null;

      let comparison: number;

      if (isMissingA && isMissingB) {
        // у обоих нет данных → сортируем по имени
        comparison = countryA.name.localeCompare(countryB.name);
      } else if (isMissingA) {
        comparison = 1;
      } else if (isMissingB) {
        comparison = -1;
      } else {
        comparison = populationA - populationB;
      }

      if (comparison === 0) {
        comparison = countryA.name.localeCompare(countryB.name);
      }

      return comparison;
    });

    return result;
  }, [filtered, sortMode, year]);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (isSortMode(value)) {
      setSortMode(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div>Countries: {countries.length}</div>

        <label className={styles.label}>
          <span>Year</span>
          <select value={year ?? ""} onChange={(e) => setYear(e.target.value ? Number(e.target.value) : undefined)}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          <span>Sort</span>
          <select value={sortMode} onChange={handleSortChange}>
            <option value="population">Population</option>
            <option value="name-asc">Name ASC</option>
            <option value="name-desc">Name DESC</option>
          </select>
        </label>

        <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className={styles.search} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ISO Code</th>
            <th>Country name</th>
            <th>Population</th>
            <th>CO₂</th>
            <th>CO₂ per capita</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((country) => (
            <CountryRows key={country.key} country={country} displayYear={year} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
