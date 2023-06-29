import React, {useEffect, useState } from "react";
import {
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";


import "semantic-ui-css/semantic.min.css";

function AddStep({flows, setFlows, selectedFlow, steps, setSteps, selectedStep, setSelectedStep}) {
    useEffect(() => {
      fetchWithCatch("/steps", {}, setSteps);
      }, [steps]);

      const handleSelectedStepToAdd = (event) => {
        setSelectedStep(event.target.value)
        console.log("selected Value: " + event.target.value.toLocaleUpperCase())
        const updatedFlows = flows;
        console.log("PRIMA DEL PUSH: "+JSON.stringify(updatedFlows[selectedFlow].STEPS))
        updatedFlows[selectedFlow].STEPS.push(steps[event.target.value.toLocaleUpperCase()])
        console.log("DOPO IL PUSH: "+JSON.stringify(updatedFlows[selectedFlow].STEPS))
        setFlows(updatedFlows)
        setSelectedStep("")
      };

    return (
        <FormGroup>
      <Label>Seleziona Step:</Label>
      <Input type="select" value={selectedStep} onChange={handleSelectedStepToAdd}>
        <option value="">-- Scegli uno step --</option>
        {Object.keys(steps).map((stepsKey) => (
          <option key={stepsKey} value={steps[stepsKey].RUN}>
            {steps[stepsKey].RUN}
          </option>
        ))}
      </Input>
    </FormGroup>
    )
}

export default AddStep;