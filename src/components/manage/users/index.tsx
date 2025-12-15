import React from "react";
import UsersTable from "./usersTable";
import { Session } from "next-auth";

type UsersProps = {
  session: Session | null;
};

function Users({ session }: UsersProps) {
  if (!session) return null;
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Users</h3>
      <UsersTable session={session} />
    </div>
  );
}

export default Users;
