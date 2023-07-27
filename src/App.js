import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Home from "./components/Home";
import Login from "./components/Login/Login";
import useToken from "./components/Login/Token"
import { Alert } from "reactstrap";

function App() {
  const { token, setToken } = useToken();
  const { error, setError } = useState(false);

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div className="App">
      <Alert color="danger" toggle={resetErrorBoundary}>
        {error.message}
      </Alert>
      {(!token ? <Login setToken={setToken} /> : <Home />)}</div>
    )
  }  

  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setError(false)}
        //resetKeys={[explode]}
      >
        {(!token ? <Login setToken={setToken} /> : <Home handleLogout={() => setToken()} />)}
      </ErrorBoundary>
    </div>
  );
}

export default App;
