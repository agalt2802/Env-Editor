import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

function CreateCron() {
  const [cronName, setCronName] = useState("");
  const [scheduler, setScheduler] = useState("");
  const [flows, setFlows] = useState({});
  const [selectedFlows, setSelectedFlows] = useState("");

  useEffect(() => {
    async function fecthData() {
      fetchWithCatch("/flows", {}, (json) => {
        console.log(json);
        setFlows(json);
      });
    } if (Object.keys(flows).length === 0) fecthData();
  }, [flows]);
  

  const handleCronNameChange = (event, data) => {
    setCronName(event.target.value.toUpperCase());
  };

  const handleSchedulerChange = (event, data) => {
    setScheduler(event.target.value.toUpperCase());
  };

  const handleFlowsChange = (event, data) => {
    let updatedSelectedFlows = selectedFlows;
    if(updatedSelectedFlows === ""){
      updatedSelectedFlows = event.target.value;  
    }else{
      updatedSelectedFlows = updatedSelectedFlows + "," + event.target.value;
    }
    console.log(updatedSelectedFlows)
    setSelectedFlows(updatedSelectedFlows.toUpperCase());
  };

  const saveCron = (event) => {
    fetchWithCatch("/newCron", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        RUN: cronName,
        INIT_SCHEDULER: scheduler,
        INIT_FLOWS: selectedFlows,
      }),
    }, (res) => {
      console.log("salva flusso");
      
      setCronName("");
      setScheduler("");
      setFlows("");
    }, (e) => {
      console.log(e);
      if (e.status === 500)
        return alert("cron with name " + cronName + " already exists!");
    });
  };

  return (
    <Container id="mainContainer">
      <Row className="pageTitle">
        <Col>
          <h1>Create New Cron</h1>
        </Col>
      </Row>
      <Row>
        <Label>Nome Cron</Label>
        <Input
          type="text"
          value={cronName}
          onChange={(event) => handleCronNameChange(event)}
          autoFocus={true}
        />
      </Row>
      <Row>
        <Label>Scheduler</Label>
        <Input
          type="text"
          value={scheduler}
          onChange={(event) => handleSchedulerChange(event)}
          autoFocus={true}
          placeholder="0 */2 * * * *"
        />
      </Row>
      <Row>
          <Label>Seleziona Flusso:</Label>
          <Input
            type="select"
            value={selectedFlows}
            onChange={handleFlowsChange}
          >
            <option value="">-- Scegli un flusso --</option>
            {Object.keys(flows).map((flowKey) => (
              <option key={flowKey} value={flowKey}>
                {flows[flowKey].NAME}
              </option>
            ))}
          </Input>
      </Row>
      {cronName !== "" && scheduler !== "" && flows !== "" && (
        <Row>
          <div className="d-flex justify-content-end">
            <Button
              id="saveCron"
              className="button"
              color="primary"
              type="submit"
              onClick={saveCron}
            >
              SAVE CRON
            </Button>
          </div>
        </Row>
      )}
    </Container>
  );
}
export default CreateCron;
