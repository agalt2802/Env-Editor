import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import SelectedStepDetails from "./SelectedStepDetails";
import FlowSelector from "./FlowSelector";
import AddedSteps from "./AddedSteps";
import AddStep from "./AddStep";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function UpdateFlows() {
  const [flows, setFlows] = useState({});
  const [selectedFlow, setSelectedFlow] = useState("");
  const [stepIndex, setStepIndex] = useState(-1);
  const [selectedStep, setSelectedStep] = useState("-- Scegli uno step --");
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddStep, setShowAddStep] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [steps, setSteps] = useState([])
  // const [inputValue, setInputValue] = useState("");

  const notEditableFileds = ["RUN", "STEP_CONTROL", "STEP_DESCRIPTION"];

  const handleValueChange = (event, key) => {
    const updatedFlows = { ...flows };
    updatedFlows[selectedFlow].STEPS[stepIndex][key] = event.target.value;
    setFlows(updatedFlows);
  };

  const handleShowAddStep = () => {
    setShowAddStep(true);
  };

  const handleShowSaveModal = () =>{
    setShowSaveModal(true)
  }
  
  const handleConfirmSaveEdit = () =>{
    event.preventDefault()
    async function saveData() {
      await fetch("http://127.0.0.1:8081/updateFlows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flows),
      }).catch((error) => console.log(error));
      console.log("salva flusso");
    }
    saveData()
    setShowSaveModal(false)
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Editor di Flussi env.yml</h1>
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
            />
          </Row>
          <Row>
            {show && (
              <SelectedStepDetails
                flows={flows}
                setFlows={setFlows}
                selectedFlow={selectedFlow}
                setSelectedFlow={setSelectedFlow}
                // selectedStep={selectedStep}
                // setSelectedStep={setSelectedStep}
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
                setShow={setShow}
                // setFlow={setSelectedFlow}
                // inputValue={inputValue}
                notEditableFileds={notEditableFileds}
                // setEdit={setEdit}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            )}
          </Row>
          {selectedFlow != "" && (
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
          <AddedSteps
            selectedFlow={selectedFlow}
            setSelectedStep={setSelectedStep}
            flows={flows}
            setFlows={setFlows}
            setStepIndex={setStepIndex}
            setShow={setShow}
          />
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
        onHide={() => setShowAddStep(false)}
        autoFocus={false}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header closeButton> Salvare le modifiche</Modal.Header>
        <Modal.Body>
              Salvare le modifiche al flusso {selectedFlow}?
        </Modal.Body>
        <Modal.Footer>
        <Button color="success" onClick={handleConfirmSaveEdit}>
            Conferma
          </Button>
          <Button color="danger" onClick={() => setShowSaveModal(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default UpdateFlows;
