import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    country: "Philippines",
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  fetch("country.php")
    .then((response) => response.json())
    .then((data) => {
      const countrySelect = document.getElementById("country_name");
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.country_name;
        option.textContent = country.country_name;
        countrySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
    });

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
