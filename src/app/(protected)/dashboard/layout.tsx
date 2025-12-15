import React from "react";

export default async function DashboardLayout({
  children,
  sidebar,
  navbar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
}>) {
  return (
    <div className="grow h-full flex flex-col">
      {sidebar}
      {navbar}
      <main className="md:pl-[var(--sidebar-width)] pt-20 bg-[#F6F6F9] min-h-screen h-full grow">
        {children}
      </main>
    </div>
  );
}
