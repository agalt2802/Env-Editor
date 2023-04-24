import {
    FormGroup,
    Label,
    Input,
    Button,
  } from "reactstrap";
  import React from 'react'
  import "semantic-ui-css/semantic.min.css";
  import { Modal } from "react-bootstrap";
  
  function SelectedStepDetails({
    flows,
    setFlows,
    selectedFlow,
    setSelectedFlow,
    stepIndex,
    setStepIndex,
    notEditableFileds,
    setShow,
    showModal,
    setShowModal
  }) {

    if (stepIndex === -1) return null;
    let step = flows[selectedFlow].STEPS[stepIndex]
    
    const handleValueChange = (event, key) => {
        console.log("KEY: " + key)
        const updatedFlows = {...flows}
        updatedFlows[selectedFlow].STEPS[stepIndex][key] = event.target.value
        setFlows(updatedFlows)
    };
  
    // const handleEditStep = (event) => {
    // console.log(flows)
    // event.preventDefault()
    // async function saveData() {
    //   await fetch("http://127.0.0.1:8081/updateFlows", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(flows),
    //   }).catch((error) => console.log(error));
    //   console.log("salva flusso");
    // }
    // saveData()
    // setShowModal(true)
    // // setShow(false)
    // // setStepIndex("-1")
    // // setSelectedFlow("")
 
    // };

    const handleConfirm = () =>{
      setShowModal(false)
      setShow(false)
      setStepIndex("-1")
      setSelectedFlow("")
    }
  
    return (
      <div>
        <h2> STEP: {step.RUN.toLocaleUpperCase()}</h2>
        {Object.keys(step).map((key) => (
          <FormGroup key={key}>
            <Label>{key}</Label>
            <Input
              type="text"
              name={key}
              value={step[key]}
              onChange={(event) => handleValueChange(event, key)}
              readOnly={notEditableFileds.find((element) => element === key)}
            />
          </FormGroup>
        ))}  
        <div className="d-flex justify-content-end">
        {/* <Button
          id="addStep"
          className="button"
          color="primary"
          type="submit"
          onClick={handleEditStep}
        >
          SAVE EDIT
        </Button> */}

        <Modal show={showModal} onHide={() => setShow(false)} autoFocus={false} onChange={(event) => event.preventDefault()}>
          <Modal.Header closeButton>Conferma</Modal.Header>
          <Modal.Body>
            Updated STEP: {step.RUN} of FLOW: {selectedFlow}
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={handleConfirm}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      </div>
  
    );
  }
  
  export default SelectedStepDetails;
  