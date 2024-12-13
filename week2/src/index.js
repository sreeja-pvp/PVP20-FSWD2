import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./routes/Home";
import Report from "./routes/Report";
import Student from "./routes/Students";



import Navbar from "./components/Navbar";
import { SidebarData } from "./components/sidebar";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "students",
        element: <Student />,
      },
      {
        path: "reports",
        element: <Report />,
      },
    ],
  },
]);

/*const router = createBrowserRouter([
  {
    path : "/",
    element : <Home/>
  } ,
   {
    path : "/student",
    element : < Student/>
   } ,
  {
    path : "/report" ,
    element : <Report />
  }
]);
*/
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
