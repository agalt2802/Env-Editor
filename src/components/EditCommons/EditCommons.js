import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

import { fetchWithCatch } from "../../commonFunctions";

import CommonsDetails from "./CommonsDetails";
import ConfirmModal from "../ConfirmModal";

function EditCommons()
{
  const [commons, setCommons] = useState(undefined);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const fetchCommons = () => fetchWithCatch("/config/commons", {}, setCommons);

  useEffect(() =>
  {
    if(!commons)
      fetchCommons();
  }, [commons]);

  const handleSaveEdit = () => setShowSaveModal(true);

  const handleConfirmSave = async () =>
  {
    setShowSaveModal(false);
    setCommons(undefined);

    let params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commons),
    };

    fetchWithCatch("/config/commons", params, fetchCommons);
  }

  return (
    <Container>
      <Row>
        <h1>Edit Commons Configurations</h1>
      </Row>
      {!commons ? <div className="text-center"><Spinner /></div> :
        <CommonsDetails
          commons={commons}
          setCommons={setCommons}
        />
      }
      
      {commons &&
        <Row>
          <Col>
            <Button
              color="danger"
              className="button"
              onClick={() => setShowDiscardModal(true)}
              style={{marginLeft: "0px"}}
            >
              <FontAwesomeIcon icon={faTrash} /> Cancel
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              color="success"
              className="button"
              onClick={() => setShowSaveModal(true)}
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </Button>
          </Col>
        </Row>
      }

      <ConfirmModal
        text="Vuoi salvare le modifiche?"
        visible={showSaveModal}
        setVisible={setShowSaveModal}
        onConfirm={handleConfirmSave}
      />

      <ConfirmModal
        text="Vuoi eliminare tutte le modifiche?"
        visible={showDiscardModal}
        setVisible={setShowDiscardModal}
        onConfirm={fetchCommons}
      />
    </Container>
  );
}

export default EditCommons;
