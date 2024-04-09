import React from "react";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { AutoComplete } from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import useApi from "../utils/http";

function Destination() {
  const api = useApi();
  const [value, setValue] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [suggestedDestination, setSuggestedDestination] = useState(null);
  const [allowEdit, setAllowEdit] = useState(true); // Define allowEdit state

  // SUGGEST DESTINATION
  const suggest = async (event) => {
    try {
      const response = await api.get("/destination.php");
      const suggestData = response.data;
      console.log(suggestData);

      if (!event.query.trim().length) {
        setSuggestedDestination([destination_name]); // Update suggestedDestination state
        console.log(suggestedDestination);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // SEARCH DESTINATION
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await api.get("/destination.php");

      if (response.status === 200) {
        // Correct comparison operator
        const data = response.data;

        const filteredDestination = data.filter((destination) =>
          destination.destination_name
            .toLowerCase()
            .includes(value.toLowerCase())
        );
        setSearchDestination(filteredDestination);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDestination();
  }, []);

  async function getDestination() {
    const { data } = await api.get("/destination.php");

    setSearchDestination(data);
  }

  return (
    <div>
      <div className="card">
        <form onSubmit={handleSearch}>
          <AutoComplete
            value={value}
            suggestions={suggestedDestination}
            completeMethod={suggest}
            onChange={(e) => setValue(e.value)}
          />
        </form>
        <div></div>
        <DataTable
          value={searchDestination}
          paginator
          rows={10}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="destination_name" header="Destinations"></Column>
          <Column
            rowEditor={allowEdit}
            headerStyle={{ width: "10%", minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Destination;
