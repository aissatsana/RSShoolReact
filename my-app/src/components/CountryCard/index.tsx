import { useState } from "react";
import type { CountryView } from "../../types";
import { Modal } from "../Modal";
import { formatNumber } from "./utils";

const NA = "N/A" as const;

export const CountryCard = ({ country }: { country: CountryView }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Country name</th>
            <th>Population</th>
            <th>ISO Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{country.name}</td>
            <td>{formatNumber(country.latestPopulation)}</td>
            <td>{country.iso || NA}</td>
            <td>
              <button onClick={() => setOpen((prev) => !prev)}>{open ? "Hide" : "Show"} yearly data</button>
            </td>
          </tr>
          {open && (
            <tr>
              <td colSpan={4}>
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Population</th>
                      <th>CO₂</th>
                      <th>CO₂ per capita</th>
                    </tr>
                  </thead>
                  <tbody>
                    {country.rows.map((row) => (
                      <tr key={row.year}>
                        <td>{row.year}</td>
                        <td>{formatNumber(row.population)}</td>
                        <td>{formatNumber(row.co2)}</td>
                        <td>{formatNumber(row.co2_per_capita)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
