import { createContext, useState, useEffect, ReactNode } from "react";
import { getUser } from "../services/api/getUser";
import { UserContextType, User } from "../types/User";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const isLogin = localStorage.getItem("isLogin") === "true";
      if (isLogin) {
        const { data } = await getUser();
        setUser(data[0]);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
