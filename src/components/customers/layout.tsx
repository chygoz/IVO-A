import React from "react";
import PageWrapper from "../ui/pageWrapper";
import PageHeader from "../ui/page-header";
import Menus from "./menu";
import { Separator } from "../ui/separator";

type CustomerDashboardProps = {
  children: React.ReactNode;
};

async function CustomerLayoutComponent({ children }: CustomerDashboardProps) {
  return (
    <PageWrapper>
      <PageHeader title="Customers" />
      <p className="mt-5 text-xs text-[#222B33]">
        Manage all spofinda customers
      </p>
      <Separator className="mt-3 mb-11" />
      <div className="flex flex-col gap-5">
        <Menus />
        <div className="flex flex-col grow h-full">{children}</div>
      </div>
    </PageWrapper>
  );
}

export default CustomerLayoutComponent;
