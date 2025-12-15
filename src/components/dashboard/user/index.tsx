import React from "react";
import DashboardHeader from "../_components/header";
import { User } from "next-auth";

type UserDashboardProps = {
  user: User;
  query: Record<string, string>;
};
function UserDashboard({ user, query }: UserDashboardProps) {
  return (
    <div>
      <div className=" flex flex-col gap-4 w-full">
        <DashboardHeader user={user} />
      </div>
    </div>
  );
}

export default UserDashboard;
