import { Link } from "react-router-dom";

const Navigation = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
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

      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        გამოსვლა
      </button>
    </div>
  );
};

export default Navigation;
