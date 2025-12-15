"use client";

import React, { useCallback, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import WalletHistory from "./wallet-history";
import { WalletHistoryEntry, PaginationInfo, TimeRange } from "@/types/account";

interface ClientWalletHistoryProps {
  initialEntries: WalletHistoryEntry[];
  initialPagination: PaginationInfo;
  searchParams: {
    timeRange?: TimeRange;
    page?: string;
    limit?: string;
    entryType?: string;
    currency?: string;
  };
}

const ClientWalletHistory: React.FC<ClientWalletHistoryProps> = ({
  initialEntries,
  initialPagination,
  searchParams,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();

  const currency = searchParams.currency || "NGN";

  const updateSearchParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(urlSearchParams.toString());

      // Preserve currency across navigation
      if (!params.has("currency") && currency) {
        params.set("currency", currency);
      }

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, urlSearchParams, currency]
  );

  const handleTimeRangeChange = (range: TimeRange) => {
    updateSearchParams({ timeRange: range, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: newPage.toString() });
  };

  return (
    <WalletHistory
      entries={initialEntries}
      pagination={initialPagination}
      isLoading={isPending}
      onTimeRangeChange={handleTimeRangeChange}
      onPageChange={handlePageChange}
      currency={currency}
    />
  );
};

export default ClientWalletHistory;
