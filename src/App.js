import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import yaml from 'js-yaml';

function App() {
  const [flows, setFlows] = useState({});
  const [selectedFlow, setSelectedFlow] = useState('');
  const [stepIndex, setStepIndex] = useState(-1);
  const [envYamlContent, setEnvYamlContent] = useState("");

  useEffect(() => {
    if (envYamlContent) {
      try {
        const envYamlData = yaml.load(envYamlContent);
        setFlows(envYamlData);
      } catch (error) {
        console.error('Error loading env.yml:', error);
      }
    }
  }, [envYamlContent]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEnvYamlContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

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
      <Row>
        <Col>
          <FormGroup>
            <Label>Carica il file env.yml:</Label>
            <Input type="file" accept=".yml" onChange={handleFileUpload} />
          </FormGroup>
        </Col>
      </Row>
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
export default App;
