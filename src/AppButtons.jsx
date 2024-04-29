import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { CascadeSelect } from "primereact/cascadeselect";
import { Navigate, useNavigate } from "react-router-dom";
import "./AppButtons.css";
import { useCounter } from "primereact/hooks";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";
import { Link } from "react-router-dom";
import useApi from "./utils/http";
import { Dropdown } from "primereact/dropdown";
import useLocalStorage from "./hooks/useLocalStorage";

const AppButtons = () => {
  const [date, setDate] = useState(null); //date
  const [checkout, setCheckout] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [adult, setAdult] = useState();
  const [children, setChildren] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { setItem } = useLocalStorage();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );
  const api = useApi(token);
  const navigate = useNavigate();

  // form data
  const [check_in, setCheckIn] = useState([]);
  const [check_out, setCheckOut] = useState([]);
  const [destination_name, setDestination] = useState([]);
  const [number_of_guests, setGuestsNumber] = useState([]);
  const [tour_title, setTour] = useState("null");
  async function handleBooking(e) {
    console.log({ check_in, check_out, destination_name, number_of_guests });
    e.preventDefault();
    try {
      const body = {
        check_in,
        check_out,
        destination_name: destination_name.id,
        number_of_guests,
        tour_title: null,
        accommodation_name: null,
        user_id: user.id,
      };
      console.log(body);
      const { data } = await api.post("/bookings", body);
      console.log(data);
      navigate("/booking");
    } catch (e) {
      console.log(e);
      // // console.log(e.response.data.message);
      // return;
    }
  }

  useEffect(() => {
    fetchDestination();
  }, []);

  const fetchDestination = async () => {
    try {
      const response = await api.get("/destinations");

      setSelectedDestination(response.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      return;
    }
  };

  const handleSelectDestination = (e) => {
    setSelectedDestination({
      ...selectedDestination,
      destination_name: e.target.value,
    });
  };

  async function hangleBooknow(e) {
    e.preventDefault();
  }

  // useEffect(() => {
  //   getDestination();
  // }, []);

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/register");
  //   }

  //   return () => {};
  // }, []);

  return (
    <div className="NavButtons">
      <form className="booking" onSubmit={handleBooking}>
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
              value={check_in}
              onChange={(e) => setCheckIn(e.value)}
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
              onChange={(e) => setCheckOut(e.value)}
            />
            <label htmlFor="travel_date">Check-out Date</label>
          </span>
        </div>

        <div className="card flex justify-content-center">
          <Dropdown
            value={destination_name}
            onChange={(e) => setDestination(e.value)}
            options={selectedDestination}
            optionLabel="destination_name"
            placeholder="Select your Destination"
            className="w-full md:w-14rem"
          />
        </div>

        <div className="card flex justify-content-center">
          <FloatLabel>
            <InputNumber
              id="number-input"
              value={number_of_guests}
              onValueChange={(e) => setGuestsNumber(e.value)}
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
        <div className=" flex justify-content-center">
          <Button
            id="ButtonS"
            label="Book now!"
            icon="pi pi-user"
            iconPos="right"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AppButtons;
