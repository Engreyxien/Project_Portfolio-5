import Destination from "./views/Destination";
import City from "./views/City";
import Province from "./views/Province";
import Tours from "./views/Tours";
import { Route } from "react-router-dom";
import Register from "./components/Register";
import Signin from "./components/Signin";

export const routes = [
  {
    name: "Destination",
    path: "/destination",
    exact: true,
    element: <Destination />,
  },
  {
    name: "City",
    path: "/city",
    exact: true,
    element: <City />,
  },
  {
    name: "Province",
    path: "/province",
    exact: true,
    element: <Province />,
  },
  {
    name: "Tours",
    path: "/tours",
    exact: true,
    element: <Tours />,
  },
];
export const authRoutes = [
  {
    name: "Register",
    path: "/register",
    exact: true,
    element: <Register />,
  },
  {
    name: "Signin",
    path: "/signin",
    exact: true,
    element: <Signin />,
  },
];
export const allRoutes = [...routes, ...authRoutes];
