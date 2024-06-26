import { useNotifications } from "../contexts/NotificationContext";

const Settings = () => {
  const { notifications } = useNotifications();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        პარამეტრები
      </h1>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-lg shadow-md"
          >
            <p className="text-lg font-semibold">{notification.message}</p>
            <p className="text-sm text-gray-600">
              დასწრების რაოდენობა: {notification.attendance_count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
