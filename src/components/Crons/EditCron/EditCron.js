import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Button,
  FormGroup,
} from "reactstrap";

import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import CronSelector from "./CronSelector";
import CronDetails from "./CronDetails";
import AddFlows from "./AddFlows";
import CronSchedule from "./CronSchedule";
import { fetchWithCatch } from "../../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

function EditCron() {
  const [crons, setCrons] = useState({});
  const [selectedCron, setSelectedCron] = useState("");
  const [cronFlows, setCronFlows] = useState([]);
  const [flows, setFlows] = useState([]);
  const [showAddFlow, setShowAddFlow] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState("");
  const [scheduler, setScheduler] = useState("");

  const handleShowAddFlow = () => {
    setShowAddFlow(true);
  };

  const handleShowSaveModal = () =>{
    setShowSaveModal(true)
  }

  const handleConfirm = (event) =>{
    event.preventDefault()
    console.log("SELECTED CRON: " + selectedCron)

    fetchWithCatch("/saveEditedCron", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({RUN: selectedCron, INIT_SCHEDULER: scheduler, INIT_FLOWS: cronFlows}),
    }, (res) => {
      console.log("salva flusso");

      setCrons({})
      setSelectedCron("")
      setCronFlows([])
      setFlows([])
      setShowSaveModal(false)
      setScheduler("")
    });
  }

  return (
    <Container id="mainContainer">
      <Row className="pageTitle">
        <Col>
          <h1>Edit Cron</h1>
        </Col>
      </Row>
      <Row>

        <Col>
        <CronSelector
          crons={crons}
          setCrons={setCrons}
          selectedCron={selectedCron}
          setSelectedCron={setSelectedCron}
          setCronFlows={setCronFlows}
          setScheduler={setScheduler}
        />
        <CronSchedule scheduler={scheduler} setScheduler={setScheduler}/>
        {selectedCron != '' &&
        <Row>
          <Col>
          <Button
          color="success"
          className="button"
          onClick={() => handleShowAddFlow()}
        >
          <FontAwesomeIcon icon={faSquarePlus} /> ADD FLOW
        </Button>
        </Col>
        <Col>
         <Button
         color="success"
         className="button"
         onClick={() => handleShowSaveModal()}
       >
         <FontAwesomeIcon icon={faSave} /> SAVE CRON
       </Button>
       </Col>
       </Row>
       }
        </Col>
    <Col>
        {selectedCron != '' && 
          <CronDetails
          crons={crons}
          setCrons={setCrons}
          selectedCron={selectedCron}
          setSelectedCron={setSelectedCron}
          cronFlows={cronFlows}
          setCronFlows={setCronFlows}
        />}
        </Col>       
      </Row>
      <Modal
        show={showAddFlow}
        onHide={() => setShowAddFlow(false)}
        autoFocus={false}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header closeButton> Aggiungi un flusso al cron</Modal.Header>
        <Modal.Body>
          <AddFlows
            crons={crons}
            flows={flows}
            setFlows={setFlows}
            selectedFlow={selectedFlow}
            setSelectedFlow={setSelectedFlow}
            cronFlows={cronFlows}
            setCronFlows={setCronFlows}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => setShowAddFlow(false)}>
            DONE
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)} autoFocus={false} onChange={(event) => event.preventDefault()}>
          <Modal.Header closeButton>Conferma</Modal.Header>
          <Modal.Body>
            Vuoi salvare il cron {selectedCron}
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={handleConfirm}>
              Conferma
            </Button>
            <Button color="danger" onClick={() => setShowSaveModal(false)}>
              Annulla
            </Button>
          </Modal.Footer>
        </Modal>
    </Container>
  );
}
export default EditCron;
