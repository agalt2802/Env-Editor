import React, { useEffect } from "react";
import {
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import "semantic-ui-css/semantic.min.css";

function StepSelector({steps, setSteps, selectedStep, setSelectedStep, stepIndex, setStepIndex}) {
  // const [steps, setSteps] = useState({});
  // const [selectedStep, setSelectedStep] = useState("-- Scegli uno step --");
  // const [stepIndex, setStepIndex] = useState(-1);

  const handleStepChange = (event) => {
    console.log(event.target.value)
    setSelectedStep(event.target.value);
    let stepsArray = Object.keys(steps); // potrebbe tornarmi utile
    console.log(stepsArray)
    let index = stepsArray.indexOf(event.target.value);
    setStepIndex(index);
  };

  useEffect(() => {
    async function fecthData() {
      const response = await fetch("http://127.0.0.1:8081/steps").catch(
        (error) => console.log(error)
      );
      const json = await response.json();
      setSteps(json);
    }
    if (Object.keys(steps).length === 0) fecthData();
  }, [steps, setSteps]);

  return (
    <FormGroup id="stepForm">
      <Label>Seleziona Step:</Label>
      <Input type="select" value={selectedStep} onChange={handleStepChange}>
        <option value="">{selectedStep}</option>
        {Object.keys(steps).map((stepsKey) => (
          <option key={stepsKey} value={stepsKey}>
            {steps[stepsKey]["RUN"]}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
}
export default StepSelector;
