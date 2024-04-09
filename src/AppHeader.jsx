import { Fieldset } from "primereact/fieldset";
import AppButtons from "./AppButtons";
import React from "react";
import "./AppHeader.css";

const AppHeader = () => {
  return (
    <div className="HeaderHero ard">
      <Fieldset className="LOGO" legend="TOUR'rest">
        <p className="headText m-0">
          Let us guide you for your next destination..
        </p>
      </Fieldset>
      <AppButtons />
    </div>
  );
};

export default AppHeader;
