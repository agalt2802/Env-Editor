import React from 'react';
import { Row, FormGroup, Label, Input } from "reactstrap";

function CommonsDetails({ commons, setCommons }) {
  const handleValueChange = (path, value) => {
    let obj = {...commons};
    let keys = path.split('.');
    keys.reduce((o, k, i) => {
      if (i === keys.length - 1) {
        o[k] = value;
      } else {
        if (!o[k]) {
          o[k] = {};
        }
      }
      return o[k];
    }, obj);

    setCommons(obj);
  };

  const renderFormFields = (obj, parentKey = '') => {
    return Object.keys(obj).map((key) => {
      const path = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return (
          <div key={path}>
            <Label><h3>{key}</h3></Label>
            {renderFormFields(obj[key], path)}
          </div>
        )
      }

      return (
        <FormGroup key={path}>
          <Label>{key}</Label>
          <Input
            type="text"
            name={path}
            value={obj[key] || ''}
            onChange={(event) => handleValueChange(path, event.target.value)}
          />
        </FormGroup>
      )
    })
  }

  return (
    <Row>
      {renderFormFields(commons)}
    </Row>
  );
}

export default CommonsDetails;
