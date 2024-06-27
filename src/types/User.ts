export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
