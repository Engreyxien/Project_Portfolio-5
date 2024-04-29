import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import useApi from "./utils/http";
import "./TablesBtn.css";

const TablesBtn = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [tour, setTour] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [visible, setVisible] = useState(false);
  const [destinationData, setDestinationData] = useState("");
  const [editDestinationData, setEditDestinationData] = useState([]);
  const [editDescription, setEditDescription] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const api = useApi(token);

  async function getDestination() {
    const { data } = await api.get("/destinations");
    // console.log(data);
    setDestination(data);
  }

  async function getCity() {
    const { data } = await api.get("/citymuns");
    setCity(data);
  }

  async function getProvince() {
    const { data } = await api.get("/provinces");
    setProvince(data);
  }
  async function getAccommodation() {
    const { data } = await api.get("/accommodations");
    setAccommodation(data);
  }
  async function getTour() {
    const { data } = await api.get("/tours");
    setTour(data);
  }

  useEffect(() => {
    getDestination();
    getCity();
    getProvince();
    getAccommodation();
    getTour();
  }, []);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  async function saveEdit(e) {
    e.preventDefault();
    try {
      const body = {
        destination_name: editDestinationData,
        destination_description: editDescription,
      };
      const { data } = await api.put(
        `/destination/${destinationData.id}`,
        body
      );
    } catch (error) {}
  }

  function editDestination(rowData) {
    setVisible(true);
    setDestinationData(rowData);
  }

  async function deleteDestination(rowData) {
    try {
      const { data } = await api.delete(`/destination/${rowData.id}`);
    } catch (error) {}
  }

  // console.log(destinationData.id);
  return (
    <div className="card flex flex-wrap justify-content-center gap-3">
      <div className="buttons">
        <Button
          className="TableBtn"
          onClick={() => setSelectedRoute("Destination")}
        >
          Destination
        </Button>
        <Button className="TableBtn" onClick={() => setSelectedRoute("City")}>
          City
        </Button>
        <Button
          className="TableBtn"
          onClick={() => setSelectedRoute("Province")}
        >
          Province
        </Button>
        <Button
          className="TableBtn"
          onClick={() => setSelectedRoute("Accommodation")}
        >
          Accommodation
        </Button>
        <Button className="TableBtn" onClick={() => setSelectedRoute("Tour")}>
          Tour
        </Button>
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
              <Column field="tour_id" header="Tour Code"></Column>
              <Column
                body={(rowData) => (
                  <div style={{ display: "flex" }}>
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-rounded p-button-warning p-1"
                      label="Add this destination"
                      onClick={() => {
                        const updatedDestination = {
                          ...rowData,
                          destinations_name: "New Name",
                        }; // Update with the new destination name
                        fetch(
                          `https://capstone-kodego-laravel.onrender.com/destinations${rowData.destinations_id}`,
                          {
                            method: "PUT",
                            body: JSON.stringify(updatedDestination),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        )
                          .then((response) => response.json())
                          .then((data) => {
                            // Handle the response data, update UI if needed
                            console.log("Destination updated:", data);
                          })
                          .catch((error) => {
                            console.error("Error updating destination:", error);
                          });
                      }}
                    />
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-rounded p-button-warning p-mr-2"
                      onClick={() => editDestination(rowData)}
                    />

                    <Dialog
                      header="Edit Destination"
                      visible={visible}
                      style={{ width: "50vw" }}
                      onHide={() => setVisible(false)}
                    >
                      {destinationData ? (
                        <form onSubmit={saveEdit}>
                          <InputText
                            defaultValue={destinationData.destination_name}
                            // placeholder={destinationData.destination_name}
                            onChange={(e) =>
                              setEditDestinationData(e.target.value)
                            }
                          />
                          <InputText
                            defaultValue={
                              destinationData.destination_description
                            }
                            // placeholder={
                            //   destinationData.destination_description
                            // }
                            onChange={(e) => setEditDescription(e.target.value)}
                          />
                          <Button label="Submit" />
                        </form>
                      ) : null}
                    </Dialog>
                    <Button
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-danger"
                      onClick={() => deleteDestination(rowData)}
                    />
                  </div>
                )}
              ></Column>
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

        {selectedRoute === "Accommodation" && (
          <>
            <DataTable
              value={accommodation}
              first={first}
              rows={rows}
              paginator
              rowsPerPageOptions={[5, 10, 15]}
              onPage={onPageChange}
              tableStyle={{ minWidth: "50rem" }}
              className={!accommodation ? "hidden" : ""}
            >
              <Column field="accommodation_name" header="Name"></Column>
              <Column
                field="accommodation_description"
                header=" Description"
              ></Column>
              <Column field="accommodation_address" header="Address"></Column>
              <Column field="accommodation_type" header="Type"></Column>
              <Column field="accommodation_price" header="Price"></Column>
              <Column field="contact_info" header="Contact"></Column>
              <Column
                body={(rowData) => (
                  <div style={{ display: "flex" }}>
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-rounded p-button-warning p-mr-2"
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-danger"
                    />
                    <Button
                      icon="pi pi-refresh"
                      className="p-button-rounded p-button-success p-ml-2"
                      onClick={() => {
                        const updatedAccommodation = {
                          ...rowData,
                          accommodation_name: "New Name",
                        };
                        fetch(
                          `http://localhost/tours-db/accommodation.php/${rowData.accommodation_id}`,
                          {
                            method: "PUT",
                            body: JSON.stringify(updatedAccommodation),
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        )
                          .then((response) => response.json())
                          .then((data) => {
                            // Handle the response data, update UI if needed
                            console.log("Accomodation updated:", data);
                          })
                          .catch((error) => {
                            console.error(
                              "Error updating accommodation:",
                              error
                            );
                          });
                      }}
                    />
                  </div>
                )}
              ></Column>
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
              <Column field="tour_id" header="Tour Code"></Column>
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
