import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { useApi } from "./utils/http";
import Signin from "./components/Signin";
import Register from "./components/Register";
import Logo from "./TourestLogo/TourestLogo.png";
import { Avatar } from "primereact/avatar";
import { Dropdown } from "primereact/dropdown";
import { OverlayPanel } from "primereact/overlaypanel";
import { Sidebar } from "primereact/sidebar";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Navigation() {
  const navigate = useNavigate();
  const api = useApi();
  const [value, setValue] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [visibleRight, setVisibleRight] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // const op = useRef(null);

  // const avatarSelect = (e) => {
  //   op.current.hide();
  // };

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/register");
  //   }

  //   return () => {};
  // }, []);
  const searchDestinations = async () => {
    try {
      const response = await api.get("/destinations");

      if (response.status === 200) {
        const data = response.data;

        let filteredDestination = [];

        if (value.trim() !== "") {
          filteredDestination = data.filter((destination) =>
            destination.destination_name
              .toLowerCase()
              .includes(value.toLowerCase())
          );
        }

        setFilteredDestinations(filteredDestination);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error searching destinations:", error);
    }
  };

  const start = (
    <Link to="/dashboard">
      <img alt="logo" src={Logo} height="40" className="mr-2"></img>
    </Link>
  );

  const end = (
    <div className="rght flex align-items-center">
      <Button label="Flights" />
      <Button label="English" className="mr-2" size="Medium" shape="circle" />
      <Button
        icon="pi pi-dollar"
        className="mr-2"
        size="Medium"
        shape="circle"
      />
      <div className="flex gap-2 justify-content-center">
        <Button
          icon="pi pi-user-plus"
          label="Account"
          onClick={() => setVisibleRight(true)}
        />
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <h3>
            Create you account <br />
          </h3>

          <Link to="/register">
            <Button
              id="ButtonR"
              label="Register"
              icon="pi pi-user-plus"
              iconPos="right"
            />
          </Link>
          <Link to="/signin">
            <Button
              id="ButtonS"
              label="Sign In"
              icon="pi pi-user"
              iconPos="right"
            />
          </Link>
        </Sidebar>
      </div>
    </div>
  );

  return (
    <div className="navcard">
      <Menubar className="menu" start={start} end={end} />
    </div>
  );
}
