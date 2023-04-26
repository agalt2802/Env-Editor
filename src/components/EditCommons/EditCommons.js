import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Modal } from "react-bootstrap";

import CommonsDetails from "./CommonsDetails";
function EditCommons() {
  const [commons, setCommons] = useState({});
  const [showSaveEdit, setShowSaveEdit] = useState(false)

  useEffect(() => {
    async function fecthData() {
      const response = await fetch("http://127.0.0.1:8081/commons").catch(
        (error) => console.log(error)
      );

      const json = await response.json();
      setCommons(json.COMMONS);
    }
    fecthData();
  }, []);

  const handleSaveEdit = () =>{
    setShowSaveEdit(true)
  }

  const handleConfirmSaveEdit = () =>{
    async function saveEdit() {
      await fetch("http://127.0.0.1:8081/updateCommons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commons),
      }).catch((error) => console.log(error));
      console.log("salva flusso");
    }
    saveEdit();
    setShowSaveEdit(false)
  }

  return (
    <Container>
      <Row>
        <h1>COMMONS CONFIGURATIONS</h1>
      </Row>
      <CommonsDetails
      commons={commons}
      setCommons={setCommons}
      />
      <Row>
        <Col>
          <Button
            color="success"
            className="button"
            onClick={() => handleSaveEdit()}
          >
            SAVE EDIT
          </Button>
        </Col>
      </Row>

      
      <Modal
        show={showSaveEdit}
        onHide={() => setShowSaveEdit(false)}
        autoFocus={false}
        onChange={(event) => event.preventDefault()}
      >
        <Modal.Header closeButton> Conferma modifiche</Modal.Header>
        <Modal.Body>Vuoi salvare le modifiche?</Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleConfirmSaveEdit}>
            Conferma
          </Button>
          <Button color="danger" onClick={() => setShowSaveEdit(false)}>
            Annulla
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EditCommons;
