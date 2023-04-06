import {
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import React from 'react'
import "semantic-ui-css/semantic.min.css";


function StepDetails({
  steps,
  setSteps,
  selectedStep,
  setSelectedStep,
  stepIndex,
  setStepIndex,
  flow,
  setFlow,
  inputValue,
  notEditableFileds,
  edit,
  setEdit
}) {

  if (stepIndex === -1) return null;
  const step = steps[selectedStep];

  const handleValueChange = (event, key) => {
    const updatedSteps = { ...steps };
    updatedSteps[selectedStep][key] = event.target.value;
    setSteps(updatedSteps);
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
    setStepIndex(-1);
    setSelectedStep("-- Scegli uno step --");
  };


  const handleEditStep = (event) => {
    const updatedFlow = { ...flow };
    console.log(updatedFlow);

    let indexOfSTepToEdit = updatedFlow[inputValue].STEPS.indexOf(selectedStep) 
    updatedFlow[inputValue].STEPS.slice(indexOfSTepToEdit, 1, steps[selectedStep] )

    setFlow(updatedFlow);
    setStepIndex(-1);
    setSelectedStep("-- Scegli uno step --");
    setEdit(false)
  };

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
      { !edit ?
      <div className="d-flex justify-content-end">
        <Button
          id="addStep"
          className="button"
          color="primary"
          type="submit"
          onClick={handleAddStep}
        >
          ADD STEP
        </Button>
      </div>
      :       
      <div className="d-flex justify-content-end">
      <Button
        id="addStep"
        className="button"
        color="primary"
        type="submit"
        onClick={handleEditStep}
      >
        SAVE EDIT
      </Button>
    </div>
      }
    </div>

    
  );
}

export default StepDetails;
