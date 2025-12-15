import { Metadata } from "next";

import AccountComponent from "@/components/my-account";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account settings and preferences",
};

export default async function AccountSettingsPage() {
  const session = await auth();

  if (!session?.user) return notFound();
  return <AccountComponent userData={session.user} />;
}
