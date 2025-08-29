import { Suspense } from "react";
import "./App.css";
import { Spinner } from "./components/Spinner";
import { DataViewer } from "./components/DataViewer";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <h1>CO 2</h1>
      <DataViewer />
    </Suspense>
  );
}

export default App;
