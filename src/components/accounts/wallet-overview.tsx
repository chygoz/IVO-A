"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import WalletCard from "./wallet-card";
import StatCards from "./stat";
import ActivityChart from "./chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Wallet,
  WalletStats,
  TransactionStats,
  ChartDataPoint,
  TimeRange,
} from "@/types/account";
import {
  getTimeRangeOptions,
  fadeInVariants,
  staggerContainerVariants,
} from "@/lib/utils";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface WalletOverviewProps {
  wallet: Wallet | null;
  walletStats: WalletStats | null;
  transactionStats: TransactionStats | null;
  chartData: ChartDataPoint[];
  timeRange: TimeRange;
  currency: string;
}

const WalletOverview: React.FC<WalletOverviewProps> = ({
  wallet,
  walletStats,
  transactionStats,
  chartData,
  timeRange,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState("wallet");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTimeRangeChange = (value: TimeRange) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("timeRange", value);
    // Keep the currency parameter when changing time range
    if (currency) {
      params.set("currency", currency);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeInVariants}>
        <WalletCard wallet={wallet} currency={currency} />
      </motion.div>

      <div className="flex justify-between items-center">
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="wallet">Wallet Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transaction Overview</TabsTrigger>
          </TabsList>

          <div className="flex justify-end mb-6 mt-4">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger
                className="w-[160px] rounded-lg"
                aria-label="Select time range"
              >
                <SelectValue placeholder="Last 30 days" />
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
          </div>

          <TabsContent value="wallet" className="space-y-6">
            <motion.div variants={fadeInVariants}>
              <StatCards
                walletStats={walletStats}
                type="wallet"
                currency={currency}
              />
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <ActivityChart
                chartData={chartData}
                type="wallet"
                currency={currency}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <motion.div variants={fadeInVariants}>
              <StatCards
                transactionStats={transactionStats}
                type="transactions"
                currency={currency}
              />
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <ActivityChart
                chartData={chartData}
                type="transactions"
                currency={currency}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default WalletOverview;
