import { Link } from "react-router-dom";

const StudentsNavigation = () => {
  return (
    <div className="mb-8 flex justify-center space-x-4">
      <Link
        to="/entrant_students"
        className="px-6 py-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        აბიტურიენტები
      </Link>
      <Link
        to="/abroad_students"
        className="px-6 py-2 text-white bg-green-500 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        საზღვარგარეთი
      </Link>
      <Link to="/add_student">
        <button className="px-6 py-2 text-white bg-purple-500 rounded-full shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
          მოსწავლის დამატება
        </button>
      </Link>
    </div>
  );
};

export default StudentsNavigation;
