import React, { useState } from "react";
import { Alert, Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchWithCatch } from "../../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

import { useAlert } from "../../AlertProvider";

export default function CopyFlowModal({ show, setShow, flow })
{
  const originalName = flow.NAME;

	const { addError } = useAlert();
	
	const navigate = useNavigate();
  const [newFlowName, setNewFlowName] = useState(''); 
  const [showAlreadyExists, setShowAlreadyExists] = useState(false); 

  const handleConfirm = (event) => {
    event.preventDefault();

    setShowAlreadyExists(false);

    flow.NAME = newFlowName;
    flow.id = newFlowName;

    fetchWithCatch(`/flows/${encodeURIComponent(flow.id)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flow)
    },
    (res) => navigate("/flows/edit/"+flow.id),
    (e) =>
    {
      if(e.status == 409)
        setShowAlreadyExists(true);
      else
        addError(e);
    });
  };

  const handleCancel = () =>
  {
    setShowAlreadyExists(false);

    setShow(false);
  }

  return (
    <div className="d-flex justify-content-end">
      <Modal show={show} onHide={handleCancel} autoFocus={false} onChange={(event) => event.preventDefault()}>
        <Modal.Header closeButton>Copia flusso {originalName}</Modal.Header>
        <Modal.Body>
          <p>Inserire il nome del nuovo flusso</p>
          <input onChange={e => setNewFlowName(e.target.value.toUpperCase())} />
          {showAlreadyExists && <Alert color="danger">Esiste già un flusso con questo nome</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleConfirm}>
            Conferma
          </Button>
          <Button color="danger" onClick={handleCancel}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}