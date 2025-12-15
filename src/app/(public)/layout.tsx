import React from "react";

type PublicLayoutProps = {
  children: React.ReactNode;
};

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="min-h-screen relative flex flex-col">
        <main className="grow flex flex-col">{children}</main>
      </div>
    </div>
  );
}

export default PublicLayout;
