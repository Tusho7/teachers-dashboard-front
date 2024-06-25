import axios from "axios";
import { handleNavigation } from "../../utils/navigation";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json" || "multipart/form-data",
    Accept: "application/json" || "multipart/form-data",
  },
});

instance.interceptors.request.use(
  async function (config) {
    if (config.method === "post" || config.method === "put") {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const status = error.response.status;
    console.log(error);
    if (status === 401) {
      localStorage.setItem("isLogin", "false");
      handleNavigation("/admin-login");
    }
    return Promise.reject(error);
  }
);

export default instance;
