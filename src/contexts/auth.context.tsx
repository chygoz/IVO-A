import { createContext } from "react";

export type CurrentUser = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

export type AuthUser = {
  user?: CurrentUser;
  isAuthenticated: boolean;
};
export const AuthContext = createContext<{
  auth: AuthUser;
  setAuth: (auth: AuthUser) => void;
}>({
  auth: { isAuthenticated: false },
  setAuth: () => {},
});
