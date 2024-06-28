import axiosInstance from "../plugins/axios/index";

export const getStudents = async (userId: number | undefined) => {
  return await axiosInstance.get(`/students/${userId}`);
};

export const getEntrantStudents = async (userId: number | undefined) => {
  return await axiosInstance.get(`/entrant_students/${userId}`);
};

export const getAbroadStudents = async (userId: number | undefined) => {
  return await axiosInstance.get(`/abroad_students/${userId}`);
};

export const getTotalStudents = async (userId: number | undefined) => {
  return await axiosInstance.get(`/total_students/${userId}`);
};
