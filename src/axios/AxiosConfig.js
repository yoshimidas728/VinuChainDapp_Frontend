import axios from "axios";
const BASE_URL_API = "http://182.176.170.176:2500/api/v1";

const axiosConfig = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
// axiosConfig.defaults.headers.common["accept"] = "*/*"

// Add a request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosConfig;
