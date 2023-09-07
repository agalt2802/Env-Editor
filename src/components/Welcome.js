import React from "react";
import { Container, Row, Col } from "reactstrap";

import useToken from "./Login/Token"

function Welcome()
{
	const { token, setToken } = useToken();

	return (
		<Container id="mainContainer" className="welcome">
			<Row>
				<Col>
					<img alt="logo" src="logo512.png" />
				</Col>
			</Row>
			<Row>
				<Col>
					<h3>Welcome {token.user} to CT Flow Configurator!</h3>
				</Col>
			</Row>
		</Container>
	);
}

export default Welcome;
