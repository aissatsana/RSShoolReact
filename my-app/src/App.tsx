import { useState } from "react";
import "./App.css";
import { Modal } from "./components/Modal";
import { UncontrolledForm } from "./components/UncontrolledForm";
import { ControlledForm } from "./components/ControlledForm";
import { type formData } from "./types";

function App() {
  const [modalName, setModalName] = useState<null | "uncontrolled" | "controlled">(null);
  const [formData, setFormData] = useState<null | formData>(null);

  const handleFormSubmit = (data: formData) => {
    setFormData(data);
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={() => setModalName("uncontrolled")}>First modal</button>
      <button onClick={() => setModalName("controlled")}>Second modal</button>
      {modalName && <Modal onClose={() => setModalName(null)}>{modalName === "uncontrolled" ? <UncontrolledForm onSubmit={handleFormSubmit} /> : <ControlledForm />}</Modal>}

      {formData && <div>There will be some data from form</div>}
    </div>
  );
}

export default App;
