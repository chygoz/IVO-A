import React from "react";
import PageWrapper from "../ui/pageWrapper";
import PageHeader from "../ui/page-header";
import TransactionTable from "./table";

function TransactionsComponent() {
  return (
    <PageWrapper>
      <PageHeader title="Transactions" />
      <TransactionTable />
    </PageWrapper>
  );
}

export default TransactionsComponent;
