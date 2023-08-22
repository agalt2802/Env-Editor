import React from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

function CommonsDetails({ commons, setCommons }) {
  const handleValueChange = (path, value) => {
    let convertedValue;
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

    let obj = { ...commons };
    let keys = path.split(".");
    keys.reduce((o, k, i) => {
      if (i === keys.length - 1) {
        o[k] = convertedValue;
      } else {
        if (!o[k]) {
          o[k] = {};
        }
      }
      return o[k];
    }, obj);

    setCommons(obj);
  };

  const renderFormFields = (objs, path) => {
    //console.log(objs);

    return Object.entries(objs).map(([key, obj]) =>
    {
      const currentPath = path+"."+key;

      if(typeof obj === "object" && obj !== null)
      {
        return (
          <FormGroup key={currentPath} style={{paddingLeft: "50px"}}>
            <Label>
              <h3>{key}</h3>
            </Label>
            {renderFormFields(obj, currentPath)}
          </FormGroup>
        );
      }

      return (
        <FormGroup floating key={currentPath}>
          <Input
            id={path}
            placeholder={key}
            type="text"
            name={currentPath}
            value={
              obj === true
                ? "true"
                : obj === false
                ? "false"
                : obj || ""
            }
            onChange={(event) => handleValueChange(currentPath, event.target.value)}
          />
          <Label for={path}>{key}</Label>
        </FormGroup>
      );
    });
  };

  return (
    <Row>
      <Col>
        <FormGroup>
          {renderFormFields(commons.COMMONS, "COMMONS")}
        </FormGroup>
      </Col>
    </Row>
  );
}

export default CommonsDetails;
