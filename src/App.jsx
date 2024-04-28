import React from "react";
import Navigation from "./Navigation";
import { Routes, Route } from "react-router-dom";
import AppHeader from "./AppHeader";
import PopularDes from "./PopularDes";
import AppFooter from "./Footer";
import Register from "./components/Register"; // Import the Register component
import Signin from "./components/Signin";
import Booking from "./pages/Booking.jsx";
import { useLocation } from "react-router-dom";
import TablesBtn from "./TablesBtn";

const App = () => {
  const location = useLocation();
  const isSigninPage = location.pathname === "/signin";
  const isRegisterPage = location.pathname === "/register";
  const bookingPage = location.pathname === "/booking";

  return (
    <div>
      {isSigninPage ||
      isRegisterPage ||
      location.pathname === "/booking" ? null : (
        <Navigation />
      )}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
      {isSigninPage ||
      isRegisterPage ||
      location.pathname === "/booking" ? null : (
        <AppHeader />
      )}
      {isSigninPage ||
      isRegisterPage ||
      location.pathname === "/booking" ? null : (
        <PopularDes />
      )}
      {isSigninPage ||
      isRegisterPage ||
      location.pathname === "/booking" ? null : (
        <TablesBtn />
      )}
      {isSigninPage ||
      isRegisterPage ||
      location.pathname === "/booking" ? null : (
        <AppFooter />
      )}
    </div>
  );
};

export default App;
