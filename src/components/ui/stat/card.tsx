"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, formatToNaira } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { IAnalyticCategory, IAnalyticPeriod } from "@/actions/analytics/util";
import { getAnalytics } from "@/actions/analytics";
import { Skeleton } from "../skeleton";

type StatCardProps = {
  title: string;
  category: IAnalyticCategory;
};

function StatCard({ title, category }: StatCardProps) {
  const [filter, setFilter] = useState<IAnalyticPeriod>("last7");
  const { data, isPending } = useQuery({
    queryKey: [`${title}-${category}`, filter],
    queryFn: () =>
      getAnalytics({
        timeRange: "24h",
      }),
  });

  if (isPending)
    return (
      <Skeleton
        style={{
          boxShadow:
            "0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
        }}
        className="h-[154px] rounded-xl  p-6 flex flex-col gap-3.5"
      />
    );
  const value = data?.data?.value ?? 0;
  const trend = data?.data?.trend ?? "even";
  const previousValue =
    data?.data?.previousValue ?? "No changes from previous month.";

  return (
    <div
      style={{
        boxShadow:
          "0px 1px 2px -1px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)",
      }}
      className="h-[154px] text-text rounded-xl border border-solid border-border p-6 flex flex-col gap-3.5"
    >
      <div className="flex justify-between">
        <h3 className="font-medium truncate">{title}</h3>
        {
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as IAnalyticPeriod)}
          >
            <SelectTrigger
              className="w-[160px] text-text font-bold rounded-lg sm:ml-auto"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="last90" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="last30" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="last7" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        }
      </div>
      <p className="font-bold text-4xl">
        {category === "transaction" ? formatToNaira(`${value}`) : value}
      </p>

      {trend && (
        <p
          className={cn(
            "text-xs",
            trend === "up"
              ? "text-green-500"
              : trend === "down"
              ? "text-red-500"
              : "text-gray-500"
          )}
        >
          {previousValue}
        </p>
      )}
    </div>
  );
}

export default StatCard;
