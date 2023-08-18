import React, { useState, useEffect } from "react";
import { Row, Col, Label, Button, ListGroup, ListGroupItem, FormGroup, Card, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { fetchWithCatch } from "../../commonFunctions";

import "semantic-ui-css/semantic.min.css";
import CronFlowsList from "./CronFlowsList";

export default function CronFlows({ cronFlows, setCronFlows })
{
	const [flows, setFlows] = useState([]);
	const [selectedFlow, setSelectedFlow] = useState();

	useEffect(() =>
	{
		if(Object.keys(flows).length === 0)
		{
			fetchWithCatch("/flows", {}, (flows) =>
			{
				//console.log(flows);

				flows = flows.sort((a, b) => a.id > b.id);
				setSelectedFlow(flows[0]);

				let flowsAssoc = {};
				for(let flow of flows)
					flowsAssoc[flow.id] = flow;

				setFlows(flowsAssoc);
			});
		}
	}, [flows]);

	const addFlow = () => moveFlow(true);
	const removeFlow = () => moveFlow(false);
	
	const moveFlow = (add) =>
	{
		if(add)
			cronFlows.push(selectedFlow.NAME);
		else
			cronFlows.splice(cronFlows.indexOf(selectedFlow.NAME), 1);

		setCronFlows(cronFlows);
	};

	const sortFlows = (up) =>
	{
		let srcIndex = cronFlows.indexOf(selectedFlow.NAME);
		let dstIndex = srcIndex;
		if(up)
			dstIndex--;
		else
			dstIndex++;

		let tmp = cronFlows[dstIndex];
		cronFlows[dstIndex] = cronFlows[srcIndex];
		cronFlows[srcIndex] = tmp;
		
		setCronFlows(cronFlows);
	}

	const sortFlowsUp = () => sortFlows(true);
	const sortFlowsDown = () => sortFlows(false);

	const getAvailableFlows = () => Object.values(flows).filter(flow => !cronFlows.includes(flow.id));
	const getAddedFlows = () => cronFlows.map(flow => flows[flow]);		//flows.filter(flow => cronFlows.includes(flow.id));

	return (
		<div>
		{Object.keys(flows).length > 0 &&
		<FormGroup>
			<Label>Seleziona flussi (doppio click)</Label>
			<Row>
				<Col>
					<CronFlowsList
						label="Flussi disponibili:"
						flows={getAvailableFlows()}
						selectedFlow={selectedFlow}
						onClick={setSelectedFlow}
						onDoubleClick={addFlow}
					/>
				</Col>
				<Col>
					<CronFlowsList
						label="Flussi aggiunti al cron:"
						flows={getAddedFlows()}
						selectedFlow={selectedFlow}
						onClick={setSelectedFlow}
						onDoubleClick={removeFlow}
					/>
				</Col>
				<Col xs={1}>
					<Row className="cronSortButton">
						<Button disabled={!getAddedFlows().includes(selectedFlow) || selectedFlow.id == cronFlows[0]} onClick={sortFlowsUp}>
							<FontAwesomeIcon icon={faArrowUp} />
						</Button>
					</Row>
					<Row className="cronSortButton">
						<Button disabled={!getAddedFlows().includes(selectedFlow) || selectedFlow.id == cronFlows[cronFlows.length-1]} onClick={sortFlowsDown}>
							<FontAwesomeIcon icon={faArrowDown} />
						</Button>
					</Row>
				</Col>
			</Row>
				<FormGroup>
					<Label>Descrizione flusso:</Label>
					{ selectedFlow.DESCRIPTION !== undefined
						? (false ? <Alert color="info" fade={false}>{selectedFlow.DESCRIPTION}</Alert> : <p>{selectedFlow.DESCRIPTION}</p>)
						: <Alert color="danger" fade={false}>No description provided</Alert>
					}
				</FormGroup>
		</FormGroup>
		}</div>
	);
}
