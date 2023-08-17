import React from "react";
import { Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavItem } from "reactstrap";
import { NavLink } from 'react-router-dom'; //use the NnavLink from react-router-dom with class nav-link

import 'bootstrap/dist/css/bootstrap.min.css';
//import "./styles.css";

export default function NavBar({ routes, handleLogout, user }) {

  const buildItems = () =>
  {
    let res = [];
    routes.forEach(route =>
    {
      res.push(
        <NavItem key={route.path}>
          <NavLink className="nav-link" to={route.path}>{route.title}</NavLink>
        </NavItem>
      );
    });

    return res;
  }

  return (
    <Navbar fixed="top" container="fluid">
      <NavbarBrand href="/">CT Configurator</NavbarBrand>
      <Nav justified pills>
        {buildItems()}
      </Nav>
      <UncontrolledDropdown>
        <DropdownToggle color="light" caret>My Account</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem header>{user}</DropdownItem>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Navbar>
  );
}