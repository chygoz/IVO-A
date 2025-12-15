"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/utils";
import { Wallet } from "@/types/account";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils-alt";

interface WalletCardProps {
  wallet: Wallet | null;
  isLoading?: boolean;
  currency?: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  isLoading = false,
  currency = "NGN",
}) => {
  const formatAmount = (amount: number) => {
    return formatCurrency(amount, currency);
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-10 w-56 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
        <p className="text-gray-500 dark:text-gray-400">
          Wallet information unavailable
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {currency} Available Balance
      </h3>
      <p className="text-3xl font-bold text-primary mt-1 mb-4">
        {formatAmount(wallet.availableBalance)}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Pending
          </p>
          <p className="text-sm font-semibold">
            {formatAmount(wallet.pendingBalance)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Total
          </p>
          <p className="text-sm font-semibold">
            {formatAmount(wallet.totalBalance)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletCard;
