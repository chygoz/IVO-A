"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionStats, WalletStats } from "@/types/account";
import { Skeleton } from "@/components/ui/skeleton";
import {
  formatLargeNumber,
  staggerContainerVariants,
  slideUpVariants,
} from "@/lib/utils";
import { formatCurrency } from "@/lib/utils-alt";

interface StatCardsProps {
  transactionStats?: TransactionStats | null;
  walletStats?: WalletStats | null;
  isLoading?: boolean;
  type: "transactions" | "wallet";
  currency?: string;
}

const StatCards: React.FC<StatCardsProps> = ({
  transactionStats,
  walletStats,
  isLoading = false,
  type,
  currency = "NGN",
}) => {
  const stats =
    type === "transactions"
      ? getTransactionStatCards(transactionStats, currency)
      : getWalletStatCards(walletStats, currency);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => (
        <motion.div key={index} variants={slideUpVariants}>
          <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-2">
                <p className="text-2xl font-bold">{stat.value}</p>
                <div className={`p-2 rounded-full ${stat.iconBg}`}>
                  {stat.icon}
                </div>
              </div>
              {stat.subtext && (
                <p className={`text-xs mt-2 ${stat.subtextColor}`}>
                  {stat.subtext}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

function getTransactionStatCards(
  stats: TransactionStats | null | undefined,
  currency: string
) {
  if (!stats) {
    return Array(4).fill({
      title: "No data",
      value: "0",
      icon: <TrendingUp size={20} className="text-gray-400" />,
      iconBg: "bg-gray-100",
    });
  }

  return [
    {
      title: "Total Transactions",
      value: formatLargeNumber(stats.totalTransactions),
      icon: <TrendingUp size={20} className="text-indigo-500" />,
      iconBg: "bg-indigo-100",
    },
    {
      title: "Total Amount",
      value: formatCurrency(stats.totalAmount, currency),
      icon: <Wallet size={20} className="text-purple-500" />,
      iconBg: "bg-purple-100",
    },
    {
      title: "Credit Transactions",
      value: formatLargeNumber(stats.creditCount),
      subtext: `${formatCurrency(stats.creditAmount, currency)}`,
      subtextColor: "text-green-600",
      icon: <ArrowUpCircle size={20} className="text-green-500" />,
      iconBg: "bg-green-100",
    },
    {
      title: "Debit Transactions",
      value: formatLargeNumber(stats.debitCount),
      subtext: `${formatCurrency(stats.debitAmount, currency)}`,
      subtextColor: "text-amber-600",
      icon: <ArrowDownCircle size={20} className="text-amber-500" />,
      iconBg: "bg-amber-100",
    },
  ];
}

function getWalletStatCards(
  stats: WalletStats | null | undefined,
  currency: string
) {
  if (!stats) {
    return Array(4).fill({
      title: "No data",
      value: "0",
      icon: <TrendingUp size={20} className="text-gray-400" />,
      iconBg: "bg-gray-100",
    });
  }

  return [
    {
      title: `${currency} Current Balance`,
      value: formatCurrency(stats.currentBalance, currency),
      icon: <Wallet size={20} className="text-indigo-500" />,
      iconBg: "bg-indigo-100",
    },
    {
      title: `${currency} Pending Balance`,
      value: formatCurrency(stats.pendingBalance, currency),
      icon: <TrendingUp size={20} className="text-purple-500" />,
      iconBg: "bg-purple-100",
    },
    {
      title: `${currency} Total Inflow`,
      value: formatCurrency(stats.totalInflow, currency),
      subtext: `${stats.inflowCount} transactions`,
      subtextColor: "text-green-600",
      icon: <ArrowUpCircle size={20} className="text-green-500" />,
      iconBg: "bg-green-100",
    },
    {
      title: `${currency} Total Outflow`,
      value: formatCurrency(stats.totalOutflow, currency),
      subtext: `${stats.outflowCount} transactions`,
      subtextColor: "text-amber-600",
      icon: <ArrowDownCircle size={20} className="text-amber-500" />,
      iconBg: "bg-amber-100",
    },
  ];
}

export default StatCards;
