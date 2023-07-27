import React from "react";
import LoginForm from "./LoginForm";

function Login({ setToken }) {
  return (
    <div>
    <h1>CT FLOW CONFIGURATOR</h1>
    <div className="ContainerLogin">
      <div className="Login">
        <h2>Login</h2>
        <LoginForm onLogin={setToken} />
      </div>
    </div>
    </div>
  );
}

export default Login;
