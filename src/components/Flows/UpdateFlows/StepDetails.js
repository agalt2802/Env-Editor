import { FormGroup, Label, Input } from "reactstrap";
import React from 'react'
import "semantic-ui-css/semantic.min.css";

function StepDetails({ step, setStep, notEditableFileds })
{
  const convertValue = (value) => {
    let convertedValue = value;

    if (value === "true") {
      convertedValue = true;
    } else if (value === "false") {
      convertedValue = false;
    } else if (value === "null") {
      convertedValue = null;
    } else if (value !== '' && isFinite(value) && value.indexOf('.') === -1 && value.indexOf(' ') === -1) {
      convertedValue = Number(value);
    } else {
      convertedValue = value;
    }

    return convertedValue;
  }

  const handleValueChange = (event, key) => {
    const value = convertValue(event.target.value);
    
    step[key] = value;
    setStep(step);
  };

  const handleNestedValueChange = (event, key, key1) => {
    const value = convertValue(event.target.value);
    
    step[key][key1] = value;
    setStep(step);
  };

  const handleNestedX2ValueChange = (event, key, key1, key2) => {
    const value = convertValue(event.target.value);

    step[key][key1][key2] = value;
    setStep(step);
  };

  const handleNestedX3ValueChange = (event, key, key1, key2, key3) => {
    const value = convertValue(event.target.value);
    
    step[key][key1][key2][key3] = value;
    setStep(step);
  };

  return (
    <div>
      {Object.keys(step).map((key) => (
        !(step[key] instanceof Object) ?
        <FormGroup key={key}>
          <Label>{key}</Label>
          <Input
            type="text"
            name={key}
            value={step[key]}
            onChange={(event) => handleValueChange(event, key)}
            disabled={notEditableFileds.find((element) => element === key)}
          />
        </FormGroup>
        :
        <div>
        <Label><h3>{key}</h3></Label>
        {Object.keys(step[key]).map((key1)=>(
        !(step[key][key1] instanceof Object) ?
          <FormGroup key={key1}>
          <Label>{key1}</Label>
          <Input
            type="text"
            name={key1}
            value={step[key][key1]}
            onChange={(event) => handleNestedValueChange(event, key, key1)}
          />
        </FormGroup>
        :
        <div>
          <Label><h3>{key1}</h3></Label>
          {
            Object.keys(step[key][key1]).map((key2)=>(
              !(step[key][key1][key2] instanceof Object) ?
              <FormGroup key={key2}>
              <Label>{key2}</Label>
              <Input
                type="text"
                name={key2}
                value={step[key][key1][key2]}
                onChange={(event) => handleNestedX2ValueChange(event, key, key1, key2)}
              />
            </FormGroup>
            : <div>
              <Label><h3>{key2}</h3></Label>
              {
                Object.keys(step[key][key1][key2]).map((key3=>(
                  !(step[key][key1][key2][key3] instanceof Object) &&
                  <FormGroup key={key3}>
              <Label>{key3}</Label>
              <Input
                type="text"
                name={key3}
                value={step[key][key1][key2][key3]}
                onChange={(event) => handleNestedX3ValueChange(event, key, key1, key2, key3)}
              />
            </FormGroup>
                )))
              }
              </div>
            ))
          }
        </div>
      ))}
        </div> 
      ))}  
      <div className="d-flex justify-content-end">
      {/* <Button
        id="addStep"
        className="button"
        color="primary"
        type="submit"
        onClick={handleEditStep}
      >
        SAVE EDIT
      </Button> */}
    </div>
    </div>
  );
}

export default StepDetails;
