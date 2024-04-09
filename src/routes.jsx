import Destination from "./views/Destination";
import City from "./views/City";
import Province from "./views/Province";
import Tours from "./views/Tours";
import Login from "./Login";
import Register from "./Register";

const routes = [
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
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default routes;
