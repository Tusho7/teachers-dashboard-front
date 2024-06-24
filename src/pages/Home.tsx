import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ChartData from "../components/Chart";
import { getTotalStudents } from "../services/getStudents";
import { MonthlyRevenueData } from "../types/monthlyRevenueProps";
import { getMonthlyRevenue } from "../services/getMonthlyRevue";
import HamburgerIcon from "../assets/hamburger.png";

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

  return (
    <div className="flex h-screen ">
      <div className="bg-gray-800 text-white w-80 p-6 flex-col justify-between hidden 2xl:flex">
        <div className="flex flex-col gap-10 mt-4">
          <Link to="/students" className="text-xl font-bold">
            სტუდენტები
          </Link>
          <Link to="/abroad_students" className="text-xl font-bold">
            საზღვარგარეთის სტუდენტები
          </Link>
          <Link to="/entrant_students" className="text-xl font-bold">
            აბიტურიენტები
          </Link>
          <Link to="/entrant_students" className="text-xl font-bold">
            პირადი კაბინეტი
          </Link>
          <Link to="/entrant_students" className="text-xl font-bold">
            პარამეტრები
          </Link>
        </div>

        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          გამოსვლა
        </button>
      </div>

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

          {isDropDown && (
            <div className="bg-gray-800 text-white p-10 flex flex-col gap-10 mb-6 2xl:hidden rounded-lg ">
              <Link to="/students" className="text-xl font-bold block w-40">
                სტუდენტები
              </Link>
              <Link
                to="/abroad_students"
                className="text-xl font-bold block mt-2 w-40"
              >
                საზღვარგარეთის სტუდენტები
              </Link>
              <Link
                to="/entrant_students"
                className="text-xl font-bold block mt-2 w-40"
              >
                აბიტურიენტები
              </Link>
              <button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg self-center w-96">
                გამოსვლა
              </button>
            </div>
          )}

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-gray-200 rounded-lg flex flex-col gap-10 shadow-md p-6 col-span-2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-0">
                თვიური შემოსავალი
              </h3>
              <div className="flex flex-col md:flex-row  gap-4 justify-between">
                <p className="text-xl text-gray-800">
                  {monthlyRevenue
                    ? `ლარი: ${monthlyRevenue.GEL}`
                    : "Loading..."}
                </p>
                <p className="text-xl text-gray-800">
                  {monthlyRevenue
                    ? `დოლარი: ${monthlyRevenue.USD}`
                    : "Loading..."}
                </p>
                <p className="text-xl text-gray-800">
                  {monthlyRevenue
                    ? `ევრო: ${monthlyRevenue.EURO}`
                    : "Loading..."}
                </p>
              </div>
            </div>
          </div>

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
