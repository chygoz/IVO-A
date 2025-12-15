import ManageLayout from "@/components/manage/layout";
import React from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ManageLayout>{children}</ManageLayout>;
}
