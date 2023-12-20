import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000,
});

export default instance;
