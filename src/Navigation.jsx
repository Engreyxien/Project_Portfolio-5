import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "./Navigation.css";
import useApi from "./utils/http";
import Signin from "./components/Signin";
import Register from "./components/Register";

export default function Navigation() {
  const navigate = useNavigate();
  const api = useApi();
  const [value, setValue] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const searchDestinations = async () => {
    try {
      const response = await api.get("/destination.php");

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

  const handleSignInClick = () => {
    if (isLoggedIn()) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginFormSubmit = (formData) => {
    // Call the API to authenticate the user with the formData
    // If authentication is successful, redirect to the user profile page
    // If authentication fails, show an error message
  };

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const start = (
    <Link to="/">
      <img
        alt="logo"
        src="https://primefaces.org/cdn/primereact/images/logo.png"
        height="40"
        className="mr-2"
      ></img>
    </Link>
  );

  const end = (
    <div className="rght flex align-items-center">
      <Button id="ButtonA" label="Search" onClick={searchDestinations} />
      <InputText
        id="search"
        placeholder="Search your destination.."
        type="text"
        className="Input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
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
    </div>
  );

  return (
    <div className="navcard">
      <Menubar className="menu" start={start} end={end} />
      <ul>
        {filteredDestinations.map((destination) => (
          <li key={destination.id}>{destination.destination_name}</li>
        ))}
      </ul>
    </div>
  );
}
