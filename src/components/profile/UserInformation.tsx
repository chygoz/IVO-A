import React from "react";
import { Separator } from "../ui/separator";
import { User } from "next-auth";
import UserForm from "./userForm";

type UserInformationProps = {
  user: User | undefined;
};

function UserInformation({ user }: UserInformationProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold">Profile</h3>
      <p>Manage your account settings and set preferences.</p>
      <Separator className="my-2" />

      {user && <UserForm user={user} />}
    </div>
  );
}

export default UserInformation;
