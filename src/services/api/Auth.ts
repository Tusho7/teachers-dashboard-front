import axiosInstance from "../../plugins/axios/index.ts";
export const InitializeCSRFProtection = async () => {
  return await axiosInstance.get("/sanctum/csrf-cookie");
};
