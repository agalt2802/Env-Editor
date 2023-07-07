import { FormGroup, Label, Input, Button } from "reactstrap";
import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";

function StepDetails({
  steps,
  setSteps,
  selectedStep,
  setSelectedStep,
  stepIndex,
  setStepIndex,
  flow,
  setFlow,
  inputValue,
  description,
  notEditableFileds,
  edit,
  setEdit,
  secrets,
}) {
  const [selectedConfig, setSelectedConfig] = useState("user-password");

  if (stepIndex === -1) return null; // QUESTO CONTROLLA SE è STATO SELEZIONATO UNO STEP
  let step = steps[selectedStep];

  const handleConfigChange = (event) => {
    console.log(event.target.value);
    if(event.target.value === "user-password"){
      delete step.SFTP_KEY
      delete step.SFTP_PASSPHRASE
      !step.SFTP_PASSWORD ? step.SFTP_PASSWORD = "" : null
    } else{
      delete step.SFTP_PASSWORD
      !step.SFTP_KEY ? step.SFTP_KEY = "" : null
      !step.SFTP_PASSPHRASE ? step.SFTP_PASSPHRASE = "" : null

    }
    setSelectedConfig(event.target.value);
  };

  const convertValue = (value) => {
    let convertedValue = value;

    if (value === "true") {
      convertedValue = true;
    } else if (value === "false") {
      convertedValue = false;
    } else if (value === "null") {
      convertedValue = null;
    } else if (
      value !== "" &&
      isFinite(value) &&
      value.indexOf(".") === -1 &&
      value.indexOf(" ") === -1
    ) {
      convertedValue = Number(value);
    } else {
      convertedValue = value;
    }

    return convertedValue;
  };

  const handleValueChange = (event, key) => {
    const value = convertValue(event.target.value);
    const updatedSteps = { ...steps };
    updatedSteps[selectedStep][key] = value;
    setSteps(updatedSteps);
  };

  const handleNestedValueChange = (event, key, key1) => {
    const value = convertValue(event.target.value);
    const updatedSteps = { ...steps };
    updatedSteps[selectedStep][key][key1] = value;
    setSteps(updatedSteps);
  };

  const handleAddStep = (event) => {
    const updatedFlow = { ...flow };
    console.log(updatedFlow);
    if (updatedFlow[inputValue] === undefined) {
      updatedFlow[inputValue] = {};
    }

    if (updatedFlow[inputValue].NAME === undefined) {
      updatedFlow[inputValue].NAME = inputValue;
    }

    if (updatedFlow[inputValue].DESCRIPTION === undefined) {
      updatedFlow[inputValue].DESCRIPTION = description;
    }

    if (updatedFlow[inputValue].STEPS === undefined) {
      updatedFlow[inputValue].STEPS = [];
    }
    updatedFlow[inputValue].STEPS = updatedFlow[inputValue].STEPS.concat(
      steps[selectedStep]
    );

    setFlow(updatedFlow);
    setStepIndex(-1);
    setSelectedStep("-- Scegli uno step --");
  };

  const handleEditStep = (event) => {
    const updatedFlow = { ...flow };
    console.log(updatedFlow);

    let indexOfStepToEdit = updatedFlow[inputValue].STEPS.indexOf(selectedStep);
    updatedFlow[inputValue].STEPS.splice(
      indexOfStepToEdit,
      1,
      steps[selectedStep]
    );

    setFlow(updatedFlow);
    setStepIndex(-1);
    setSelectedStep("-- Scegli uno step --");
    setEdit(false);
  };

  return (
    <div>
      {selectedStep.includes("SFTP") && (
        <div>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="configOption"
                value="user-password"
                checked={selectedConfig === "user-password"}
                onChange={handleConfigChange}
              />{" "}
              User/Password
            </Label>
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="configOption"
                value="key-passphrase"
                checked={selectedConfig === "key-passphrase"}
                onChange={handleConfigChange}
              />{" "}
              Key/Passphrase
            </Label>
          </FormGroup>
        </div>
      )}
      {
        Object.keys(step).map((key) =>
          key.includes("SFTP_USERNAME") ||
          key.includes("SFTP_KEY") ||
          key.includes("SFTP_PASSWORD") ||
          key.includes("SFTP_PASSPHRASE") ? (
            <FormGroup key={key}>
              <Label>{key}</Label>
              <Input
                type="select"
                name={key}
                value={step[key]}
                onChange={(event) => handleValueChange(event, key)}
                readOnly={notEditableFileds.find((element) => element === key)}
              >
                {Object.keys(secrets.SECRETS.SFTPSERVICE).map((secret) => (
                  <option
                    key={"SECRET.SFTPSERVICE." + secret}
                    value={"SECRET.SFTPSERVICE." + secret}
                  >
                    {"SECRET.SFTPSERVICE." + secret}
                  </option>
                ))}
              </Input>
            </FormGroup>
          ) : !(step[key] instanceof Object) ? (
            <FormGroup key={key}>
              <Label>{key}</Label>
              <Input
                type="text"
                name={key}
                value={step[key]}
                onChange={(event) => handleValueChange(event, key)}
                readOnly={notEditableFileds.find((element) => element === key)}
              />
            </FormGroup>
          ) : (
            <div>
              <Label>
                <h3>{key}</h3>
              </Label>
              {Object.keys(step[key]).map((key1) => (
                <FormGroup key={key1}>
                  <Label>{key1}</Label>
                  <Input
                    type="text"
                    name={key1}
                    value={step[key][key1]}
                    onChange={(event) =>
                      handleNestedValueChange(event, key, key1)
                    }
                  />
                </FormGroup>
              ))}
            </div>
          )
        )}
      {!edit ? (
        <div className="d-flex justify-content-end">
          <Button
            id="addStep"
            className="button"
            color="primary"
            type="submit"
            onClick={handleAddStep}
          >
            ADD STEP
          </Button>
        </div>
      ) : (
        <div className="d-flex justify-content-end">
          <Button
            id="addStep"
            className="button"
            color="primary"
            type="submit"
            onClick={handleEditStep}
          >
            SAVE EDIT
          </Button>
        </div>
      )}
    </div>
  );
}

export default StepDetails;
