import React, { Suspense } from "react";
import CustomersTable from "./table";
import TableLoading from "@/components/ui/table-loading";
import { getPartners } from "@/actions/business";

async function PartnersTableMain() {
  const partner = await getPartners();
  return (
    <Suspense fallback={<TableLoading />}>
      <CustomersTable partners={partner?.data?.results || []} />
    </Suspense>
  );
}

export default PartnersTableMain;
