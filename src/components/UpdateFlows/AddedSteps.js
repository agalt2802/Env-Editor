import React, { useEffect } from "react";
import { Row, FormGroup, Label, Input } from "reactstrap";
import { Card, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowUp,
  faArrowDown,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import "semantic-ui-css/semantic.min.css";

function AddedSteps({
  selectedFlow,
  setSelectedStep,
  flows,
  setFlows,
  setStepIndex,
  setShow
}) {
  if (flows[selectedFlow]) {
    const flow = flows[selectedFlow];

    const handleStepChange = (event) => {
      setStepIndex(event.target.value); // indice dello step nel flow
      setSelectedStep(flows[selectedFlow].STEPS[event.target.value]["RUN"]); // nome dello step selezionato
      setShow(true)
    };

    const moveUp = (event, selectedIndex) => {
      console.log(parseInt(selectedIndex) - 1)
      // modifichiamo la posizione dello step nel flow e poi sostituiamo il flow nell'elenco dei flows
      if (flows[selectedFlow].STEPS[parseInt(parseInt(selectedIndex)) - 1]) {
        let updatedFlow = { ...flows[selectedFlow] };
  
        let selectedStep = updatedFlow.STEPS[parseInt(selectedIndex)];
        let stepToSwap = updatedFlow.STEPS[parseInt(selectedIndex) - 1];
  
        updatedFlow.STEPS[parseInt(selectedIndex)] = stepToSwap;
        updatedFlow.STEPS[parseInt(parseInt(selectedIndex)) - 1] = selectedStep;
        
        let updatedFlows  = {...flows}
        updatedFlows[selectedFlow] = updatedFlow
        setFlows(updatedFlows)
      }
    };
  
    const moveDown = (event, selectedIndex) => {
      console.log(parseInt(parseInt(selectedIndex)) + 1)
      console.log(flows[selectedFlow].STEPS[parseInt(parseInt(selectedIndex)) + 1])
      if (flows[selectedFlow].STEPS[parseInt(parseInt(selectedIndex)) + 1]) {
        
        let updatedFlow = { ...flows[selectedFlow] };

        console.log("UPDATED FLOW: " + updatedFlow)
  
        let selectedStep = updatedFlow.STEPS[parseInt(selectedIndex)];
        console.log("SELECTED STEP: " + JSON.stringify(selectedStep))
        let stepToSwap = updatedFlow.STEPS[parseInt(parseInt(selectedIndex)) + 1];
        console.log("STEP TO SWAP: " + JSON.stringify(stepToSwap))
  
        updatedFlow.STEPS[parseInt(selectedIndex)] = stepToSwap;
        updatedFlow.STEPS[parseInt(parseInt(selectedIndex)) + 1] = selectedStep;
  
        let updatedFlows  = {...flows}
        updatedFlows[selectedFlow] = updatedFlow
        setFlows(updatedFlows)
      }
    };
  
    const deleteStep = (event, selectedIndex) => {
      let updatedFlows = {...flows}
      updatedFlows[selectedFlow].STEPS.splice(parseInt(selectedIndex), 1);
      setFlows(updatedFlows)
    };
  
    const editStep = (event, selectedIndex) => {
    
      let stepToEdit = flows[selectedFlow].STEPS[parseInt(selectedIndex)].RUN.toLocaleUpperCase()  
      console.log("STEP TO EDIT: " + stepToEdit)  
      setSelectedStep(stepToEdit)
      setStepIndex(parseInt(selectedIndex));
  
      setShow(true)
    };

    return (
      <Row className="g-3">
        <Card id="steps"> 
        <Card.Header>STEPS</Card.Header>
        </Card>
        {Object.keys(flows[selectedFlow].STEPS).map((stepsKey)=> (
          // console.log("STEPSKEY: " + stepsKey)
          <Card key={stepsKey} className="cardContent">
            <Card.Body>
            <Card.Title>{flows[selectedFlow].STEPS[stepsKey].RUN.toLocaleUpperCase()}</Card.Title>
            {/* <Card.Text>{flow[stepsKey]["STEP_DESCRIPTION"]}</Card.Text> */}
            {flows[selectedFlow].STEPS.length > 1 && flows[selectedFlow].STEPS.indexOf(flows[selectedFlow].STEPS[stepsKey]) !=0 &&
              <Button
              variant="primary"
              className="button"
              onClick={() =>
                moveUp(event, stepsKey)
              }
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>}

            {flows[selectedFlow].STEPS.length > 1 && flows[selectedFlow].STEPS.indexOf(flows[selectedFlow].STEPS[stepsKey]) != flows[selectedFlow].STEPS.length-1 &&
              <Button
              variant="primary"
              className="button"
              onClick={() =>
                moveDown(event, stepsKey)
              }
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>}

            <Button
              variant="success"
              className="button"
              onClick={() =>
                editStep(event, stepsKey)
              }
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>

            <Button
              variant="danger"
              className="button"
              onClick={() =>
                deleteStep(event, stepsKey)
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
}
export default AddedSteps;
