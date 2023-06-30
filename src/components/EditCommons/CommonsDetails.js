import React from "react";
import { Row, FormGroup, Label, Input } from "reactstrap";

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

  const renderFormFields = (obj, parentKey = "", level = 0) => {
    return Object.keys(obj).map((key) => {
      const path = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === "object" && obj[key] !== null) {
        return (
          <div key={path} style={{ paddingLeft: `${level * 20}px` }}>
            <Label>
              <h3>{key}</h3>
            </Label>
            {renderFormFields(obj[key], path, level + 1)}
          </div>
        );
      }

      return (
        <FormGroup key={path} style={{ paddingLeft: `${level * 20}px` }}>
          <Label>{key}</Label>
          <Input
            type="text"
            name={path}
            value={
              obj[key] === true
                ? "true"
                : obj[key] === false
                ? "false"
                : obj[key] || ""
            }
            onChange={(event) => handleValueChange(path, event.target.value)}
          />
        </FormGroup>
      );
    });
  };

  return <Row>{renderFormFields(commons)}</Row>;
}

export default CommonsDetails;
