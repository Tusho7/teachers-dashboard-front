import axiosInstance from "../plugins/axios/index";

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

export const getMonthlyRevenue = async () => {
  return await axiosInstance.get("/monthly-revenue", {
    params: {
      month: currentMonth,
      year: currentYear,
    },
  });
};