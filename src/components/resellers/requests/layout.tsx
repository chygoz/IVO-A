import { Card } from "@/components/ui/card";
import PageWrapper from "@/components/ui/pageWrapper";
import React from "react";
import RequestMenu from "./menu";

type RequestLayoutComponentProps = {
  children: React.ReactNode;
};

function RequestLayoutComponent({ children }: RequestLayoutComponentProps) {
  return (
    <PageWrapper>
      <Card className="p-5 bg-white shadow-none border-none">
        <div className="flex items-center mb-6">
          <h4 className="text-xl font-semibold">Request Management</h4>
        </div>
        <RequestMenu />
        {children}
      </Card>
    </PageWrapper>
  );
}

export default RequestLayoutComponent;
