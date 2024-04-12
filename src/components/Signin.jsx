import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./Signin.css";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const toast = useRef(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost/tours-db/user.php", {
        username,
        password,
      });

      if (response.status === 200) {
        if (toast.current) {
          toast.current.show({
            severity: "success",
            summary: "Login Success",
            detail: "You have successfully logged in",
          });
        }
        setIsLoggedIn(true);
        setLoggedInUser(username);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
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
      <Navigation />
      <div className="login-form">
        {!isLoggedIn ? (
          <>
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
            <div style={{ textAlign: "center" }}>
              <Button
                label="Login"
                icon="pi pi-sign-in"
                onClick={handleLogin}
              />
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
      <Footer />
    </div>
  );
};

export default Signin;
