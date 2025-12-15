import React from "react";
import PageWrapper from "../ui/pageWrapper";
import PageHeader from "../ui/page-header";
import Menus from "./menus";
import { Separator } from "../ui/separator";

type ProfileDashboardProps = {
  children: React.ReactNode;
};

async function ProfileLayoutComponent({ children }: ProfileDashboardProps) {
  return (
    <PageWrapper>
      <PageHeader title="Settings" />
      <p className="mt-5 text-xs text-[#222B33]">
        Manage your account settings and set preferences.
      </p>
      <Separator className="mt-3 mb-11" />
      <div className="flex flex-col sm:flex-row gap-14">
        <Menus />
        <div className="flex flex-col grow h-full">{children}</div>
      </div>
    </PageWrapper>
  );
}

export default ProfileLayoutComponent;
