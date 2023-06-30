import React, { useState } from "react";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

function CopyFlowModal({ show, setShow, flow, setFlow, flows, setFlows, setSelectedFlow, setSteps, setSelectedStep, setStepIndex, edit}) {
  const [newFlowName, setNewFlowName] = useState(''); 
  function reset() {
    setSteps({});
    setFlow({});
    setSelectedStep("-- Scegli uno step --");
    setStepIndex(-1);
  }

  const handleConfirm = (event) => {
    event.preventDefault()

    console.log("asdf", flows);

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
      reset();

      console.log(newFlow);
      flows[newFlowName] = newFlow[newFlowName];
      console.log(flows[newFlowName]);
      setFlows(flows);
      console.log(flows);

      setSelectedFlow(newFlowName);
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
