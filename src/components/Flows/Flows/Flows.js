import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, Row, Col, Button, Alert, Pagination, PaginationItem, PaginationLink, Spinner, Label, Input, FormGroup } from "reactstrap";
import { fetchWithCatch } from "../../../commonFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import FlowRow from "./FlowRow";
import { useAlert } from "../../AlertProvider";

export default function Flows()
{
	const ITEMS_PER_PAGE = 10;

	const { addError } = useAlert();
	
	const { page } = useParams();
	const navigate = useNavigate();
	
	const currentPage = (page !== undefined ? page : 1);

	const [flows, setFlows] = useState(undefined);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredFlows = flows && flows.filter(element => element.NAME.toLowerCase().includes(searchQuery.toLowerCase()));

	useEffect(() =>
	{
		if(!flows)
			fetchWithCatch("/flows", {}, setFlows, addError);
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
			
			return filteredFlows.slice(start, start+ITEMS_PER_PAGE).map((flow, index) =>
				<FlowRow key={index} flow={flow} refreshList={refreshList} />);
		}
	}

	const renderPagination = () =>
	{
		const items = [];
		const pages = Math.ceil(filteredFlows.length/ITEMS_PER_PAGE)+1;
		
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

	const handleSearch = (event) =>
	{
		navigate("/flows");

		setSearchQuery(event.target.value);
	}
	
	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					<h1>Manage Flows</h1>
				</Col>
			</Row>
			{!filteredFlows ? <div className="text-center"><Spinner /></div> : <div>
			{false && renderPagination()}
			<FormGroup row className="mb-5">
					<Col sm={"auto"} className="d-flex align-items-center">
						<Label for="search" style={{marginBottom: "0px"}}><b>Search</b></Label>
					</Col>
					<Col>
						<Input
							id="search"
							value={searchQuery}
							onChange={handleSearch}
							placeholder="Insert text here"
						/>
					</Col>
				</FormGroup>
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