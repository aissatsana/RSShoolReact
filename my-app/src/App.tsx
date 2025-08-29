import { Suspense } from "react";
import "./App.css";
import { DataViewer } from "./components/DataViewer";
import { Spinner } from "./components/Spinner";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <DataViewer />
    </Suspense>
  );
}

export default App;
