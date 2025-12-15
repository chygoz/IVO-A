"use client";
import { doLogout } from "@/actions/login";
import { useEffect } from "react";
import LoadingSpinner from "../ui/loading-spinner";

function SignOutComponent() {
  useEffect(() => {
    doLogout("/");
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
}

export default SignOutComponent;
