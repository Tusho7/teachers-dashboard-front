import { Link } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationContext";

const DropDownMenu = ({ handleLogout }: { handleLogout: () => void }) => {
  const { notifications } = useNotifications();
  const notificationCount = notifications.length;
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
      <div className="relative w-[270px]">
        <Link to="/personal_cabinet" className="text-xl font-bold">
          პირადი კაბინეტი
          {notificationCount > 0 && (
            <span className="absolute top-0 right-12 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Link>
      </div>

      <Link to="/settings" className="text-xl font-bold">
        პარამეტრები
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
