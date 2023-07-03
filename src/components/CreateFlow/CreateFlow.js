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
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false)
  const [edit, setEdit] = useState(false);
  const notEditableFileds = ["RUN", "STEP_CONTROL"];

  const Fields = Object.freeze({ NAME: 0, DESCRIPTION: 1 });

  const handleInputChange = (event, field) => {
    let value = event.target.value;

    switch(field)
    {
      case Fields.NAME:
        setInputValue(value.toUpperCase());
      break;
      case Fields.DESCRIPTION:
        setDescription(value);
      break;
    }
  };

  const reset = () => {
    setSteps({});
    setFlow({});
    setSelectedStep("-- Scegli uno step --");
    setStepIndex(-1);
    setInputValue("");
    setDescription("");
  }

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
                  onChange={(event) => handleInputChange(event, Fields.NAME)}
                  autoFocus={true}
                />
              </div>
            </Col>
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
                  onChange={(event) => handleInputChange(event, Fields.DESCRIPTION)}
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
                  description={description}
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
                flow={flow}
                edit={edit}
                reset={reset}
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
