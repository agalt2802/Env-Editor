import React, { useState, useEffect } from "react";
import {
	Container,
	Row,
	Col,
	Label,
	Input,
	Button,
	ListGroup,
	ListGroupItem,
	Modal
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

export default function CreateCron({showFlowsList, cronID})
{
	const initalState = {
		name: "",
		schedule: "",
		enabled: true,
		flows: {},
		availableFlows: [],
		addedFlows: [],
		selectedAvailableFlow: -1,
		selectedAddedFlow: -1,
		showSaveModal: false
	};
	const [state, setState] = useState(initalState);
	
	useEffect(() => {
		if(Object.keys(state.flows).length === 0)
		{
			fetchWithCatch("/flows", {}, (flows) => {
				console.log(flows);
				
				if(cronID === undefined)
					setState(prevData =>
					({
						...prevData,
						flows: flows,
						availableFlows: Array(Object.keys(flows).length).fill(1).map((element, index) => index)
					}));
				else
					fetchWithCatch(`/crons/${encodeURIComponent(cronID)}`, {}, (cron) => {
						let availableFlows = Array(Object.keys(flows).length).fill(1).map((element, index) => index);
						let cronFlows = cron.INIT_FLOWS.split(",");
						let addedFlows = cronFlows.map(item =>
						{
							let flowIndex = Object.keys(flows).indexOf(item);
							//availableFlows.splice(availableFlows.indexOf(flowIndex), 1);

							return flowIndex;
						});

						setState(prevData =>
						({
							...prevData,
							name: cron.RUN,
							enabled: cron.ENABLED,
							schedule: cron.INIT_SCHEDULER,
							flows: flows,
							addedFlows: addedFlows,
							availableFlows: availableFlows
						}));
					});
			});
		}
	}, [state.flows]);

	const handleChange = (event) =>
	{
		const { name, value } = event.target;

		setState(prevData => ({...prevData, [name]: value.toUpperCase()}));
	}
	
	const save = (event, overwrite) => {
		let cronFlows = state.addedFlows.map(index => Object.keys(state.flows)[index]);
		let flowsNames = cronFlows.join(",");

		fetchWithCatch(`/crons/${encodeURIComponent(state.name)}`, {
			method: (cronID === undefined ? "POST" : "PUT"),
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
			{
				RUN: state.name,
				ENABLED: state.enabled,
				INIT_SCHEDULER: state.schedule,
				INIT_FLOWS: flowsNames
			}),
		}, (res) =>
		{
			console.log("salva flusso");

			showFlowsList();
		}, (e) =>
		{
			console.log(e);
			if(e.status === 500 && cronID === undefined)
				return alert("cron with name " + state.name + " already exists!");
		});
	};

	const cancel = (event) =>
	{
		showFlowsList();
	}

	const addFlow = (event) => { moveFlow(event, true) };
	const removeFlow = (event) => { moveFlow(event, false) };

	const moveFlow = (event, add) =>
	{
		let availableFlows = state.availableFlows;
		let addedFlows = state.addedFlows;
		if(add)
		{
			availableFlows.splice(availableFlows.indexOf(state.selectedAvailableFlow), 1);
			addedFlows.push(state.selectedAvailableFlow);
		}
		else
		{
			addedFlows.splice(addedFlows.indexOf(state.selectedAddedFlow), 1);
			availableFlows.push(state.selectedAddedFlow);
			availableFlows.sort();
		}

		console.log(availableFlows, addedFlows);
		
		setState(prevData =>
		({
			...prevData,
			availableFlows: availableFlows,
			addedFlows: addedFlows,
			selectedAvailableFlow: (add ? -1 : state.selectedAddedFlow),
			selectedAddedFlow: (!add ? -1 : state.selectedAvailableFlow)
		}));
	};

	const selectAvailableFlow = (event) =>
	{
		setState(prevData =>
		({
			...prevData,
			selectedAvailableFlow: parseInt(event.target.id),
			selectedAddedFlow: -1
		}));
	}

	const selectAddedFlow = (event) =>
	{
		setState(prevData =>
		({
			...prevData,
			selectedAddedFlow: parseInt(event.target.id),
			selectedAvailableFlow: -1
		}));
	}

	const sortFlows = (event, up) =>
	{
		let addedFlows = state.addedFlows;

		let srcIndex = addedFlows.indexOf(state.selectedAddedFlow);
		let dstIndex = srcIndex;
		if(up)
			dstIndex--;
		else
			dstIndex++;

		let tmp = addedFlows[dstIndex];
		addedFlows[dstIndex] = addedFlows[srcIndex];
		addedFlows[srcIndex] = tmp;
		
		setState(prevData => ({...prevData, addedFlows: addedFlows }));
	}

	const sortFlowsUp = (event) =>
	{
		sortFlows(event, true);
	}

	const sortFlowsDown = (event) =>
	{
		sortFlows(event, false);
	}

	const showSaveModal = (visible) =>
	{
		setState(prevData => ({...prevData, showSaveModal: visible }));
	}

	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					{(cronID === undefined) ? <h1>Create New Cron</h1> : <h1>Edit Cron</h1>}
				</Col>
			</Row>
			<Row>
				<Input type="checkbox" name="enabled" checked={state.enabled} onChange={handleChange} /> Cron abilitato
			</Row>
			<Row>
				<Label>Nome</Label>
				<Input
					type="text"
					name="name"
					value={state.name}
					onChange={handleChange}
					autoFocus={true}
				/>
			</Row>
			<Row>
				<Label>Schedulazione</Label>
				<Input
					type="text"
					name="schedule"
					value={state.schedule}
					onChange={handleChange}
					autoFocus={true}
					placeholder="0 */2 * * * *"
				/>
			</Row>
			<Row>
				<Label>Seleziona flussi (doppio click)</Label>
				<Col className="flowsList">
					<Label>Flussi disponibili:</Label>
					<ListGroup>
						{state.availableFlows.length == 0 && <ListGroupItem disabled>No flow available</ListGroupItem>}
						{state.availableFlows.map((keyIndex) => (
							<ListGroupItem id={keyIndex} onClick={selectAvailableFlow} action active={keyIndex == state.selectedAvailableFlow} onDoubleClick={addFlow}>
								{state.flows[Object.keys(state.flows)[keyIndex]].NAME}
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
				<Col className="flowsList">
					<Label>Flussi aggiunti al cron:</Label>
					<ListGroup>
						{state.addedFlows.length == 0 && <ListGroupItem disabled>No flow added</ListGroupItem>}
						{state.addedFlows.map((keyIndex) => (
							<ListGroupItem id={keyIndex} onClick={selectAddedFlow} action active={keyIndex == state.selectedAddedFlow} onDoubleClick={removeFlow}>
								{state.flows[Object.keys(state.flows)[keyIndex]].NAME}
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
				<Col xs={1}>
					<Row className="cronSortButton">
						<Button disabled={state.selectedAddedFlow < 0 || state.selectedAddedFlow == state.addedFlows[0]} onClick={sortFlowsUp}>
							<FontAwesomeIcon icon={faArrowUp} />
						</Button>
					</Row>
					<Row className="cronSortButton">
						<Button disabled={state.selectedAddedFlow < 0 || state.selectedAddedFlow == state.addedFlows[state.addedFlows.length-1]} onClick={sortFlowsDown}>
							<FontAwesomeIcon icon={faArrowDown} />
						</Button>
					</Row>
				</Col>
			</Row>
			{state.selectedAvailableFlow >= 0 && state.flows[Object.keys(state.flows)[state.selectedAvailableFlow]].DESCRIPTION !== undefined &&
				<Row>
					<Col>
						<Label>Descrizione flusso:</Label>
						<p>{state.flows[Object.keys(state.flows)[state.selectedAvailableFlow]].DESCRIPTION}</p>
					</Col>
				</Row>
			}
			<Row>
				<Col>
					<Button id="cancel" className="button" color="danger" type="submit" onClick={cancel}>Cancel</Button>
				</Col>
				{state.name !== "" && state.schedule !== "" && state.addedFlows.length > 0 && (
					<Col>
						<div className="d-flex justify-content-end">
							<Button id="saveCron" className="button" color="primary" type="submit" onClick={(cronID === undefined) ? save : () => showSaveModal(true)}>SAVE CRON</Button>
						</div>
					</Col>
				)}
			</Row>

			{state.flows.length > 0 &&
				<Modal show={state.showSaveModal} onHide={() => showSaveModal(false)} autoFocus={false} onChange={(event) => event.preventDefault()}>
					<Modal.Header closeButton>Conferma</Modal.Header>
					<Modal.Body>Vuoi salvare il cron {state.flows[Object.keys(state.flows)[state.selectedAvailableFlow]].RUN}</Modal.Body>
					<Modal.Footer>
						<Button color="success" onClick={save}>Conferma</Button>
						<Button color="danger" onClick={() => showSaveModal(false)}>Annulla</Button>
					</Modal.Footer>
				</Modal>
			}
		</Container>
	);
}