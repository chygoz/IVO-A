import PageWrapper from "@/components/ui/pageWrapper";
import React from "react";
import RequestHeader from "./header";
import ItemTable from "./item-table";
import { Submission } from "@/actions/submissions/utils";
import GoBackButton from "@/components/goBackButton";

type RequestDetailProps = {
  request: Submission;
};

function RequestDetail({ request }: RequestDetailProps) {
  return (
    <PageWrapper>
      <GoBackButton className="w-fi mb-4">Back</GoBackButton>
      <div className="flex flex-col gap-10">
        <RequestHeader request={request} />
        <ItemTable
          items={request.items}
          metadata={{
            limit: 10,
            page: 1,
            totalCount: 1,
            totalPages: 1,
          }}
        />
      </div>
    </PageWrapper>
  );
}

export default RequestDetail;
