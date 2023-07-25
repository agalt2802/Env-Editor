import React, { useState } from "react";
import { Row, FormGroup, Label, Input, Button} from "reactstrap";
import { fetchWithCatch } from "../commonFunctions";

function LoginForm({ onLogin, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = (e) => {
    // Aggiungi qui la logica per verificare le credenziali
    fetchWithCatch(`/login?username=${username}&password=${password}`, {}, (token)=>{
      setToken(token);
    } )
    console.log(username)
    onLogin(username);
  };

  return (
    <FormGroup >
      <Label>Username</Label>
      <Input
        type="text"
        name="username"
        value={username}
        onChange={(event) => handleUsernameChange(event.target.value)}
      />
      <Label>Password</Label>
      <Input
        type="password"
        name="password"
        value={password}
        onChange={(event) => handlePasswordChange(event.target.value)}
      />
      <Button
            color="success"
            className="loginButton"
            onClick={() => handleSubmit()}
          >Login</Button>
    </FormGroup>
  );
}

export default LoginForm;
