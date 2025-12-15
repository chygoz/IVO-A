import React from "react";
import { User } from "next-auth";
type GreetUserProps = {
  user: User;
};
function GreetUser({ user }: GreetUserProps) {
  if (!user) return null;
  return (
    <div>
      <h3 className="capitalize text-lg sm:text-[28px] font-medium">
        Welcome back, <span>{user?.name?.split(" ")[0]}</span>
      </h3>
      <p></p>
    </div>
  );
}

export default GreetUser;
