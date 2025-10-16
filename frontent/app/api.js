import axios from "axios";

const API = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT,
  baseURL: process.env.NEXT_PUBLIC_API_URL_PRODUCTION,
  withCredentials: true,
});

export default API;
