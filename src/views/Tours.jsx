import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useApi from "../utils/http";

function Tours() {
  const api = useApi();
  const [tours, setTours] = useState("");

  useEffect(() => {
    getTours();
  }, []);

  async function getTours() {
    const { data } = await api.get("/tours");
    setTours(data);
  }

  return (
    <div className="card">
      <DataTable value={tours} tableStyle={{ minWidth: "50rem" }}>
        <Column field="tour_title" header="Tours"></Column>
      </DataTable>
    </div>
  );
}

export default Tours;
