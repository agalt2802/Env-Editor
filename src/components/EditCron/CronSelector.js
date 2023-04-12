import React, { useEffect } from "react";
import { Row, Label, Input } from "reactstrap";

import "semantic-ui-css/semantic.min.css";

function CronSelector({
  crons,
  setCrons,
  selectedCron,
  setSelectedCron,
  setCronFlows,
  setScheduler,
}) {
  useEffect(() => {
    async function fecthCrons() {
      const response = await fetch("http://127.0.0.1:8081/crons").catch(
        (error) => console.log(error)
      );
      const json = await response.json();
      setCrons(json.CRON_CONFS.CRONS);
    }
    fecthCrons();
  }, [crons]);

  const handleCronChange = (event) => {
    
    setScheduler(crons[event.target.value].INIT_SCHEDULER);
    setCronFlows(crons[event.target.value].INIT_FLOWS.split(","));
    console.log("SELECTED CRON: " + crons[event.target.value].RUN)
    setSelectedCron(crons[event.target.value].RUN);
  };

  return (
    <Row>
      <Label>Select Cron to edit</Label>
      <Input type="select" vale={selectedCron} onChange={handleCronChange}>
        <option value="">-- Scegli un cron --</option>
        {Object.keys(crons).map((cronKey) => (
          <option key={cronKey} value={cronKey}>
            {crons[cronKey].RUN}
          </option>
        ))}
      </Input>
    </Row>
  );
}
export default CronSelector;
