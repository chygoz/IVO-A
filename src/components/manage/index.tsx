import React from "react";
import Users from "./users";
import { auth } from "@/auth";

async function ManageComponent() {
  const session = await auth();
  return <Users session={session} />;
}

export default ManageComponent;
