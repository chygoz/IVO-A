import { getSubmissions } from "@/actions/submissions";
import RequestComponent from "@/components/resellers/requests";
import AccessDenied from "@/components/ui/access-denied";
import React from "react";

async function CompletedRequestPage() {
  const response = await getSubmissions("approved");
  if (response.error) {
    return (
      <AccessDenied
        returnTo="/dashboard"
        message={response.error}
      />
    );
  }

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
