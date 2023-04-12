import React, {useEffect } from "react";
import {
  Label,
  Input,
  FormGroup,
} from "reactstrap";


import "semantic-ui-css/semantic.min.css";

function AddFlow({crons, flows, setFlows, selectedFlow, setSelectedFlow, cronFlows, setCronFlows}) {

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
