import React, { useState, useEffect } from "react";
import { Container, Row, Col, Label, Input, Button, FormGroup, FormFeedback, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSave } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../commonFunctions";
import { useNavigate, useParams } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import ConfirmModal from "../ConfirmModal";
import CronFlows from "./CronFlows";

export default function EditCron()
{
	const { cronID } = useParams();
	const creation = (cronID === undefined);

	const navigate = useNavigate();

	const initalState = {
		name: "",
		schedule: "",
		enabled: true,
		flows: []
	};
	const [state, setState] = useState(initalState);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const [showError, setShowError] = useState(false);
	const [loaded, setLoaded] = useState(creation);
	
	useEffect(() => {
		if(!loaded && !creation)
			fetchWithCatch(`/crons/${encodeURIComponent(cronID)}`, {}, cron =>
			{
				setState({
					name: cron.RUN,
					enabled: cron.ENABLED,
					schedule: cron.INIT_SCHEDULER,
					flows: cron.INIT_FLOWS
				});

				setLoaded(true);
			});
		}, [state.flows]);

	const handleChange = (event) =>
	{
		const { name, value } = event.target;

		if(name == "name")
			setShowError(false);

		setState(prevData => ({...prevData, [name]: value.toUpperCase()}));
	}

	const handleSwitchChange = () =>
		setState(prevData => ({...prevData, enabled: !state.enabled}));
	
	const save = () =>
	{
		fetchWithCatch(`/crons/${encodeURIComponent(state.name)}`,
		{
			method: (creation ? "POST" : "PUT"),
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
			{
				RUN: state.name,
				ENABLED: state.enabled,
				INIT_SCHEDULER: state.schedule,
				INIT_FLOWS: state.flows
			}),
		}, (res) =>
		{
			console.log("salva flusso");

			navigateToList();
		}, (e) =>
		{
			if(e.status === 409 && creation)
				setShowError(true);
		});
	};

	const setFlows = (flows) =>
	{
		let newState = { ...state };
		newState.flows = flows;

		setState(newState);
	}

	const navigateToList = () => navigate("/crons");

	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					{creation ? <h1>Create New Cron</h1> : <h1>Edit Cron</h1>}
				</Col>
			</Row>
			<Row>				
				<FormGroup>
					<Label>Nome</Label>
					<Input
						type="text"
						name="name"
						value={state.name}
						onChange={handleChange}
						autoFocus={true}
						disabled={!creation}
						invalid={showError}
					/>
					{
						showError &&
						<FormFeedback>
							Un cron con questo nome è già esistente! Immettere un nome differente
						</FormFeedback>
					}
				</FormGroup>

				<FormGroup>
					<Label>Schedulazione</Label>
					<Input
						type="text"
						name="schedule"
						value={state.schedule}
						onChange={handleChange}
						autoFocus={true}
						placeholder="0 */2 * * * *"
					/>
				</FormGroup>

				<FormGroup>
					<FormGroup switch>
						<Input type="switch" name="enabled" checked={state.enabled} onChange={handleSwitchChange} />
						<Label check>Cron abilitato</Label>
					</FormGroup>
				</FormGroup>

				{ loaded && <CronFlows cronFlows={state.flows} setCronFlows={setFlows} /> }
			</Row>
      
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
						onClick={() => setShowSaveModal(true)}
						disabled={state.name === "" || state.schedule === "" || state.flows.length == 0 || state.showError}
					>
						<FontAwesomeIcon icon={faSave} /> Save
					</Button>
				</Col>
			</Row>
			<ConfirmModal text={"Vuoi salvare il cron "+state.name+"?"} visible={showSaveModal} setVisible={setShowSaveModal} onConfirm={save} />
		</Container>
	);
}