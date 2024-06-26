import axiosInstance from "../plugins/axios/index";

export const addStudent = async (formData: any) => {
  return await axiosInstance.post("/add_student", formData);
};
