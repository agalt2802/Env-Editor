import {
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import React from 'react'
import "semantic-ui-css/semantic.min.css";
import { Modal } from "react-bootstrap";

function SelectedStepDetails({
  flows,
  setFlows,
  selectedFlow,
  setSelectedFlow,
  stepIndex,
  setStepIndex,
  notEditableFileds,
  setShow,
  showModal,
  setShowModal
}) {
  if (stepIndex === -1) return null;
  let step = flows[selectedFlow].STEPS[stepIndex]

  const convertValue = (value) => {
    let convertedValue = value;

    if (value === "true") {
      convertedValue = true;
    } else if (value === "false") {
      convertedValue = false;
    } else if (value === "null") {
      convertedValue = null;
    } else if (value !== '' && isFinite(value) && value.indexOf('.') === -1 && value.indexOf(' ') === -1) {
      convertedValue = Number(value);
    } else {
      convertedValue = value;
    }

    return convertedValue;
  }

  const handleValueChange = (event, key) => {
    const value = convertValue(event.target.value);
    const updatedFlows = {...flows}
    updatedFlows[selectedFlow].STEPS[stepIndex][key] = value;
    setFlows(updatedFlows);
  };

  const handleNestedValueChange = (event, key, key1) => {
    const value = convertValue(event.target.value);
    const updatedFlows = {...flows}
    updatedFlows[selectedFlow].STEPS[stepIndex][key][key1] = value;
    setFlows(updatedFlows);
  };

  const handleNestedX2ValueChange = (event, key, key1, key2) => {
    const value = convertValue(event.target.value);
    const updatedFlows = {...flows}
    updatedFlows[selectedFlow].STEPS[stepIndex][key][key1][key2] = value;
    setFlows(updatedFlows);
  };

  const handleNestedX3ValueChange = (event, key, key1, key2, key3) => {
    const value = convertValue(event.target.value);
    const updatedFlows = {...flows}
    updatedFlows[selectedFlow].STEPS[stepIndex][key][key1][key2][key3] = value;
    setFlows(updatedFlows);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setShow(false);
    setStepIndex("-1");
    setSelectedFlow("");
  }
    return (
      <div>
        <h2> STEP: {step.RUN.toLocaleUpperCase()}</h2>
        {Object.keys(step).map((key) => (
          !(step[key] instanceof Object) ?
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
          :
          <div>
          <Label><h3>{key}</h3></Label>
          {Object.keys(step[key]).map((key1)=>(
          !(step[key][key1] instanceof Object) ?
            <FormGroup key={key1}>
            <Label>{key1}</Label>
            <Input
              type="text"
              name={key1}
              value={step[key][key1]}
              onChange={(event) => handleNestedValueChange(event, key, key1)}
            />
          </FormGroup>
          :
          <div>
            <Label><h3>{key1}</h3></Label>
            {
              Object.keys(step[key][key1]).map((key2)=>(
                !(step[key][key1][key2] instanceof Object) ?
                <FormGroup key={key2}>
                <Label>{key2}</Label>
                <Input
                  type="text"
                  name={key2}
                  value={step[key][key1][key2]}
                  onChange={(event) => handleNestedX2ValueChange(event, key, key1, key2)}
                />
              </FormGroup>
              : <div>
                <Label><h3>{key2}</h3></Label>
                {
                  Object.keys(step[key][key1][key2]).map((key3=>(
                    !(step[key][key1][key2][key3] instanceof Object) &&
                    <FormGroup key={key3}>
                <Label>{key3}</Label>
                <Input
                  type="text"
                  name={key3}
                  value={step[key][key1][key2][key3]}
                  onChange={(event) => handleNestedX3ValueChange(event, key, key1, key2, key3)}
                />
              </FormGroup>
                  )))
                }
                </div>
              ))
            }
          </div>
        ))}
          </div> 
        ))}  
        <div className="d-flex justify-content-end">
        {/* <Button
          id="addStep"
          className="button"
          color="primary"
          type="submit"
          onClick={handleEditStep}
        >
          SAVE EDIT
        </Button> */}

        <Modal show={showModal} onHide={() => setShow(false)} autoFocus={false} onChange={(event) => event.preventDefault()}>
          <Modal.Header closeButton>Conferma</Modal.Header>
          <Modal.Body>
            Updated STEP: {step.RUN} of FLOW: {selectedFlow}
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={handleConfirm}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
  
    );
  }
  
  export default SelectedStepDetails;
  