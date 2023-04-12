import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import SelectedStepDetails from "./SelectedStepDetails";
import FlowSelector from "./FlowSelector";
import StepSelector from "./StepSelector";

function UpdateFlows() {
  const [flows, setFlows] = useState({});
  const [selectedFlow, setSelectedFlow] = useState("");
  const [stepIndex, setStepIndex] = useState(-1);
  const [selectedStep, setSelectedStep] = useState("-- Scegli uno step --");
  // const [steps, setSteps] = useState([])
  const [edit, setEdit] = useState(true);
  const [show, setShow] = useState(true);
  // const [inputValue, setInputValue] = useState("");

  const notEditableFileds = ["RUN", "STEP_CONTROL", "STEP_DESCRIPTION"];

  const handleStepChange = (event) => {
    setStepIndex(event.target.value);
  };

  const selectedSteps = selectedFlow ? flows[selectedFlow].STEPS : [];

  const renderStepDetails = () => {
    if (stepIndex === -1) return null;
    const step = flows[selectedFlow].STEPS[stepIndex];
    return (
      <div>
        {Object.keys(step).map((key) => (
          <FormGroup key={key}>
            <Label>{key}</Label>
            <Input
              type="text"
              value={step[key]}
              onChange={(event) => handleValueChange(event, key)}
            />
          </FormGroup>
        ))}
      </div>
    );
  };

  const handleValueChange = (event, key) => {
    const updatedFlows = { ...flows };
    updatedFlows[selectedFlow].STEPS[stepIndex][key] = event.target.value;
    setFlows(updatedFlows);
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
          <FlowSelector
            flows={flows}
            setFlows={setFlows}
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            setStepIndex={setStepIndex}
            setSelectedStep={setSelectedStep}
          />
        </Col>
        <Col>
          <StepSelector
            selectedFlow={selectedFlow}
            selectedStep={selectedStep}
            setSelectedStep={setSelectedStep}
            flows={flows}
            setStepIndex={setStepIndex}
            setShow={setShow}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {/* {renderStepDetails()} */}
          { show &&
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
            />
          }
        </Col>
      </Row>
    </Container>
  );
}
export default UpdateFlows;
