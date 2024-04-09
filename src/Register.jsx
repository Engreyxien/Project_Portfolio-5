import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import useApi from "./utils/http";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    country: "Philippines",
  });
  const [countries, setCountries] = useState([]);

  const api = useApi(); // Move the useApi hook inside the Register component

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("country.php"); // Use the api.get() method from useApi hook
        setCountries(response.data); // Assuming response.data contains the list of countries
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [api]); // Add api as a dependency to the useEffect hook

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data to be submitted:", formData);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="country">Select Country:</label>
        <Dropdown
          id="country"
          optionLabel="country_name"
          optionValue="country_name"
          value={formData.country}
          onChange={handleCountryChange}
          options={countries}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
