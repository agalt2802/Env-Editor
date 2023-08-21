import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import Home from "./components/Home";
import Login from "./components/Login/Login";
import useToken from "./components/Login/Token"
import { Alert, Container } from "reactstrap";

import { fetchWithCatch } from "./commonFunctions";

import EditCommons from "./components/EditCommons/EditCommons";
import Flows from "./components/Flows/Flows/Flows";
import EditFlow from "./components/Flows/UpdateFlows/EditFlow";
import Crons from "./components/Crons/Crons";
import EditCron from "./components/Crons/EditCron";
import ViewLogs from "./components/ViewLogs/ViewLogs";
import Files from "./components/File/Files";
import NavBar from "./components/Navbar";
import ErrorHandler from "./components/ErrorHandler";

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

  const loggedIn = (token != null);

  const errorElement = <ErrorHandler loggedIn={loggedIn} handleLogout={handleLogout} routes={routes} user={(loggedIn ? token.user : "")} />

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login loggedIn={loggedIn} handleLogin={handleLogin} />,
      errorElement: errorElement
    },
    {
      path: "/",
      element: <Home loggedIn={loggedIn} handleLogout={handleLogout} routes={routes} user={(loggedIn ? token.user : "")} />,
      children: routes,
      errorElement: errorElement
    },
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
