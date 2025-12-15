import React, { Suspense } from "react";
import CustomersTable from "./table";
import TableLoading from "@/components/ui/table-loading";

async function CustomersTableMain() {
  return (
    <Suspense fallback={<TableLoading />}>
      <CustomersTable customers={[]} />
    </Suspense>
  );
}

export default CustomersTableMain;
