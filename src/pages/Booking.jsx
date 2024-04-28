import React from "react";
import Navigation from "../Navigation";

const Booking = () => {
  return (
    <div>
      <Navigation />
      <h2>Your booking</h2>

      <div className="card">
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Booking;
