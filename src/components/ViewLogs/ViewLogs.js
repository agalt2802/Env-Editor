import React, { useState } from "react";
import { Container, Row, Col, Label, Input, FormGroup } from "reactstrap";

import Logs from "./Logs";

function ViewLogs() {
  const today = new Date();

  const [date, setDate] = useState(today);

  const handlePickDate = (event) =>
  {
    let date = new Date(event.target.value);

    setDate(date);
  }

  return (
    <Container id="mainContainer">
      <Row>
        <Col>
          <h1>View Logs</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label>Logs date</Label>
            <Input
              type="date"
              value={date.toISOString().substring(0,10)}
              onChange={handlePickDate}
            />
          </FormGroup>
        </Col>
      </Row>
      <Logs key={date} date={date} />
    </Container>
  );
}

export default ViewLogs;
