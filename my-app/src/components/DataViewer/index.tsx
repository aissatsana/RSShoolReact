import { useEffect, useMemo, useState } from "react";
import { dataResource } from "../../dataResource";
import { CountryRows } from "../CountryRows";
import { buildCountries } from "./utils";
import styles from "./DataViewer.module.css";

export const DataViewer = () => {
  const raw = dataResource.read();
  const countries = useMemo(() => buildCountries(raw), [raw]);

  const years = useMemo(() => {
    const set = new Set<number>();
    for (const country of countries) for (const row of country.rows) set.add(row.year);
    return Array.from(set).sort((a, b) => a - b);
  }, [countries]);

  const PAGE = 25;
  const [page, setPage] = useState(1);
  const [year, setYear] = useState<number | undefined>(undefined);

  useEffect(() => setPage(1), [year]);
  useEffect(() => {
    if (!year && years.length) setYear(years[years.length - 1]);
  }, [years, year]);

  const slice = countries.slice(0, page * PAGE);
  const canMore = slice.length < countries.length;

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
          {slice.map((c) => (
            <CountryRows key={c.key} country={c} displayYear={year} />
          ))}
        </tbody>
      </table>
      {canMore && <button onClick={() => setPage((page) => page + 1)}>Load more</button>}
    </div>
  );
};
