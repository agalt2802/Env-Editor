import React, { useState } from "react";
import { Container, Row, Col, Label, Input } from "reactstrap";

import "semantic-ui-css/semantic.min.css";
import StepSelector from "./StepSelector";
import StepDetails from "./StepDetails";
import SaveNewFlowModal from "./SaveNewFlowModal";
import AddedStep from "./AddedStep";

function CreateFlow() {
  const [steps, setSteps] = useState({});
  const [selectedStep, setSelectedStep] = useState("-- Scegli uno step --");
  const [stepIndex, setStepIndex] = useState(-1);
  const [flow, setFlow] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false);
  const notEditableFileds = ["RUN", "STEP_CONTROL", "STEP_DESCRIPTION"];

  const handleInputChange = (event, data) => {
    setInputValue(event.target.value.toUpperCase());
  };

  return (
    <Container id="mainContainer">
      <Row className="pageTitle">
        <Col>
          <h1>Crea nuovo flusso</h1>
        </Col>
      </Row>
      <Row className="pageContent">
        <Col className="firtsColumn">
          <Row>
            <Col className="flowConfigurator">
              <div>
                <Label>Nome Flusso</Label>
              </div>
              <div className="d-flex justify-content-around">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={(event) => handleInputChange(event)}
                  autoFocus={true}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <StepSelector
                steps={steps}
                setSteps={setSteps}
                selectedStep={selectedStep}
                setSelectedStep={setSelectedStep}
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
                inputValue={inputValue}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {
                <StepDetails
                  steps={steps}
                  setSteps={setSteps}
                  selectedStep={selectedStep}
                  setSelectedStep={setSelectedStep}
                  stepIndex={stepIndex}
                  setStepIndex={setStepIndex}
                  flow={flow}
                  setFlow={setFlow}
                  inputValue={inputValue}
                  notEditableFileds={notEditableFileds}
                  edit={edit}
                  setEdit={setEdit}
                />
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <SaveNewFlowModal
                show={show}
                setShow={setShow}
                inputValue={inputValue}
                setInputValue={setInputValue}
                flow={flow}
                setFlow={setFlow}
                steps={steps}
                setSteps={setSteps}
                setSelectedStep={setSelectedStep}
                setStepIndex={setStepIndex}
              />
            </Col>
          </Row>
        </Col>
        {(flow[inputValue] && flow[inputValue].STEPS.length > 0) &&(
          <Col>
            <AddedStep
              flow={flow}
              setFlow={setFlow}
              inputValue={inputValue}
              steps={steps}
              setSteps={setSteps}
              selectedStep={selectedStep}
              setSelectedStep={setSelectedStep}
              setStepIndex={setStepIndex}
              setEdit={setEdit}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}
export default CreateFlow;
