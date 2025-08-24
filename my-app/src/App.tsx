import { useState } from "react";
import "./App.css";
import { Modal } from "./components/Modal";
import { UncontrolledForm } from "./components/UncontrolledForm";
import { ControlledForm } from "./components/ControlledForm";
import { type formData } from "./types";
import { Data } from "./components/Data";

function App() {
  const [modalName, setModalName] = useState<null | "uncontrolled" | "controlled">(null);
  const [formData, setFormData] = useState<null | formData>(null);

  const handleFormSubmit = (data: formData) => {
    setFormData(data);
    setModalName(null);
  };

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setModalName("uncontrolled")}>First modal</button>
        <button onClick={() => setModalName("controlled")}>Second modal</button>
      </div>
      {modalName && (
        <Modal onClose={() => setModalName(null)}>{modalName === "uncontrolled" ? <UncontrolledForm onSubmit={handleFormSubmit} /> : <ControlledForm onSubmit={handleFormSubmit} />}</Modal>
      )}

      {formData && <Data data={formData} />}
    </>
  );
}

export default App;
