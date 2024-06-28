import axiosInstance from "../plugins/axios/index";

export const registerUser = async (
  email: string,
  password: string,
  first_name: string,
  last_name: string
) => {
  return await axiosInstance.post("/api/auth/register", {
    email,
    password,
    first_name,
    last_name,
  });
};

export const verifyUser = async (email: string, verificationCode: string) => {
  const response = await axiosInstance.get("/api/auth/verify", {
    params: {
      email,
      verificationCode,
    },
  });
  return response.data;
};
