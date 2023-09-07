import React, { useState } from "react";
import { Container, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate, Navigate } from "react-router-dom";

import { fetchWithCatch } from "../../commonFunctions";

import useToken from "./Token";
import Navbar from "../Navbar";
import { useAlert } from "../AlertProvider";

export default function Login()
{
	const { addError } = useAlert();
	
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { token, setToken } = useToken();
  const navigate = useNavigate();

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

    const headers = {
      'Content-Type': 'application/json', // Specifica il tipo di contenuto
      // Aggiungi qui altri header se necessario
    };
    fetchWithCatch(
      '/login',
      {
        method: 'POST', // Usa il metodo POST per inviare le credenziali
        body: JSON.stringify({ username, password }), // Converte le credenziali in JSON
        headers: headers,
      },
      (json) =>
      {
        setToken(JSON.stringify(
          {
            token: json.token,
            user: username
          }
        ));
      
        navigate("/");
      },
      (e) =>
      {
        setError(true);

        if(e.status == 401)
          e.message = "Wrong username or password";

        setPassword("");
      }
    );
  };

  const isLoggedIn = (token != null);

  if(isLoggedIn)
    return <Navigate to="/" />

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