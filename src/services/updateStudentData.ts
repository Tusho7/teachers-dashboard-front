import axiosInstance from "../plugins/axios/index";
import { EditStudent } from "../types/editStudent";

export const updateStudentData = async (
  studentId: number,
  updatedData: EditStudent
) => {
  return await axiosInstance.put(`/update_student/${studentId}`, updatedData);
};
