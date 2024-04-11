import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import Navbar from "../Navigation";
import "./Signin.css";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("user.php", { username, password });
      // handle response data
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-form">
        <div>
          <span>Username</span>
          <InputText
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <span>Password</span>
          <InputText
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button label="Login" onClick={handleLogin} />
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Signin;
