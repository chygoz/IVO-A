import React from "react";
import { AuthContext } from "@/contexts/auth.context";

function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
}

export default useAuth;
