import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody, Alert } from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import CronRow from "./CronRow";

export default function Crons()
{
	const navigate = useNavigate();
	const [state, setState] = useState(
	{
		crons: [],
		loaded: false
	});

	useEffect(() =>
	{
		if(!state.loaded)
			refreshList();
	}, [state]);

	const refreshList = () =>
	{
		fetchWithCatch("/crons", {}, (crons) => {
			setState(
			{
				crons: crons,
				loaded: true
			});
		});
	}

	const createCron = () => navigate("/crons/new");

	const renderCronsRows = () =>
	{
		if(state.crons.length == 0)
			return (
				<Alert color="danger">No crons in configuration</Alert>
			);
		else
			return state.crons.map((cron, index) =>
			{
				return <CronRow key={index} cron={cron} refreshList={refreshList} />;
			});
	}

	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					<h1>Manage Crons</h1>
				</Col>
			</Row>
			<Card className="rowCard">
				<CardBody>
					<Row>
						<Col xs="auto">Enabled</Col>
						<Col>Name</Col>
						<Col>Scheduling</Col>
						<Col xs="auto">Actions</Col>
					</Row>
				</CardBody>
			</Card>
			{renderCronsRows()}
			<Card className="rowCard">
				<Button color="primary" onClick={createCron} className="addCronBtn">
					<FontAwesomeIcon icon={faAdd} />
				</Button>
			</Card>
		</Container>
	);
}