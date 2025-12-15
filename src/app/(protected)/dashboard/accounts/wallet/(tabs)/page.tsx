import React, { Suspense } from "react";
import { Metadata } from "next";
import {
  getAllWallets,
  getWalletBalance,
  getWalletStats,
} from "@/actions/wallet";
import { getTransactionStats } from "@/actions/transactions-server";
import { auth } from "@/auth"; // Import auth
import TableLoading from "@/components/ui/table-loading";
import { TimeRange } from "@/types/account";
import SwitchMenu from "@/components/accounts/switch-menu";
import WalletOverview from "@/components/accounts/wallet-overview";
import QuickActions from "@/components/accounts/quick-actions";
import TransactionTableWrapper from "@/components/accounts/table";

export const metadata: Metadata = {
  title: "Financial Overview | Dashboard",
  description: "View your wallet balance and transaction history",
};

interface PageProps {
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

async function FinancialOverviewPage({ searchParams }: PageProps) {
  // Get session in server component
  const session = await auth();

  const timeRange = (searchParams.timeRange || "30d") as TimeRange;
  const currency = searchParams.currency || "NGN";

  // Fetch wallet data and transaction stats in parallel for the selected currency
  const [walletData, walletStatsData, transactionStatsData] = await Promise.all(
    [
      getWalletBalance(currency, undefined, session),
      getWalletStats(timeRange, currency, undefined, session),
      getTransactionStats(timeRange, undefined, session),
    ]
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Wallet & Account</h1>
        <SwitchMenu currency={currency} />
      </div>

      <Suspense fallback={<div>Loading wallet overview...</div>}>
        <WalletOverview
          wallet={walletData.wallet}
          walletStats={walletStatsData.stats}
          transactionStats={transactionStatsData.stats}
          chartData={walletStatsData.chartData}
          timeRange={timeRange}
          currency={currency}
        />
      </Suspense>

      <div className="mt-10">
        <QuickActions currency={currency} wallet={walletData.wallet} />
      </div>

      <div className="mt-10">
        <Suspense fallback={<TableLoading />}>
          <TransactionTableWrapper
            searchParams={{
              ...searchParams,
              currency,
            }}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default FinancialOverviewPage;
