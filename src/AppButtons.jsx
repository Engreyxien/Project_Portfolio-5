import { useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { CascadeSelect } from "primereact/cascadeselect";
import "./AppButtons.css";
import { useCounter } from "primereact/hooks";

const AppButtons = () => {
  const [date, setDate] = useState(null); //date
  const { count, increment, decrement, reset } = useCounter(0);
  const [selectedCity, setSelectedCity] = useState(null); //countries
  const countries = [
    {
      name: "Luzon",
      code: "AU",
      states: [
        {
          name: "New South Wales",
          cities: [
            { cname: "Sydney", code: "A-SY" },
            { cname: "Newcastle", code: "A-NE" },
            { cname: "Wollongong", code: "A-WO" },
          ],
        },
        {
          name: "Queensland",
          cities: [
            { cname: "Brisbane", code: "A-BR" },
            { cname: "Townsville", code: "A-TO" },
          ],
        },
      ],
    },
    {
      name: "Visayas",
      code: "CA",
      states: [
        {
          name: "Quebec",
          cities: [
            { cname: "Montreal", code: "C-MO" },
            { cname: "Quebec City", code: "C-QU" },
          ],
        },
        {
          name: "Ontario",
          cities: [
            { cname: "Ottawa", code: "C-OT" },
            { cname: "Toronto", code: "C-TO" },
          ],
        },
      ],
    },
    {
      name: "Mindanao",
      code: "US",
      states: [
        {
          name: "California",
          cities: [
            { cname: "Los Angeles", code: "US-LA" },
            { cname: "San Diego", code: "US-SD" },
            { cname: "San Francisco", code: "US-SF" },
          ],
        },
        {
          name: "Florida",
          cities: [
            { cname: "Jacksonville", code: "US-JA" },
            { cname: "Miami", code: "US-MI" },
            { cname: "Tampa", code: "US-TA" },
            { cname: "Orlando", code: "US-OR" },
          ],
        },
        {
          name: "Texas",
          cities: [
            { cname: "Austin", code: "US-AU" },
            { cname: "Dallas", code: "US-DA" },
            { cname: "Houston", code: "US-HO" },
          ],
        },
      ],
    },
  ];
  return (
    <div className="NavButtons">
      <div className="card flex justify-content-center">
        <span className="p-float-label">
          <Calendar
            inputId="travel_date"
            value={date}
            onChange={(e) => setDate(e.value)}
          />
          <label htmlFor="travel_date">Travel Date</label>
        </span>
      </div>
      <div className="card flex justify-content-center">
        <CascadeSelect
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={countries}
          optionLabel="cname"
          optionGroupLabel="name"
          optionGroupChildren={["states", "cities"]}
          className="w-full md:w-14rem"
          breakpoint="767px"
          placeholder="Select a City"
          style={{ minWidth: "14rem" }}
        />
      </div>
      <div className=" flex justify-content-center">
        <Button id="searchBtn" label="Search" />
      </div>
    </div>
  );
};

export default AppButtons;
