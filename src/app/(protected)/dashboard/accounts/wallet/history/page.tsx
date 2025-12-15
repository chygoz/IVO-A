import React, { Suspense } from "react";
import { Metadata } from "next";
import TableLoading from "@/components/ui/table-loading";
import { TimeRange } from "@/types/account";
import {
  getWalletBalance,
  getWalletStats,
} from "@/actions/transactions-server";
import { auth } from "@/auth"; // Import auth
import WalletSummaryCard from "@/components/accounts/wallet-summary-card";
import QuickActions from "@/components/accounts/quick-actions";
import WalletHistoryWrapper from "@/components/accounts/wallet-history-wrapper";

export const metadata: Metadata = {
  title: "Wallet History | Dashboard",
  description: "View your wallet history and balance changes",
};

interface PageProps {
  searchParams: {
    timeRange?: TimeRange;
    page?: string;
    limit?: string;
    entryType?: string;
    currency?: string;
  };
}

async function WalletHistoryPage({ searchParams }: PageProps) {
  // Get session in server component
  const session = await auth();

  // Get currency from URL or default to NGN
  const currency = searchParams.currency || "NGN";
  const timeRange = (searchParams.timeRange || "30d") as TimeRange;

  // Fetch data for specific currency
  const { wallet } = await getWalletBalance(undefined, session);
  const { stats } = await getWalletStats(timeRange, undefined, session);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wallet</h1>

      <WalletSummaryCard wallet={wallet} stats={stats} currency={currency} />

      <div className="mt-8">
        <QuickActions currency={currency} />
      </div>

      <div className="mt-8">
        <Suspense fallback={<TableLoading />}>
          <WalletHistoryWrapper
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

export default WalletHistoryPage;
