import React, { useState, useEffect } from "react";
import { Container, Row, Col, Label, Input } from "reactstrap";
import { Modal, Button } from "react-bootstrap";

import Logs from "./Logs";
import { set } from "react-hook-form";

function ViewLogs() {
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [logs, setLogs] = useState([]);

  let today = new Date().toISOString().split("T")[0];
  console.log(today);

  const handleSelectDate = (event) => {
    let date = new Date(event.target.value);
    date = date.toISOString().split("T")[0];

    if (date > today) {
      setLogs(false)
      setShowModal(true);
      setSelectedDate(date);
    } else {
      setSelectedDate(date);
      async function getLogs() {
        let response = await fetch("http://127.0.0.1:8081/getLogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: date }),
        }).catch((error) => console.log(error));

        const json = await response.json();
        console.log("LOG OF " + date + ": " + JSON.stringify(json));
        setLogs(json);

        if (!json) {
          setShowModal(true);
          setSelectedDate(date);
        }
      }
      getLogs();
      console.log("LOGS: " + JSON.stringify(logs));
    }
  };

  const handleModel = () => {
    setShowModal(false);
    setSelectedDate("");
  };

  return (
    <Container id="viewLogsContainer">
      <h1>View Logs</h1>
      <Label>Select a day</Label>
      <Input
        type="date"
        value={selectedDate}
        onChange={handleSelectDate}
      ></Input>
      <Row>
        { logs &&
           <Logs logs={logs} setLogs={setLogs} selectedDate={selectedDate} />
        }
     
      </Row>
      
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header>Invalid Date</Modal.Header>
        <Modal.Body>
          {console.log("Selected Day: " + selectedDate)}
          {selectedDate > today
            ? "Please select a valid date!"
            : "No logs avilable for this date"}
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleModel}>
            DONE
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ViewLogs;
