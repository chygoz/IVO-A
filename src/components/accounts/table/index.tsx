import { getTransactions } from "@/actions/transactions-server";
import { TimeRange } from "@/types/account";
import ClientTransactionTable from "./client-table";

interface TransactionTableWrapperProps {
  searchParams: {
    timeRange?: TimeRange;
    page?: string;
    limit?: string;
    status?: string;
    transactionType?: string;
    searchTerm?: string;
    currency?: string;
  };
}

async function TransactionTableWrapper({
  searchParams,
}: TransactionTableWrapperProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "10", 10);
  const timeRange = (searchParams.timeRange || "30d") as TimeRange;
  const currency = searchParams.currency || "NGN";

  // Build filters object from search params
  const filters: Record<string, string> = {};
  if (searchParams.status) filters.status = searchParams.status;
  if (searchParams.transactionType)
    filters.transactionType = searchParams.transactionType;
  if (searchParams.searchTerm) filters.searchTerm = searchParams.searchTerm;

  // Include currency in filters
  filters.currency = currency;

  // Fetch transactions data with currency
  const { transactions, pagination } = await getTransactions(
    page,
    limit,
    filters
  );

  return (
    <ClientTransactionTable
      initialTransactions={transactions}
      initialPagination={pagination}
      searchParams={{ ...searchParams, currency }}
    />
  );
}

export default TransactionTableWrapper;
