import axiosInstance from "../plugins/axios/index";

export const getStudents = async () => {
  return await axiosInstance.get("/get_students");
};

export const getEntrantStudents = async () => {
  return await axiosInstance.get("/entrant_students");
};

export const getAbroadStudents = async () => {
  return await axiosInstance.get("/abroad_students");
};

export const getTotalStudents = async () => {
  return await axiosInstance.get("/total_students");
};
