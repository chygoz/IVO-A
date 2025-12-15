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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Info,
  ArrowUpDown,
} from "lucide-react";
import { PaginationComponent } from "@/components/ui/pagination-component";
import EmptyTable from "@/components/ui/empty-table";
import { Transaction, PaginationInfo, TimeRange } from "@/types/account";

import {
  formatDateTime,
  getTimeRangeOptions,
  fadeInVariants,
  staggerContainerVariants,
  slideUpVariants,
} from "@/lib/utils";
import { formatCurrency } from "@/lib/utils-alt";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Status from "../status";

interface TransactionTableProps {
  transactions: Transaction[];
  pagination?: PaginationInfo;
  isLoading?: boolean;
  onTimeRangeChange?: (range: TimeRange) => void;
  onPageChange?: (page: number) => void;
  onSearch?: (term: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  currency?: string;
}

function TransactionTable({
  transactions,
  pagination,
  isLoading = false,
  onTimeRangeChange,
  onPageChange,
  onSearch,
  onFilterChange,
  currency = "NGN",
}: TransactionTableProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("90d");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSearch = () => {
    onSearch?.(searchTerm);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleTimeRangeChange = (value: TimeRange) => {
    setTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const handleExport = () => {
    // Implementation for exporting data
    console.log(`Export ${currency} transactions`);
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
            {currency} Transaction History
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

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search transactions..."
              className="pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={() => handleFilterChange("status", "completed")}
                >
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterChange("status", "pending")}
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterChange("status", "failed")}
                >
                  Failed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleFilterChange("transactionType", "credit")
                  }
                >
                  Credits Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterChange("transactionType", "debit")}
                >
                  Debits Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {
                setFilters({});
                onFilterChange?.({});
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {transactions.length > 0 ? (
          <motion.div variants={staggerContainerVariants}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Reference</TableHead>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDown size={14} />
                    </div>
                  </TableHead>
                  <TableHead className="w-[150px]">Amount</TableHead>
                  <TableHead className="w-[120px]">Type</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[100px] text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    variants={slideUpVariants}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {transaction.referenceId}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {formatDateTime(transaction.createdAt)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(transaction.amount, currency)}
                    </TableCell>
                    <TableCell>
                      <Status
                        variant={
                          transaction.transactionType === "credit"
                            ? "success"
                            : "warning"
                        }
                        text={transaction.transactionType}
                      />
                    </TableCell>
                    <TableCell>
                      <Status
                        variant={
                          transaction.status === "completed"
                            ? "success"
                            : transaction.status === "pending"
                            ? "warning"
                            : transaction.status === "failed"
                            ? "error"
                            : "default"
                        }
                        text={transaction.status}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/dashboard/transactions/${transaction.transactionId}?currency=${currency}`}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Info size={16} />
                            <span className="sr-only">View details</span>
                          </Button>
                        </Link>
                      </div>
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
            title={`No ${currency} Transactions Yet`}
            subTitle={`You haven't made any ${currency} transactions yet. Once you do, they'll show up here.`}
          />
        )}
      </div>
    </motion.div>
  );
}

export default TransactionTable;
