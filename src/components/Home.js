import React, { useState } from "react";
import EditCommons from "./EditCommons/EditCommons";
import CreateFlow from "./CreateFlow/CreateFlow";
import UpdateFlows from "./UpdateFlows/UpdateFlows";
import Crons from "./Crons/Crons";
import ViewLogs from "./ViewLogs/ViewLogs";
import DownloadButton from './DownloadButton';
import FileUpload from './FileUpload';

import { Container, Row } from "reactstrap";
import Nav from "react-bootstrap/Nav";

import 'bootstrap/dist/css/bootstrap.min.css';
//import "./styles.css";

import Navbar from "./Navbar"

function Home({ handleLogout }) {
  const [selectedComponent, setSelectedComponent] = useState("");
  
  const handleSelectComponent = (event, key) => {
    console.log(key)
    setSelectedComponent(key)
  }

  return (
    <Container id="homePageContainer">
      <Navbar handleLogout={handleLogout}></Navbar>
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
            <Nav.Link eventKey={"Crons"}  >MANAGE CRONS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"ViewLogs"}  >VIEW LOGS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"DownloadFile"}  >DOWNLOAD FILES</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={"FileUpload"}  >UPLOAD FILES</Nav.Link>
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
      ) : selectedComponent === "Crons" ? (
        <Crons/>
      ) : selectedComponent === "ViewLogs" ? (
        <ViewLogs/>
      ) : selectedComponent === "DownloadFile" ? (
        <DownloadButton />
        ) : selectedComponent === "FileUpload" ? (
        <FileUpload />
        )  
      : (
        <div className="home"></div>
      )}
      </Row>
    </Container>
  );
}

export default Home;
