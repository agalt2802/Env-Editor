import React, { useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";

import "semantic-ui-css/semantic.min.css";

function StepSelector({
  selectedFlow,
  selectedStep,
  setSelectedStep,
  flows,
  setStepIndex,
  setShow={setShow}
}) {
  if (flows[selectedFlow]) {
    const flow = flows[selectedFlow];

    const handleStepChange = (event) => {
      setStepIndex(event.target.value); // indice dello step nel flow
      setSelectedStep(flow.STEPS[event.target.value]["RUN"]); // nome dello step selezionato
      setShow(true)
    };

    return (
      <FormGroup id="updateFLowStepForm">
        <Label>Seleziona Step:</Label>
        <Input type="select" value={selectedStep} onChange={handleStepChange}>
          <option value="-1">{selectedStep}</option>
          {Object.keys(flow.STEPS).map((stepsKey) => (
            <option key={stepsKey} value={stepsKey}>
              {flow.STEPS[stepsKey]["RUN"]}
            </option>
          ))}
        </Input>
      </FormGroup>
    );
  }
}
export default StepSelector;
