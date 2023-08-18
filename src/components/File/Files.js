import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';

import FileRow from './FileRow';
import Upload from './Upload';

export default function Files()
{
	const files = [
		{ name: "commons.yaml", path: "COMMONS_PATH" },
		{ name: "cronConf.yaml", path: "CRONCONF_PATH" },
		{ name: "env.yaml", path: "ENV_PATH" },
		{ name: "steps.yaml", path: "STEPS_PATH" },
	];
	
	return (
		<Container id="mainContainer">
			<Row className="pageTitle">
				<Col>
					<h1>Manage Files</h1>
				</Col>
			</Row>
			<Row style={{marginBottom: "10px"}}>
				<Col><h3>Download File</h3></Col>
				<Col><h3>Download File</h3></Col>
			</Row>
			<Row>
				<Col>
					{ files.map(file => <Row><FileRow file={file} /></Row>) }
				</Col>
				<Col>
					<Upload />
				</Col>
			</Row>
		</Container>
	);
};