import { Link } from "react-router-dom";
import ChartData from "../components/Chart";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-800 text-white w-80 p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <Link to="/students" className="text-xl font-bold">
            სტუდენტები
          </Link>
          <Link to="/abroad_students" className="text-xl font-bold">
            საზღვარგარეთის სტუდენტები
          </Link>
          <Link to="/entrant_students" className="text-xl font-bold">
            აბიტურიენტები
          </Link>
        </div>

        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          გამოსვლა
        </button>
      </div>

      <div className="flex-1 bg-white">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Dashboard
          </h2>
          <ChartData />
        </div>
      </div>
    </div>
  );
};

export default Home;
