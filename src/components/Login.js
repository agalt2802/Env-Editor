import React, {useState} from "react";
import LoginForm from "./LoginForm";

function Login() {

  const [token, setToken] = useState("");
  const handleLogin = (username) => {
    alert(`Benvenuto, ${username}!`);
    // Aggiungi qui la logica per il reindirizzamento all'area riservata
  };

  return (
    <div>
    <h1>CT FLOW CONFIGURATOR</h1>
    <div className="ContainerLogin">
      <div className="Login">
        <h2>Login</h2>
        <LoginForm onLogin={handleLogin} setToken={setToken} />
      </div>
    </div>
    </div>
  );
}

export default Login;
