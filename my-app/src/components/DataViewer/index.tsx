import { useEffect, useMemo, useState } from "react";
import { dataResource } from "../../dataResource";
import { CountryRows } from "../CountryRows";
import { buildCountries } from "./utils";
import styles from "./DataViewer.module.css";

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

  const PAGE = 25;
  const [page, setPage] = useState(1);
  useEffect(() => {
    setPage(1);
  }, [debounced, year]);

  const slice = filtered.slice(0, page * PAGE);
  const canMore = slice.length < filtered.length;

  return (
    <div>
      <div className={styles.controls}>
        <div>Countries: {countries.length}</div>

        <label>
          <span>Year</span>
          <select value={year ?? ""} onChange={(e) => setYear(e.target.value ? Number(e.target.value) : undefined)}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className={styles.search} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Country name</th>
            <th>Population</th>
            <th>ISO Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {slice.map((country) => (
            <CountryRows key={country.key} country={country} displayYear={year} />
          ))}
        </tbody>
      </table>
      {canMore && <button onClick={() => setPage((page) => page + 1)}>Load more</button>}
    </div>
  );
};
