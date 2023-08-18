import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, CardBody, Alert, Spinner } from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import CronRow from "./CronRow";

export default function Crons()
{
	const navigate = useNavigate();
	const [crons, setCrons] = useState(undefined);

	useEffect(() =>
	{
		if(!crons)
			fetchWithCatch("/crons", {}, setCrons);
	}, [crons]);

	const updateList = () => setCrons(undefined);

	const createCron = () => navigate("/crons/new");

	const renderCronsRows = () =>
	{
		console.log(crons.length);
		if(crons.length == 0)
			return <Alert color="danger">No crons in configuration</Alert>;
		else
			return crons.map((cron, index) => <CronRow key={index} cron={cron} updateList={updateList} />);
	}

	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					<h1>Manage Crons</h1>
				</Col>
			</Row>
			{!crons ? <div className="text-center"><Spinner /></div> : <div>
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
			</div>}
		</Container>
	);
}