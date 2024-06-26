import axiosInstance from "../plugins/axios/index";
import { StudentFormData } from "../types/formData";

export const addStudent = async (formData: StudentFormData) => {
  return await axiosInstance.post("/add_student", formData);
};
