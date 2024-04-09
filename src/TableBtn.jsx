import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useApi from "./utils/http";

function TableBtn() {
  const api = useApi();
  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    getDestination();
    getCity();
  }, []);

  async function getDestination() {
    const { data } = await api.get("/destination.php");
    setDestination(data);
    console.log(data);
  }

  async function getCity() {
    const { data } = await api.get("/citymun.php");
    setCity(data);
  }

  return (
    <div className="card">
      <DataTable value={destination} tableStyle={{ minWidth: "50rem" }}>
        <Column field="destination_name" header="Destination"></Column>
        <Column field="citymun_name" header="City"></Column>
        <Column field="category" header="Province"></Column>
        <Column field="quantity" header="Tour"></Column>
      </DataTable>
    </div>
  );
}

export default TableBtn;
