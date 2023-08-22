import React from "react";
import { Container } from "reactstrap";
import { Navigate, Outlet } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
//import "./styles.css";

import useToken from "./Login/Token"
import NavBar from "./Navbar"

function Home({ routes })
{
  const { token } = useToken();
  
  const loggedIn = (token != null);

  if(!loggedIn)
    return <Navigate replace to="/login" />

  return (
    <Container id="homePageContainer">
      <NavBar routes={routes} />
      <Outlet />
    </Container>
  );
}

export default Home;
