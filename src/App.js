import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"

import Home from "./components/Home";
import Login from "./components/Login/Login";

import EditCommons from "./components/EditCommons/EditCommons";
import Flows from "./components/Flows/Flows/Flows";
import EditFlow from "./components/Flows/UpdateFlows/EditFlow";
import Crons from "./components/Crons/Crons";
import EditCron from "./components/Crons/EditCron";
import ViewLogs from "./components/ViewLogs/ViewLogs";
import Files from "./components/File/Files";
import ErrorHandler from "./components/ErrorHandler";
import ErrorProvider from "./components/ErrorProvider";

function App()
{
  const routes = [
    {
      title: "Configurations",
      path: "config",
      element: <EditCommons />
    },
    {
      title: "Flows",
      path: "flows",
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
  
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorHandler />
    },
    {
      path: "/",
      element: <Home routes={routes} />,
      errorElement: <ErrorHandler />,
      children: routes
    },
  ]);
  
  return (
    <ErrorProvider className="App">
      <RouterProvider router={router} />
    </ErrorProvider>
  );
}

export default App;
