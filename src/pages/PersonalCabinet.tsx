import { useNotifications } from "../contexts/NotificationContext";
import { useUser } from "../contexts/useUser";
import userIcon from "../assets/usericon.png";
import { Link } from "react-router-dom";

const PersonalCabinet = () => {
  const { notifications } = useNotifications();
  const notificationCount = notifications.length;
  const { user } = useUser();
  console.log(user);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        პირადი კაბინეტი
      </h1>
      <div className="bg-gray-300 shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={userIcon}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <div className="flex gap-2 items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.first_name || "User Name"} {user?.last_name || ""}
              </h2>
            </div>
            <p className="text-gray-600">{user?.email || "user@example.com"}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 flex items-center text-gray-800">
            შეტყობინებები
            {notificationCount > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full text-sm w-6 h-6 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </h3>
          {notificationCount > 0 ? (
            <ul className="list-disc ml-4">
              {notifications.map((notification, index) => (
                <li key={index} className="mt-1 text-gray-700">
                  {notification.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">ახალი შეტყობინება არ არის</p>
          )}
        </div>

        <div className="flex gap-4">
          <Link to="/settings">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
              პროფილის რედაქტირება
            </button>
          </Link>

          <Link to="/students">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
              იხილეთ ცხრილი
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            უკან დაბრუნება
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalCabinet;
