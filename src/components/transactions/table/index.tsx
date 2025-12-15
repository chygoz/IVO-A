import React, { Suspense } from "react";

import { getMyTransactions } from "@/actions/transactions/get.transactions";
import TableLoading from "@/components/ui/table-loading";
import TransactionTable from "./table";

async function TransactionTableMain() {
  const response = await getMyTransactions();

  return (
    <Suspense fallback={<TableLoading />}>
      <TransactionTable transactions={response?.data?.results || []} />
    </Suspense>
  );
}

export default TransactionTableMain;
