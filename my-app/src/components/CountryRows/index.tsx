import { useEffect, useMemo, useRef, useState } from "react";
import type { CountryView, YearRow } from "../../types";
import { formatNumber } from "./utils";
import styles from "./CountryRows.module.css";

const NA = "N/A" as const;

type CountryRowsProps = {
  country: CountryView;
  displayYear?: number;
};
const FIELDS = ["population", "co2", "co2_per_capita"] as const;
type Field = (typeof FIELDS)[number];

export const CountryRows = ({ country, displayYear }: CountryRowsProps) => {
  const row: YearRow | undefined = useMemo(() => country.rows.find((row) => row.year === displayYear), [country.rows, displayYear]);
  const prevRowRef = useRef<YearRow | undefined>(undefined);
  const [flash, setFlash] = useState<Record<Field, boolean>>({
    population: false,
    co2: false,
    co2_per_capita: false,
  });

  useEffect(() => {
    const prev = prevRowRef.current;
    const next = row;

    if (prev && next) {
      const nextFlash: Partial<Record<Field, boolean>> = {};
      FIELDS.forEach((field) => {
        const prevVal = prev[field];
        const nextVal = next[field];
        if (prevVal !== nextVal && (prevVal != null || nextVal != null)) {
          nextFlash[field] = true;
        }
      });

      if (Object.keys(nextFlash).length) {
        setFlash((state) => ({ ...state, ...nextFlash }));
        const timeout = setTimeout(() => {
          setFlash({ population: false, co2: false, co2_per_capita: false });
        }, 1200);
        return () => clearTimeout(timeout);
      }
    }

    prevRowRef.current = row;
  }, [row]);

  useEffect(() => {
    prevRowRef.current = row;
  });

  const [open, setOpen] = useState(false);
  const populationMain = row?.population ?? country.latestPopulation ?? undefined;
  return (
    <>
      <tr>
        <td>{country.name}</td>
        <td className={flash.population ? styles.flash : ""}>{formatNumber(populationMain)}</td>
        <td>{country.iso || NA}</td>
        <td>
          <button onClick={() => setOpen((prev) => !prev)}>{open ? "Hide" : "Show"} yearly data</button>
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={4}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Population</th>
                  <th>CO₂</th>
                  <th>CO₂ per capita</th>
                </tr>
              </thead>
              <tbody>
                {country.rows.map((row) => {
                  const isActive = row.year === displayYear;
                  return (
                    <tr key={row.year}>
                      <td className={isActive ? styles.activeRow : ""}>{row.year}</td>
                      <td className={isActive ? styles.activeRow : ""}>{formatNumber(row.population)}</td>
                      <td className={isActive ? styles.activeRow : ""}>{formatNumber(row.co2)}</td>
                      <td className={isActive ? styles.activeRow : ""}>{formatNumber(row.co2_per_capita)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};
