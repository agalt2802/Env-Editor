import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { Modal } from "react-bootstrap";

import "semantic-ui-css/semantic.min.css";

export default function AddStepModal({ show, steps, handleConfirm, handleCancel })
{
  const [selectedStep, setSelectedStep] = useState(steps[0].id);
  
  return (
    <div className="d-flex justify-content-end">
      <Modal show={show} onHide={handleCancel} autoFocus={false} onChange={(event) => event.preventDefault()}>
        <Modal.Header closeButton>Aggiungi step</Modal.Header>
        <Modal.Body>
          <p>Selezionare lo step da aggiungere</p>
          <Input type="select" value={selectedStep} onChange={(e) => setSelectedStep(e.target.value)}>
          {Object.keys(steps).map((key) => (
            <option key={key} value={steps[key].id}>
              {steps[key].RUN}
            </option>
          ))}
        </Input>
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => handleConfirm(selectedStep)}>
            Aggiungi
          </Button>
          <Button color="danger" onClick={handleCancel}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}