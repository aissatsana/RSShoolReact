import { dataResource } from "../../dataResource";

export const DataViewer = () => {
  const data = dataResource.read();
  const keys = Object.keys(data).slice(0, 5);

  return (
    <div>
      <h2>Пример данных</h2>
      <pre>{JSON.stringify(keys, null, 2)}</pre>
    </div>
  );
};
