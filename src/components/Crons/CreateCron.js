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
	Paragraph
} from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";

export default function CreateCron({showFlowsList})
{
	const initalState = {
		name: "",
		schedule: "",
		flows: {},
		flowToAdd: "",
		flowToRemove: ""
	};
	const [state, setState] = useState(initalState);
	
	useEffect(() => {
		if(Object.keys(state.flows).length === 0)
		{
			fetchWithCatch("/flows", {}, (flows) => {
				console.log(flows);

				Object.keys(flows).map((key) => {
					flows[key].ADDED = false;
				});
				
				setState(prevData => ({...prevData, flows: flows }));
			});
		}
	}, [state.flows]);

	const handleChange = (event) =>
	{
		const { name, value } = event.target;

		setState(prevData => ({...prevData, [name]: value.toUpperCase()}));
	}
	
	const save = (event) => {
		let cronFlows = Object.keys(state.flows).filter((key) => state.flows[key].ADDED);
		let flowsNames = cronFlows.join(",");

		fetchWithCatch("/newCron", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				RUN: state.name,
				INIT_SCHEDULER: state.schedule,
				INIT_FLOWS: flowsNames,
			}),
		}, (res) =>
		{
			console.log("salva flusso");

			setState(initalState);
			showFlowsList();
		}, (e) =>
		{
			console.log(e);
			if (e.status === 500)
				return alert("cron with name " + state.name + " already exists!");
		});
	};

	const addFlow = (event) => { moveFlow(event, true) };
	const removeFlow = (event) => { moveFlow(event, false) };

	const moveFlow = (event, add) =>
	{
		let key = event.target.id;
		console.log(key);

		let newFlows = state.flows;
		newFlows[key].ADDED = add;
		console.log(newFlows[key]);
		
		setState(prevData => ({...prevData, flowToAdd: key, flowToRemove: key, flows: newFlows }));
	};

	const selectFlowToAdd = (event) =>
	{
		setState(prevData => ({...prevData, flowToAdd: event.target.id }));
	}

	const selectFlowToRemove = (event) =>
	{
		setState(prevData => ({...prevData, flowToRemove: event.target.id }));
	}

	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					<h1>Create New Cron</h1>
				</Col>
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
				<Label>Seleziona flussi:</Label>
				<Col className="flowsList">
					<ListGroup>
						{!Object.values(state.flows).some((flow) => !flow.ADDED) && <ListGroupItem disabled>No flow available</ListGroupItem>}
						{Object.keys(state.flows).map((flowKey) => (
							console.log(state.flows[flowKey].ADDED) || 
							!state.flows[flowKey].ADDED &&
							<ListGroupItem id={flowKey} onClick={selectFlowToAdd} action active={flowKey == state.flowToAdd} onDoubleClick={addFlow}>
								{state.flows[flowKey].NAME}
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
				<Col className="flowsList">
					<ListGroup>
						{!Object.values(state.flows).some((flow) => flow.ADDED) && <ListGroupItem disabled>No flow added</ListGroupItem>}
						{Object.keys(state.flows).map((flowKey) => (
							state.flows[flowKey].ADDED &&
							<ListGroupItem id={flowKey} onClick={selectFlowToRemove} action active={flowKey == state.flowToRemove} onDoubleClick={removeFlow} >
								{state.flows[flowKey].NAME}
							</ListGroupItem>
						))}
					</ListGroup>
				</Col>
			</Row>
			{state.flows[state.flowToAdd] !== undefined && state.flows[state.flowToAdd].DESCRIPTION !== undefined &&
				<Row>
					<Col>
						<Label>Descrizione flusso:</Label>
						<p>{state.flows[state.flowToAdd].DESCRIPTION}</p>
					</Col>
				</Row>
			}
			{state.name !== "" && state.schedule !== "" && Object.values(state.flows).some((flow) => flow.ADDED) && (
				<Row>
					<div className="d-flex justify-content-end">
						<Button id="saveCron" className="button" color="primary" type="submit" onClick={save}>SAVE CRON</Button>
					</div>
				</Row>
			)}
		</Container>
	);
}