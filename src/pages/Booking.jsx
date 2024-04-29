import React from "react";
import Navigation from "../Navigation";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import useApi from "../utils/http";

const Booking = () => {
  const [bookings, setBookings] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [visible, setVisible] = useState(false);
  // const [id, setId] = useState("");
  const navigate = useNavigate();
  const api = useApi(token);
  // console.log(bookings);
  // function userId() {
  //   const idNum = user.id;
  //   setId(idNum);
  // }

  useEffect(() => {
    if (!token) {
      navigate("/register");
    }
    getBookings();
    // userId();
    return () => {};
  }, []);

  async function getBookings() {
    const { data } = await api.get("/bookings");

    setBookings(data.data);
  }

  function editBookings() {
    setVisible(true);
  }

  async function saveEditBookings(e) {
    e.preventDefault();
    try {
      const body = {
        check_in: editCheckIn,
        check_out: editCheckOut,
        destination_name: editDestinationName,
        number_of_guests: editNumberOfGuests,
        tour_name: editTourName,
        accommodation_name: editAccommodationName,
        user_id: user.id,
      };
      const { data } = await api.get(`/bookings/${editId}`, body);
    } catch (error) {}
  }
  const actionBodyTemplate = () => {
    return <></>;
  };

  return (
    <div>
      <Navigation />
      <h2>Your booking</h2>

      <div className="card">
        <DataTable value={bookings} tableStyle={{ minWidth: "50rem" }}>
          <Column field="destination_name" header="Destination"></Column>
          <Column field="accommodation_name" header="Accommodation"></Column>
          <Column field="number_of_guests" header="Number of guest"></Column>
          <Column field="tour_name" header="Tour"></Column>
          <Column field="check_in" header="Check-in"></Column>
          <Column field="check_out" header="Check-out"></Column>
          <Column style={{ minWidth: "12rem" }}>
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-warning p-mr-2"
              onClick={() => editBookings()}
            />
          </Column>
          {/* <Dialog
            header="Edit Destination"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
            <form onSubmit={saveEditBookings}>
              <InputText
                defaultValue={bookings}
                placeholder={bookings}
                // onChange={(e) => setEditDestinationData(e.target.value)}
              />

              <Button label="Submit" />
            </form>
          </Dialog> */}
        </DataTable>
      </div>
    </div>
  );
};

export default Booking;
