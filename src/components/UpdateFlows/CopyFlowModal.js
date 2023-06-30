import React, { useState } from "react";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

function CopyFlowModal({ show, setShow, flow, flows, setFlows, edit, reset }) {
  const [newFlowName, setNewFlowName] = useState(''); 

  const handleConfirm = (event) => {
    event.preventDefault()

    let newFlow = {};
    newFlow[newFlowName] = flows[flow];
    newFlow[newFlowName].NAME = newFlowName;
    
    fetchWithCatch("/newFlow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFlow),
    }, (res) => {
      setShow(false);

      flows[newFlowName] = newFlow[newFlowName];
      setFlows(flows);

      reset(newFlowName);
    });
  };


  if (flow && !edit) {
    return (
      <div className="d-flex justify-content-end">
        <Modal show={show} onHide={() => setShow(false)} autoFocus={false} onChange={(event) => event.preventDefault()}>
          <Modal.Header closeButton>Copia flusso {flow}</Modal.Header>
          <Modal.Body>
            Inserire il nome del nuovo flusso
            <input onChange={e => setNewFlowName(e.target.value.toUpperCase())} />
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={handleConfirm}>
              Conferma
            </Button>
            <Button color="danger" onClick={() => setShow(false)}>
              Annulla
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CopyFlowModal;
