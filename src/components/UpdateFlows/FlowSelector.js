import React, { useEffect } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import "semantic-ui-css/semantic.min.css";
import { fetchWithCatch } from "../../commonFunctions";

function FlowSelector({
  flows,
  setFlows,
  selectedFlow,
  setSelectedFlow,
  setStepIndex,
  setSelectedStep,
}) {
  useEffect(() => {
    if (Object.keys(flows).length === 0)
      fetchWithCatch("/flows", {}, setFlows);
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
