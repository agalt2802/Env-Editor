import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';

function UpdateFlows() {
  const [flows, setFlows] = useState({});
  const [selectedFlow, setSelectedFlow] = useState('');
  const [stepIndex, setStepIndex] = useState(-1);
  const [envYamlContent, setEnvYamlContent] = useState("");

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
    setSelectedFlow(event.target.value);
    setStepIndex(-1);
  };

  const handleStepChange = (event) => {
    setStepIndex(event.target.value);
  };

  const selectedSteps = selectedFlow ? flows[selectedFlow].STEPS : [];


  const renderStepDetails = () => {
    if (stepIndex === -1) return null;
    const step = flows[selectedFlow].STEPS[stepIndex];
    return (
      <div>
        {Object.keys(step).map((key) => (
          <FormGroup key={key}>
            <Label>{key}</Label>
            <Input
              type="text"
              value={step[key]}
              onChange={(event) => handleValueChange(event, key)}
            />
          </FormGroup>
        ))}
      </div>
    );
  };

  const handleValueChange = (event, key) => {
    const updatedFlows = { ...flows };
    updatedFlows[selectedFlow].STEPS[stepIndex][key] = event.target.value;
    setFlows(updatedFlows);
  };
  
  return (
    <Container>
      <Row>
        <Col>
          <h1>Editor di Flussi env.yml</h1>
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <FormGroup>
            <Label>Carica il file env.yml:</Label>
            <Input type="file" accept=".yml" onChange={handleFileUpload} />
          </FormGroup>
        </Col>
      </Row> */}
      <Row>
        <Col>
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
        </Col>
        <Col>
          <FormGroup>
            <Label>Seleziona Step:</Label>
            <Input
              type="select"
              value={stepIndex}
              onChange={handleStepChange}
              disabled={!selectedFlow}
            >
              <option value={-1}>-- Scegli uno step --</option>
              {selectedSteps.map((step, index) => (
                <option key={index} value={index}>
                  {step.RUN}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
      <Col> {renderStepDetails()} </Col>
</Row>
</Container>)}
export default UpdateFlows;
