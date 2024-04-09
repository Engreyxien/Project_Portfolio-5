import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./Navigation.css";
import useApi from "./utils/http";
import Login from "./Login";
import Register from "./Register";
export default function Navigation() {
  const navigate = useNavigate();
  const api = useApi();
  const [value, setValue] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showLogin, setShowLogin] = useState(false); // Add showLogin state

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
      // If already logged in, navigate to the user profile page
      navigate("/profile");
    } else {
      setShowLogin(true); // Show the Login component
    }
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigates to the Register page
  };

  const handleLoginFormSubmit = (formData) => {
    // Call the API to authenticate the user with the formData
    // If authentication is successful, redirect to the user profile page
    // If authentication fails, show an error message
  };

  const isLoggedIn = () => {
    // Check if the user is logged in (you can implement your own logic here)
    return false; // Placeholder logic, replace with actual implementation
  };

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );

  const end = (
    <div className="rght flex align-items-center gap-1 flex-1">
      <Button id="ButtonA" label="Search" onClick={searchDestinations} />
      <InputText
        id="search"
        placeholder="Search your destination.."
        type="text"
        className="Input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        id="ButtonR"
        label="Register"
        icon="pi pi-user-plus"
        iconPos="right"
        onClick={handleRegisterClick} // Updated onClick handler for Register button
      />
      <Button
        id="ButtonS"
        label="Sign In"
        icon="pi pi-user"
        iconPos="right"
        onClick={handleSignInClick}
      />
    </div>
  );

  return (
    <div className="nav card">
      <Menubar className="menu" start={start} end={end} />
      <ul>
        {filteredDestinations.map((destination) => (
          <li key={destination.id}>{destination.destination_name}</li>
        ))}
      </ul>
    </div>
  );
}
