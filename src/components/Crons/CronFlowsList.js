import React, { useState } from "react";
import { Label, ListGroup, ListGroupItem, FormGroup, Card } from "reactstrap";
import "semantic-ui-css/semantic.min.css";

export default function CronFlowsList({ label, flows, selectedFlow, onClick, onDoubleClick })
{
	//const [selectedFlow, setSelectedFlow] = useState("");

	/*
	const handleOnClick = (flow) =>
	{
		//setSelectedFlow(flow);
		
		onClick(flow);
	}
	*/

	const handleOnClick = onClick;
	const handleOnDoubleClick = onDoubleClick;

	return (
		<FormGroup>
			<Label>{label}</Label>
			<Card style={{ height: "200px", overflow: "scroll" }}>
				<ListGroup>
					{
						flows.length == 0
							? <ListGroupItem disabled>No flows available</ListGroupItem>
							: flows.map(flow =>
								<ListGroupItem action
									key={flow.id}
									active={flow === selectedFlow}
									onClick={() => handleOnClick(flow)}
									onDoubleClick={() => handleOnDoubleClick(flow)}
								>
									{flow.NAME}
								</ListGroupItem>
							)
					}
				</ListGroup>
			</Card>
		</FormGroup>
	);
}
