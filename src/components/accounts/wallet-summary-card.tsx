// WalletSummaryCard.tsx - Modified to support currency switching
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { formatDateTime, fadeInVariants } from "@/lib/utils";
import { formatToNaira, formatToUSD } from "@/lib/utils-alt";
import { WalletStats, Wallet as WalletType } from "@/types/account";
import SwitchMenu from "./switch-menu";

interface WalletSummaryCardProps {
  wallet: WalletType | null;
  stats: WalletStats | null;
  isLoading?: boolean;
  currency?: string;
}

const WalletSummaryCard: React.FC<WalletSummaryCardProps> = ({
  wallet,
  stats,
  isLoading = false,
  currency = "NGN",
}) => {
  const formatCurrency = (amount: number) => {
    return currency === "NGN" ? formatToNaira(amount) : formatToUSD(amount);
  };

  if (isLoading || !wallet) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-64" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
      <Card className="shadow-sm">
        <CardHeader className="pb-2 flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-primary" />
              Wallet Summary
            </CardTitle>
            <CardDescription>
              Last updated: {formatDateTime(wallet.updatedAt)}
            </CardDescription>
          </div>
          <SwitchMenu currency={currency} />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Available Balance
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(wallet.availableBalance)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Balance
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(wallet.pendingBalance)}
              </p>
            </div>
            {stats && (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center">
                    <ArrowUpCircle className="mr-1 h-4 w-4 text-green-500" />
                    Total Inflow (30d)
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(stats.totalInflow)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 flex items-center">
                    <ArrowDownCircle className="mr-1 h-4 w-4 text-amber-500" />
                    Total Outflow (30d)
                  </p>
                  <p className="text-xl font-bold text-amber-600">
                    {formatCurrency(stats.totalOutflow)}
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WalletSummaryCard;
