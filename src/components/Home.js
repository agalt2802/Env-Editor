import React from "react";
import { Container } from "reactstrap";

import { Navigate, Outlet } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
//import "./styles.css";

import NavBar from "./Navbar"

function Home({ loggedIn, handleLogout, routes, user })
{
  if(!loggedIn)
    return (
      <Navigate to="/login" />
    );
  else
    return (
      <Container id="homePageContainer">
        <NavBar routes={routes} handleLogout={handleLogout} user={user} />
        <Outlet />
      </Container>
    );
}

export default Home;
