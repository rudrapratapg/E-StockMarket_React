import axios from "axios";
import { base_address } from "./url.js";

console.log('base_address :: ',base_address)
const estockKey = localStorage.getItem('estockKey');
var jwtToken = JSON.parse(estockKey)?.token || undefined;

const instance = axios.create({
        baseUrl: base_address
        //'http://localhost:8080'
        //HOST+PORT
    },{
        header:{

        }
    }
);

instance.defaults.headers.common['Authorization'] = jwtToken;
export default instance;