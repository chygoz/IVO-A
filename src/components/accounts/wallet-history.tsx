"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Download,
  ArrowUpCircle,
  ArrowDownCircle,
  ExternalLink,
} from "lucide-react";
import { PaginationComponent } from "@/components/ui/pagination-component";
import EmptyTable from "@/components/ui/empty-table";
import { WalletHistoryEntry, PaginationInfo, TimeRange } from "@/types/account";
import {
  formatDateTime,
  getTimeRangeOptions,
  fadeInVariants,
  staggerContainerVariants,
  slideUpVariants,
} from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils-alt";

interface WalletHistoryProps {
  entries: WalletHistoryEntry[];
  pagination?: PaginationInfo;
  isLoading?: boolean;
  onTimeRangeChange?: (range: TimeRange) => void;
  onPageChange?: (page: number) => void;
  currency?: string;
}

interface WalletHistoryProps {
  entries: WalletHistoryEntry[];
  pagination?: PaginationInfo;
  isLoading?: boolean;
  onTimeRangeChange?: (range: TimeRange) => void;
  onPageChange?: (page: number) => void;
}

function WalletHistory({
  entries,
  pagination,
  isLoading = false,
  onTimeRangeChange,
  onPageChange,
  currency = "NGN",
}: WalletHistoryProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("90d");

  const handleTimeRangeChange = (value: TimeRange) => {
    setTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const handleExport = () => {
    // Implementation for exporting data
    console.log("Export wallet history");
  };

  // Use proper currency formatting based on the current currency
  const formatAmount = (amount: number) => {
    return formatCurrency(amount, currency);
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">
              <Skeleton className="h-6 w-48" />
            </CardTitle>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm"
    >
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="font-bold text-gray-900 dark:text-white text-2xl">
            {currency} Wallet Activity
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger
                className="w-[160px] rounded-lg"
                aria-label="Select time range"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {getTimeRangeOptions().map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="rounded-lg"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={handleExport}
            >
              <Download size={16} />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {entries.length > 0 ? (
          <motion.div variants={staggerContainerVariants}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Date</TableHead>
                  <TableHead className="w-[150px]">Amount</TableHead>
                  <TableHead className="w-[120px]">Type</TableHead>
                  <TableHead className="w-[180px]">Balance After</TableHead>
                  <TableHead className="w-[200px]">Transaction</TableHead>
                  <TableHead className="w-[100px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <motion.tr
                    key={entry.id}
                    variants={slideUpVariants}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {formatDateTime(entry.createdAt)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      <div className="flex items-center gap-2">
                        {entry.entryType === "credit" ? (
                          <ArrowUpCircle className="text-green-500" size={16} />
                        ) : (
                          <ArrowDownCircle
                            className="text-amber-500"
                            size={16}
                          />
                        )}
                        {formatCurrency(entry.amount)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.entryType === "credit"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {entry.entryType === "credit" ? "Credit" : "Debit"}
                      </span>
                    </TableCell>
                    <TableCell>{formatCurrency(entry.balance)}</TableCell>
                    <TableCell>
                      {entry.transaction ? (
                        <span className="text-sm truncate block max-w-[180px]">
                          {entry.transaction.reference}
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          Not linked
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.transaction && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/transactions/${entry.transaction.transactionId}`}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <ExternalLink size={16} />
                              <span className="sr-only">View transaction</span>
                            </Button>
                          </Link>
                        </div>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>

            {pagination && (
              <div className="flex justify-end w-full py-4">
                <PaginationComponent
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </motion.div>
        ) : (
          <EmptyTable
            title={`No ${currency} Wallet Activity Yet`}
            subTitle={`Your ${currency} wallet activity will appear here once transactions are processed.`}
          />
        )}
      </div>
    </motion.div>
  );
}

export default WalletHistory;
