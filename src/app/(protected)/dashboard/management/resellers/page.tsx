import { getResellers } from "@/actions/users";
import ResellerManagementComponent from "@/components/management/resellers";
import { validatePageParam } from "@/lib/utils";
import React from "react";

type ManagementResellerPageProps = {
  searchParams: {
    p: string;
    query: string;
  };
};

async function ManagementResellerPage({
  searchParams,
}: ManagementResellerPageProps) {
  const response = await getResellers({
    p: validatePageParam(searchParams.p),
    ...(searchParams.query ? { q: searchParams.query } : {}),
  });
  return (
    <ResellerManagementComponent
      metadata={response.data.metadata}
      resellers={response?.data?.results || []}
    />
  );
}

export default ManagementResellerPage;
