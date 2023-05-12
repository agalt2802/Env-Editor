import React, { useState } from "react";
import EditCommons from "./EditCommons/EditCommons";
import CreateFlow from "./CreateFlow/CreateFlow";
import UpdateFlows from "./UpdateFlows/UpdateFlows";
import CreateCron from "./CreateCron/CreateCron"
import EditCron from "./EditCron/EditCron";
import ViewLogs from "./ViewLogs/ViewLogs";
import DownloadButton from './DownloadButton';

import { Container, Row, Col, Label, Input } from "reactstrap";
import Nav from "react-bootstrap/Nav";

import 'bootstrap/dist/css/bootstrap.min.css';
// import "./styles.css";

function Home() {
  const [selectedComponent, setSelectedComponent] = useState("");

  const handleClick = (component) => {
    setSelectedComponent(component);
  };

  const handleSelectComponent = (event, key) => {
    console.log(key)
    setSelectedComponent(key)
  }

  return (
    <Container id="homePageContainer">
      <Row>
        <div>
          <h1>CT INFO TRANSFER</h1>
        </div>
      </Row>
      <Row>
        <Nav justify variant="tabs" onSelect={(selectedKey) => handleSelectComponent(event, selectedKey)}>
        <Nav.Item>
            <Nav.Link eventKey={"EditCommons"}  >EDIT COMMONS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"CreateFlow"} >CREATE FLOW</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"UpdateFlows"} >EDIT FLOW</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"CreateCron"}  >CREATE CRON</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"EditCron"}  >EDIT CRON</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"ViewLogs"}  >VIEW LOGS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"DownloadUploadFile"}  >DOWNLOAD & UPLOAD FILES</Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
      {selectedComponent === "EditCommons" ? (
        <EditCommons />
      ) : selectedComponent === "CreateFlow" ? (
        <CreateFlow />
      ) : selectedComponent === "UpdateFlows" ? (
        <UpdateFlows />
      ) : selectedComponent === "CreateCron" ? (
        <CreateCron/>
      ) : selectedComponent === "EditCron" ? (
        <EditCron/>
      ) : selectedComponent === "ViewLogs" ? (
        <ViewLogs/>
      ) : selectedComponent === "DownloadUploadFile" ? (
        <DownloadButton />
        )  
      : (
        <div className="home"></div>
      )}
      </Row>
    </Container>
  );
}

export default Home;
