import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation separately
import { useApi } from "../utils/http";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { Toast } from "primereact/toast";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use the useLocation hook
  const toast = useRef(null);

  const showSuccessToast = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "User added successfully",
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
          country_name: formData.country,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        showSuccessToast();
        console.log("User added successfully:", data);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        console.error("Failed to add user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle any network or other errors here
    }
  };

  return (
    <div>
      <Navigation />
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
          <Button
            id="Button"
            label=" Register"
            icon="pi pi-user-plus"
            iconPos="right"
            severity="success"
            onClick={handleSubmit}
          />
        </form>
        <Toast ref={toast} position="top-right" />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
