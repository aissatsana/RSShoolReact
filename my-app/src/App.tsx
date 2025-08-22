import { useState } from "react";
import "./App.css";
import { Modal } from "./components/Modal";
import { UncontrolledForm } from "./components/UncontrolledForm";
import { ControlledForm } from "./components/ControlledForm";

function App() {
  const [modalName, setModalName] = useState<null | "uncontrolled" | "controlled">(null);

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={() => setModalName("uncontrolled")}>First modal</button>
      <button onClick={() => setModalName("controlled")}>Second modal</button>
      {modalName && <Modal onClose={() => setModalName(null)}>{modalName === "uncontrolled" ? <UncontrolledForm /> : <ControlledForm />}</Modal>}
    </div>
  );
}

export default App;
