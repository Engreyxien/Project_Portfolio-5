import React from "react";
import Navigation from "./Navigation";
import { Routes, Route } from "react-router-dom";
import AppHeader from "./AppHeader";
import PopularDes from "./PopularDes";
import AppFooter from "./Footer";
import Register from "./components/Register"; // Import the Register component
import Signin from "./components/Signin";
import { useLocation } from "react-router-dom";
import TablesBtn from "./TablesBtn";

const App = () => {
  const location = useLocation();
  const isSigninPage = location.pathname === "/signin";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div>
      {isSigninPage || isRegisterPage ? null : <Navigation />}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />{" "}
        {/* Render the Register component when the path is "/register" */}
      </Routes>
      {isSigninPage || isRegisterPage ? null : <AppHeader />}
      {isSigninPage || isRegisterPage ? null : <PopularDes />}
      {isSigninPage || isRegisterPage ? null : <TablesBtn />}
      {isSigninPage || isRegisterPage ? null : <AppFooter />}
    </div>
  );
};

export default App;
