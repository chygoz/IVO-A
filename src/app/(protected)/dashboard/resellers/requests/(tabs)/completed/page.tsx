import { getSubmissions } from "@/actions/submissions";
import RequestComponent from "@/components/resellers/requests";
import React from "react";

async function CompletedRequestPage() {
  const response = await getSubmissions("approved");

  // Handle case where response.data might be undefined
  const requests = response.data?.results || [];

  return (
    <RequestComponent
      requests={requests}
      metadata={{
        totalCount: requests.length,
        page: 1,
        limit: 10,
        totalPages: 1,
      }}
    />
  );
}

export default CompletedRequestPage;
