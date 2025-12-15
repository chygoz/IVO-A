import React from "react";
import UserInformation from "./UserInformation";
import { auth } from "@/auth";

async function ProfileComponent() {
  const session = await auth();
  return <UserInformation user={session?.user} />;
}

export default ProfileComponent;
