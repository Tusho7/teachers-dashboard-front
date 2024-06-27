import axiosInstance from "../plugins/axios/index";

export const destroyStudent = async (studentId: number) => {
  return await axiosInstance.delete(`/students/${studentId}`);
};
