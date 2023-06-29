import React, {useEffect } from "react";
import {
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";


import "semantic-ui-css/semantic.min.css";

function AddFlow({crons, flows, setFlows, selectedFlow, setSelectedFlow, cronFlows, setCronFlows}) {

    useEffect(() => {
        if (Object.keys(flows).length === 0)
          fetchWithCatch("/flows", {}, setFlows);
      }, [flows]);

    const handleFlowChange = (event) => {
        console.log("CRON FLOWS: " + cronFlows)
        const updatedCronFlows = cronFlows
        updatedCronFlows.push(flows[event.target.value].NAME)
        setCronFlows(updatedCronFlows)
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
export default AddFlow;
