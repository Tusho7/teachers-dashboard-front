import { useState, useEffect } from "react";
import ChartData from "../components/Chart";
import { getTotalStudents } from "../services/getStudents";
import { MonthlyRevenueData } from "../types/monthlyRevenueProps";
import { getMonthlyRevenue } from "../services/getMonthlyRevue";
import HamburgerIcon from "../assets/hamburger.png";
import Navigation from "../components/Navigation";
import { Logout } from "../services/Logout";
import DropDownMenu from "../components/DropDownMenu";
import MonthlyRevenue from "../components/MonthlyRevenue";

const Home = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] =
    useState<MonthlyRevenueData | null>(null);
  const [isDropDown, setIsDropDown] = useState(false);

  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await getTotalStudents();
        setTotalStudents(response.data);
      } catch (error) {
        console.error("Error fetching total students:", error);
      }
    };

    fetchTotalStudents();
  }, []);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await getMonthlyRevenue();
        setMonthlyRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      }
    };

    fetchMonthlyRevenue();
  }, []);

  const toggleDropDown = () => {
    setIsDropDown(!isDropDown);
  };

  const handleLogout = () => {
    try {
      Logout();
      localStorage.clear();
      window.location.href = "/admin-login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen ">
      <Navigation handleLogout={handleLogout} />

      <div className="flex-1 bg-white max-w-[1900px] mx-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-10 2xl:hidden">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome to Dashboard
            </h2>
            <img
              src={HamburgerIcon}
              alt="hamburger"
              className="w-10 h-10 cursor-pointer"
              onClick={toggleDropDown}
            />
          </div>

          {isDropDown && <DropDownMenu handleLogout={handleLogout} />}

          <div className="hidden 2xl:block mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome to Dashboard
            </h2>
          </div>
          <div className="bg-gray-200 rounded-lg p-6 ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              სულ სტუდენტები:
            </h3>
            <div className="flex items-center">
              <div className="h-12 w-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-2xl mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm2-5a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {totalStudents}
              </p>
            </div>
          </div>

          <MonthlyRevenue monthlyRevenue={monthlyRevenue} />

          <div className="bg-gray-200 rounded-lg shadow-md p-6 mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              თვიური შემოსავალი 3 ვალუტაში
            </h3>
            <ChartData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
