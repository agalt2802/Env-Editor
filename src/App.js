import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import Home from "./components/Home";
import Login from "./components/Login/Login";
import useToken from "./components/Login/Token"
import { Alert } from "reactstrap";

import { fetchWithCatch } from "./commonFunctions";

import EditCommons from "./components/EditCommons/EditCommons";
import Flows from "./components/Flows/Flows/Flows";
import EditFlow from "./components/Flows/UpdateFlows/EditFlow";
import Crons from "./components/Crons/Crons";
import EditCron from "./components/Crons/EditCron";
import ViewLogs from "./components/ViewLogs/ViewLogs";
import Files from "./components/File/Files";

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
      title: "Commons",
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
          element: <Flows />
        },
        {
          path: "new",
          element: <EditFlow />
        },
        {
          path: "edit/:flowID",
          element: <EditFlow />
        },
        {
          path: ":page",
          element: <Flows />
        }
      ]
    },
    {
      title: "Crons",
      path: "crons",
      element: <Outlet />,
      children:
      [
        {
          path: "",
          element: <Crons />
        },
        {
          path: "new",
          element: <EditCron />
        },
        {
          path: "edit/:cronID",
          element: <EditCron />
        }
      ]
    },
    {
      title: "Logs",
      path: "logs",
      element: <ViewLogs />
    },
    {
      title: "Files",
      path: "files",
      element: <Files />
    },
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
