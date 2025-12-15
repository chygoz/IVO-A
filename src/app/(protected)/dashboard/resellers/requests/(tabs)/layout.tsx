import RequestLayoutComponent from "@/components/resellers/requests/layout";
import React from "react";

type RequestLayoutProps = {
  children: React.ReactNode;
};

function RequestLayout({ children }: RequestLayoutProps) {
  return <RequestLayoutComponent>{children}</RequestLayoutComponent>;
}

export default RequestLayout;
