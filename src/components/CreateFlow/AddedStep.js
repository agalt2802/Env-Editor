import "semantic-ui-css/semantic.min.css";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowUp,
  faArrowDown,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

function AddedStep({
  flow,
  setFlow,
  inputValue,
  steps,
  setSelectedStep,
  setStepIndex,
  setEdit
}) {
  console.log("ADDED STEPS: " + JSON.stringify(flow[inputValue].STEPS));

  const moveUp = (event, selectedIndex) => {
    if (flow[inputValue].STEPS[selectedIndex - 1]) {
      let updatedFlow = { ...flow };

      let selectedStep = updatedFlow[inputValue].STEPS[selectedIndex];
      let stepToSwap = updatedFlow[inputValue].STEPS[selectedIndex - 1];

      updatedFlow[inputValue].STEPS[selectedIndex] = stepToSwap;
      updatedFlow[inputValue].STEPS[selectedIndex - 1] = selectedStep;

      console.log(updatedFlow);

      setFlow(updatedFlow);
    }
  };

  const moveDown = (event, selectedIndex) => {
    if (flow[inputValue].STEPS[selectedIndex + 1]) {
      let updatedFlow = { ...flow };

      let selectedStep = updatedFlow[inputValue].STEPS[selectedIndex];
      let stepToSwap = updatedFlow[inputValue].STEPS[selectedIndex + 1];

      updatedFlow[inputValue].STEPS[selectedIndex] = stepToSwap;
      updatedFlow[inputValue].STEPS[selectedIndex + 1] = selectedStep;

      console.log(updatedFlow);

      setFlow(updatedFlow);
    }
  };

  const deleteStep = (event, selectedIndex) => {
    let updatedFlow = { ...flow };
    updatedFlow[inputValue].STEPS.splice(selectedIndex, 1);
    setFlow(updatedFlow);
  };

  const editStep = (event, selectedIndex) => {
  
    let stepToEdit = flow[inputValue].STEPS[selectedIndex].RUN.toLocaleUpperCase()    
    setSelectedStep(stepToEdit)

    let stepsArray = Object.keys(steps); // potrebbe tornarmi utile
    let index = stepsArray.indexOf(stepToEdit);
    setStepIndex(index);

    setEdit(true)
  };

  return (
    <Row className="g-3">
      <Card id="addedSteps">
        <Card.Header>STEPS</Card.Header>
      </Card>
      {flow[inputValue].STEPS.map((step) => (
        <Card
          key={flow[inputValue].STEPS.indexOf(step)}
          className="cardContent"
        >
          <Card.Body>
            <Card.Title>{step.RUN.toLocaleUpperCase()}</Card.Title>
            <Card.Text>{step.STEP_DESCRIPTION}</Card.Text>
            {(flow[inputValue].STEPS.length > 1 && flow[inputValue].STEPS.indexOf(step) != 0) &&
            <Button
              variant="primary"
              className="button"
              onClick={() =>
                moveUp(event, flow[inputValue].STEPS.indexOf(step))
              }
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            }
            {(flow[inputValue].STEPS.length > 1 && flow[inputValue].STEPS.indexOf(step) != flow[inputValue].STEPS.length-1) &&
            <Button
              variant="primary"
              className="button"
              onClick={() =>
                moveDown(event, flow[inputValue].STEPS.indexOf(step))
              }
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            }
            <Button
              variant="success"
              className="button"
              onClick={() =>
                editStep(event, flow[inputValue].STEPS.indexOf(step))
              }
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button
              variant="danger"
              className="button"
              onClick={() =>
                deleteStep(event, flow[inputValue].STEPS.indexOf(step))
              }
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Row>
  );
}

export default AddedStep;
