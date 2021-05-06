import axios from "axios";

axios.defaults.withCredentials = true

const axiosConfig = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default axiosConfig;
