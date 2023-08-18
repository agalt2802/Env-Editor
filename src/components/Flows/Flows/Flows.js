import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, Row, Col, Button, Alert, Pagination, PaginationItem, PaginationLink, Spinner } from "reactstrap";
import { fetchWithCatch } from "../../../commonFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import FlowRow from "./FlowRow";

export default function Flows()
{
	const ITEMS_PER_PAGE = 10;

	const { page } = useParams();
	const navigate = useNavigate();
	
	const currentPage = (page !== undefined ? page : 1);

	const [flows, setFlows] = useState(undefined);

	useEffect(() =>
	{
		if(!flows)
			fetchWithCatch("/flows", {}, setFlows);
	}, [flows]);

	const refreshList = () => setFlows(undefined);

	const createFlow = () => navigate("/flows/new");

	const renderFlowsRows = () =>
	{
		if(flows.length == 0)
			return <Alert color="danger">No flows in configuration</Alert>;
		else
		{
			const start = (currentPage-1)*ITEMS_PER_PAGE;
			
			return flows.slice(start, start+ITEMS_PER_PAGE).map((flow, index) =>
				<FlowRow key={index} flow={flow} refreshList={refreshList} />);
		}
	}

	const renderPagination = () =>
	{
		const items = [];
		const pages = Math.ceil(flows.length/ITEMS_PER_PAGE)+1;
		
		for(let page=1;page<pages;page++)
			items.push(
				<PaginationItem key={page} active={page == currentPage}>
					<PaginationLink onClick={() => navigate("/flows/"+page)}>{page}</PaginationLink>
				</PaginationItem>
			);

		return (
			<Row>
				<Pagination style={{flexDirection: 'row', justifyContent: 'center'}}>
					{items}
				</Pagination>
			</Row>
		);
	}

	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					<h1>Manage Flows</h1>
				</Col>
			</Row>
			{!flows ? <div className="text-center"><Spinner /></div> : <div>
			{false && renderPagination()}
			<Card className="rowCard">
				<CardBody>
					<Row>
						<Col>Name</Col>
						<Col xs="auto">Actions</Col>
					</Row>
				</CardBody>
			</Card>
			{renderFlowsRows()}
			{renderPagination()}
			<Card className="rowCard">
				<Button color="primary" onClick={createFlow} className="addFlowBtn">
					<FontAwesomeIcon icon={faAdd} />
				</Button>
			</Card>
			</div>}
		</Container>
	);
}