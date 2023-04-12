import React, { useEffect } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import "semantic-ui-css/semantic.min.css";

function FlowSelector({
  flows,
  setFlows,
  selectedFlow,
  setSelectedFlow,
  setStepIndex,
  setSelectedStep,
}) {
  useEffect(() => {
    async function fecthData() {
      const response = await fetch("http://127.0.0.1:8081/flows").catch(
        (error) => console.log(error)
      );

      const json = await response.json();

      console.log(json);
      setFlows(json);
      
    }
    if (Object.keys(flows).length === 0) fecthData();
  }, [flows]);

  const handleFlowChange = (event) => {
    console.log(event.target.value);
    setSelectedFlow(event.target.value);
    setStepIndex(-1);
    setSelectedStep("-- Scegli uno step --");
  };

  return (
    <FormGroup>
      <Label>Seleziona Flusso:</Label>
      <Input type="select" value={selectedFlow} onChange={handleFlowChange}>
        <option value="">-- Scegli un flusso --</option>
        {Object.keys(flows).map((flowKey) => (
          <option key={flowKey} value={flowKey}>
            {flows[flowKey].NAME}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
}

export default FlowSelector;
