import React from "react";
import PageWrapper from "../../ui/pageWrapper";
import { Card } from "../../ui/card";
import StatusSwitcher from "@/components/ui/status-switcher";
import { AddReseller } from "./add";
import ResellersTable from "./table";
import { User } from "@/actions/users/types";
import BulkAddResellers from "./bulk-add";
import SendResellerLogin from "./send-login";
import SearchComponent from "@/components/ui/search";

type ResellerManagementComponentProps = {
  resellers: User[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

function ResellerManagementComponent({
  resellers,
  metadata,
}: ResellerManagementComponentProps) {
  return (
    <PageWrapper>
      <Card className="p-5 bg-white shadow-none border-none">
        <div className="flex items-center">
          <h4 className="text-xl font-semibold">Reseller Management</h4>
          <div className="ml-auto flex items-center gap-2">
            <StatusSwitcher />
            <AddReseller />
            <BulkAddResellers />
          </div>
        </div>
        <SendResellerLogin />
        <div className="mt-4">
          <SearchComponent className="max-w-[250px] w-full mb-4" />
          <ResellersTable metadata={metadata} resellers={resellers} />
        </div>
      </Card>
    </PageWrapper>
  );
}

export default ResellerManagementComponent;
