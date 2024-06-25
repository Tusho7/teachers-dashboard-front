import { Link } from "react-router-dom";

const DropDownMenu = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <div className="bg-gray-800 text-white p-10 flex flex-col gap-10 mb-6 2xl:hidden rounded-lg ">
      <Link to="/students" className="text-xl font-bold block w-40">
        სტუდენტები
      </Link>
      <Link to="/abroad_students" className="text-xl font-bold block mt-2 w-40">
        საზღვარგარეთის სტუდენტები
      </Link>
      <Link
        to="/entrant_students"
        className="text-xl font-bold block mt-2 w-40"
      >
        აბიტურიენტები
      </Link>
      <button
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg self-center w-96"
        onClick={handleLogout}
      >
        გამოსვლა
      </button>
    </div>
  );
};

export default DropDownMenu;
