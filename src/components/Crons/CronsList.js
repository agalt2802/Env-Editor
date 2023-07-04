import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import CronRow from "./CronRow";

import "semantic-ui-css/semantic.min.css";

export default function CronsList({createCron, editCron})
{
	const [cronsRows, setCronsRows] = useState([]);

	useEffect(() =>
	{
		if (cronsRows.length == 0)
			fetchWithCatch("/crons", {}, (json) => {
				setCronsRows(json.CRON_CONFS.CRONS);
			});
	}, [cronsRows]);

	const renderCronsRows = () =>
	{
		if(cronsRows.length == 0)
		{
			return (
				<Row>
					<Col>No crons scheduled</Col>
				</Row>
			)
		}
		else
		{
			let rows = [];
			for(const i in cronsRows)
				rows.push(<CronRow key={i} data={cronsRows[i]} editCron={editCron} />);
			
			return rows;
		}
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
				<Col xs={1}>Actions</Col>
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