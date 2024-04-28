import React from "react";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import useApi from "../utils/http";

function Province() {
  const api = useApi();
  const [province, setProvince] = useState("");
  const [value, setValue] = useState("");
  const [searchProvince, setSearchProvince] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await api.get("/provinces");
      console.log(response);
      if ((response.status = 200)) {
        const data = response.data;

        const filteredProvince = data.filter((province) =>
          province.province_name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchProvince(filteredProvince);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProvince();
  }, []);

  async function getProvince() {
    const { data } = await api.get("/provinces");
    setProvince(data);
    setSearchProvince(data);
  }

  return (
    <div>
      <div className="card">
        <form onSubmit={handleSearch}>
          <InputText value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
        <div></div>
        <DataTable
          value={searchProvince}
          paginator
          rows={10}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="province_name" header="Provinces"></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Province;
