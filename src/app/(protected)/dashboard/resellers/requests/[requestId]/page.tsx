import { getSubmission } from "@/actions/submissions";
import RequestDetail from "@/components/resellers/requests/details";
import { notFound } from "next/navigation";
import React from "react";

type RequestDetailPageProps = {
  params: { requestId: string };
};

async function RequestDetailPage({ params }: RequestDetailPageProps) {
  const response = await getSubmission(params.requestId);

  if (!response.data) return notFound();
  return <RequestDetail request={response.data} />;
}

export default RequestDetailPage;
