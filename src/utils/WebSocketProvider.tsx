import { useEffect } from "react";
import { useNotifications } from "../contexts/NotificationContext";

const WebSocketProvider = () => {
  const { addNotification } = useNotifications();

  const port = import.meta.env.VITE_WS_PORT || 8081;

  useEffect(() => {
    const ws = new WebSocket(`ws://${port}`);

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
  }, [addNotification, port]);

  return null;
};

export default WebSocketProvider;
