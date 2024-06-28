import axiosInstance from "../plugins/axios/index";

export const forgotPassword = async (email: string) => {
  return await axiosInstance.post("/api/auth/forgot_password", { email });
};
