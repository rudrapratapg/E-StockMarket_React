import axios from "axios";

const HOST="http://localhost:";
const PORT='8080';
const URL = HOST+PORT;
export default axios.create({
    baseUrl: URL
    //'http://localhost:8080'
    //HOST+PORT
});
{/**
export const axios = axiosRef.create({
  baseUrl: HOST+PORT
});
export default axios.create({
    baseUrl: HOST+PORT
});
*/}

// utils/API.js
