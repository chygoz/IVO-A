import { User } from "next-auth";
import React from "react";

type DashboardHeaderProps = {
  user: User;
  children?: React.ReactNode;
};

function DashboardHeader({ children, user }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row md:items-center">
      <p className="text-2xl font-bold">Dashboard</p>
      {children ? (
        <div className="md:ml-auto flex items-center gap-2">{children}</div>
      ) : null}
    </div>
  );
}

export default DashboardHeader;
