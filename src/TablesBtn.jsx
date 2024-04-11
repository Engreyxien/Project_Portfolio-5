import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import useApi from "./utils/http";

const TablesBtn = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const api = useApi();
  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [tour, setTour] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5); // Number of rows per page

  async function getDestination() {
    const { data } = await api.get("/destination.php");
    setDestination(data);
  }

  async function getCity() {
    const { data } = await api.get("/citymun.php");
    setCity(data);
  }

  async function getProvince() {
    const { data } = await api.get("/provinces.php");
    setProvince(data);
  }

  async function getTour() {
    const { data } = await api.get("/tour.php");
    setTour(data);
  }

  useEffect(() => {
    getDestination();
    getCity();
    getProvince();
    getTour();
  }, []);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div className="card flex flex-wrap justify-content-center gap-3">
      <div className="buttons">
        <Button onClick={() => setSelectedRoute("Destination")}>
          Show Destination
        </Button>
        <Button onClick={() => setSelectedRoute("City")}>Show City</Button>
        <Button onClick={() => setSelectedRoute("Province")}>
          Show Province
        </Button>
        <Button onClick={() => setSelectedRoute("Tour")}>Show Tour</Button>
      </div>
      <div className="table">
        {selectedRoute === "Destination" && (
          <>
            <DataTable
              value={destination}
              first={first}
              rows={rows}
              paginator
              rowsPerPageOptions={[5, 10, 15]}
              onPage={onPageChange}
              tableStyle={{ minWidth: "50rem" }}
              className={!destination ? "hidden" : ""}
            >
              <Column field="destination_name" header="Destination"></Column>
              <Column
                field="destination_description"
                header="Description"
              ></Column>
              <Column field="category" header="Province"></Column>
              <Column field="quantity" header="Tour"></Column>
            </DataTable>
          </>
        )}
        {selectedRoute === "City" && (
          <>
            <DataTable
              value={city}
              first={first}
              rows={rows}
              paginator
              rowsPerPageOptions={[5, 10, 15]}
              onPage={onPageChange}
              tableStyle={{ minWidth: "50rem" }}
              className={!city ? "hidden" : ""}
            >
              <Column field="citymun_name" header="City"></Column>
              <Column field="reg_code" header="Region Code"></Column>
              <Column field="prov_code" header="Province Code"></Column>
              <Column field="quantity" header="Tour"></Column>
            </DataTable>
          </>
        )}
        {selectedRoute === "Province" && (
          <>
            <DataTable
              value={province}
              first={first}
              rows={rows}
              paginator
              rowsPerPageOptions={[5, 10, 15]}
              onPage={onPageChange}
              tableStyle={{ minWidth: "50rem" }}
              className={!province ? "hidden" : ""}
            >
              <Column field="province_name" header="Province"></Column>
              <Column field="reg_code" header="Regional Code"></Column>
              <Column field="prov_code" header="Provincial Code"></Column>
            </DataTable>
          </>
        )}
        {selectedRoute === "Tour" && (
          <>
            <DataTable
              value={tour}
              first={first}
              rows={rows}
              paginator
              rowsPerPageOptions={[5, 10, 15]}
              onPage={onPageChange}
              tableStyle={{ minWidth: "50rem" }}
              className={!tour ? "hidden" : ""}
            >
              <Column field="tour_title" header="Tour Name"></Column>
              <Column
                field="tour_description"
                header="Tour Description"
              ></Column>
              <Column field="tour_price" header="Price"></Column>
            </DataTable>
          </>
        )}
      </div>
    </div>
  );
};

export default TablesBtn;
