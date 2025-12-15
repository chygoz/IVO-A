"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartDataPoint } from "@/types/account";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeInVariants, formatDate } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils-alt";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

interface ActivityChartProps {
  chartData: ChartDataPoint[];
  isLoading?: boolean;
  type: "transactions" | "wallet";
  currency?: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({
  chartData,
  isLoading = false,
  type,
  currency = "NGN",
}) => {
  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  const title =
    type === "transactions"
      ? `${currency} Transaction Activity`
      : `${currency} Wallet Balance History`;

  return (
    <motion.div variants={fadeInVariants} initial="hidden" animate="visible">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {chartData && chartData.length > 0 ? (
              type === "transactions" ? (
                <TransactionChart data={chartData} currency={currency} />
              ) : (
                <WalletChart data={chartData} currency={currency} />
              )
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400">
                  No data available for the selected time period
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface ChartProps {
  data: ChartDataPoint[];
  currency: string;
}

const TransactionChart: React.FC<ChartProps> = ({ data, currency }) => {
  const formattedData = data.map((point) => ({
    ...point,
    date: formatDate(point.date),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currencySymbol = currency === "NGN" ? "₦" : "$";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
        <YAxis
          tickFormatter={(value) =>
            `${currencySymbol}${value.toLocaleString()}`
          }
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="credit"
          name="Credits"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="debit"
          name="Debits"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const WalletChart: React.FC<ChartProps> = ({ data, currency }) => {
  const formattedData = data.map((point) => ({
    ...point,
    date: formatDate(point.date),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currencySymbol = currency === "NGN" ? "₦" : "$";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={formattedData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
        <YAxis
          tickFormatter={(value) =>
            `${currencySymbol}${value.toLocaleString()}`
          }
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          type="monotone"
          dataKey="balance"
          name="Balance"
          fill="#818cf8"
          stroke="#4f46e5"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="inflow"
          name="Inflow"
          fill="#a7f3d0"
          stroke="#10b981"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="outflow"
          name="Outflow"
          fill="#fcd34d"
          stroke="#f59e0b"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;
