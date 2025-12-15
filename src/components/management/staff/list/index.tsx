import { getMyMembers } from "@/actions/business";
import React, { Suspense } from "react";
import StaffTable from "./table";

async function StaffList() {
  const response = await getMyMembers();

  const members = response.data.results;

  return (
    <Suspense fallback={<div>...loading</div>}>
      <StaffTable
        members={members}
        metadata={{
          limit: 10,
          page: 1,
          totalCount: 1,
          totalPages: 1,
        }}
      />
    </Suspense>
  );
}

export default StaffList;
