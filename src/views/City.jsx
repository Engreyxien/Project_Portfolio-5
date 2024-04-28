import React from "react";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import useApi from "../utils/http";

function City() {
  const api = useApi();
  const [city, setCity] = useState("null");
  const [value, setValue] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await api.get("/api/citymuns");

      if ((response.status = 200)) {
        const data = response.data;
        console.log(data);
        const filteredCity = data.filter((city) =>
          city.citymun_name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchCity(filteredCity);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCity();
  }, []);

  async function getCity() {
    const { data } = await api.get("/citymuns");
    console.log(data);
    setCity(data);
    setSearchCity(data);
  }

  const onRowEditComplete = (e) => {
    let _city = [...city];
    let { newData, index } = e;

    _city[index] = newData;

    setCity(_city);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  return (
    <div>
      <div className="card">
        <form onSubmit={handleSearch}>
          <InputText value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
        <div></div>
        <DataTable
          value={searchCity}
          paginator
          rows={10}
          editMode="row"
          dataKey="id"
          onRowEditComplete={onRowEditComplete}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="citymun_name" header="City"></Column>
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

export default City;
