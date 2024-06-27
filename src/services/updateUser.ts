import axiosInstance from "../plugins/axios/index";
import { User } from "../types/User";

export const updateUser = async (
  userId: number | undefined,
  updatedData: User
) => {
  return await axiosInstance.put(`/api/auth/${userId}`, updatedData);
};
