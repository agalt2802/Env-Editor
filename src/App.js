import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import Home from "./components/Home";
import Login from "./components/Login/Login";
import useToken from "./components/Login/Token"
import { Alert } from "reactstrap";

import EditCommons from "./components/EditCommons/EditCommons";
import UpdateFlows from "./components/Flows/UpdateFlows/UpdateFlows";
import Crons from "./components/Crons/Crons";
import ViewLogs from "./components/ViewLogs/ViewLogs";
import FlowsList from "./components/Flows/Flows/FlowsList";

function App() {
  const { token, setToken } = useToken();
  const { error, setError } = useState(false);

  function ErrorFallback({error, resetErrorBoundary}) {
    return (
      <div className="App">
      <Alert color="danger" toggle={resetErrorBoundary}>
        {error.message}
      </Alert>
      </div>
    );
  }
  
  const routes = [
    {
      title: "Edit Commons",
      path: "commons",
      element: <EditCommons />
    },
    {
      title: "Flows",
      path: "flows",
      element: <Outlet />,
      children:
      [
        {
          path: "",
          element: <FlowsList />
        },
        {
          path: "new",
          element: <UpdateFlows />
        },
        {
          path: "edit/:flowID",
          element: <UpdateFlows />
        },
        {
          path: ":page",
          element: <FlowsList />
        }
      ]
    },
    {
      title: "Crons",
      path: "crons",
      element: <Crons />
    },
    {
      title: "Logs",
      path: "logs",
      element: <ViewLogs />
    },
    // {
    //   title: "Files",
    //   path: "files",
    //   element: <Files />
    // },
  ];

  const handleLogin = (token, user) =>
  {
    setToken(JSON.stringify(
    {
      token: token,
      user: user
    }))
  };

  const handleLogout = () =>
  {
    setToken();
  }

  let loggedIn = (token != null);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login loggedIn={loggedIn} handleLogin={handleLogin} />
    },
    {
      path: "/",
      element: <Home loggedIn={loggedIn} handleLogout={handleLogout} routes={routes} user={(loggedIn ? token.user : "")} />,
      children: routes
    },
  ]);
  
  return (
    <div className="App">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => setError(false)}
        //resetKeys={[explode]}
      >
        <RouterProvider router={router} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
