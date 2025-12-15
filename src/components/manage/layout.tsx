import React from "react";
import PageWrapper from "../ui/pageWrapper";
import PageHeader from "../ui/page-header";
import { auth } from "@/auth";
import { InviteMember } from "../ui/invite-member";
import PartnerKey from "./partnerKey";
import Menu from "./menu";

type ManageLayoutProps = {
  children: React.ReactNode;
};

async function ManageLayout({ children }: ManageLayoutProps) {
  const session = await auth();
  if (!session) return null;

  return (
    <PageWrapper>
      <PageHeader title="Manage" />
      <div className="mt-6 mb-4 flex flex-col items-center md:flex-row">
        <PartnerKey currentPartner={""} />
        <div className="md:ml-auto">
          <InviteMember currentPartner={""} />
        </div>
      </div>
      <div>
        <Menu />
        {children}
      </div>
    </PageWrapper>
  );
}

export default ManageLayout;
