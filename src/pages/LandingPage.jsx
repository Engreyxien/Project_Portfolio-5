// LandingPage.js

import React from "react";
import Navigation from "../Navigation";
import AppHeader from "../AppHeader";
import PopularDes from "../PopularDes";
import AppFooter from "../Footer";
import TablesBtn from "../TablesBtn";

const LandingPage = () => {
  return (
    <div>
      <Navigation />
      <AppHeader />
      <PopularDes />
      <TablesBtn />
      <AppFooter />
    </div>
  );
};

export default LandingPage;
