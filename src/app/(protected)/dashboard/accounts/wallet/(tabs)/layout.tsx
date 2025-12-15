import PageWrapper from "@/components/ui/pageWrapper";
import React from "react";

type LayoutComponentProps = {
  children: React.ReactNode;
};

function LayoutComponent({ children }: LayoutComponentProps) {
  return <PageWrapper>{children}</PageWrapper>;
}

export default LayoutComponent;
