import React from "react";
import  { useRouteError } from "react-router-dom"
import { Container, Alert } from "reactstrap";

import NavBar from "./Navbar";

export default function ErrorHandler({ handleLogout, routes, user })
{
  const error = useRouteError();

  return (
    <Container id="homePageContainer">
      <NavBar handleLogout={handleLogout} routes={routes} user={user} />
      <Alert color="danger"><b>Error:</b> {error.message}</Alert>
    </Container>
  );
}