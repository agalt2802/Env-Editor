import React from "react";
import { Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem, Alert } from "reactstrap";
import { NavLink, useNavigate } from 'react-router-dom'; //use the NavLink from react-router-dom with class nav-link

import 'bootstrap/dist/css/bootstrap.min.css';
//import "./styles.css";

import useToken from "./Login/Token"
import { useAlert } from "./AlertProvider"

export default function NavBar({ routes })
{
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const { renderAlerts } = useAlert();

  const isLoggedIn = (token != null);

  const buildItems = () =>
  {
    let res = [];
    if(routes)
      routes.forEach(route =>
      {
        if(route.title !== undefined)
          res.push(
            <NavItem key={route.path}>
              <NavLink className="nav-link" to={route.path}>{route.title}</NavLink>
            </NavItem>
          );
      });

    return res;
  }
  
  const handleLogout = () =>
  {
    setToken();

    navigate("/login");
  }

  return ([
    <Navbar fixed="top" container="fluid" className="nav-bar">
      <NavbarBrand href="/" className="d-flex brand">
        <img alt="logo" id="logo" src="/logo512.png" />
        CT Configurator
      </NavbarBrand>
      {
        isLoggedIn &&
        <Nav justified pills>
          {buildItems()}
        </Nav>
      }
      {
        isLoggedIn &&
        <UncontrolledDropdown>
          <DropdownToggle color="light" caret>My Account</DropdownToggle>
          <DropdownMenu end>
            <DropdownItem header>{token.user}</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      }
    </Navbar>,
    <div className="alerts">{renderAlerts()}</div>
  ]);
}