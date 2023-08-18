import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { Modal } from "react-bootstrap";
import { fetchWithCatch } from "../../commonFunctions";

import CommonsDetails from "./CommonsDetails";

function EditCommons() {
  const [commons, setCommons] = useState(undefined);
  const [showSaveEdit, setShowSaveEdit] = useState(false)

  useEffect(() =>
  {
    if(!commons)
      fetchWithCatch("/commons", {}, setCommons)
  }
  , [commons]);

  const handleSaveEdit = () =>{
    setShowSaveEdit(true)
  }

  const handleConfirmSaveEdit = async () => {
    let params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commons),
    };

    fetchWithCatch("/updateCommons", params, () =>
    {
      console.log("salva flusso");
    
      setShowSaveEdit(false);
    });
  }

  return (
    <Container>
      <Row>
        <h1>COMMONS CONFIGURATIONS</h1>
      </Row>
      {!commons ? <div className="text-center"><Spinner /></div> :
        <CommonsDetails
        commons={commons}
        setCommons={setCommons}
        />
      }
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
