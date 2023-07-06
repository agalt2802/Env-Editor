import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import CronRow from "./CronRow";

import "semantic-ui-css/semantic.min.css";

export default function CronsList({createCron, editCron})
{
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

	const renderCronsRows = () =>
	{
		if(state.crons.length == 0)
			return (
				<Row>
					<Col>No crons in configuration</Col>
				</Row>
			);
		else
			return state.crons.map((cron, index) =>
			{
				return <CronRow key={index} cron={cron} editCron={editCron} refreshList={refreshList} />;
			});
	}

	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					<h1>Manage Crons</h1>
				</Col>
			</Row>
			<Row className="cronRow">
				<Col>Name</Col>
				<Col>Flows</Col>
				<Col>Scheduling</Col>
				<Col xs={2}>Actions</Col>
			</Row>
			{renderCronsRows()}
			<Row className="text-center">
				<Col>
					<Button onClick={createCron} className="addCronBtn">
						<FontAwesomeIcon icon={faAdd} />
					</Button>
				</Col>
			</Row>
		</Container>
	);
}