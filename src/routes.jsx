import Destination from "./views/Destination";
import City from "./views/City";
import Province from "./views/Province";
import Tours from "./views/Tours";
import { Route } from "react-router-dom";
import Register from "./components/Register";
import Signin from "./components/Signin";
import Booking from "./pages/Booking";

export const routes = [
  {
    name: "Destination",
    path: "/destination",
    element: <Destination />,
  },
  {
    name: "City",
    path: "/city",
    element: <City />,
  },
  {
    name: "Province",
    path: "/province",
    element: <Province />,
  },
  {
    name: "Tours",
    path: "/tours",
    element: <Tours />,
  },
];
export const authRoutes = [
  {
    name: "Register",
    path: "/register",
    element: <Register />,
  },
  {
    name: "Signin",
    path: "/signin",
    element: <Signin />,
  },
  {
    name: "Booking",
    path: "/booking",
    element: <Booking />,
  },
];
export const allRoutes = [...routes, ...authRoutes];
