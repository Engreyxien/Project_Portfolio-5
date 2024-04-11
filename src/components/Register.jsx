import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Route } from "react-router-dom";
import { useApi } from "../utils/http";
import Navigation from "../Navigation";
import { Toast } from "primereact/toast";
import "./Register.css";

const Register = () => {
  const toast = useRef(null); // Use useRef here

  const show = () => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: "User Added Successfully",
    });
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    country: "Philippines",
  });
  const [countries, setCountries] = useState([]);

  const api = useApi();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("country.php");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [api]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (e) => {
    setFormData({
      ...formData,
      country: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/tours-db/user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email_address: formData.email,
          password: formData.password,
          fullname: formData.fullName,
          country_name: formData.country, // Make sure this matches the expected field name
        }),
      });

      if (response.ok) {
        const data = await response.json();
        show(); // Call the show function to display the Toast
        console.log("User added successfully:", data);
        // Handle success response here (e.g., show a success message)
      } else {
        console.error("Failed to add user:", response.statusText);
        // Handle error response here (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle any network or other errors here
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} id="form">
        <label htmlFor="username">Username:</label>
        <InputText
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email Address:</label>
        <InputText
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="fullName">Full Name:</label>
        <InputText
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <InputText
          id="password"
          name="password"
          type="password" // This line ensures it's a password input
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="country">Select Country:</label>
        <Dropdown
          id="country"
          optionLabel="country_name"
          optionValue="country_name"
          value={formData.country}
          onChange={handleCountryChange}
          options={countries}
        />
        <Toast ref={toast} />
        <Button
          id="Button"
          label=" Register"
          icon="pi pi-user-plus"
          iconPos="right"
          severity="success"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Register;
