import React from 'react';
import { Row, Col, Card, CardBody, CardText, ButtonGroup, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { fetchWithCatch } from "../../commonFunctions";

export default function FileRow({ file })
{
	const handleDownload = async (e) =>
	{
		e.preventDefault();

		fetchWithCatch(`/download/${file.path}`, {}, (res) =>
		{
			const url = URL.createObjectURL(res);
			const link = document.createElement('a');
			link.href = url;
			link.download = file.name;
			link.click();
			URL.revokeObjectURL(url);
		});
	};

	return (
		<Card className="rowCard">
			<CardBody>
				<Row>
					<Col className="cardTextCol">
						<CardText>
							{file.name}
						</CardText>
					</Col>
					<Col xs="auto">
						<ButtonGroup>
							<Button color="primary" onClick={handleDownload}>
								<FontAwesomeIcon icon={faDownload} />
							</Button>
						</ButtonGroup>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};