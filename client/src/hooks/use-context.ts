import { createContext, useContext } from "react";
import { ApiResponse } from "../types/apiResponse";

interface UserContextType {
  userAuth: ApiResponse;
  setUserAuth: React.Dispatch<React.SetStateAction<ApiResponse>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useUserContext = () => {
  const user = useContext(UserContext);

  if (user === undefined) {
    throw new Error("useUserContext must be used with a ");
  }

  return user;
};
