import { Link, useLocation } from "react-router-dom";
import { useNotifications } from "../contexts/NotificationContext";

const Navigation = ({ handleLogout }: { handleLogout: () => void }) => {
  const { notifications } = useNotifications();
  const notificationCount = notifications.length;
  const location = useLocation();

  return (
    <div className="bg-gray-800 text-white w-80 p-6 flex-col justify-between hidden 2xl:flex">
      <div className="flex flex-col gap-10 mt-4">
        <NavLink to="/students">სტუდენტები</NavLink>
        <NavLink to="/abroad_students">საზღვარგარეთის სტუდენტები</NavLink>
        <NavLink to="/entrant_students">აბიტურიენტები</NavLink>
        <NavLink to="/personal_cabinet">პირადი კაბინეტი</NavLink>
        <NavLink to="/settings">პარამეტრები</NavLink>
      </div>

      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        გამოსვლა
      </button>
    </div>
  );

  // Helper component to handle active link highlighting
  function NavLink({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`text-xl font-bold ${
          isActive ? "text-blue-500" : "text-white hover:text-blue-500"
        }`}
      >
        {children}
        {isActive && notificationCount > 0 && (
          <span className="absolute top-0 right-12 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {notificationCount}
          </span>
        )}
      </Link>
    );
  }
};

export default Navigation;
