"use client";

import React, { useCallback, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import TransactionTable from "./table";
import { Transaction, PaginationInfo, TimeRange } from "@/types/account";

interface ClientTransactionTableProps {
  initialTransactions: Transaction[];
  initialPagination: PaginationInfo;
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

const ClientTransactionTable: React.FC<ClientTransactionTableProps> = ({
  initialTransactions,
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

  const handleSearch = (term: string) => {
    updateSearchParams({ searchTerm: term, page: "1" });
  };

  const handleFilterChange = (newFilters: Record<string, string>) => {
    updateSearchParams({
      ...newFilters,
      page: "1",
    });
  };

  return (
    <TransactionTable
      transactions={initialTransactions}
      pagination={initialPagination}
      isLoading={isPending}
      onTimeRangeChange={handleTimeRangeChange}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
      currency={currency}
    />
  );
};

export default ClientTransactionTable;
