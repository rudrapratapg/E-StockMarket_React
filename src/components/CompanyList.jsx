import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getAllCompanies } from "../ApiCall";
import { Alert, Box, Card, CardContent, Paper, Snackbar } from "@mui/material";
import DataTable from "./DataTable";

const columns = [
  {
    field: "id",
    headerName: "ID", //width: 90
    flex: 2,
  },
  {
    field: "companyName",
    headerName: "Company name", //width: 130
    flex: 2,
  },
  {
    field: "stockPrice",
    headerName: "Stock Price", //width: 130
    flex: 2,
  },
  {
    field: "date",
    headerName: "Date",
    type: "date",
    //width: 90,
    flex: 2,
  },
  {
    field: "time",
    headerName: "Time",
    type: "time",
    flex: 2,
    //width: 90,
  },
];

const data = require("./../data/stocks.json");
const rows = data?.stocks;
/*
[
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
*/
const CompanyList = () => {
  //const [rows, setRows] = useState(data?.stocks);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    console.log("stocks :: ", rows);
    getAllCompanies()
      .then((resp) => {
        console.log("Resp => ", resp);
        //setRows(resp.data);
      })
      .catch((err) => {
        console.error("error => ", err);
      });
    return () => {
      console.log("bye bye from list");
    };
  }, []);

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={setOpenAlert}>
        <Alert onClose={setOpenAlert} severity="error" sx={{ width: "100%" }}>
          Something went wrong!
        </Alert>
      </Snackbar>
      
      <DataTable rows={rows} columns={columns}/>
    </>
  );
};

export default CompanyList;
