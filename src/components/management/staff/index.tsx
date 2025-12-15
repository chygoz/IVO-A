import React from "react";
import PageWrapper from "../../ui/pageWrapper";
import { Card } from "../../ui/card";
import StatusSwitcher from "@/components/ui/status-switcher";
import AddNewStaff from "./new-staff";
import StaffList from "./list";

function StaffManagementComponent() {
  return (
    <PageWrapper>
      <Card className="p-5 bg-white shadow-none border-none">
        <div className="flex items-center">
          <h4 className="text-xl font-semibold">Staff Management</h4>
          <div className="ml-auto flex items-center gap-2">
            <StatusSwitcher />
            <AddNewStaff />
          </div>
        </div>

        <StaffList />
      </Card>
    </PageWrapper>
  );
}

export default StaffManagementComponent;
