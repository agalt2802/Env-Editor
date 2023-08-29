import React, { useState } from "react";
import { Container, Row, Col, Label, Input, FormGroup, Navbar, Nav, NavItem, NavLink } from "reactstrap";

import FlowsLogs from "./FlowsLogs";
import AccessLogs from "./AccessLogs";

import 'bootstrap/dist/css/bootstrap.min.css';

function Logs() {
  const today = new Date();
  const [date, setDate] = useState(today);

  const logs =
  [
    {
      key: "flows",
      name: "Flows Logs"
    },
    {
      key: "access",
      name: "Access Logs"
    }
  ];
  const [selectedLog, setSelectedLog] = useState(logs[0]);

  const buildOptions = () =>
  {
    let items = [];
    for(let log of logs)
      items.push(
        <option key={log.key}>
          {log.name}
        </option>
      );
    
    return items;
  };

  const handlePickDate = (event) =>
  {
    let date = new Date(event.target.value);
    
    setDate(date);
  }

  const handleLogChange = (event) =>
  {
    let selectedIndex = event.target.selectedIndex;
    let log = logs[selectedIndex];

    setSelectedLog(log);
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
            <Label for="date">Logs date</Label>
            <Input
              id="date"
              type="date"
              value={date.toISOString().substring(0,10)}
              onChange={handlePickDate}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="type">
              Log type
            </Label>
            <Input
              id="type"
              type="select"
              onChange={handleLogChange}
            >
              {buildOptions()}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {selectedLog.key == "flows"
            ? <FlowsLogs key={date} date={date} />
            : <AccessLogs key={date} date={date} />}
        </Col>
      </Row>
    </Container>
  );
}

export default Logs;
