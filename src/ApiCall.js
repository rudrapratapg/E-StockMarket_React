import axios from "axios";
import { base_address } from "./url.js";

const REGISTER_COMPANY= base_address+"/companyledger/registerCompany";
const REGISTER_STOCK= base_address+"/stockledger/registerStock";
const GET_ALL_COMPANY= base_address+"/companyledger/getAllCompanies/";
const GET_COMPANY= base_address+"/companyledger/getCompany/";
const CHECK_COMPANY_CODE =  base_address+"/companyledger/checkCompanyCode/";
const DELETE_COMPANY= base_address+"/companyledger/deleteCompany/";
const GET_STOCKS= base_address+"/stockledger/getStocks";
const DELETE_STOCK= base_address+"/stockledger/deleteStock";
const DELETE_ALL_STOCK= base_address+"/stockledger/deleteAllStocks";
const REGISTER_USER = base_address+"/userservice/registerUser";
const LOGIN_USER = base_address+"/userservice/loginUser";

export function checkCompanyCode(companyCode){
    return axios.get(CHECK_COMPANY_CODE, {
        params: {
          companyCode: companyCode
        },
        headers: {
          'x-access-token': 'token-value'
        }
      });
}
export function registerCompany(payload){
    {/* 
    return axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: GET_ALL_COMPANY,
      });
    */}
    return axios.post(REGISTER_COMPANY,payload);
}
export function getAllCompanies(){
    {/*
    return axios({
        method: "get",
        headers: { "Content-Type": "application/json" },
        url: GET_ALL_COMPANY,
    });
    */}
    return axios.get(GET_ALL_COMPANY);
}
export function getCompany(companyCode){
    {/*
    return axios({
        method: "get",
        headers: { "Content-Type": "application/json" },
        url: GET_COMPANY+'/'+companyCode,
    });
    */}
    return axios.get(GET_COMPANY,{
        params: {
          companycode: companyCode
        },
        headers: {
          'x-access-token': 'token-value'
        }
      });
}
export function deleteCompany(companyCode){
    return axios({
        method: "delete",
        headers: { "Content-Type": "application/json" },
        url: DELETE_COMPANY+'/'+companyCode,
      });
}
export function getAllStocks(companyCode){
    return axios({
        method: "get",
        headers: { "Content-Type": "application/json" },
        url: GET_STOCKS+'/'+companyCode,
      });
}
export function deleteStock(companyCode, stockId){
    return axios({
        method: "delete",
        headers: { "Content-Type": "application/json" },
        url: DELETE_STOCK+'/'+companyCode+'/'+stockId,
      });
}
export function deleteAllStocks(companyCode){
    return axios({
        method: "delete",
        headers: { "Content-Type": "application/json" },
        url: DELETE_ALL_STOCK+'/'+companyCode,
      });
}

export const registerUserApi=(payload)=>{
  return axios.post(REGISTER_USER,payload);
}

export const loginUserApi=(payload)=>{
  return axios.post(LOGIN_USER,payload);
}