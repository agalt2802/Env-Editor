import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button,  Label, Input, FormGroup, FormFeedback, Spinner } from "reactstrap";
import Steps from "./Steps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../../commonFunctions";
import ConfirmModal from "../../ConfirmModal";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "../../AlertProvider";

export default function EditFlow()
{
	const { addError } = useAlert();
	
  const { flowID } = useParams();
  const navigate = useNavigate();
  const creation = (flowID === undefined);

  const initalState =
  {
    flow:
    {
      NAME: "",
      DESCRIPTION: "",
      STEPS: []
    },
		showSaveModal: false,
    secrets: {},
    loaded: creation,
    showError: false
	};
  const [state, setState] = useState(initalState);

  const Fields = Object.freeze(
  {
    NAME: 0,
    DESCRIPTION: 1
  });

  useEffect(() =>
  {
		if(!creation && !state.loaded)
      fetchWithCatch(`/flows/${encodeURIComponent(flowID)}`, {}, (flow) =>
      {
        setState(prevData =>
        ({
          ...prevData,
          flow: flow
        }));
        
        fetchWithCatch("/secrets", {}, (json) =>
        {
          setState(prevData => (
          {
            ...prevData,
            secrets: json,
            loaded: true
          }));
        }, addError);
      }, addError);
	}, [state]);

  function saveData(success) {
    let newFlowID = (creation ? state.flow.NAME.toUpperCase() : flowID);

    fetchWithCatch(`/flows/${encodeURIComponent(newFlowID)}`, {
      method: (creation ? "POST" : "PUT"),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state.flow),
    }, success,
    (e) =>
    {
      if(e.status == 409)
        setState({...state, showSaveModal: false, showError: true});
      else
        addError(e);
    });
  }

  const setSteps = (steps) =>
    setState(prevData =>
    {
      console.log(steps);
      let newData = {...prevData};
      newData.flow.STEPS = steps;
      console.log(newData);

      return newData;
    });

  const setShowSaveModal = (show) =>
    setState(prevData =>
    ({
      ...prevData,
      showSaveModal: show
    }));

  const handleSave = () => setShowSaveModal(true);

  const navigateToList = () => navigate("/flows");
  const handleConfirm = () => saveData(navigateToList);

  const handleInputChange = (event) =>
  {
    let { name, value } = event.target;

    setState(prevData =>
    {
      let data = { ...prevData };

      if(name == "name")
      {
        data.flow.NAME = value;
        data.showError = false;
      }
      else
        data.flow.DESCRIPTION = value;
      
      return data;
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>{creation ? "New flow" : "Edit flow" }</h1>
        </Col>
      </Row>
      {!state.loaded ? <div className="text-center"><Spinner /></div> : <div>
      <Row>
        <Col>
          <FormGroup>
            <Label>Nome Flusso</Label>
            <Input
              type="text"
              name="name"
              value={state.flow.NAME}
              onChange={handleInputChange}
              autoFocus={true}
              disabled={!creation}
              invalid={state.showError}
            />
            {
              state.showError &&
              <FormFeedback>
                Un flusso con questo nome è già esistente! Immettere un nome differente
              </FormFeedback>
            }
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label>Descrizione flusso</Label>
            <Input
              type="textarea"
              name="description"
              value={state.flow.DESCRIPTION}
              onChange={handleInputChange}
              autoFocus={true}
            />
          </FormGroup>
        </Col>
      </Row>

      <h2>Steps</h2>
      <Steps
        steps={state.flow.STEPS}
        setSteps={setSteps}
      />
      
      <Row>
        <Col>
          <Button
            color="danger"
            className="button"
            onClick={navigateToList}
            style={{marginLeft: "0px"}}
          >
            <FontAwesomeIcon icon={faTrash} /> Cancel
          </Button>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            color="success"
            className="button"
            onClick={handleSave}
          >
            <FontAwesomeIcon icon={faSave} /> Save
          </Button>
        </Col>
      </Row>
      </div>}
      
      <ConfirmModal
        text={"Salvare le modifiche al flusso "+state.flow.NAME+"?"}
        visible={state.showSaveModal}
        setVisible={setShowSaveModal}
        onConfirm={handleConfirm}
        onCancel={() => setShowSaveModal(false)}
      />
    </Container>
  );
}