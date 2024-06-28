import { useEffect } from "react";
import { useNotifications } from "../contexts/NotificationContext";

const WebSocketProvider = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");

    ws.onopen = () => {
      // console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        addNotification(message);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onclose = () => {
      // console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [addNotification]);

  return null;
};

export default WebSocketProvider;
