import React from "react";
import PageWrapper from "../../ui/pageWrapper";
import { Card } from "../../ui/card";
import StatusSwitcher from "@/components/ui/status-switcher";
import CustomerList from "./list";

function CustomersManagementComponent() {
  return (
    <PageWrapper>
      <Card className="p-5 bg-white shadow-none border-none">
        <div className="flex items-center">
          <h4 className="text-xl font-semibold">Customer Management</h4>
          <div className="ml-auto">
            <StatusSwitcher />
          </div>
        </div>
        <CustomerList />
      </Card>
    </PageWrapper>
  );
}

export default CustomersManagementComponent;
