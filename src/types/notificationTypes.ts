import { createContext } from "react";

export interface Notification {
  message: string;
  studentId: string;
  attendance_count: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
