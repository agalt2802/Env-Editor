import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../../commonFunctions";

import StepRow from "./StepRow";
import AddStepModal from "./AddStepModal";
import StepDetails from "./StepDetails";

export default function Steps({ steps, setSteps })
{
  const notEditableFileds = ["RUN", "STEP_CONTROL"];

  const [showAddStep, setShowAddStep] = useState(false);
  const [availableSteps, setAvailableSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(undefined);
  
  useEffect(() =>
  {
		if(availableSteps.length == 0)
			fetchWithCatch("/steps", {}, setAvailableSteps);
	}, [availableSteps]);
  
  const addStep = (newStepID) =>
  {
    let newStep = availableSteps.find(elem => (elem.id == newStepID));
    delete newStep.id;

    steps.push(newStep);

    setSteps(steps);
    
    setShowAddStep(false);
  }

  const setStep = (key, data) =>
  {
    steps[key] = data;

    setSteps(steps);
  }

  const swap = (index1, index2) =>
  {
    let tmp = steps[index1];
    steps[index1] = steps[index2];
    steps[index2] = tmp;

    setSteps(steps);
  }

  const moveUp = (index) => swap(index-1, index);
  const moveDown = (index) => swap(index, ++index);

  const deleteStep = (index) =>
  {
    steps.splice(index, 1);

    setSelectedStep(undefined);

    setSteps(steps);
  };
  
  const renderList = () =>
  {
    /*
    let rows = [];
    for(let key in steps)
    {
      console.log(key);

      rows.push(
        <StepRow
          key={key}
          step={steps[key]}
          first={key == 0}
          last={key == steps.length-1}
          moveUp={() => moveUp(key)}
          moveDown={() => moveDown(key)}
          editStep={() => setSelectedStep(key)}
          deleteStep={() => deleteStep(key)}
        />
      );
    }

    return rows;
    */
    console.log("refresh");
    return (
      <ListGroup>
        {
          steps.map((step, key) =>
            <StepRow
              key={key}
              step={step}
              first={key == 0}
              last={key == steps.length-1}
              moveUp={() => moveUp(key)}
              moveDown={() => moveDown(key)}
              editStep={() => setSelectedStep(key)}
              deleteStep={() => deleteStep(key)}
            />
          )
        }
      </ListGroup>
    );
  }

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            {renderList()}
          </Col>
        </Row>
        <Row style={{marginTop: "25px"}}>
          <Col className="d-flex justify-content-center">
            <Button color="primary" onClick={() => setShowAddStep(true)}>
              <FontAwesomeIcon icon={faSquarePlus} /> Add Step
            </Button>
          </Col>
        </Row>
        {availableSteps.length > 0 &&
          <AddStepModal
            show={showAddStep}
            steps={availableSteps}
            handleConfirm={addStep}
            handleCancel={() => setShowAddStep(false)}
          />
        }
      </Col>
      <Col>
        {selectedStep !== undefined &&
          <StepDetails
            step={steps[selectedStep]}
            setStep={(data) => setStep(selectedStep, data)}
            notEditableFileds={notEditableFileds}
          />
        }
      </Col>
    </Row>
  );
}
