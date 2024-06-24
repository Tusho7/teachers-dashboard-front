import axiosInstance from "../plugins/axios/index";

export const adminLogin = async (email: string, password: string) => {
  return await axiosInstance.post("/api/auth/login", { email, password });
};
