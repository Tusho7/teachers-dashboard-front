import { useState, useContext, ReactNode } from "react";
import {
  NotificationContext,
  NotificationContextType,
  Notification,
} from "../types/notificationTypes";

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
    if (notification.attendance_count === "8") {
      alert(`${notification.message}`);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
