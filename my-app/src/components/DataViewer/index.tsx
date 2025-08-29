import { useMemo, useState } from "react";
import { dataResource } from "../../dataResource";
import { CountryCard } from "../CountryCard";
import { buildCountries } from "./utils";

export const DataViewer = () => {
  const raw = dataResource.read();
  const countries = useMemo(() => buildCountries(raw), [raw]);

  const PAGE = 25;
  const [page, setPage] = useState(1);
  const slice = countries.slice(0, page * PAGE);
  const canMore = slice.length < countries.length;

  return (
    <div>
      <div>Countries: {countries.length}</div>
      {slice.map((country) => (
        <CountryCard key={country.key} country={country} />
      ))}
      {canMore && <button onClick={() => setPage((page) => page + 1)}>Load more</button>}
    </div>
  );
};
