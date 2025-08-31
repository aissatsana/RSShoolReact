import { useEffect, useMemo, useRef, useState } from "react";
import type { YearRow } from "../../types";
import { formatNumber } from "./utils";
import styles from "./CountryRows.module.css";
import type { CountryRowsProps, Field } from "./types";
import { FIELDS, FLASH_TIMEOUT, NA } from "./constants";

export const CountryRows = ({ country, displayYear, extraColumns = [] }: CountryRowsProps) => {
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
        }, FLASH_TIMEOUT);
        return () => clearTimeout(timeout);
      }
    }

    prevRowRef.current = row;
  }, [row]);

  useEffect(() => {
    prevRowRef.current = row;
  });

  const population = row?.population;
  const co2 = row?.co2;
  const co2PerCapita = row?.co2_per_capita;
  return (
    <>
      <tr>
        <td>{country.iso || NA}</td>
        <td>{country.name}</td>
        <td className={flash.population ? styles.flash : ""}>{formatNumber(population)}</td>
        <td className={flash.co2 ? styles.activeRow : ""}>{formatNumber(co2)}</td>
        <td className={flash.co2_per_capita ? styles.activeRow : ""}>{formatNumber(co2PerCapita)}</td>
        {extraColumns.map((key) => {
          const value = row?.[key];
          return <td key={key}>{value != null ? formatNumber(value) : "N/A"}</td>;
        })}
      </tr>
    </>
  );
};
