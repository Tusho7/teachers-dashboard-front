import axiosInstance from "../plugins/axios/index";

export const getStudents = async () => {
  return await axiosInstance.get("/get_students");
};
