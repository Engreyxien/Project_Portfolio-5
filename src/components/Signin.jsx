import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Signin.css";
import Navigation from "../Navigation";
import Footer from "../Footer";
import useApi from "../utils/http";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const toast = useRef(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const api = useApi();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.status === 200) {
        if (toast.current) {
          toast.current.show({
            severity: "success",
            summary: "Login Success",
            detail: "You have successfully logged in",
          });
        }
        localStorage.setItem("token", response.data.token); // Store the token in local storage(token)
        setIsLoggedIn(true);
        setLoggedInUser(username);
        // setTimeout(() => {
        //   // navigate("/");
        //   // navigate(0);
        // }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditDestination = async (destinationId, updatedData) => {
    try {
      const response = await axios.put(
        `http://your-api-url/edit-destination/${destinationId}`,
        updatedData
      );
      if (response.status === 200) {
        //
        console.log("Destination edited successfully!");
      } else {
        setError("Failed to edit destination. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="holder">
        <Navigation />
        <Card>
          <div className="login-form">
            {!isLoggedIn ? (
              <>
                <div></div>
                <h2>Login</h2>
                <div className="field">
                  <div>
                    <label htmlFor="username">Username:</label>
                    <InputText
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div>
                    <label htmlFor="password">Password:</label>
                    <InputText
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="logOrRegister">
                  <div style={{ textAlign: "center" }}>
                    <Button
                      label="Login"
                      icon="pi pi-sign-in"
                      onClick={handleLogin}
                    />
                  </div>

                  <Link to={"/register"}>
                    <div style={{ textAlign: "center" }}></div>
                    <Button label="Register" icon="pi pi-sign-in" />
                  </Link>
                </div>
                {error && <div>{error}</div>}
                <Toast ref={toast} position="top-right" />
              </>
            ) : (
              <>
                <div>Welcome, {loggedInUser}</div>
                {/* Add your main content here after login */}
              </>
            )}
          </div>
        </Card>

        <Footer />
      </div>
    </div>
  );
};

export default Signin;
