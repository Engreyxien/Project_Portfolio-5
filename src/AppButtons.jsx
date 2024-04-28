import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { CascadeSelect } from "primereact/cascadeselect";
import "./AppButtons.css";
import { useCounter } from "primereact/hooks";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Link } from "react-router-dom";
import useApi from "./utils/http";
import { Dropdown } from "primereact/dropdown";

const AppButtons = () => {
  const api = useApi();

  const [date, setDate] = useState(null); //date
  const [checkout, setCheckout] = useState("");
  const [destination, getDestination] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [adult, setAdult] = useState();
  const [children, setChildren] = useState();

  async function hangleBooknow(e) {
    e.preventDefault();
  }

  // async function getDestination() {
  //   const { data } = await api.get("api/destinations");
  //   // console.log(data);
  //   destination(data);
  // }

  // useEffect(() => {
  //   getDestination();
  // }, []);

  return (
    <div className="NavButtons">
      <form className="booking">
        <div className="card flex justify-content-center">
          <span className="p-float-label">
            <Calendar
              id="travel_date"
              inputId="travel_date"
              tooltip="Choose your travel date"
              tooltipOptions={{
                position: "bottom",
                mouseTrack: true,
                mouseTrackTop: 20,
              }}
              value={date}
              onChange={(e) => setDate(e.value)}
            />
            <label htmlFor="travel_date">Travel Date</label>
          </span>
        </div>
        <div className="card flex justify-content-center">
          <span className="p-float-label">
            <Calendar
              id="travel_date"
              inputId="travel_date"
              tooltip="Choose your Check-out date"
              tooltipOptions={{
                position: "bottom",
                mouseTrack: true,
                mouseTrackTop: 15,
              }}
              value={checkout}
              onChange={(e) => setCheckout(e.value)}
            />
            <label htmlFor="travel_date">Check-out Date</label>
          </span>
        </div>

        {/* <div className="card flex justify-content-center">
          <Dropdown
            value={destination}
            onChange={(e) => setSelectedDestination(e.value)}
            options="destination_name"
            optionLabel="name"
            placeholder="Select a City"
            className="w-full md:w-14rem"
          />
        </div> */}

        <div className="card flex justify-content-center">
          <FloatLabel>
            <InputNumber
              id="number-input"
              value={children}
              onValueChange={(e) => setChildren(e.value)}
              tooltip="Put the number of Guest"
              tooltipOptions={{
                position: "bottom",
                mouseTrack: true,
                mouseTrackTop: 15,
              }}
            />
            <label htmlFor="number-input">Number of guest</label>
          </FloatLabel>
        </div>
      </form>
      <div className=" flex justify-content-center">
        <Link to="/booking">
          <Button
            id="ButtonS"
            label="Book now!"
            icon="pi pi-user"
            iconPos="right"
          />
        </Link>
      </div>
    </div>
  );
};

export default AppButtons;
