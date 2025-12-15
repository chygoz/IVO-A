import { Submission } from "@/actions/submissions/utils";
import { Metadata } from "@/types";
import React from "react";
import RequestsTable from "./table";

type RequestComponentProps = {
  requests: Submission[];
  metadata: Metadata;
};

function RequestComponent({ requests, metadata }: RequestComponentProps) {
  return (
    <div>
      <RequestsTable requests={requests} metadata={metadata} />
    </div>
  );
}

export default RequestComponent;
