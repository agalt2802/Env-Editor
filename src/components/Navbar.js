import React, { useState } from "react";
import { Navbar, NavbarText, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
//import "./styles.css";

export default function Home({ handleLogout }) {

  return (
    <Navbar right>
      {false && <UncontrolledDropdown>
        <DropdownToggle>User</DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>}
      <Button onClick={handleLogout}>Logout</Button>
    </Navbar>
  );
}