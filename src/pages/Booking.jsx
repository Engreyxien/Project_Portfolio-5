import React from "react";
import Navigation from "../Navigation";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useApi from "../utils/http";

const Booking = () => {
  const api = useApi();
  const [bookings, setBookings] = useState("");

  async function getBookings() {
    const { data } = await api.get("/api/bookings");
    console.log(data);
    setBookings(data);
  }

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      <Navigation />
      <h2>Your booking</h2>

      <div className="card">
        <DataTable value={bookings} tableStyle={{ minWidth: "50rem" }}>
          <Column field="destination_name" header="Destination"></Column>
          <Column field="Accommodation_name" header="Accommodation"></Column>
          <Column field="number_of_guest" header="Guest"></Column>
          <Column field="tour_name" header="Tour"></Column>
          <Column field="check_in" header="Check-in"></Column>
          <Column field="check_out" header="Check-out"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Booking;
