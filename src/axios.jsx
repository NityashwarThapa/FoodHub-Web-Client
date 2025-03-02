import axios from "axios";

// console.log("token", localStorage.getItem("_hw_token"));

const accessToken = localStorage.getItem("_hw_token");

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URI,
  withCredentials: true,
  headers: {
    Authorization: accessToken,
  },
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("_hw_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});


export default instance;
