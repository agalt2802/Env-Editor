import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import React from 'react'
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

function SaveNewFlowModal({ show, setShow, inputValue, flow, edit, reset }) {
  const handleShow = () => {
    setShow(true);
  };

  const handleConfirm = (event) => {
    event.preventDefault()

    fetchWithCatch("/newFlow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flow),
    }, (res) => {
      console.log("salva flusso");
      setShow(false);
      reset();
    });
  };


  if (flow[inputValue] && flow[inputValue].STEPS.length > 0 && !edit) {
    return (
      <div className="d-flex justify-content-end">
        <Button
          id="saveFlow"
          className="button"
          color="primary"
          type="submit"
          onClick={handleShow}
        >
          SAVE FLOW
        </Button>

        <Modal show={show} onHide={() => setShow(false)} autoFocus={false} onChange={(event) => event.preventDefault()}>
          <Modal.Header closeButton>Conferma</Modal.Header>
          <Modal.Body>
            Vuoi salvare il flusso {inputValue}
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

export default SaveNewFlowModal;
