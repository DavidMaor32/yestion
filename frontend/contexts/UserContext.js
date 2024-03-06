import { createContext, useState, useContext } from "react";

const UserContext = createContext();
const UserStateContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={user}>
      <UserStateContext.Provider value={setUser}>
        {children}
      </UserStateContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserState() {
  return useContext(UserStateContext);
}
