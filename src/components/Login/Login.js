import React, { useState } from "react";
import { Navigate } from "react-router-dom/dist";
import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { fetchWithCatch } from "../../commonFunctions";
import Navbar from "../Navbar";

export default function Login({ loggedIn, handleLogin })
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleUsernameChange = (value) => {
    setError(false);

    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setError(false);

    setPassword(value);
  };

  const handleSubmit = (e) => {
    // Aggiungi qui la logica per verificare le credenziali
    fetchWithCatch(`/login?username=${username}&password=${password}`, {}, (json) =>
      handleLogin(json.token, username),
      (e) =>
      {
        setError(true);

        if(e.status == 401)
          e.message = "Wrong username or password";
        
        //addError(e);
      }
    );

    setPassword("");
  };

  if(loggedIn)
    return <Navigate to="/" />;
  else
    return (
      <Container className="ContainerLogin">
        <Navbar />
        <FormGroup >
        <Label>Username</Label>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={(event) => handleUsernameChange(event.target.value)}
          invalid={error}
        />
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(event) => handlePasswordChange(event.target.value)}
          invalid={error}
        />
        <Button
          color="success"
          className="loginButton"
          onClick={handleSubmit}
        >Login</Button>
      </FormGroup>
      </Container>
  );
}