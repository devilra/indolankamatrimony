import axios from "axios";

const API = axios.create({
  //baseURL: "http://localhost:4000/api",
  baseURL: "https://indolankamatrimony.onrender.com/api",
  withCredentials: true,
});

export default API;
