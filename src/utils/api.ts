import axios from "axios";

export const API = axios.create({
  baseURL: "https://hiring-test.stag.tekoapis.net/api",
  responseType: "json",
});

export default API;
