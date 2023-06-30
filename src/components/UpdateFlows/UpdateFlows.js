import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Label, Input } from "reactstrap";
import SelectedStepDetails from "./SelectedStepDetails";
import FlowSelector from "./FlowSelector";
import AddedSteps from "./AddedSteps";
import AddStep from "./AddStep";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../commonFunctions";
import CopyFlowModal from "./CopyFlowModal";

function UpdateFlows() {
  const [flows, setFlows] = useState({});
  const [selectedFlow, setSelectedFlow] = useState("");
  const [description, setDescription] = useState("");
  const [stepIndex, setStepIndex] = useState(-1);
  const [selectedStep, setSelectedStep] = useState("-- Scegli uno step --");
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddStep, setShowAddStep] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [steps, setSteps] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const notEditableFileds = ["RUN", "STEP_CONTROL", "STEP_DESCRIPTION"];

  function saveData(successCallback) {
    let success = () => {
      console.log("salva flusso");
      
      successCallback();
    };
    fetchWithCatch("/updateFlows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flows),
    }, success);
  }

  const handleShowAddStep = () => {
    setShowAddStep(true);
  };

  const handleShowSaveModal = () => {
    setShowSaveModal(true);
  };

  const handleConfirmSaveEdit = () => {
    event.preventDefault();
    flows[selectedFlow].DESCRIPTION = description;
    saveData(() => {
      setShowSaveModal(false);
    });
  };

  const handeleEdit = () => {
    setEdit(true);
  };

  const handeleCopy = () => {
    setShowCopyModal(true);
  };

  const handleDelete = (event) => {
    console.log(flows);
    const updatedFlows = flows;
    delete updatedFlows[selectedFlow];
    setFlows(updatedFlows);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    saveData(() => {
      setShowDeleteModal(false);
      setSelectedFlow("");
    });
  };

  const reset = (newFlow) => {
    setSteps({});
    setSelectedFlow(newFlow);
    setSelectedStep("-- Scegli uno step --");
    setStepIndex(-1);
  };

  const handleInputChange = (event) => {
    let value = event.target.value;
    
    setDescription(value);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Editor di Flussi env.yml</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <CopyFlowModal
            show={showCopyModal}
            setShow={setShowCopyModal}
            flow={selectedFlow}
            flows={flows}
            setFlows={setFlows}
            edit={edit}
            reset={reset}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Row>
            <FlowSelector
              flows={flows}
              setFlows={setFlows}
              selectedFlow={selectedFlow}
              setSelectedFlow={setSelectedFlow}
              setStepIndex={setStepIndex}
              setSelectedStep={setSelectedStep}
              setDescription={setDescription}
            />
          </Row>
          <Row>
            <Col className="flowConfigurator">
              <div>
                <Label>Descrizione flusso</Label>
              </div>
              <div className="d-flex justify-content-around">
                <Input
                  type="textarea"
                  value={description}
                  onChange={(event) => handleInputChange(event)}
                  autoFocus={true}
                  disabled={!edit}
                />
              </div>
            </Col>
          </Row>
          {!edit &&
            selectedFlow != "" && ( // manca da risettare edit per tornare all'inizio
              <Row>
                <Col>
                <Button
                  color="success"
                  className="button"
                  onClick={handeleEdit}
                >
                  EDIT
                </Button>
                </Col>
                <Col>
                <Button
                  color="success"
                  className="button"
                  onClick={handeleCopy}
                >
                  COPY
                </Button>
                </Col>
                <Col>
                <Button
                  color="danger"
                  className="button"
                  onClick={handleDelete}
                >
                  DELETE
                </Button>
                </Col>
              </Row>
            )}
          {edit && (
            <Row>
              {show && (
                <SelectedStepDetails
                  flows={flows}
                  setFlows={setFlows}
                  selectedFlow={selectedFlow}
                  setSelectedFlow={setSelectedFlow}
                  stepIndex={stepIndex}
                  setStepIndex={setStepIndex}
                  setShow={setShow}
                  notEditableFileds={notEditableFileds}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
            </Row>
          )}

          {edit && selectedFlow != "" && (
            <Row>
              <Col>
                <Button
                  color="success"
                  className="button"
                  onClick={() => handleShowAddStep()}
                >
                  <FontAwesomeIcon icon={faSquarePlus} /> ADD STEP
                </Button>
              </Col>
              <Col>
                <Button
                  color="success"
                  className="button"
                  onClick={() => handleShowSaveModal()}
                >
                  <FontAwesomeIcon icon={faSave} /> SAVE FLOW
                </Button>
              </Col>
            </Row>
          )}
        </Col>
        <Col>
          {edit && (
            <AddedSteps
              selectedFlow={selectedFlow}
              setSelectedStep={setSelectedStep}
              flows={flows}
              setFlows={setFlows}
              setStepIndex={setStepIndex}
              setShow={setShow}
            />
          )}
        </Col>
      </Row>

      <Modal
        show={showAddStep}
        onHide={() => setShowAddStep(false)}
        autoFocus={false}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header closeButton> Aggiungi un flusso al cron</Modal.Header>
        <Modal.Body>
          <AddStep
            flows={flows}
            setFlows={setFlows}
            selectedFlow={selectedFlow}
            steps={steps}
            setSteps={setSteps}
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => setShowAddStep(false)}>
            DONE
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSaveModal}
        onHide={() => setShowSaveModal(false)}
        autoFocus={false}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header closeButton> Salvare le modifiche</Modal.Header>
        <Modal.Body>Salvare le modifiche al flusso {selectedFlow}?</Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleConfirmSaveEdit}>
            Conferma
          </Button>
          <Button color="danger" onClick={() => setShowSaveModal(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        autoFocus={false}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header closeButton> Attenzione!</Modal.Header>
        <Modal.Body>Vuoi eliminare il flusso {selectedFlow}?</Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleConfirmDelete}>
            Conferma
          </Button>
          <Button color="danger" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default UpdateFlows;
