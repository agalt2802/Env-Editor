import React from "react";
import { Container, Alert } from "reactstrap";
import { useRouteError } from "react-router-dom"

import NavBar from "./Navbar";

export default function ErrorHandler()
{
  const error = useRouteError();

  return (
    <Container id="homePageContainer">
      <NavBar />
      <Alert color="danger"><b>Error:</b> {error.message}</Alert>
    </Container>
  );
}