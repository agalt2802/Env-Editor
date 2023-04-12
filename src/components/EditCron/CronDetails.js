import React, { useState, useEffect } from "react";
import { Container, Row, Col, Label, Input, FormGroup } from "reactstrap";

import { Card, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowUp,
  faArrowDown,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

import "semantic-ui-css/semantic.min.css";

function CronDetails({crons, setCrons, selectedCron, setSelectedCron, cronFlows, setCronFlows}) {
  
  const handleCronChange = (event) => {
    setSelectedCron(event.target.value);
  };

  const moveUp = (event, selectedIndex) => {
    if (cronFlows[selectedIndex - 1]) {
      let updatedCronFlows = cronFlows

      let selectedCronFlow = updatedCronFlows[selectedIndex];
      let cronToSwap = updatedCronFlows[selectedIndex - 1];

      updatedCronFlows[selectedIndex] = cronToSwap;
      updatedCronFlows[selectedIndex - 1] = selectedCronFlow;

      console.log(updatedCronFlows);

      setCronFlows(updatedCronFlows);
    }
  };

  const moveDown = (event, selectedIndex) => {
    if (cronFlows[selectedIndex + 1]) {
      let updatedCronFlows = cronFlows;

      let selectedCronFlow = updatedCronFlows[selectedIndex];
      let cronFlowToSwap = updatedCronFlows[selectedIndex + 1];

      updatedCronFlows[selectedIndex] = cronFlowToSwap;
      updatedCronFlows[selectedIndex + 1] = selectedCronFlow;

      console.log(updatedCronFlows);

      setCronFlows(updatedCronFlows);
    }
  };

  const deleteStep = (event, selectedIndex) => {
    let updatedCronFlows = cronFlows;
    updatedCronFlows.splice(selectedIndex, 1);
    setCronFlows(updatedCronFlows);
  };

  return (
    <Row className="g-3">
      <Card id="addedSteps">
        <Card.Header>FLOWS</Card.Header>
      </Card>
      { Object.keys(cronFlows).map((key)=>(
        <Card
        key={key}
        className="cardContent"
      >
        <Card.Body>
          <Card.Title>{cronFlows[key]}</Card.Title>
          {(cronFlows.length > 1 && key != 0) &&
            <Button
              variant="primary"
              className="button"
              onClick={() =>
                moveUp(event, key)
              }
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>}
            {cronFlows.length > 1 && key != cronFlows.length-1 &&
              <Button
              variant="primary"
              className="button"
              onClick={() =>
                moveDown(event, key)
              }
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            }
            <Button
              variant="danger"
              className="button"
              onClick={() =>
                deleteStep(event, key)
              }
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Card.Body>
      </Card>
      ))}
    </Row>
  );
}
export default CronDetails;
