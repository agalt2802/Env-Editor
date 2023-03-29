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

function NewFlow() {
  const [steps, setSteps] = useState({});
  const [selectedStep, setSelectedStep] = useState("");
  const [stepIndex, setStepIndex] = useState(-1);
  const [flow, setFlow] = useState({});
  const [inputValue, setInputValue] = useState("");

  const notEditableFileds = ["RUN", "STEP_CONTROL"];

  useEffect(() => {
    async function fecthData() {
      const response = await fetch("http://127.0.0.1:8081/steps").catch(
        (error) => console.log(error)
      );
      const json = await response.json();
      setSteps(json);
    }
    if (Object.keys(steps).length === 0) fecthData();
  }, [steps]);

  const handleStepChange = (event) => {
    setSelectedStep(event.target.value);
    let stepsArray = Object.keys(steps);
    let index = stepsArray.indexOf(event.target.value);
    setStepIndex(index);
  };

  const handleValueChange = (event, key) => {
    const updatedSteps = { ...steps };
    updatedSteps[selectedStep][key] = event.target.value;
    setSteps(updatedSteps);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddStep = (event) => {
    const updatedFlow = { ...flow };
    console.log(updatedFlow);
    if (updatedFlow[inputValue] === undefined) {
      updatedFlow[inputValue] = {};
    }

    if (updatedFlow[inputValue].NAME === undefined) {
      updatedFlow[inputValue].NAME = inputValue;
    }

    if (updatedFlow[inputValue].STEPS === undefined) {
      updatedFlow[inputValue].STEPS = [];
    }
    updatedFlow[inputValue].STEPS = updatedFlow[inputValue].STEPS.concat(
      steps[selectedStep]
    );

    setFlow(updatedFlow);
    console.log("added step: " + selectedStep);
  };

  const handleSaveFlow = (event) => {
    async function saveData() {
      await fetch("http://127.0.0.1:8081/newFlow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flow),
      }).catch((error) => console.log(error));
      console.log("salva flusso");
    }
    saveData();
  };
  const renderStepDetails = () => {
    if (stepIndex === -1) return null;
    const step = steps[selectedStep];
    return (
      <div>
        {Object.keys(step).map((key) => (
          <FormGroup key={key}>
            <Label>{key}</Label>
            <Input
              type="text"
              name={key}
              value={step[key]}
              onChange={(event) => handleValueChange(event, key)}
              readOnly={notEditableFileds.find((element) => element === key)}
            />
          </FormGroup>
        ))}
        <div className="d-flex justify-content-end">
          <Button
            id="addStep"
            className="button"
            type="submit"
            onClick={handleAddStep}
          >
            ADD STEP
          </Button>
          <Button
            id="saveFlow"
            className="button"
            type="submit"
            onClick={handleSaveFlow}
          >
            SAVE FLOW
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Container id="mainContainer">
      <Row>
        <Col>
          <h1>Crea nuovo flusso</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Label>Nome Flusso</Label>
          </div>
          <div className="d-flex justify-content-between">
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup id="stepForm,">
            <Label>Seleziona Step:</Label>
            <Input
              type="select"
              value={selectedStep}
              onChange={handleStepChange}
            >
              <option value="">-- Scegli uno step --</option>
              {Object.keys(steps).map((stepsKey) => (
                <option key={stepsKey} value={stepsKey}>
                  {steps[stepsKey]["RUN"]}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col> {renderStepDetails()} </Col>
      </Row>
    </Container>
  );
}
export default NewFlow;
