import { getWalletHistory } from "@/actions/wallet";
import { TimeRange } from "@/types/account";
import ClientWalletHistory from "./client-wallet-history";

interface WalletHistoryWrapperProps {
  searchParams: {
    timeRange?: TimeRange;
    page?: string;
    limit?: string;
    entryType?: string;
    currency?: string;
  };
}

async function WalletHistoryWrapper({
  searchParams,
}: WalletHistoryWrapperProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "10", 10);
  const timeRange = (searchParams.timeRange || "30d") as TimeRange;
  const currency = searchParams.currency || "NGN";

  // Build filters object from search params
  const filters: Record<string, string> = {};
  if (searchParams.entryType) filters.entryType = searchParams.entryType;

  // Fetch wallet history data with currency
  const { entries, pagination } = await getWalletHistory(
    page,
    limit,
    filters,
    currency
  );

  return (
    <ClientWalletHistory
      initialEntries={entries}
      initialPagination={pagination}
      searchParams={searchParams}
    />
  );
}

export default WalletHistoryWrapper;
