import axiosInstance from "../plugins/axios/index";

export const Logout = async () => {
  return await axiosInstance.post("/api/auth/logout");
};
