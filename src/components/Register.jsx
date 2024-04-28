import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../utils/http";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import "./Register.css";
import useLocalStorage from "../hooks/useLocalStorage";

function Register() {
  const { setItem } = useLocalStorage();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const [country_name, setSelectedCountry] = useState("");
  const [countries, getCountries] = useState("");
  const api = useApi();
  const navigate = useNavigate();
  const toast = useRef(null);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const body = {
        first_name,
        last_name,
        email_address,
        username,
        password,
        password_confirmation,
        profile_picture,
        country_name,
      };
      const { data } = await api.post(
        "https://capstone-kodego-laravel.onrender.com/api/register",
        body
      );
      setItem("token", data.token);
      setItem("user", JSON.stringify(data.user));
      navigate("/");
      navigate(0);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/api/countries");
        getCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, [api]);

  const handleCountryChange = (e) => {
    getCountries({
      ...countries,
      country_name: e.target.value,
    });
  };

  // const Register = (token = null) => {
  //   const navigate = useNavigate();
  //   const location = useLocation(); // Use the useLocation hook
  //   const toast = useRef(null);

  //   const showSuccessToast = () => {
  //     toast.current.show({
  //       severity: "success",
  //       summary: "Success",
  //       detail: "User added successfully",
  //     });
  //   };

  //   const [formData, setFormData] = useState({
  //     username: "",
  //     email: "",
  //     password: "",
  //     fullName: "",
  //     country: "Philippines",
  //   });
  //   const [countries, setCountries] = useState([]);

  //   const api = useApi();

  //   useEffect(() => {
  //     const fetchCountries = async () => {
  //       try {
  //         const response = await api.get("/api/countries");
  //         setCountries(response.data);
  //       } catch (error) {
  //         console.error("Error fetching countries:", error);
  //       }
  //     };

  //     fetchCountries();
  //   }, [api]);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   };

  //   const handleCountryChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       country: e.target.value,
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch(
  //         "https://capstone-kodego-laravel.onrender.com/api/register",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             username: formData.username,
  //             email_address: formData.email,
  //             password: formData.password,
  //             fullname: formData.fullName,
  //             country_name: formData.country,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         showSuccessToast();
  //         console.log("User added successfully:", data);
  //         setTimeout(() => {
  //           navigate("/dashboard");
  //         }, 2000);
  //       } else {
  //         console.error("Failed to add user:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error adding user:", error);
  //       // Handle any network or other errors here
  //     }
  //   };

  return (
    <div>
      <Navigation />
      <div className="register-form">
        <div className="RegHolder">
          <h2>Register</h2>
          <form onSubmit={handleRegister} id="form">
            <label htmlFor="FirstName">First Name:</label>
            <InputText
              id="FirstName"
              name="firstName"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="LastName">Last Name:</label>
            <InputText
              id="LastName"
              name="lastName"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="email">Email Address:</label>
            <InputText
              id="email"
              name="email"
              value={email_address}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <label htmlFor="UserName">Username:</label>
            <InputText
              id="UserName"
              name="userName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <InputText
              id="password"
              name="password"
              type="password" // This line ensures it's a password input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="Confirm">Confirm Password:</label>
            <InputText
              id="Confirm"
              name="Confirm"
              type="password" // This line ensures it's a password input
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <label htmlFor="Profile">Profile Picture:</label>
            <InputText
              id="Profile"
              name="Profile"
              value={profile_picture}
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
            <label htmlFor="Country">Country:</label>
            <div className="card flex justify-content-center">
              <Dropdown
                value={country_name}
                id="Country"
                onChange={(e) => setSelectedCountry(e.target.value)}
                options={countries}
                optionLabel="country_name"
                placeholder="Select a Country"
                className="w-full md:w-14rem"
              />
            </div>
          </form>
          <Button
            id="Reg"
            label=" Register"
            icon="pi pi-user-plus"
            iconPos="right"
            severity="success"
            onClick={handleRegister}
          />
          <Toast ref={toast} position="top-right" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
