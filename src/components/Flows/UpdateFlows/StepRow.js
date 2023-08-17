import React, { useState } from "react";
import { Row, Col, ListGroupItem, ButtonGroup, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowUp, faArrowDown, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import ConfirmModal from "../../ConfirmModal";

export default function StepRow({ step, first, last, moveUp, moveDown, editStep, deleteStep })
{
  const [ showDeleteStepModal, setShowDeleteStepModal ] = useState(false);

  return (
    <ListGroupItem>
      <Row>
        <Col className="cardTextCol">
          <p className="card-text">
            {step.RUN}
          </p>
        </Col>
        <Col xs={"auto"}>
          <ButtonGroup>
            <Button color="primary" onClick={moveDown} disabled={last}>
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            <Button color="primary" onClick={moveUp} disabled={first}>
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <Button color="success" onClick={editStep}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button color="danger" onClick={() => setShowDeleteStepModal(true)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      
      <ConfirmModal
        text={"Eliminare lo step "+step.RUN+"?"}
        visible={showDeleteStepModal}
        setVisible={setShowDeleteStepModal}
        onConfirm={deleteStep}
        onCancel={() => setShowDeleteStepModal(false)}
      />
    </ListGroupItem>
  );
}
