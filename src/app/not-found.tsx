import React from "react";
import GoBackButton from "@/components/goBackButton";

function NotFound() {
  return (
    <div className="h-screen text-secondary bg-white flex flex-col justify-center items-center">
      <div className="flex flex-col text-center">
        <h1 className="text-7xl  font-bold">404</h1>
        <p>The page you are looking for does not exist.</p>
        <div>
          <GoBackButton className="mt-6">Go Back</GoBackButton>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
