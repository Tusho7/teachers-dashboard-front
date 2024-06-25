import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { UserContextType } from "../types/User";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};