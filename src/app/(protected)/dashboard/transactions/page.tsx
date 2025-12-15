import React, { Suspense } from "react";
import { Metadata } from "next";

import { TimeRange } from "@/types/account";
import TableLoading from "@/components/accounts/table/loading";
import TransactionTableWrapper from "@/components/accounts/table";

export const metadata: Metadata = {
  title: "Transactions | Dashboard",
  description: "View your transaction history",
};

interface PageProps {
  searchParams: {
    timeRange?: TimeRange;
    page?: string;
    limit?: string;
    status?: string;
    transactionType?: string;
    searchTerm?: string;
  };
}

async function TransactionsPage({ searchParams }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Transactions</h1>

      <Suspense fallback={<TableLoading />}>
        <TransactionTableWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default TransactionsPage;
